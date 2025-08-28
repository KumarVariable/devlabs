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

// Button:
document.addEventListener("DOMContentLoaded", () => {
  $("bbAppBtn").addEventListener("click", () => {
    const bitoUserId = ($("bitoUser").value || "").trim();
    const bitoWorkspaceId = ($("bitoWorkspace").value || "").trim();

    if (!bitoUserId || !bitoWorkspaceId) {
      setText("saveNote", "Enter both User ID and Workspace ID.");
      return;
    }

    const statePayload = {
      user_id: Number(bitoUserId),
      workspace_id: Number(bitoWorkspaceId),
      source: "web-ui"
    };

    const json = JSON.stringify(statePayload);
    const b64 = btoa(encodeURIComponent(json));

    const qs = new URLSearchParams(location.search);
    const clientKey = qs.get("clientKey") || "";

    const CALLBACK_URL = "https://staging.bito.ai/agent-integration/int/api/v1/oauth/bitbucket/callback";
    const url =
      `${CALLBACK_URL}?state=${encodeURIComponent(b64)}` +
      (clientKey ? `&clientKey=${encodeURIComponent(clientKey)}` : "");

    // persist inputs
    localStorage.setItem("bitoUserId", bitoUserId);
    localStorage.setItem("bitoWorkspaceId", bitoWorkspaceId);

    window.location.href = url;
  });
});

