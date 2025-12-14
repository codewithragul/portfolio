



/* ========================= NAV / UI CODE (updated) ======================= */
const navs = document.querySelectorAll('.nav-list li');
const cube = document.querySelector('.box');
const sections = document.querySelectorAll('.section');

const resumeList = document.querySelectorAll('.resume-list');
const resumeBoxs = document.querySelectorAll('.resume-box');

const projectLists = document.querySelectorAll('.project-list');
const projectBoxs = document.querySelectorAll('.project-box');

navs.forEach((nav, idx) => {
  nav.addEventListener('click', () => {
    // Prevent navigation while a popup is open
    if (window.popupOpen) return;

    const activeNav = document.querySelector('.nav-list li.active');
    if (activeNav) activeNav.classList.remove('active');
    nav.classList.add('active');

    if (cube) cube.style.transform = `rotateY(${idx * -90}deg)`;

    const activeSection = document.querySelector('.section.active');
    if (activeSection) activeSection.classList.remove('active');
    if (sections[idx]) sections[idx].classList.add('active');

    const array = Array.from(sections);
    const arrSecs = array.slice(1, -1);
    arrSecs.forEach(s => {
      if (s.classList.contains('active')) {
        if (sections[4]) sections[4].classList.add('action-contact');
      }
    });
    if (sections[0] && sections[0].classList.contains('active')) {
      if (sections[4]) sections[4].classList.remove('action-contact');
    }
  });
});

resumeList.forEach((list, idx) => {
  list.addEventListener('click', () => {
    const cur = document.querySelector('.resume-list.active');
    if (cur) cur.classList.remove('active');
    list.classList.add('active');
    const curBox = document.querySelector('.resume-box.active');
    if (curBox) curBox.classList.remove('active');
    if (resumeBoxs[idx]) resumeBoxs[idx].classList.add('active');
  });
});

projectLists.forEach((list, idx) => {
  list.addEventListener('click', () => {
    const cur = document.querySelector('.project-list.active');
    if (cur) cur.classList.remove('active');
    list.classList.add('active');
    const curBox = document.querySelector('.project-box.active');
    if (curBox) curBox.classList.remove('active');
    if (projectBoxs[idx]) projectBoxs[idx].classList.add('active');
  });
});


(function () {
  const css = `
  .cg-popup-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display:flex; align-items:center; justify-content:center; visibility:hidden; opacity:0; transition:opacity .25s ease; z-index:99999; }
  .cg-popup-overlay.show { visibility:visible; opacity:1; }
  .cg-popup { width:360px; background:#fff; border-radius:18px; text-align:center; padding:26px; box-shadow:0 12px 35px rgba(0,0,0,0.16); transform:scale(.85); opacity:0; transition:all .3s ease; position:relative; }
  .cg-popup-overlay.show .cg-popup { transform:scale(1); opacity:1; }
  .cg-popup-close { position:absolute; top:12px; right:14px; font-size:20px; cursor:pointer; color:#666; }
  .cg-icon { font-size:40px; width:84px; height:84px; border-radius:50%; margin:0 auto 12px; display:flex; align-items:center; justify-content:center; }
  .cg-success .cg-icon { background:#e6f9ef; color:#0ba25a; }
  .cg-error .cg-icon { background:#ffecec; color:#d64545; }
  .cg-warning .cg-icon { background:#fff7e6; color:#c97f00; }
  .cg-popup h2 { margin:6px 0 6px; font-size:20px; color:#222; }
  .cg-popup p { margin:0; color:#555; font-size:14px; line-height:1.4; }
  .cg-btn { margin-top:16px; padding:10px 22px; border-radius:10px; border:0; font-weight:700; cursor:pointer; color:#fff; background:linear-gradient(90deg,#00c37a,#00a6ff); }
  .cg-error .cg-btn { background:linear-gradient(90deg,#ff6b6b,#ff3d3d); }
  .cg-warning .cg-btn { background:linear-gradient(90deg,#f4b400,#ffbf33); color:#5a3800; }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const html = `
    <div class="cg-popup-overlay" id="cg-popup-overlay" aria-hidden="true">
      <div class="cg-popup" id="cg-popup">
        <div class="cg-popup-close" id="cg-popup-close">&times;</div>
        <div class="cg-icon" id="cg-popup-icon">✔</div>
        <h2 id="cg-popup-title">Title</h2>
        <p id="cg-popup-message">Message goes here.</p>
        <button class="cg-btn" id="cg-popup-btn">OK</button>
      </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", html);

  const overlay = document.getElementById("cg-popup-overlay");
  const icon = document.getElementById("cg-popup-icon");
  const title = document.getElementById("cg-popup-title");
  const msg = document.getElementById("cg-popup-message");
  const btn = document.getElementById("cg-popup-btn");
  const close = document.getElementById("cg-popup-close");

  // global flag to indicate popup visibility
  window.popupOpen = false;

  // Expose global showPopup(type, title, message, buttonText)
  window.showPopup = function (type = "success", t = "", m = "", btnText = "OK") {
    // Ensure contact remains active while popup shown
    if (sections && sections[4]) {
      sections.forEach(s => s.classList.remove('active'));
      sections[4].classList.add('active');
    }

    overlay.classList.remove("cg-success", "cg-error", "cg-warning");
    overlay.classList.add("cg-" + (type || "success"));
    icon.innerHTML = type === "success" ? "✔" : type === "error" ? "✖" : "⚠";
    title.textContent = t;
    msg.textContent = m;
    btn.textContent = btnText || "OK";
    overlay.setAttribute('aria-hidden', 'false');

    // set popup-open flag and show
    window.popupOpen = true;
    overlay.classList.add("show");
  };

  function hide() {
    overlay.classList.remove("show");
    overlay.setAttribute('aria-hidden', 'true');

    // clear popup-open flag
    window.popupOpen = false;

    // keep contact active after closing popup
    if (sections && sections[4]) {
      sections.forEach(s => s.classList.remove('active'));
      sections[4].classList.add('active');
    }
  }

  btn.addEventListener('click', hide);
  close.addEventListener('click', hide);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) hide(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
})();

/* ========================= DEBUG CONTACT FORM + SUBMIT HANDLER ======================= */



/* ========================= CONTACT FORM (FIXED & PROD SAFE) ======================= */
/* ========================= CONTACT FORM (FINAL FIX) ======================= */
(function () {
const ENDPOINT = `${window.location.origin}/api/messages`;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function initContact() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      const payload = {
        fullName: form.fullname.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim(),
      };

      if (!payload.fullName || !payload.email || !payload.message) {
        showPopup("error", "Missing Fields", "Please fill all required fields.");
        resetBtn();
        return;
      }

      if (!emailPattern.test(payload.email)) {
        showPopup("error", "Invalid Email", "Enter a valid email.");
        resetBtn();
        return;
      }

      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Server error");

        showPopup("success", "Message Sent", "I Will Reply Soon 😎", "Saved successfully!");
        form.reset();
      } catch (err) {
        showPopup("warning", "Network Error", "Server not reachable.");
      } finally {
        resetBtn();
      }

      function resetBtn() {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', initContact)
    : initContact();
})();
