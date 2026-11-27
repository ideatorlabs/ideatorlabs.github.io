/**
 * IDEATOR LABS — Global JavaScript Engine
 * Search index, interactive Value-at-Stake calculator, mobile navigation,
 * and accessible UI interactions.
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Mobile Drawer Navigation
  // -------------------------------------------------------------------------
  const navToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (navToggle && mobileDrawer) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // -------------------------------------------------------------------------
  // 2. Global Instant Search Index & Dialog
  // -------------------------------------------------------------------------
  const searchIndex = [
    // blog:start (written by scripts/build_blog.py)
    { title: "Blog", category: "Blog", url: "/blog/", desc: "Plain articles on AI, data, business intelligence and our sectors." },
    { title: "Innovation articles", category: "Blog", url: "/blog/innovation/", desc: "Picking, testing and shipping new tools without a big IT project, and knowing when not to." },
    { title: "QSR and caf\u00e9 chains articles", category: "Blog", url: "/blog/qsr-chains/", desc: "Running many outlets on the same numbers: stock variance, cash, audits and licences, outlet by outlet." },
    { title: "CA and accounting firms articles", category: "Blog", url: "/blog/ca-firms/", desc: "Where accounting practices lose hours to matching, re-typing and chasing, and how to win them back." },
    { title: "D2C brands articles", category: "Blog", url: "/blog/d2c/", desc: "The real margin on each order, after returns, shipping, fees and ads." },
    { title: "FurniTrail articles", category: "Blog", url: "/blog/furnitrail/", desc: "For furniture showroom owners: turning walk-in visitors into buyers with timely, personal follow-up." },
    { title: "Plumbline articles", category: "Blog", url: "/blog/plumbline/", desc: "For QSR and caf\u00e9 chain operators: audits, stock variance, cash and supply across every outlet, each issue closed with proof." },
    { title: "Chairside articles", category: "Blog", url: "/blog/chairside/", desc: "For salon and spa owners: packages, regular clients coming back on time, and commission everyone trusts." },
    { title: "Docketbox articles", category: "Blog", url: "/blog/docketbox/", desc: "For CA firms: every client deadline, paper and approval tracked until the return is filed." },
    { title: "Profora articles", category: "Blog", url: "/blog/profora/", desc: "For D2C founders: finding the products, campaigns and pincodes that lose money, and fixing them." },
    { title: "CareCadence articles", category: "Blog", url: "/blog/carecadence/", desc: "For private clinics: follow-up visits, unpaid balances and insurer claims that don't slip." },
    { title: "Cashtrail articles", category: "Blog", url: "/blog/cashtrail/", desc: "For credit teams at NBFCs and DSAs: reviewing bank statements quickly and catching tampering." },
    { title: "Taktline articles", category: "Blog", url: "/blog/taktline/", desc: "For plant owners and managers: machine stops, maintenance and stock tracked to a verified close." },
    { title: "FreightProof articles", category: "Blog", url: "/blog/freightproof/", desc: "For logistics and finance teams: checking transporter bills and recovering overcharges." },
    { title: "Where CA firms lose hours every week, and how AI gives them back", category: "Blog", url: "/blog/ca-firms-reclaim-hours-with-ai.html", desc: "The time goes into data work, not advice. Here is where it hides and how to win it back one task at a time." },
    { title: "Your D2C brand\u2019s real problem isn\u2019t ads, it\u2019s true margin per order", category: "Blog", url: "/blog/d2c-true-margin-per-order.html", desc: "Before you change the ads, find out what each order really leaves you with." },
    { title: "Why furniture showrooms lose walk-in buyers, and how to follow up", category: "Blog", url: "/blog/furnitrail/furniture-showroom-walk-in-follow-up.html", desc: "What to capture at the door, what to send, and when." },
    { title: "How to tell if a new tool will pay off in your business", category: "Blog", url: "/blog/evaluate-technology-for-your-business.html", desc: "A simple way to judge a tool against how things work today." },
    { title: "Why clinics lose follow-ups, balances and claims, and how to keep each one moving", category: "Blog", url: "/blog/carecadence/clinic-follow-ups-balances-claims.html", desc: "Give every recall, balance and claim an owner, a due date and proof, until a visit, payment or settlement closes it." },
    { title: "How credit teams spot edited bank statements before sanction", category: "Blog", url: "/blog/cashtrail/spot-edited-bank-statements-before-sanction.html", desc: "The checks that catch an edited statement, and the notes and sign-off that prove you ran them." },
    { title: "Why salons lose regular clients and money on packages and commission, and how to stop it", category: "Blog", url: "/blog/chairside/salon-packages-due-back-commission.html", desc: "Three leaks in one salon: clients who drift away, package uses nobody can prove, and commission argued at month-end." },
    { title: "How CA firms miss GST, TDS and ROC due dates, what it costs, and how to stop", category: "Blog", url: "/blog/docketbox/ca-firm-due-date-tracking-gst-tds-roc.html", desc: "What a late GST, TDS or ROC filing costs, and how firms keep every return on time." },
    { title: "How to audit freight bills before you pay a transporter", category: "Blog", url: "/blog/freightproof/freight-bill-audit-before-payment.html", desc: "Five places bills go wrong, how to check each one, and how to get overpayments back." },
    { title: "Where QSR chains lose money between outlets", category: "Blog", url: "/blog/plumbline/qsr-chain-money-leaks-between-outlets.html", desc: "Four leaks that show up outlet by outlet, and a weekly routine to catch each one." },
    { title: "Find the SKUs, ads and COD pincodes that lose money", category: "Blog", url: "/blog/profora/find-loss-making-skus-campaigns-cod-pincodes.html", desc: "Where a D2C brand loses money after returns, RTO, shipping and fees, and what to do about each." },
    { title: "Cut machine downtime and late deliveries", category: "Blog", url: "/blog/taktline/measure-machine-downtime-late-deliveries.html", desc: "What to log on the floor, what to review each week and what it costs, for plants that keep their books in Tally." },
    { title: "What is stock variance in a restaurant, and how do you work it out?", category: "Blog", url: "/blog/what-is-stock-variance-in-a-restaurant.html", desc: "The formula, a worked example, what causes the gap and how big is too big." },
    // blog:end
    { title: "Ideator Labs home", category: "Home", url: "/", desc: "A studio for AI and data advisory, innovation and business intelligence." },
    { title: "How we work", category: "Home", url: "/#approach", desc: "Research, then a small working prototype, then a product for that sector." },
    { title: "Products", category: "Products", url: "/products/", desc: "Products by sector: FurniTrail, Plumbline, Chairside, PollenRev, Docketbox, Profora, CareCadence, Cashtrail, Taktline and FreightProof." },
    { title: "FurniTrail demo", category: "Products", url: "/products/furnitrail/#demo", desc: "Book a demo and see FurniTrail with your own pieces, from walk-in to review." },
    { title: "PollenRev", category: "Products", url: "/products/pollenrev/", desc: "Sales software for small businesses: finds leads, writes outreach, tracks deals." },
    // products:start (written by scripts/product_pages.py)
    { title: "FurniTrail", category: "Products", url: "/products/furnitrail/", desc: "Showroom operations for furniture stores: quotations, follow-ups, advances, delivery jobs and service tickets, each with an owner, a deadline, proof and escalation." },
    { title: "Plumbline", category: "Products", url: "/products/plumbline/", desc: "Operations suite for QSR and café chains: audits and fixes, stock variance, cash and settlements, supply and dues, licences, training and guest feedback, each issue with an owner and proof." },
    { title: "Chairside", category: "Products", url: "/products/chairside/", desc: "For salon and spa chains: package uses confirmed by the client, a due-back list for the desk, commission from checked services, and a morning summary per outlet." },
    { title: "Docketbox", category: "Products", url: "/products/docketbox/", desc: "Compliance task tracker for CA firms: a task per client, return and period, statutory due dates, papers by link, partner approval, filing proof and escalation." },
    { title: "Profora", category: "Products", url: "/products/profora/", desc: "Profit leak tracking for D2C brands: loss-making products, campaigns and COD pincode areas, each with an owner, a deadline, proof of the fix and a measured payback." },
    { title: "CareCadence", category: "Products", url: "/products/carecadence/", desc: "Patient follow-up, unpaid balances and insurer claims for private clinics, each tracked with an owner, a due date and proof until a visit, payment or settlement closes it." },
    { title: "Cashtrail", category: "Products", url: "/products/cashtrail/", desc: "Statement review for NBFC and DSA credit teams: balance and tamper checks, flags cleared with notes, two-person sign-off and a report for the loan system." },
    { title: "Taktline", category: "Products", url: "/products/taktline/", desc: "Plant operations for manufacturers on Tally: machine stops, maintenance findings, reorders and late deliveries tracked to a verified close, with escalation to the owner." },
    { title: "FreightProof", category: "Products", url: "/products/freightproof/", desc: "Transporter bills checked against LRs and rate cards; each overcharge becomes a claim with an owner, a deadline and evidence, held back from payment until recovered." },
    // products:end
    { title: "Advisory", category: "Advisory", url: "/solutions/", desc: "A free 25-minute call, then a fixed-fee diagnostic that shows where time or margin is lost and what to fix first." },
    { title: "Sectors we work in", category: "Sectors", url: "/industries/", desc: "Retail, B2B companies and agencies, accounting and CA firms, D2C brands, and clinics." },
    { title: "Retail", category: "Sectors", url: "/industries/#retail", desc: "Showroom visitors who leave to think it over, and how FurniTrail follows them up through quotation, order and delivery." },
    { title: "B2B companies and agencies", category: "Sectors", url: "/industries/#b2b", desc: "Finding, reaching and winning other businesses. PollenRev and advisory." },
    { title: "Accounting and CA firms", category: "Sectors", url: "/industries/#accounting", desc: "Bill matching, re-typing into Tally and chasing documents. Advisory." },
    { title: "Clinics and healthcare", category: "Sectors", url: "/industries/#healthcare", desc: "Less re-typing at the front desk, reminders on time, simpler reports. Advisory." },
    { title: "D2C brands", category: "Sectors", url: "/industries/#d2c", desc: "Knowing the real margin on each order after returns, shipping and fees. Advisory." },
    { title: "Finance", category: "Sectors", url: "/industries/#finance", desc: "Turning documents and spreadsheets into one trusted set of numbers, and fewer hands re-typing them." },
    { title: "Manufacturing", category: "Sectors", url: "/industries/#manufacturing", desc: "Seeing output, downtime and stock as they happen, so problems are caught the same day." },
    { title: "Logistics and supply chain", category: "Sectors", url: "/industries/#logistics", desc: "One view of orders, stock and shipments, with delays flagged before customers notice." },
    { title: "Suggest the next sector", category: "Sectors", url: "/industries/#next-sector", desc: "How we pick the next sector, and how to suggest one." },
    { title: "Research", category: "Research", url: "/research/", desc: "What we are studying, what is public and what is still private." },
    { title: "CORTEX", category: "Open Source", url: "/open-source/#cortex", desc: "Open-source toolkit for connecting AI agents and the tools they use. Public on GitHub." },
    { title: "Brain", category: "Research", url: "/research/#brain", desc: "Experiments toward an open-source AI companion modelled on how the human brain works." },
    { title: "YAMCP", category: "Open Source", url: "/open-source/#yamcp", desc: "Part of CORTEX: a framework for building Model Context Protocol (MCP) servers." },
    { title: "Faultbell", category: "Open Source", url: "/open-source/#faultbell", desc: "Exception alerts and server watch for Python services and cron jobs, in Discord, Slack, Teams, email and more." },
    { title: "Leadbell", category: "Open Source", url: "/open-source/#leadbell", desc: "Website lead capture with consent and spam protection, plus sign-up and payment alerts." },
    { title: "Greenline", category: "Open Source", url: "/open-source/#greenline", desc: "Self-hosted engine for WhatsApp Business messaging across many businesses." },
    { title: "TillSync", category: "Open Source", url: "/open-source/#tillsync", desc: "Pull customers and bills from POS systems, Sheets and CSV into one clean shape." },
    { title: "Nudgewright", category: "Open Source", url: "/open-source/#nudgewright", desc: "Writes one short personal customer message from real facts, and says why." },
    { title: "Open source", category: "Open Source", url: "/open-source/", desc: "Code we share publicly on GitHub." },
    { title: "About", category: "Company", url: "/about/", desc: "Who we are and how we work." },
    { title: "Contact", category: "Company", url: "/contact/", desc: "Email or call us, book a product demo, book a free 25-minute call or suggest a sector." }
  ];

  const searchTrigger = document.getElementById('searchTrigger');
  const searchBackdrop = document.getElementById('searchModalBackdrop');
  const searchInput = document.getElementById('globalSearchInput');
  const searchResults = document.getElementById('searchResultsList');

  function openSearch() {
    if (!searchBackdrop) return;
    searchBackdrop.classList.add('open');
    if (searchInput) {
      searchInput.value = '';
      renderSearchResults(searchIndex);
      setTimeout(() => searchInput.focus(), 50);
    }
  }

  function closeSearch() {
    if (!searchBackdrop) return;
    searchBackdrop.classList.remove('open');
  }

  function renderSearchResults(items) {
    if (!searchResults) return;
    if (items.length === 0) {
      searchResults.innerHTML = '<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:14px;">No matching results found. Try another search term.</div>';
      return;
    }
    searchResults.innerHTML = items.map(item => `
      <a class="search-result-item" href="${item.url}">
        <span class="search-result-category">${item.category}</span>
        <div class="search-result-title">${item.title}</div>
        <div class="search-result-desc">${item.desc}</div>
      </a>
    `).join('');
  }

  if (searchTrigger) {
    searchTrigger.addEventListener('click', openSearch);
  }

  if (searchBackdrop) {
    searchBackdrop.addEventListener('click', (e) => {
      if (e.target === searchBackdrop) closeSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        renderSearchResults(searchIndex);
        return;
      }
      const filtered = searchIndex.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      );
      renderSearchResults(filtered);
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (searchBackdrop && searchBackdrop.classList.contains('open')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (e.key === 'Escape' && searchBackdrop && searchBackdrop.classList.contains('open')) {
      closeSearch();
    }
  });

  // -------------------------------------------------------------------------
  // 3. Interactive Value-at-Stake Calculator (VALUE OS™)
  // -------------------------------------------------------------------------
  const calcContainer = document.getElementById('vasCalculator');
  if (calcContainer) {
    let currentRev = 12000000; // Default $5-25M
    const picks = {};

    const formatCurrency = (n) => {
      if (n >= 1000000) return '$' + (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
      if (n >= 1000) return '$' + Math.round(n / 1000) + 'k';
      return '$' + Math.round(n);
    };

    const updateCalculator = () => {
      let lo = 0;
      let hi = 0;
      const flaggedItems = [];

      Object.keys(picks).forEach((key) => {
        const item = picks[key];
        if (item.weight > 0) {
          const itemLo = (currentRev * item.loBasis / 10000) * item.weight;
          const itemHi = (currentRev * item.hiBasis / 10000) * item.weight;
          lo += itemLo;
          hi += itemHi;
          flaggedItems.push({ name: item.name, lo: itemLo, hi: itemHi, weight: item.weight });
        }
      });

      const totalNumberEl = document.getElementById('vasTotalNumber');
      const breakdownListEl = document.getElementById('vasBreakdownList');
      const leversFlaggedCountEl = document.getElementById('vasFlaggedCount');

      if (totalNumberEl) {
        if (flaggedItems.length > 0) {
          totalNumberEl.textContent = `≈ ${formatCurrency(lo)} – ${formatCurrency(hi)} / yr`;
        } else {
          totalNumberEl.textContent = 'Select levers to quantify';
        }
      }

      if (leversFlaggedCountEl) {
        leversFlaggedCountEl.textContent = `${flaggedItems.length} of 6 levers flagged`;
      }

      if (breakdownListEl) {
        if (flaggedItems.length === 0) {
          breakdownListEl.innerHTML = '<li style="padding:8px 0;color:var(--text-muted);font-size:13.5px;">No margin leaks flagged yet. Select options above to model your value at stake.</li>';
        } else {
          breakdownListEl.innerHTML = flaggedItems.map(item => `
            <li style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed var(--border-light);font-size:13.5px;color:var(--text-secondary);">
              <span>${item.name} ${item.weight < 1 ? '<span style="font-size:11px;color:var(--text-muted);">(half weight)</span>' : ''}</span>
              <strong style="font-family:var(--font-mono);color:var(--accent-primary);">${formatCurrency(item.lo)} – ${formatCurrency(item.hi)}/yr</strong>
            </li>
          `).join('');
        }
      }
    };

    // Revenue Chip selection
    const revButtons = calcContainer.querySelectorAll('.rev-chip-btn');
    revButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        revButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentRev = parseInt(btn.dataset.rev, 10);
        updateCalculator();
      });
    });

    // Lever Cards
    const leverCards = calcContainer.querySelectorAll('.lever-card');
    leverCards.forEach((card) => {
      const sig = card.dataset.sig;
      const lo = parseFloat(card.dataset.lo);
      const hi = parseFloat(card.dataset.hi);
      const name = card.dataset.name;

      const buttons = card.querySelectorAll('.lever-btn');
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');

          const ans = btn.dataset.ans;
          let weight = 0;
          if (ans === 'yes') weight = 1;
          else if (ans === 'unsure') weight = 0.5;

          picks[sig] = { weight, loBasis: lo, hiBasis: hi, name };
          card.classList.toggle('flagged', weight > 0);
          updateCalculator();
        });
      });
    });

    // Initialize with two common levers selected for realistic demonstration
    const defaultLevers = ['margin', 'manual'];
    leverCards.forEach((card) => {
      const sig = card.dataset.sig;
      if (defaultLevers.includes(sig)) {
        const yesBtn = card.querySelector('.lever-btn[data-ans="yes"]');
        if (yesBtn) {
          yesBtn.click();
        }
      }
    });
  }

  // -------------------------------------------------------------------------
  // 4. Smooth Scroll Spy & Topbar Elevation
  // -------------------------------------------------------------------------
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        topbar.classList.add('scrolled');
      } else {
        topbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // -------------------------------------------------------------------------
  // 5. High-Performance IntersectionObserver Scroll-Reveal Engine
  // -------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Optional: once revealed, unobserve to free resources
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for environments without IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // -------------------------------------------------------------------------
  // 6. Interactive 3D Perspective Tilt on Hero Illustration
  // -------------------------------------------------------------------------
  const heroWrap = document.querySelector('.hero-wrap');
  const heroGraphic = document.querySelector('.hero-graphic-wrap img');

  if (heroWrap && heroGraphic && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let ticking = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e) => {
      const rect = heroWrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Subtle, refined tilt limits: max 5 degrees
      targetX = (y / (rect.height / 2)) * -5;
      targetY = (x / (rect.width / 2)) * 6;

      if (!ticking) {
        requestAnimationFrame(updateTilt);
        ticking = true;
      }
    };

    const updateTilt = () => {
      // Damped interpolation for silky smooth spring motion
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      heroGraphic.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) translateY(-4px)`;

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        requestAnimationFrame(updateTilt);
      } else {
        ticking = false;
      }
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!ticking) {
        requestAnimationFrame(updateTilt);
        ticking = true;
      }
      setTimeout(() => {
        heroGraphic.style.transform = '';
      }, 350);
    };

    heroWrap.addEventListener('mousemove', onMouseMove, { passive: true });
    heroWrap.addEventListener('mouseleave', onMouseLeave, { passive: true });
  }

  // -------------------------------------------------------------------------
  // 7. Animated Number Counters (Telemetry & Metrics)
  // -------------------------------------------------------------------------
  const counterElements = document.querySelectorAll('[data-counter]');
  if (counterElements.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetNum = parseFloat(el.getAttribute('data-counter'));
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = parseInt(el.getAttribute('data-duration') || '1400', 10);
          const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;

          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease-out cubic: 1 - (1 - progress)^3
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOut * targetNum;

            el.textContent = prefix + (decimals > 0 ? currentVal.toFixed(decimals) : Math.round(currentVal)) + suffix;

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              el.textContent = prefix + (decimals > 0 ? targetNum.toFixed(decimals) : targetNum) + suffix;
            }
          };

          window.requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
  }


  // -------------------------------------------------------------------------
  // Card spotlight: a soft light follows the cursor on cards (desktop only)
  // -------------------------------------------------------------------------
  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('main .card, main .step-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      }, { passive: true });
    });
  }


  // -------------------------------------------------------------------------
  // Floating nav: an ink "lamp" slides under the link you point at,
  // and rests under the current page's link.
  // -------------------------------------------------------------------------
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    const lamp = document.createElement('span');
    lamp.className = 'nav-lamp';
    lamp.setAttribute('aria-hidden', 'true');
    navMenu.prepend(lamp);
    const links = Array.from(navMenu.querySelectorAll(':scope > a, :scope > .nx-drop > a'));   // not the links inside the panels
    const active = navMenu.querySelector('a.active');
    const lightUp = (link) => {
      links.forEach((a) => a.classList.toggle('is-lit', a === link));
      if (!link) { lamp.classList.remove('on'); return; }
      lamp.style.width = link.offsetWidth + 'px';
      lamp.style.transform = 'translate(' + link.offsetLeft + 'px, -50%)';
      lamp.classList.add('on');
    };
    links.forEach((a) => {
      a.addEventListener('mouseenter', () => lightUp(a));
      a.addEventListener('focus', () => lightUp(a));
    });
    navMenu.addEventListener('mouseleave', () => lightUp(active));
    window.addEventListener('resize', () => lightUp(navMenu.querySelector('a.is-lit') || active), { passive: true });
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(() => lightUp(active)); } else { lightUp(active); }
  } else {
    document.documentElement.classList.add('no-lamp');
  }

})();

