/*
 * daily_log_git.js - every git step of the nightly daily-log task, done safely.
 *
 *   node tools/daily_log_git.js preflight          clear stale locks, fast-forward main
 *   node tools/daily_log_git.js plan               which day(s) need an entry
 *   node tools/daily_log_git.js log <YYYY-MM-DD>   that day's commits, with --stat
 *   node tools/daily_log_git.js commit "<message>" commit daily_log.md alone, then push
 *
 * The daily-log-updater scheduled task (C:\Users\enric\.claude\scheduled-tasks\
 * daily-log-updater\SKILL.md) calls ONLY this script for git, so a single narrow
 * permission rule lets it run unattended at 23:45 instead of stopping at its
 * first command waiting for an approval nobody is awake to give.
 *
 * Why it exists (v1.15.7, 02/10/2026). Stale .git/*.lock files kept blocking
 * commits the morning after. The cause was NOT a crash: a second job - a Cowork
 * routine, now paused - ran git inside the Cowork Linux VM over a Plan 9 share of
 * this folder, where unlink() is refused ("unable to unlink '.git/HEAD.lock':
 * Operation not permitted"). Every commit it made succeeded and left its locks
 * behind, 12 times since July. Git only warns about that, so it looked like
 * success. This script is the defence on the Windows side:
 *
 *   - preflight removes stale locks, but ONLY known lock files that git's own
 *     commit/pull/maintenance create, ONLY when no git.exe is running (the
 *     desktop app runs `git status` constantly, so it waits for a quiet moment),
 *     and ONLY when the lock is older than STALE_MINUTES - a fresh lock belongs
 *     to someone mid-command and is never touched;
 *   - commit snapshots the lock files first, runs git with a timeout, and on any
 *     failure removes only locks that appeared during its own run;
 *   - every step appends to logs/daily-log-task.log, and a failure also raises
 *     a Windows notification and exits non-zero, so it can't fail silently again.
 *
 * Nothing here writes daily_log.md: the entry's content and format are the
 * task's job, unchanged.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO = process.env.DAILY_LOG_REPO || path.join(__dirname, '..');
const LOG_FILE = path.join(REPO, 'logs', 'daily-log-task.log');
const STALE_MINUTES = 5;
const QUIET_WAIT_SECONDS = 60;      // how long to wait for running git.exe to finish
// A hung push or pull is killed, not waited on forever. (The env override and
// DAILY_LOG_REPO / DAILY_LOG_NO_TOAST exist so the failure paths can be tested
// on a scratch repository.)
const GIT_TIMEOUT_MS = Number(process.env.DAILY_LOG_GIT_TIMEOUT_MS) || 120 * 1000;

// The only lock files this job's own git commands (commit, pull, auto
// maintenance) can leave. Paths relative to the git dir; next-index-<pid>.lock
// is matched separately (it is `git commit <path>`'s temporary index).
const OWN_LOCKS = [
  'index.lock', 'HEAD.lock', 'ORIG_HEAD.lock', 'FETCH_HEAD.lock',
  'packed-refs.lock', 'refs/heads/main.lock', 'refs/remotes/origin/main.lock',
  'objects/maintenance.lock'
];

// ------------------------------------------------------------------ logging

function stamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' +
    p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
}

function log(level, msg) {
  const line = '[' + stamp() + '] ' + level.padEnd(5) + ' ' + msg;
  console.log(line);
  try {
    fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
    fs.appendFileSync(LOG_FILE, line + '\n');
  } catch (e) { /* the console line still reaches the task's transcript */ }
}

// A Windows toast, so a failure at 23:45 is waiting in the notification centre
// in the morning. Best effort: if it can't be shown, the log file still has it.
function notify(title, body) {
  if (process.platform !== 'win32' || process.env.DAILY_LOG_NO_TOAST) return;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, "''");
  const ps =
    "[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] > $null;" +
    "[Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] > $null;" +
    "$x = New-Object Windows.Data.Xml.Dom.XmlDocument;" +
    "$x.LoadXml('<toast><visual><binding template=\"ToastGeneric\"><text>" + esc(title) + "</text><text>" + esc(body) + "</text></binding></visual></toast>');" +
    "$app = '{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\\WindowsPowerShell\\v1.0\\powershell.exe';" +
    "[Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($app).Show((New-Object Windows.UI.Notifications.ToastNotification $x))";
  spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', ps], { timeout: 15000, windowsHide: true });
}

function fail(msg) {
  log('FAIL', msg);
  notify('Daily log task FAILED', msg.slice(0, 200));
  console.error('\nDAILY LOG TASK FAILED: ' + msg + '\nDetails: ' + LOG_FILE);
  process.exit(1);
}

// ---------------------------------------------------------------------- git

function git(args, opts) {
  opts = opts || {};
  const r = spawnSync('git', args, {
    cwd: REPO,
    encoding: 'utf8',
    timeout: opts.timeout || GIT_TIMEOUT_MS,
    windowsHide: true,
    maxBuffer: 64 * 1024 * 1024,
    // Never sit waiting for a credential prompt or a pager at 23:45.
    env: Object.assign({}, process.env, {
      GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never', GIT_PAGER: 'cat', PAGER: 'cat'
    })
  });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  return {
    ok: !r.error && r.status === 0,
    status: r.status,
    timedOut: timedOut,
    out: (r.stdout || '').trim(),
    err: ((r.stderr || '') + (r.error && !timedOut ? ' ' + r.error.message : '')).trim()
  };
}

function gitDir(kind) {
  const r = git(['rev-parse', kind === 'common' ? '--git-common-dir' : '--absolute-git-dir']);
  if (!r.ok) fail('not a git repository: ' + REPO + ' (' + r.err + ')');
  return path.resolve(REPO, r.out);
}

// Every lock this job could own that exists right now: { path: mtimeMs }.
function existingLocks() {
  const found = {};
  const dirs = Array.from(new Set([gitDir('worktree'), gitDir('common')]));
  dirs.forEach(function (dir) {
    OWN_LOCKS.forEach(function (rel) {
      const p = path.join(dir, rel);
      try { found[p] = fs.statSync(p).mtimeMs; } catch (e) { /* absent */ }
    });
    try {
      fs.readdirSync(dir).forEach(function (f) {
        if (/^next-index-\d+\.lock$/.test(f)) {
          const p = path.join(dir, f);
          try { found[p] = fs.statSync(p).mtimeMs; } catch (e) { /* raced away */ }
        }
      });
    } catch (e) { /* unreadable dir: nothing to report */ }
  });
  return found;
}

function gitProcessesRunning() {
  if (process.platform !== 'win32') {
    const r = spawnSync('pgrep', ['-x', 'git'], { encoding: 'utf8' });
    return r.status === 0 ? r.stdout.trim().split(/\s+/).length : 0;
  }
  const r = spawnSync('tasklist', ['/FI', 'IMAGENAME eq git.exe', '/NH', '/FO', 'CSV'],
    { encoding: 'utf8', windowsHide: true });
  return (r.stdout || '').split('\n').filter(function (l) { return /^"git\.exe"/i.test(l); }).length;
}

// Wait for a moment with no git.exe alive. The desktop app's own `git status`
// calls come and go within a second, so a short wait almost always finds one.
function waitForQuietGit() {
  const deadline = Date.now() + QUIET_WAIT_SECONDS * 1000;
  for (;;) {
    const n = gitProcessesRunning();
    if (n === 0) return true;
    if (Date.now() > deadline) return false;
    sleep(2000);
  }
}

// A synchronous sleep. (cmd's `timeout` refuses to run without a console, which
// is exactly how a scheduled task runs, so it would return at once and spin.)
function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function removeLocks(paths, why) {
  const removed = [], failed = [];
  paths.forEach(function (p) {
    try { fs.unlinkSync(p); removed.push(p); }
    catch (e) { if (e.code !== 'ENOENT') failed.push(p + ' (' + e.code + ')'); }
  });
  removed.forEach(function (p) { log('WARN', 'removed ' + why + ' lock ' + path.relative(REPO, p)); });
  return failed;
}

// ----------------------------------------------------------------- commands

// Clear stale locks, then fast-forward main. Safe to run any time.
function preflight() {
  log('INFO', 'preflight: ' + REPO);

  // Wait for a moment with no git.exe alive FIRST: the desktop app's own
  // `git status` holds index.lock for a few milliseconds, and that must not be
  // mistaken for a lock someone else is still using.
  if (!waitForQuietGit()) {
    fail('git.exe stayed busy for ' + QUIET_WAIT_SECONDS + 's; not touching any lock or running git');
  }
  const locks = existingLocks();
  const paths = Object.keys(locks);
  if (paths.length) {
    const now = Date.now();
    const rel = function (p) { return path.relative(REPO, p); };
    const stale = paths.filter(function (p) { return now - locks[p] > STALE_MINUTES * 60 * 1000; });
    const fresh = paths.filter(function (p) { return stale.indexOf(p) === -1; });
    if (fresh.length) {
      // No git is running, yet the lock is minutes old at most: something died
      // very recently. Leave it; the next run will find it stale and clear it.
      fail('lock file(s) younger than ' + STALE_MINUTES + ' min with no git running; left ' +
        'alone this time: ' + fresh.map(rel).join(', '));
    }
    const failed = removeLocks(stale, 'stale (> ' + STALE_MINUTES + ' min, no git running)');
    if (failed.length) fail('could not remove stale lock(s): ' + failed.join(', '));
  } else {
    log('INFO', 'no lock files');
  }

  const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
  if (branch.out !== 'main') fail('expected branch main, found ' + branch.out);

  // A daily-log commit whose push failed last time: push it before pulling.
  git(['fetch', '-q', 'origin', 'main']);
  const ahead = git(['rev-list', '--count', 'origin/main..HEAD']).out;
  if (ahead !== '0') {
    log('WARN', ahead + ' local commit(s) not on origin/main; pushing them first');
    const p = git(['push', 'origin', 'HEAD:main']);
    if (!p.ok) fail('push of the pending commit(s) failed: ' + (p.timedOut ? 'timed out' : p.err));
  }

  const pull = git(['pull', '--ff-only', '-q', 'origin', 'main']);
  if (!pull.ok) {
    // Uncommitted work in the checkout (an interactive session's) can block a
    // fast-forward; the task carries on with what is present, as before.
    log('WARN', 'pull --ff-only did not complete (' + (pull.timedOut ? 'timed out' : pull.err.split('\n')[0]) +
      '); continuing with the local copy');
  } else {
    log('INFO', 'main is up to date with origin');
  }

  const dirty = git(['status', '--porcelain', '--', 'daily_log.md']).out;
  if (dirty) log('WARN', 'daily_log.md already has uncommitted changes before this run: ' + dirty);
  log('OK', 'preflight done');
}

// Local calendar date, YYYY-MM-DD.
function ymd(d) {
  const p = (n) => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}

function dayCommits(day) {
  const r = git(['log', '--since=' + day + ' 00:00', '--until=' + day + ' 23:59:59',
    '--date=local', '--format=%H%x09%s']);
  if (!r.ok) fail('git log failed for ' + day + ': ' + r.err);
  return r.out ? r.out.split('\n').filter(function (l) {
    return !/^\S+\t\s*Update daily log/.test(l);
  }) : [];
}

// The primary day (today, or yesterday when a run slips past midnight into the
// morning) plus any of the last 7 days with commits but no heading yet.
function plan() {
  const now = new Date();
  const primaryDate = new Date(now);
  if (now.getHours() < 12) primaryDate.setDate(primaryDate.getDate() - 1);
  const primary = ymd(primaryDate);

  let text = '';
  try { text = fs.readFileSync(path.join(REPO, 'daily_log.md'), 'utf8'); }
  catch (e) { fail('cannot read daily_log.md: ' + e.message); }
  const has = function (day) { return new RegExp('^## ' + day + '\\s*$', 'm').test(text); };

  const days = [];
  for (let i = 7; i >= 0; i--) {
    const d = new Date(primaryDate);
    d.setDate(d.getDate() - i);
    const day = ymd(d);
    if (has(day)) continue;
    const n = dayCommits(day).length;
    if (n > 0) days.push({ day: day, commits: n });
  }

  console.log('PRIMARY_DAY ' + primary);
  if (!days.length) console.log('NOTHING_TO_LOG');
  days.forEach(function (d) { console.log('LOG_DAY ' + d.day + ' ' + d.commits + ' commit(s)'); });
  log('INFO', 'plan: primary ' + primary + '; to log: ' + (days.map(function (d) { return d.day; }).join(', ') || 'nothing'));
}

function showLog(day) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day || '')) fail('log needs a date, YYYY-MM-DD');
  const hashes = dayCommits(day).map(function (l) { return l.split('\t')[0]; });
  if (!hashes.length) { console.log('No commits on ' + day + ' (excluding daily-log commits).'); return; }
  // Exactly these commits, oldest first, each with its --stat (as the task's
  // instructions always asked for).
  const r = git(['log', '--no-walk=unsorted', '--stat', '--date=local', '--pretty=fuller'].concat(hashes.reverse()));
  if (!r.ok) fail('git show failed for ' + day + ': ' + r.err);
  console.log(r.out);
}

function commitAndPush(message) {
  if (!message || !/^Update daily log for /.test(message)) {
    fail('commit message must start with "Update daily log for " (got: ' + (message || 'nothing') + ')');
  }

  const changed = git(['status', '--porcelain', '--', 'daily_log.md']).out;
  if (!changed) { log('INFO', 'daily_log.md unchanged: nothing to commit'); return; }

  // Something else staged would ride along with a plain commit; `commit --only`
  // below takes daily_log.md alone, but say so if the index isn't clean.
  const staged = git(['diff', '--cached', '--name-only']).out.split('\n').filter(function (f) {
    return f && f !== 'daily_log.md';
  });
  if (staged.length) log('WARN', 'other staged files left untouched: ' + staged.join(', '));

  if (!waitForQuietGit()) fail('git.exe stayed busy for ' + QUIET_WAIT_SECONDS + 's; not committing');
  const before = existingLocks();
  if (Object.keys(before).length) {
    fail('lock file(s) present right before committing (run preflight first): ' +
      Object.keys(before).map(function (p) { return path.relative(REPO, p); }).join(', '));
  }

  const c = git(['commit', '--only', '-m', message, '--', 'daily_log.md']);
  if (!c.ok) {
    // Whatever this run's own git left behind goes; nothing older is touched.
    const mine = Object.keys(existingLocks()).filter(function (p) { return !(p in before); });
    if (mine.length && waitForQuietGit()) removeLocks(mine, 'left by this failed commit');
    fail('git commit failed: ' + (c.timedOut ? 'timed out after ' + GIT_TIMEOUT_MS / 1000 + 's' : c.err));
  }
  const sha = git(['rev-parse', '--short', 'HEAD']).out;
  log('OK', 'committed ' + sha + ' "' + message + '"');

  // A commit that cannot be pushed stays local and is pushed by the next
  // preflight; it is reported now rather than discovered later.
  const p = git(['push', 'origin', 'HEAD:main']);
  if (!p.ok) fail('committed ' + sha + ' but push failed: ' + (p.timedOut ? 'timed out' : p.err));
  log('OK', 'pushed ' + sha + ' to origin/main');

  const left = Object.keys(existingLocks());
  if (left.length) fail('commit and push succeeded but lock file(s) remain: ' + left.join(', '));
}

// ---------------------------------------------------------------------- main

const cmd = process.argv[2];
try {
  if (cmd === 'preflight') preflight();
  else if (cmd === 'plan') plan();
  else if (cmd === 'log') showLog(process.argv[3]);
  else if (cmd === 'commit') commitAndPush(process.argv[3]);
  else {
    console.log('usage: node tools/daily_log_git.js preflight | plan | log <YYYY-MM-DD> | commit "<message>"');
    process.exit(2);
  }
} catch (e) {
  fail('unexpected error in ' + cmd + ': ' + (e && e.stack || e));
}
