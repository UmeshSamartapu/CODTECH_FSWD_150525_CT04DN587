let activeTabId = null;
let activeStartTime = null;

chrome.tabs.onActivated.addListener((activeInfo) => {
  // 🕒 Track time spent on previous tab
  if (activeTabId !== null && activeStartTime !== null) {
    const timeSpent = Date.now() - activeStartTime;

    chrome.tabs.get(activeTabId, (tab) => {
      if (chrome.runtime.lastError || !tab || !tab.url) {
        console.warn("Tab error:", chrome.runtime.lastError?.message || "No tab found");
        return;
      }

      // 🧼 Skip internal Chrome pages
      if (!tab.url.startsWith("chrome://")) {
        try {
          const hostname = new URL(tab.url).hostname;
          sendToBackend(hostname, timeSpent);
        } catch (err) {
          console.error("Invalid tab URL:", tab.url);
        }
      }
    });
  }

  // 🆕 Track the newly activated tab
  activeTabId = activeInfo.tabId;
  activeStartTime = Date.now();
});

// ✅ Function to send data to backend server
function sendToBackend(hostname, timeSpent) {
  fetch("http://localhost:5000/api/tracker", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "guestUser",
      hostname,
      timeSpent,
    }),
  }).catch((err) => console.error("Backend error:", err));
}
