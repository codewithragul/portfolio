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

// ======================== server.js==========================  //

(function () {
  const emailPattern = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
  const toastAutoCloseMS = 2500;

  const css = `/* ... your same css ... */`;
  // (for brevity: use the same css string you had previously)
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
  overlay.addEventListener('click', (e) => { if (e.target === overlay) hidePopup(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('show')) hidePopup(); });

  // ---- contact form init (everything in this scope) ----
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

    form.addEventListener('submit', async (e) => {
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

      const payload = {
        fullName, email, phone, subject, message,
        submittedAt: new Date().toISOString(),
        page: location.href
      };

      try {
        const resp = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (resp.ok) {
          showPopup('success', 'Successful', 'Message sent successfully!', 'CLOSE', toastAutoCloseMS);
          form.reset();
          return;
        } else {
          console.warn('server returned non-ok:', resp.status);
          throw new Error('Server error ' + resp.status);
        }
      } catch (err) {
        console.warn('Failed to send to server, saving locally', err);
        try {
          const key = 'cg_messages';
          const existing = JSON.parse(localStorage.getItem(key) || '[]');
          existing.push(payload);
          localStorage.setItem(key, JSON.stringify(existing));
          showPopup('success', 'Saved Locally', 'Message saved locally (owner can retrieve it).', 'CLOSE', toastAutoCloseMS);
          form.reset();
        } catch (le) {
          console.error('localStorage failed', le);
          showPopup('error', 'Failed', 'Could not send or save message. Try again later.', 'OK');
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
  // ---- end contact form init ----
})();

