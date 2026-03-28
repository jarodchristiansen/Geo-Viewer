/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

// #region agent log
const projectRoot = path.join(__dirname, "..");
const logPath = path.join(projectRoot, "debug-b4e189.log");
const popperRoot = path.join(projectRoot, "node_modules", "@popperjs", "core");
const listScrollPath = path.join(
  popperRoot,
  "lib",
  "dom-utils",
  "listScrollParents.js"
);
const createPopperPath = path.join(popperRoot, "lib", "createPopper.js");
const pkgPath = path.join(popperRoot, "package.json");
let pkg = null;
try {
  if (fs.existsSync(pkgPath)) {
    pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  }
} catch (_) {
  pkg = null;
}
let domUtilsJsCount = -1;
const domUtilsDir = path.join(popperRoot, "lib", "dom-utils");
if (fs.existsSync(domUtilsDir)) {
  domUtilsJsCount = fs
    .readdirSync(domUtilsDir)
    .filter((f) => f.endsWith(".js") && !f.endsWith(".flow.js")).length;
}
const data = {
  hypothesisA_corruptPartialInstall:
    fs.existsSync(createPopperPath) && !fs.existsSync(listScrollPath),
  hypothesisB_createPopperReferencesFile: fs.existsSync(createPopperPath)
    ? fs.readFileSync(createPopperPath, "utf8").includes("listScrollParents")
    : null,
  hypothesisC_packageVersion: pkg && pkg.version,
  listScrollExists: fs.existsSync(listScrollPath),
  domUtilsPlainJsFileCount: domUtilsJsCount,
};
const payload = {
  sessionId: "b4e189",
  runId: process.env.DEBUG_RUN_ID || "probe",
  hypothesisId: "A",
  location: "scripts/verify-popper-debug.cjs",
  message: "probe @popperjs/core lib files on disk",
  data,
  timestamp: Date.now(),
};
fs.appendFileSync(logPath, `${JSON.stringify(payload)}\n`);
fetch("http://127.0.0.1:7846/ingest/ae43f3df-fde8-4522-8b61-6948498845be", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Debug-Session-Id": "b4e189",
  },
  body: JSON.stringify(payload),
}).catch(() => {});
console.log(JSON.stringify(data, null, 2));
// #endregion agent log
