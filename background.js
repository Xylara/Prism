// i think these are the most common UA's
const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
];

let pageUserAgents = {};

function getRandomUA(tabId) {
  if (!pageUserAgents[tabId]) {
    pageUserAgents[tabId] = userAgents[Math.floor(Math.random() * userAgents.length)];
  }
  return pageUserAgents[tabId];
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    let userAgent = getRandomUA(details.tabId);
    let platform = '';

    if (userAgent.includes("Windows NT 10.0")) {
      platform = "Win32";
    } else if (userAgent.includes("X11")) {
      platform = "Linux x86_64";
    } else if (userAgent.includes("Macintosh")) {
      platform = "Macintosh";
    } else {
      platform = '';
    }

    for (let i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        details.requestHeaders[i].value = userAgent;
        break;
      }
    }

    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]
);

chrome.tabs.onRemoved.addListener((tabId) => {
  delete pageUserAgents[tabId];
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getNavigator") {
    let userAgent = getRandomUA(sender.tab.id);
    let platform = '';

    if (userAgent.includes("Windows NT 10.0")) {
      platform = "Win32";
    } else if (userAgent.includes("X11")) {
      platform = "Linux x86_64";
    } else if (userAgent.includes("Macintosh")) {
      platform = "Macintosh";
    } else {
      platform = '';
    }

    sendResponse({ userAgent: userAgent, platform: platform });
  }
});
