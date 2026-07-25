/* ============================================================
   RTT/1 — Patch-Apply Engine (Web Worker)
   File: assets/js/rtt1.worker.patch.js
   Session: rtt=1 | coherence=declared | drift=bounded
   ============================================================ */

/**
 * Apply a patch object to a target JSON structure.
 * Patch format:
 *   {
 *     "path.to.key": { type: "add" | "remove" | "change", before, after },
 *     ...
 *   }
 */

function setAtPath(target, path, value) {
  const parts = path.split(".");
  let obj = target;

  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const isIndex = /^\d+$/.test(key);

    if (isIndex) {
      const idx = Number(key);
      if (!Array.isArray(obj)) obj = obj[parts[i - 1]] = [];
      if (obj[idx] === undefined) obj[idx] = {};
      obj = obj[idx];
    } else {
      if (obj[key] === undefined || obj[key] === null) obj[key] = {};
      obj = obj[key];
    }
  }

  const last = parts[parts.length - 1];
  const isIndex = /^\d+$/.test(last);

  if (isIndex) {
    const idx = Number(last);
    if (!Array.isArray(obj)) obj = [];
    obj[idx] = value;
  } else {
    obj[last] = value;
  }
}

function deleteAtPath(target, path) {
  const parts = path.split(".");
  let obj = target;

  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const isIndex = /^\d+$/.test(key);
    obj = isIndex ? obj[Number(key)] : obj[key];
    if (obj === undefined || obj === null) return;
  }

  const last = parts[parts.length - 1];
  const isIndex = /^\d+$/.test(last);

  if (isIndex && Array.isArray(obj)) {
    obj.splice(Number(last), 1);
  } else {
    delete obj[last];
  }
}

function applyPatch(target, patch) {
  const result = JSON.parse(JSON.stringify(target || {}));

  for (const path of Object.keys(patch)) {
    const entry = patch[path];

    if (entry.type === "add" || entry.type === "change") {
      setAtPath(result, path, entry.after);
    } else if (entry.type === "remove") {
      deleteAtPath(result, path);
    }
  }

  return result;
}

/**
 * Worker message handler
 * Commands:
 *   - { type: "apply-patch", target, patch }
 *   - { type: "snapshot-apply-patch", snapshot, patch }
 */

self.onmessage = (event) => {
  const { type, target, patch, snapshot } = event.data;

  try {
    if (type === "apply-patch") {
      const result = applyPatch(target, patch);
      self.postMessage({
        ok: true,
        mode: "apply-patch",
        result
      });
      return;
    }

    if (type === "snapshot-apply-patch") {
      const result = applyPatch(snapshot, patch);
      self.postMessage({
        ok: true,
        mode: "snapshot-apply-patch",
        result
      });
      return;
    }

    self.postMessage({
      ok: false,
      error: `Unknown worker command: ${type}`
    });
  } catch (err) {
    self.postMessage({
      ok: false,
      error: err.message || String(err)
    });
  }
};

