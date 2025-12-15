const navs = document.querySelectorAll('.nav-list li');
const cube = document.querySelector('.box');
const sections = document.querySelectorAll('.section');

navs.forEach((nav, idx) => {
  nav.addEventListener('click', () => {
    if (window.popupOpen) return;

    document.querySelector('.nav-list li.active')?.classList.remove('active');
    nav.classList.add('active');

    if (cube) cube.style.transform = `rotateY(${idx * -90}deg)`;

    document.querySelector('.section.active')?.classList.remove('active');
    sections[idx]?.classList.add('active');
  });
});

(function () {
  const css = `
  .cg-popup-overlay{
    position:fixed; inset:0;
    background:rgba(0,0,0,.45);
    display:flex; align-items:center; justify-content:center;
    opacity:0; visibility:hidden;
    transition:.3s; z-index:99999;
  }
  .cg-popup-overlay.show{opacity:1; visibility:visible}
  .cg-popup{
    background:#fff; border-radius:16px;
    padding:24px; width:360px; text-align:center;
    transform:scale(.9); transition:.3s;
  }
  .cg-popup-overlay.show .cg-popup{transform:scale(1)}
  .cg-icon{font-size:42px; margin-bottom:10px}
  .cg-success .cg-icon{color:#0ba25a}
  .cg-error .cg-icon{color:#e74c3c}
  .cg-warning .cg-icon{color:#f39c12}
  .cg-btn{
    margin-top:16px; padding:10px 22px;
    border:none; border-radius:10px;
    font-weight:700; color:#fff; cursor:pointer
  }
  .cg-success .cg-btn{background:#0ba25a}
  .cg-error .cg-btn{background:#e74c3c}
  .cg-warning .cg-btn{background:#f39c12}
  `;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

  const html = `
  <div class="cg-popup-overlay" id="popup">
    <div class="cg-popup">
      <div class="cg-icon" id="icon">✔</div>
      <h2 id="title"></h2>
      <p id="msg"></p>
      <button class="cg-btn" id="btn">OK</button>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", html);

  const popup = document.getElementById("popup");
  const icon = document.getElementById("icon");
  const title = document.getElementById("title");
  const msg = document.getElementById("msg");
  const btn = document.getElementById("btn");

  window.popupOpen = false;

  window.showPopup = (type, t, m) => {
    popup.classList.remove("cg-success","cg-error","cg-warning");
    popup.classList.add("show", `cg-${type}`);

    icon.textContent = type === "success" ? "✔" : type === "error" ? "✖" : "⚠";
    title.textContent = t;
    msg.textContent = m;

    window.popupOpen = true;
  };

  btn.onclick = () => {
    popup.classList.remove("show");
    window.popupOpen = false;
  };
})();

(function () {
  const ENDPOINT = `${window.location.origin}/api/contact`;
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
        showPopup("error","Missing Fields","Please fill all required fields");
        return resetBtn();
      }

      if (!emailPattern.test(payload.email)) {
        showPopup("error","Invalid Email","Enter a valid email address");
        return resetBtn();
      }

      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error();

        showPopup("success","Message Sent!","I will reply soon 😎");
        form.reset();
      } catch {
        showPopup("warning","Network Error","Server not reachable");
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
