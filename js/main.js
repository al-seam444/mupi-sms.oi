/* =====================================================================
   MUGPI Sports Management – main.js
   Vanilla JavaScript for UI interactions.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- Google Sheets Web App URL ---------- */
  var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxY2_kH1zCpWQDDwZUI0CYCn4z80SgfvJH3Cy6iJdK9lAx54r6kuZaogIaZ-wi9TVo/exec';

  /* ---------- Mobile navigation drawer ---------- */
  function setupMobileMenu() {
    var menuBtn = document.getElementById('mobile-menu-btn');
    var closeBtn = document.getElementById('close-drawer-btn');
    var drawer = document.getElementById('mobile-drawer');
    var backdrop = document.getElementById('mobile-backdrop');
    if (!menuBtn || !drawer || !backdrop) return;

    function openMenu() {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }

    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    document.querySelectorAll('.mobile-nav-link, .drawer-cta').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Generic filter buttons (tournaments & gallery) ---------- */
  function setupFilter(buttonSelector, itemSelector, buttonAttr, itemAttr) {
    var buttons = document.querySelectorAll(buttonSelector);
    var items = document.querySelectorAll(itemSelector);
    if (!buttons.length || !items.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = btn.getAttribute(buttonAttr);

        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        items.forEach(function (item) {
          var match = value === 'all' || item.getAttribute(itemAttr) === value;
          item.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  /* ---------- Tournament Bracket Modal ---------- */
  function setupTournamentActions() {
    var modal = document.getElementById('bracket-modal');
    var buttons = document.querySelectorAll('.tournament-btn');
    if (!buttons.length) return;

    if (!modal) {
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          alert('[Tournament Details]\nTitle: ' + btn.getAttribute('data-title') +
            '\nStatus: ' + btn.getAttribute('data-status'));
        });
      });
      return;
    }

    var modalTitle = document.getElementById('bracket-modal-title');
    var modalBody = document.getElementById('bracket-modal-body');
    var closeBtn = document.getElementById('bracket-modal-close');

    var bracketData = {
      'Inter-Department Football Cup 2026': {
        quarters: [
          { team: 'CSE FC', score: '2', win: true },
          { team: 'EEE FC', score: '1', win: false },
          { team: 'Civil Stars', score: '3', win: true },
          { team: 'BBA Strikers', score: '0', win: false }
        ],
        semis: [
          { team: 'CSE FC', score: '1', win: true },
          { team: 'Civil Stars', score: '0', win: false }
        ],
        finalLabel: 'Championship Final',
        finalMatch: 'CSE FC vs Mech Lions',
        finalDate: 'Nov 22, 04:00 PM'
      },
      'MUGPI T20 Cricket Championship': {
        quarters: [
          { team: 'CSE Warriors', score: '2', win: true },
          { team: 'EEE Titans', score: '1', win: false },
          { team: 'Civil Stars', score: '3', win: true },
          { team: 'BBA Strikers', score: '0', win: false }
        ],
        semis: [
          { team: 'CSE Warriors', score: '1', win: true },
          { team: 'Civil Stars', score: '0', win: false }
        ],
        finalLabel: 'Championship Final',
        finalMatch: 'CSE Warriors vs Mech Lions',
        finalDate: 'Nov 22, 04:00 PM'
      },
      'Annual Track & Field Meet': {
        quarters: [
          { team: '100m Sprint', score: 'QF', win: true },
          { team: '200m Sprint', score: 'QF', win: true },
          { team: '400m Relay', score: 'QF', win: true },
          { team: 'Long Jump', score: 'QF', win: true }
        ],
        semis: [
          { team: 'Track Finalists', score: 'SF', win: true },
          { team: 'Field Finalists', score: 'SF', win: true }
        ],
        finalLabel: 'Championship Final',
        finalMatch: 'Grand Track & Field Finale',
        finalDate: 'Dec 05, 04:00 PM'
      },
      'Freshers Basketball Blast': {
        quarters: [
          { team: 'CSE Hoopers', score: '2', win: true },
          { team: 'EEE Dunks', score: '1', win: false },
          { team: 'Civil Giants', score: '3', win: true },
          { team: 'BBA Blazers', score: '0', win: false }
        ],
        semis: [
          { team: 'CSE Hoopers', score: '1', win: true },
          { team: 'Civil Giants', score: '0', win: false }
        ],
        finalLabel: 'Championship Final',
        finalMatch: 'CSE Hoopers vs Mech Bulls',
        finalDate: 'Oct 12, 04:00 PM'
      },
      'Badminton Doubles Open': {
        quarters: [
          { team: 'CSE Pair A', score: '2', win: true },
          { team: 'EEE Pair B', score: '1', win: false },
          { team: 'Civil Pair A', score: '3', win: true },
          { team: 'BBA Pair B', score: '0', win: false }
        ],
        semis: [
          { team: 'CSE Pair A', score: '1', win: true },
          { team: 'Civil Pair A', score: '0', win: false }
        ],
        finalLabel: 'Championship Final',
        finalMatch: 'CSE Pair A vs Mech Pair A',
        finalDate: 'Nov 25, 04:00 PM'
      },
      'Inter-Hall Volleyball League': {
        quarters: [
          { team: 'Padma Hall', score: '2', win: true },
          { team: 'Meghna Hall', score: '1', win: false },
          { team: 'Jamuna Hall', score: '3', win: true },
          { team: 'Surma Hall', score: '0', win: false }
        ],
        semis: [
          { team: 'Padma Hall', score: '1', win: true },
          { team: 'Jamuna Hall', score: '0', win: false }
        ],
        finalLabel: 'Championship Final',
        finalMatch: 'Padma Hall vs Karnaphuli Hall',
        finalDate: 'Sep 25, 04:00 PM'
      }
    };

    function renderBracket(title) {
      var data = bracketData[title] || bracketData['MUGPI T20 Cricket Championship'];
      if (modalTitle) modalTitle.textContent = title;

      var qHtml = data.quarters.map(function (item) {
        return '<div class="bracket-team-row">' +
          '<span class="bracket-team-name">' + item.team + '</span>' +
          '<span class="bracket-team-score ' + (item.win ? 'is-win' : '') + '">' + item.score + '</span>' +
          '</div>';
      }).join('');

      var sHtml = data.semis.map(function (item) {
        return '<div class="bracket-team-row">' +
          '<span class="bracket-team-name">' + item.team + '</span>' +
          '<span class="bracket-team-score ' + (item.win ? 'is-win' : '') + '">' + item.score + '</span>' +
          '</div>';
      }).join('');

      if (modalBody) {
        modalBody.innerHTML =
          '<div class="bracket-col">' +
            '<div class="bracket-col-title">QUARTER FINALS</div>' +
            '<div class="bracket-team-list">' + qHtml + '</div>' +
          '</div>' +
          '<div class="bracket-col">' +
            '<div class="bracket-col-title">SEMI FINALS</div>' +
            '<div class="bracket-team-list">' + sHtml + '</div>' +
          '</div>' +
          '<div class="bracket-col bracket-col--final">' +
            '<div class="bracket-col-title">FINAL MATCH</div>' +
            '<div class="bracket-final-box">' +
              '<div class="bracket-final-label">' + data.finalLabel + '</div>' +
              '<div class="bracket-final-match">' + data.finalMatch + '</div>' +
              '<div class="bracket-final-date">' + data.finalDate + '</div>' +
            '</div>' +
          '</div>';
      }

      modal.classList.add('is-open');
    }

    function closeModal() {
      modal.classList.remove('is-open');
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        renderBracket(btn.getAttribute('data-title'));
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  /* ---------- Gallery lightbox ---------- */
  function setupGalleryModal() {
    var modal = document.getElementById('gallery-modal');
    if (!modal) return;
    var closeBtn = document.getElementById('close-modal-btn');
    var img = document.getElementById('modal-img');
    var caption = document.getElementById('modal-caption');
    var tag = document.getElementById('modal-tag');

    function openModal(item) {
      img.src = item.getAttribute('data-img');
      caption.textContent = item.getAttribute('data-title');
      tag.textContent = item.getAttribute('data-tag');
      modal.classList.add('is-open');
    }

    function closeModal() { modal.classList.remove('is-open'); }

    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () { openModal(item); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(item);
        }
      });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  /* ---------- Registration form validation & Google Sheets sync ---------- */
  function setupRegistrationForm() {
    var form = document.getElementById('athlete-registration-form');
    if (!form) return;
    var alertBox = document.getElementById('form-alert');
    var alertIcon = document.getElementById('form-alert-icon');
    var alertText = document.getElementById('form-alert-text');
    var submitBtn = form.querySelector('button[type="submit"]');
    var submitLabel = submitBtn ? submitBtn.querySelector('span') : null;
    var originalBtnText = submitLabel ? submitLabel.textContent : 'Submit Registration';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      document.querySelectorAll('[id^="err-"]').forEach(function (el) {
        el.classList.add('is-hidden');
      });

      function fail(id) {
        document.getElementById(id).classList.remove('is-hidden');
        isValid = false;
      }

      var fullname = document.getElementById('reg-fullname').value.trim();
      if (!fullname) fail('err-fullname');

      if (!document.getElementById('reg-studentid').value.trim()) fail('err-studentid');

      var email = document.getElementById('reg-email').value.trim();
      if (!email || email.indexOf('@') === -1) fail('err-email');

      if (!document.getElementById('reg-dept').value) fail('err-dept');
      if (!document.getElementById('reg-sport').value) fail('err-sport');
      if (!document.getElementById('reg-phone').value.trim()) fail('err-phone');
      if (!document.getElementById('reg-terms').checked) fail('err-terms');

      if (!isValid) {
        alertBox.className = 'form-alert form-alert--error';
        alertIcon.className = 'fas fa-exclamation-triangle';
        alertText.textContent = 'Please correct the highlighted errors in the form before submitting.';
        return;
      }

      if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        alertBox.className = 'form-alert form-alert--error';
        alertIcon.className = 'fas fa-exclamation-triangle';
        alertText.textContent = 'Google Sheets Web App URL is not configured in js/main.js.';
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      if (submitLabel) submitLabel.textContent = 'Submitting...';

      var formData = new FormData(form);

      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(function (data) {
          if (data && data.result === 'error') {
            throw new Error(data.error || 'Failed to save to Google Sheet');
          }
          alertBox.className = 'form-alert form-alert--success';
          alertIcon.className = 'fas fa-check-circle';
          alertText.textContent = 'Registration Successful! Welcome, ' + fullname +
            '. Your details have been recorded.';
          form.reset();
          alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(function (err) {
          alertBox.className = 'form-alert form-alert--error';
          alertIcon.className = 'fas fa-exclamation-triangle';
          alertText.textContent = 'Could not submit registration right now. Please try again.';
          console.error('Google Sheets submission error:', err);
          alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
          if (submitLabel) submitLabel.textContent = originalBtnText;
        });
    });
  }

  /* ---------- Newsletter form (footer, all pages) ---------- */
  function setupNewsletter() {
    var form = document.getElementById('newsletter-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for subscribing to MUGPI Sports updates!');
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupMobileMenu();
    setupFilter('.tournament-filter-btn', '.tournament-card', 'data-filter', 'data-status');
    setupFilter('.gallery-cat-btn', '.gallery-item', 'data-cat', 'data-category');
    setupTournamentActions();
    setupGalleryModal();
    setupRegistrationForm();
    setupNewsletter();
  });
})();