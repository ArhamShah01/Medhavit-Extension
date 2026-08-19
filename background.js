// MedhaVIT Proctor Guard - Background Service Worker (Manifest V3)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'CHECK_EXTENSIONS') {
    const selfId = chrome.runtime.id

    chrome.management.getAll((extensions) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          status: 'ERROR',
          message: chrome.runtime.lastError.message
        })
        return
      }

      // Filter for active/enabled 3rd party browser extensions excluding MedhaVIT itself & browser system add-ons
      const activeThirdParty = (extensions || []).filter(ext => {
        // Must be enabled
        if (!ext.enabled) return false
        // Exclude self (MedhaVIT Proctor Guard)
        if (ext.id === selfId) return false
        // Exclude web apps / packaged apps
        if (ext.isApp) return false
        // Exclude browser themes
        if (ext.type === 'theme') return false

        // Built-in browser features that cannot be disabled by users
        if (ext.mayDisable === false) return false

        // Browser internal component extensions (Chrome / Brave / Edge internal components)
        if (ext.installType === 'other') return false

        const extId = (ext.id || '').toLowerCase()
        const extName = (ext.name || '').toLowerCase()

        // Exclude Brave built-in browser components & features (Brave Shields, Rewards, Wallet, News, etc.)
        if (
          extName.includes('brave') ||
          extId.includes('brave') ||
          extName === 'shields' ||
          extName === 'rewards' ||
          extName === 'wallet'
        ) {
          return false
        }

        // Exclude Chromium / Chrome core system & default component add-ons
        if (
          extName.includes('google docs offline') ||
          extName.includes('chrome web store') ||
          extName.includes('crypto token') ||
          extName.includes('pdf viewer') ||
          extName.includes('google pay') ||
          extName.includes('chromium')
        ) {
          return false
        }

        // Exclude core Mozilla system add-ons only
        if (
          extId.endsWith('@mozilla.org') ||
          extId.endsWith('@mozilla.com') ||
          extId.endsWith('@search.mozilla.org') ||
          extId.endsWith('@shield.mozilla.org') ||
          extId.endsWith('@pioneer.mozilla.org') ||
          extName === 'new tab' ||
          extName === 'web compatibility' ||
          extName === 'firefox screenshots' ||
          extName === 'form autofill'
        ) {
          return false
        }

        return true
      })

      sendResponse({
        status: activeThirdParty.length === 0 ? 'PASSED' : 'BLOCKED',
        count: activeThirdParty.length,
        activeExtensions: activeThirdParty.map(e => ({
          id: e.id,
          name: e.name
        }))
      })
    })

    // Return true to indicate asynchronous sendResponse
    return true
  }
})
