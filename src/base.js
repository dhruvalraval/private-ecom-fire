const menuicon = document.querySelector('.menu');
const one = document.querySelector('#one');
const two = document.querySelector('#two');
const menu = document.querySelector('#menu');


menuicon.addEventListener('click', function(){
    const scrollY = window.pageYOffset;
    menu.classList.toggle('show');
         
    if(menu.classList.contains('show')){
        menu.style.top = `${scrollY}px`;
        menu.addEventListener('mousewheel', (e) => {
            e.preventDefault();
        });
    } 
    else{
        menu.style.top = `${scrollY}px`;
    };
})