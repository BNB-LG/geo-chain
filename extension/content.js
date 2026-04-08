/**
 * GEO-Chain Content Script
 * Injects GEO Score badges on four.meme project cards.
 * MVP: uses mock data, Shadow DOM isolation, MutationObserver for SPA.
 */

(function () {
  'use strict';

  // ─── Configuration ───────────────────────────────────────────────
  const GEO_APP_URL = 'https://geo-chain.vercel.app';
  const BADGE_ATTR = 'data-geo-badge';
  const SCAN_INTERVAL_MS = 3000;
  const ENGINES = ['ChatGPT', 'Perplexity', 'Gemini', 'Grok'];

  // ─── Mock Data Generator ─────────────────────────────────────────
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateMockData(projectId) {
    const scores = {};
    ENGINES.forEach((engine) => {
      scores[engine] = randomInt(20, 95);
    });
    const overall = Math.round(
      ENGINES.reduce((sum, e) => sum + scores[e], 0) / ENGINES.length
    );
    const weakest = ENGINES.reduce((a, b) =>
      scores[a] < scores[b] ? a : b
    );
    let finding = '';
    if (scores[weakest] < 40) {
      finding = `${weakest}: Not Found`;
    } else if (scores[weakest] < 60) {
      finding = `${weakest}: outdated info`;
    } else {
      finding = `${weakest}: weak coverage`;
    }
    return { overall, scores, finding, projectId };
  }

  // ─── Color helpers ───────────────────────────────────────────────
  function scoreColor(score) {
    if (score >= 70) return '#00b894';
    if (score >= 50) return '#fdcb6e';
    return '#d63031';
  }

  function scoreLabel(score) {
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  }

  function barColor(score) {
    if (score >= 70) return '#00b894';
    if (score >= 50) return '#fdcb6e';
    return '#d63031';
  }

  // ─── Tooltip (hover card) HTML ───────────────────────────────────
  function buildTooltipHTML(data) {
    const engineBars = ENGINES.map((engine) => {
      const s = data.scores[engine];
      const pct = Math.max(0, Math.min(100, s));
      return `
        <div class="geo-engine-row">
          <span class="geo-engine-name">${engine}</span>
          <div class="geo-bar-track">
            <div class="geo-bar-fill" style="width:${pct}%;background:${barColor(s)}"></div>
          </div>
          <span class="geo-engine-score">${s}</span>
        </div>`;
    }).join('');

    return `
      <div class="geo-tooltip">
        <div class="geo-tooltip-header">
          <span class="geo-tooltip-icon">&#x1F50D;</span>
          <span class="geo-tooltip-title">GEO-Chain Score</span>
        </div>
        <div class="geo-tooltip-score-section">
          <span class="geo-tooltip-big-score" style="color:${scoreColor(data.overall)}">${data.overall}</span>
          <span class="geo-tooltip-label" style="color:${scoreColor(data.overall)}">${scoreLabel(data.overall)}</span>
        </div>
        <div class="geo-engines">${engineBars}</div>
        <div class="geo-finding">
          <span class="geo-finding-icon">&#x26A0;</span>
          <span>${data.finding}</span>
        </div>
        <a class="geo-report-link" href="${GEO_APP_URL}/report/${data.projectId || 'demo'}" target="_blank" rel="noopener">
          View Full Report &rarr;
        </a>
      </div>`;
  }

  // ─── Shadow DOM styles ───────────────────────────────────────────
  function getStyles() {
    return `
      :host {
        display: inline-block;
        position: relative;
        z-index: 99999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.4;
      }

      .geo-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        color: #fff;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        box-shadow: 0 2px 6px rgba(0,0,0,0.18);
        user-select: none;
        flex-shrink: 0;
      }

      .geo-badge:hover {
        transform: scale(1.15);
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      }

      .geo-tooltip {
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        width: 260px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.18);
        padding: 16px;
        display: none;
        z-index: 100000;
        color: #2d3436;
        font-size: 13px;
      }

      .geo-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: #fff;
      }

      :host(:hover) .geo-tooltip,
      .geo-badge:focus + .geo-tooltip {
        display: block;
      }

      .geo-tooltip-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 12px;
      }

      .geo-tooltip-icon {
        font-size: 14px;
      }

      .geo-tooltip-title {
        font-weight: 700;
        font-size: 13px;
        color: #2d3436;
      }

      .geo-tooltip-score-section {
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin-bottom: 14px;
      }

      .geo-tooltip-big-score {
        font-size: 36px;
        font-weight: 800;
        line-height: 1;
      }

      .geo-tooltip-label {
        font-size: 14px;
        font-weight: 600;
      }

      .geo-engines {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 12px;
      }

      .geo-engine-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .geo-engine-name {
        width: 72px;
        font-size: 12px;
        color: #636e72;
        flex-shrink: 0;
      }

      .geo-bar-track {
        flex: 1;
        height: 6px;
        background: #dfe6e9;
        border-radius: 3px;
        overflow: hidden;
      }

      .geo-bar-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.3s ease;
      }

      .geo-engine-score {
        width: 24px;
        text-align: right;
        font-size: 12px;
        font-weight: 600;
        color: #2d3436;
      }

      .geo-finding {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 10px;
        background: #ffeaa7;
        border-radius: 6px;
        font-size: 12px;
        color: #2d3436;
        margin-bottom: 12px;
      }

      .geo-finding-icon {
        font-size: 13px;
      }

      .geo-report-link {
        display: block;
        text-align: center;
        padding: 8px;
        background: #6c5ce7;
        color: #fff;
        border-radius: 8px;
        text-decoration: none;
        font-size: 13px;
        font-weight: 600;
        transition: background 0.15s ease;
      }

      .geo-report-link:hover {
        background: #5a4bd1;
      }
    `;
  }

  // ─── Badge creation ──────────────────────────────────────────────
  function createBadge(data) {
    const host = document.createElement('geo-chain-badge');
    host.setAttribute(BADGE_ATTR, 'true');
    host.style.cssText = 'display:inline-flex;vertical-align:middle;margin-left:6px;position:relative;';

    const shadow = host.attachShadow({ mode: 'closed' });

    const style = document.createElement('style');
    style.textContent = getStyles();
    shadow.appendChild(style);

    const badge = document.createElement('div');
    badge.className = 'geo-badge';
    badge.style.background = scoreColor(data.overall);
    badge.textContent = data.overall;
    badge.tabIndex = 0;
    badge.setAttribute('aria-label', `GEO Score: ${data.overall}`);
    shadow.appendChild(badge);

    const tooltipContainer = document.createElement('div');
    tooltipContainer.innerHTML = buildTooltipHTML(data);
    shadow.appendChild(tooltipContainer.firstElementChild);

    return host;
  }

  // ─── Card detection heuristics ───────────────────────────────────
  // four.meme uses dynamic class names. We use multiple strategies to
  // find project cards: look for links to twitter/x.com, anchor tags
  // with token addresses, or common card-like containers.

  function findProjectCards() {
    const cards = new Set();

    // Strategy 1: Cards containing twitter.com or x.com links
    document.querySelectorAll('a[href*="twitter.com"], a[href*="x.com"]').forEach((link) => {
      const card = link.closest('[class*="card"], [class*="Card"], [class*="item"], [class*="Item"], [class*="token"], [class*="Token"], [class*="project"], [class*="Project"], div[class]');
      if (card && !card.querySelector(`[${BADGE_ATTR}]`)) {
        cards.add(card);
      }
    });

    // Strategy 2: Cards with external links (websites)
    document.querySelectorAll('a[href^="http"]:not([href*="four.meme"])').forEach((link) => {
      const card = link.closest('[class*="card"], [class*="Card"], [class*="item"], [class*="Item"], [class*="token"], [class*="Token"], div[class]');
      if (card && card.textContent.length > 20 && !card.querySelector(`[${BADGE_ATTR}]`)) {
        cards.add(card);
      }
    });

    // Strategy 3: Look for common meme token card patterns
    // Cards typically have images + text + social links
    document.querySelectorAll('[class*="card"], [class*="Card"]').forEach((el) => {
      if (el.querySelector('img') && el.textContent.length > 10 && !el.querySelector(`[${BADGE_ATTR}]`)) {
        cards.add(el);
      }
    });

    return Array.from(cards);
  }

  // ─── Injection logic ─────────────────────────────────────────────
  function extractProjectId(card) {
    // Try to extract an identifier from the card
    const link = card.querySelector('a[href*="token"], a[href*="detail"], a[href]');
    if (link) {
      const href = link.getAttribute('href') || '';
      const match = href.match(/(?:token|detail|0x)[\/=]?([a-zA-Z0-9]+)/);
      if (match) return match[1].substring(0, 12);
    }
    // Fallback: hash the text content
    const text = card.textContent.trim().substring(0, 30);
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
    }
    return 'proj_' + Math.abs(hash).toString(36);
  }

  function injectBadges() {
    const cards = findProjectCards();
    cards.forEach((card) => {
      if (card.querySelector(`[${BADGE_ATTR}]`)) return;

      const projectId = extractProjectId(card);
      const data = generateMockData(projectId);
      const badge = createBadge(data);

      // Find a good injection point: near social links or at the top-right
      const socialLink = card.querySelector('a[href*="twitter.com"], a[href*="x.com"]');
      if (socialLink && socialLink.parentElement) {
        socialLink.parentElement.style.position = 'relative';
        socialLink.parentElement.appendChild(badge);
      } else {
        // Fallback: inject at the top of the card
        card.style.position = 'relative';
        badge.style.cssText += 'position:absolute;top:8px;right:8px;z-index:9999;';
        card.appendChild(badge);
      }
    });
  }

  // ─── Enable / Disable via storage ────────────────────────────────
  let enabled = true;

  function checkEnabled(callback) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get('geoChainEnabled', (result) => {
        enabled = result.geoChainEnabled !== false; // default true
        callback();
      });
    } else {
      callback();
    }
  }

  // Listen for toggle messages from popup
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === 'GEO_TOGGLE') {
        enabled = msg.enabled;
        if (!enabled) {
          // Remove all badges
          document.querySelectorAll(`[${BADGE_ATTR}]`).forEach((el) => el.remove());
        } else {
          injectBadges();
        }
      }
    });
  }

  // ─── MutationObserver for SPA navigation ─────────────────────────
  function startObserver() {
    const observer = new MutationObserver(() => {
      if (enabled) injectBadges();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    return observer;
  }

  // ─── Init ────────────────────────────────────────────────────────
  function init() {
    checkEnabled(() => {
      if (!enabled) return;
      // Initial scan
      injectBadges();
      // Watch for SPA DOM changes
      startObserver();
      // Periodic re-scan as safety net
      setInterval(() => {
        if (enabled) injectBadges();
      }, SCAN_INTERVAL_MS);
    });
  }

  // Wait for body to be ready
  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
