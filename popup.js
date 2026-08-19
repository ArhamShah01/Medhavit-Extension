// MedhaVIT Proctor Guard - Popup Logic

document.addEventListener('DOMContentLoaded', () => {
  const statusCard = document.getElementById('status-card')
  const statusIcon = document.getElementById('status-icon')
  const statusText = document.getElementById('status-text')
  const detailsBox = document.getElementById('details-box')
  const extCount = document.getElementById('ext-count')
  const extList = document.getElementById('ext-list')
  const refreshBtn = document.getElementById('refresh-btn')

  function checkStatus() {
    statusCard.className = 'status-card loading'
    statusIcon.textContent = '🔄'
    statusText.textContent = 'Scanning extensions...'
    detailsBox.classList.add('hidden')
    extList.innerHTML = ''

    chrome.runtime.sendMessage({ action: 'CHECK_EXTENSIONS' }, (response) => {
      if (chrome.runtime.lastError || !response) {
        statusCard.className = 'status-card blocked'
        statusIcon.textContent = '⚠️'
        statusText.textContent = 'Error scanning system'
        return
      }

      if (response.status === 'PASSED') {
        statusCard.className = 'status-card passed'
        statusIcon.textContent = '✅'
        statusText.textContent = 'System Exam Ready! (0 Extensions)'
        detailsBox.classList.add('hidden')
      } else {
        statusCard.className = 'status-card blocked'
        statusIcon.textContent = '🛑'
        statusText.textContent = `${response.count} Extension(s) Active!`

        extCount.textContent = response.count
        response.activeExtensions.forEach(ext => {
          const li = document.createElement('li')
          li.textContent = ext.name
          extList.appendChild(li)
        })
        detailsBox.classList.remove('hidden')
      }
    })
  }

  refreshBtn.addEventListener('click', checkStatus)
  checkStatus()
})
