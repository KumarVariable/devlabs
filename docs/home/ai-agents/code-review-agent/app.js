// Helpers
function $(id) {
  return document.getElementById(id);
}
function setText(id, txt) {
  const el = $(id);
  if (el) el.textContent = txt;
}
function getCtxParam() {
  return new URLSearchParams(location.search).get("ctx") || "";
}
function fromBase64Url(b64u) {
  if (!b64u) return "";
  const pad = "=".repeat((4 - (b64u.length % 4)) % 4);
  const b64 = b64u.replace(/-/g, "+").replace(/_/g, "/") + pad;
  try {
    return atob(b64);
  } catch {
    return "";
  }
}

// Restore saved inputs (optional convenience)
(function restoreInputs() {
  const u = localStorage.getItem("bitoUserId") || "";
  const w = localStorage.getItem("bitoWorkspaceId") || "";
  if ($("bitoUser")) $("bitoUser").value = u;
  if ($("bitoWorkspace")) $("bitoWorkspace").value = w;
})();

// Parse ctx and display
(function showCtx() {
  const raw = getCtxParam();
  if (!raw) {
    setText("ctxStatus", "No ctx param found.");
    return;
  }
  setText("ctxStatus", "ctx received.");
  const jsonText = fromBase64Url(raw);
  try {
    const obj = JSON.parse(jsonText);
    $("ctxOut").textContent = JSON.stringify(obj, null, 2);
  } catch {
    setText("ctxStatus", "Invalid ctx payload.");
    $("ctxOut").textContent = "{}";
  }
})();

// Button: just persist the inputs for now (no network)
document.addEventListener("DOMContentLoaded", () => {
  $("bbAppBtn").addEventListener("click", () => {
    const u = $("bitoUser").value.trim();
    const w = $("bitoWorkspace").value.trim();
    localStorage.setItem("bitoUserId", u);
    localStorage.setItem("bitoWorkspaceId", w);
    setText("saveNote", "Saved locally.");
    setTimeout(() => setText("saveNote", ""), 1500);
  });
});
