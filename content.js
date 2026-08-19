// MedhaVIT Proctor Guard - Content Script Bridge

// Mark extension presence in DOM for instant detection
if (document.documentElement) {
  document.documentElement.dataset.medhavitGuardInstalled = "true"
}

// Bi-directional message listener for MedhaVIT Web App
window.addEventListener('message', (event) => {
  if (event.source !== window) return
  
  if (event.data && event.data.type === 'MEDHAVIT_PROCTOR_PING') {
    const nonce = event.data.nonce

    chrome.runtime.sendMessage({ action: 'CHECK_EXTENSIONS' }, (response) => {
      if (chrome.runtime.lastError) {
        window.postMessage({
          type: 'MEDHAVIT_PROCTOR_PONG',
          status: 'ERROR',
          nonce,
          error: chrome.runtime.lastError.message
        }, '*')
        return
      }

      window.postMessage({
        type: 'MEDHAVIT_PROCTOR_PONG',
        status: response?.status || 'UNKNOWN',
        count: response?.count || 0,
        activeExtensions: response?.activeExtensions || [],
        nonce
      }, '*')
    })
  }
})
