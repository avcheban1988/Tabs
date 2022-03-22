window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabcontent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabcontent.length; i++){
            tabcontent[i].classList.remove('show');
            tabcontent[i].classList.add('hide');
        }
    }
    hideTabContent(1); /*скрываются все контекты, кроме первого*/


    function showTabContent(b) {
        if (tabcontent[b].classList.contains('hide')) {
            tabcontent[b].classList.remove('hide');
            tabcontent[b].classList.add('show');
        }
    }
    info.addEventListener('click', function (event) {
        let target = event.target;
        console.log(target)
        if (target.classList.contains('info-header-tab')){
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0); /*скрывает все табы*/
                    showTabContent(i);
                    break;
                }
            }
        }
    })
})

for (let index = 0; index < array.length; index++) {
    const element = array[index];
    
}