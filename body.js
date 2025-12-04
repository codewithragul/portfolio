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