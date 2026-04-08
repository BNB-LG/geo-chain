/**
 * GEO-Chain Popup Script
 */
(function () {
  'use strict';

  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const toggleSwitch = document.getElementById('toggleSwitch');

  // Check if current tab is on four.meme
  function checkCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const url = tab ? tab.url || '' : '';
      const isActive = url.includes('four.meme');

      if (isActive) {
        statusDot.classList.add('active');
        statusDot.classList.remove('inactive');
        statusText.textContent = 'Active on four.meme';
      } else {
        statusDot.classList.add('inactive');
        statusDot.classList.remove('active');
        statusText.textContent = 'Not active (visit four.meme)';
      }
    });
  }

  // Load saved state
  function loadState() {
    chrome.storage.local.get('geoChainEnabled', (result) => {
      const isEnabled = result.geoChainEnabled !== false;
      toggleSwitch.checked = isEnabled;
    });
  }

  // Toggle handler
  toggleSwitch.addEventListener('change', () => {
    const isEnabled = toggleSwitch.checked;
    chrome.storage.local.set({ geoChainEnabled: isEnabled });

    // Notify content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'GEO_TOGGLE',
          enabled: isEnabled,
        }).catch(() => {
          // Tab might not have content script loaded
        });
      }
    });
  });

  checkCurrentTab();
  loadState();
})();
