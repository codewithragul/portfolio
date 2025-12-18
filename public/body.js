

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

/* ========================= POPUP SYSTEM ======================= */
/* ========================= POPUP SYSTEM ======================= */
document.addEventListener("DOMContentLoaded", () => {

  const style = document.createElement("style");
  style.innerHTML = `
  .cg-popup-overlay{
    position:fixed; inset:0;
    background:rgba(0,0,0,.55);
    display:flex; align-items:center; justify-content:center;
    opacity:0; visibility:hidden;
    transition:.25s ease;
    z-index:999999;
  }
  .cg-popup-overlay.show{opacity:1;visibility:visible}
  .cg-popup{
    background:#fff;
    border-radius:18px;
    padding:26px;
    width:360px;
    text-align:center;
    transform:scale(.85);
    transition:.25s ease;
  }
  .cg-popup-overlay.show .cg-popup{transform:scale(1)}
  .cg-icon{font-size:42px;margin-bottom:10px}
  .cg-success .cg-icon{color:#0ba25a}
  .cg-error .cg-icon{color:#e74c3c}
  .cg-warning .cg-icon{color:#f39c12}
  .cg-btn{
    margin-top:16px;
    padding:10px 24px;
    border:none;
    border-radius:10px;
    font-weight:700;
    cursor:pointer;
    color:#fff;
  }
  .cg-success .cg-btn{background:#0ba25a}
  .cg-error .cg-btn{background:#e74c3c}
  .cg-warning .cg-btn{background:#f39c12}
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML("beforeend", `
    <div class="cg-popup-overlay" id="cgPopup">
      <div class="cg-popup">
        <div class="cg-icon" id="cgIcon">✔</div>
        <h2 id="cgTitle"></h2>
        <p id="cgMsg"></p>
        <button class="cg-btn" id="cgBtn">OK</button>
      </div>
    </div>
  `);

  const popup = document.getElementById("cgPopup");
  const icon = document.getElementById("cgIcon");
  const title = document.getElementById("cgTitle");
  const msg = document.getElementById("cgMsg");
  const btn = document.getElementById("cgBtn");

  window.popupOpen = false;

  window.showPopup = (type="success", t="", m="") => {
    popup.className = `cg-popup-overlay show cg-${type}`;
    icon.textContent = type === "success" ? "✔" : type === "error" ? "✖" : "⚠";
    title.textContent = t;
    msg.textContent = m;
    window.popupOpen = true;
  };

  btn.onclick = () => {
    popup.classList.remove("show");
    window.popupOpen = false;
  };
});



/* ========================= CONTACT FORM ======================= */
/* ========================= CONTACT FORM ======================= */
document.addEventListener("DOMContentLoaded", () => {

  const ENDPOINT = `${window.location.origin}/api/contact`;
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Sending...";

    const payload = {
      fullName: form.fullname.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
    };

    if (!payload.fullName || !payload.email || !payload.message) {
      showPopup("error","Missing Fields","Fill required fields");
      return reset();
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error();

      showPopup("success","Message Sent","I will reply soon 😎");
      form.reset();
    } catch {
      showPopup("warning","Network Error","Server not reachable");
    } finally {
      reset();
    }

    function reset(){
      btn.disabled = false;
      btn.textContent = "Send Message";
    }
  });
});