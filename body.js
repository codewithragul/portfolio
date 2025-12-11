const navs = document.querySelectorAll('.nav-list li');
const cube = document.querySelector('.box');
const  sections = document.querySelectorAll('.section');





const resumeList = document.querySelectorAll('.resume-list');
const resumeBoxs = document.querySelectorAll('.resume-box');


const projectLists = document.querySelectorAll('.project-list');
const projectBoxs = document.querySelectorAll('.project-box');

navs.forEach((nav , idx) => {
    nav.addEventListener('click', () => {
        document.querySelector('.nav-list li.active') .classList.remove('active');
        nav.classList.add('active');
       
        cube.style.transform =`rotateY(${idx *-90}deg)`;

        
        document.querySelector('.section.active') .classList.remove('active');
        sections[idx].classList.add('active');
        
         const array = Array.from(sections);
         const arrSecs = array.slice(1, -1);
         arrSecs.forEach(arrSecs => {
            if(arrSecs.classList.contains('active')){
                sections[4].classList.add('action-contact');
            }
         });
         if (sections[0].classList.contains('active')){
            sections[4].classList.remove('action-contact');
         }


    });
});


resumeList.forEach((list , idx) => {
    list.addEventListener('click', () => {
        document.querySelector('.resume-list.active') .classList.remove('active');
        list.classList.add('active');

        document.querySelector('.resume-box.active') .classList.remove('active');
        resumeBoxs[idx].classList.add('active');
    });
});


projectLists.forEach((list , idx) => {
    list.addEventListener('click', () => {
        document.querySelector('.project-list.active') .classList.remove('active');
        list.classList.add('active');

         document.querySelector('.project-box.active') .classList.remove('active');
        projectBoxs[idx].classList.add('active');

    });
});


setTimeout(() =>{
    sections[4].classList.remove('active');

}, 1500);

(function () {
  const emailPattern = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;   const toastAutoCloseMS = 2500; 

  const css = `
  /* Popup overlay */
  .cg-popup-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.36);
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    opacity: 0;
    transition: opacity 260ms ease, visibility 260ms;
    z-index: 99999;
    -webkit-font-smoothing:antialiased;
  }
  .cg-popup-overlay.show {
    visibility: visible;
    opacity: 1;
  }
  /* Box */
  .cg-popup {
    width: 380px;
    max-width: calc(100% - 40px);
    background: #ffffff;
    border-radius: 14px;
    padding: 28px 26px;
    box-shadow: 0 18px 40px rgba(10,10,10,0.18);
    text-align: center;
    transform: translateY(-6px) scale(0.98);
    opacity: 0;
    transition: transform 320ms cubic-bezier(.2,.9,.3,1), opacity 260ms ease;
  }
  .cg-popup-overlay.show .cg-popup {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  .cg-popup-close {
    position: absolute;
    right: 18px;
    top: 12px;
    font-size: 20px;
    color: #888;
    cursor: pointer;
  }

  .cg-popup .cg-icon {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    margin: 6px auto 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  }

  .cg-popup h2 { margin: 0 0 8px; font-size: 20px; color:#222; }
  .cg-popup p { margin: 0; color: #666; font-size: 14px; line-height: 1.4; padding: 0 6px; }

  .cg-popup .cg-hr {
    height: 1px; background: #eee; margin: 16px 0;
  }

  .cg-popup .cg-btn {
    display: inline-block;
    margin-top: 12px;
    padding: 10px 18px;
    border-radius: 26px;
    border: 0;
    font-weight: 700;
    cursor: pointer;
    color: #fff;
    min-width: 110px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  }

  /* Colors */
  .cg-success .cg-icon { background: linear-gradient(90deg,#dcfff0,#d7fff8); color:#0c8b5f; }
  .cg-success .cg-btn { background: linear-gradient(90deg,#00c37a,#00a6ff); color:#062c2a; }

  .cg-error .cg-icon { background: linear-gradient(90deg,#fff0f0,#ffecec); color:#d33; }
  .cg-error .cg-btn { background: linear-gradient(90deg,#ff6b6b,#ff3d3d); }

  .cg-warning .cg-icon { background: linear-gradient(90deg,#fff9ec,#fff2d9); color:#d58b00; }
  .cg-warning .cg-btn { background: linear-gradient(90deg,#f4b400,#ffbf33); color:#5a3800; }

  /* Close (x) hover */
  .cg-popup-close:hover { color: #444; }
  `;

  const style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  const popupHTML = `
    <div class="cg-popup-overlay" id="cg-popup-overlay" aria-hidden="true">
      <div class="cg-popup" role="dialog" aria-modal="true" aria-labelledby="cg-popup-title">
        <div class="cg-popup-close" id="cg-popup-close" title="Close">&times;</div>
        <div class="cg-icon" id="cg-popup-icon">✓</div>
        <h2 id="cg-popup-title">Title</h2>
        <p id="cg-popup-message">Message</p>
        <div class="cg-hr"></div>
        <button id="cg-popup-btn" class="cg-btn">OK</button>
      </div>
    </div>
  `;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = popupHTML;
  document.body.appendChild(wrapper.firstElementChild);

  const overlay = document.getElementById('cg-popup-overlay');
  const btn = document.getElementById('cg-popup-btn');
  const closeX = document.getElementById('cg-popup-close');
  const iconEl = document.getElementById('cg-popup-icon');
  const titleEl = document.getElementById('cg-popup-title');
  const msgEl = document.getElementById('cg-popup-message');

  function showPopup(type = 'success', title = '', message = '', btnText = 'OK', autoCloseMS = 0) {
    titleEl.textContent = title;
    msgEl.textContent = message;
    btn.textContent = btnText;

    overlay.className = 'cg-popup-overlay';
    overlay.classList.add('show');
    overlay.classList.remove('cg-success', 'cg-error', 'cg-warning');
    overlay.classList.add('cg-' + (type || 'success'));

    if (type === 'success') iconEl.innerHTML = '✔';
    else if (type === 'error') iconEl.innerHTML = '✖';
    else if (type === 'warning') iconEl.innerHTML = '⚠';
    else iconEl.innerHTML = '';

    overlay.setAttribute('aria-hidden', 'false');

    btn.focus();

    if (autoCloseMS && autoCloseMS > 0) {
      setTimeout(hidePopup, autoCloseMS);
    }
  }

  function hidePopup() {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
  }


  closeX.addEventListener('click', hidePopup);
  btn.addEventListener('click', hidePopup);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hidePopup(); 
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('show')) hidePopup();
  });

  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) {
      console.warn('contact.js: .contact-form not found — popup module injected but form missing.');
      return;
    }

    const getField = (placeholder, type = 'input') => {
      let el = form.querySelector(`${type}[placeholder="${placeholder}"]`);
      if (!el) el = form.querySelector(`${type}[name="${placeholder}"]`);
      return el;
    };

    const fullNameEl = getField('Full Name') || form.querySelector('input[name="fullname"]') || null;
    const emailEl = getField('Email Address') || form.querySelector('input[type="email"]') || null;
    const phoneEl = getField('Phone Number') || form.querySelector('input[name="phone"]') || null;
    const subjectEl = getField('Email Subject') || form.querySelector('input[name="subject"]') || null;
    const messageEl = form.querySelector('textarea') || form.querySelector('textarea[name="message"]') || null;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = (fullNameEl && fullNameEl.value || '').trim();
      const email = (emailEl && emailEl.value || '').trim();
      const phone = (phoneEl && phoneEl.value || '').trim();
      const subject = (subjectEl && subjectEl.value || '').trim();
      const message = (messageEl && messageEl.value || '').trim();

      if (!fullName || !email || !phone || !subject || !message) {
        showPopup('error', 'Error', 'Please fill in all fields!', 'TRY AGAIN');
        return;
      }

      if (!emailPattern.test(email)) {
        showPopup('error', 'Invalid Email', 'Enter a valid email (letters & numbers only).', 'TRY AGAIN');
        if (emailEl) emailEl.focus();
        return;
      }

      const digits = phone.replace(/\D/g, '');
      if (digits.length < 8) {
        showPopup('warning', 'Invalid Phone', 'Enter a valid phone number.', 'OK');
        if (phoneEl) phoneEl.focus();
        return;
      }

      showPopup('success', 'Successful', 'Message sent successfully!', 'CLOSE');

      setTimeout(() => {
        try { form.reset(); } catch (err) { /* ignore */ }
      }, 200);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();
