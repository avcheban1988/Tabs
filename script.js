window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    
    
    
    
//tabs
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


//timer
let deadLine = '2023-03-26';

function getTimeRamaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor(t/(1000*60*60));
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
}

function setClock(id, endtime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

        if (getTimeRamaining(endtime).total <= 0) {  //проверка на то, что время вышло, чтоб назад не шло
            clearInterval(timeInterval);
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
        }
    
    function updateClock(){
        let t = getTimeRamaining(endtime);
        hours.textContent = t.hours;
        minutes.textContent = t.minutes;
        seconds.textContent = t.seconds;
        if (t.total < 0) {
            clearInterval(timeInterval);
        }
    }
}
setClock('timer', deadLine)

//modalWindow


    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    function openModal1(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }
    function closeModal1() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    more.addEventListener('click', openModal1);
    close.addEventListener('click', closeModal1);

    let moreInTabs = document.querySelectorAll('.description-btn');
    moreInTabs.forEach((button) => {
        button.addEventListener('click', openModal1);
    });



    // Form
    let message = {
        loading: 'Загрузка',
        success: 'Успешно, скоромы в Вами свяжемся',
        failure: 'Что-то пошло не так, смело звоните нам'
    };
    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    form.addEventListener('submit', function (event){
        event.preventDefault(); //страница не перезагружается при нажатии на кнопку
        form.appendChild(statusMessage); //добавляем в форму наш div со статусом 'status'

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);
        request.send(formData);
        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if 
                (request.readyState === 4 && request.status === 200) {
                    statusMessage.innerHTML = message.success;
                }
            else {
                statusMessage.innerHTML = message.failure;
            }
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        
        })
    })

    //slider


    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dot = document.querySelectorAll('.dot'),
        onclickDot = 0;

    function showSlides(n) {
        //добавляем проверку на то, вдруг это первый или последний слайд
        if (n > slides.length) {
            slideIndex = 1;//если слайды закончились в карусели, то возвращаемся к первому
        }
        if (n < 1) {
            slideIndex = slides.length;//если меньше единицы, то уходим на последний слайд в карусели
        }

        slides.forEach((item) => item.style.display = 'none'); //скрыли все слайды
        dot.forEach((elem) => elem.classList.remove('dot-active'));//скрыли активные точки
        slides[slideIndex - 1].style.display = 'block';//первый слайд показали
        dot[slideIndex - 1].classList.add('dot-active');//первая точка активная
    }

    showSlides(1); //показываем первый слайд и первую точки

    function plusSlides(n) { //функция увеличения индекса слайда
        showSlides (slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex == n);
    }

    prev.addEventListener('click', function () { //вешаем на кнопки
        plusSlides(-1);
    })
    next.addEventListener('click', function () {
        plusSlides(1);
    })

    //dots

    function clearDots() { //функция, чтоб стереть все точно
        dot.forEach((elem) => elem.classList.remove('dot-active'));
    }
    function makeActiveDots() {
        dot.forEach(function (elem, index) { //перебираем все точки
            elem.addEventListener('click', evt => { //по клику на точку
            clearDots()             //стираем активыне точки
            onclickDot = index; //получаем индекс кликнутой точки
            dot[onclickDot].classList.add('dot-active') //кликнутой точки задаем класс
            slides.forEach((item) => item.style.display = 'none'); //прячем все слайды
            slides[onclickDot].style.display = 'block'; //слайду, который соответствует индексу точки, делаем дисплей БЛОК
            slideIndex = onclickDot + 1; //меняем индекс слайда, для актуального номера, при нажатии на кнопки
                console.log(onclickDot);
            })
        })
    }
makeActiveDots()

    //calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = '0';

    persons.addEventListener('input', function () {
        personsSum = this.value
        total = (parseInt(daysSum) + parseInt(personsSum)) * 4000
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = '0';

        }   else {
            totalValue.innerHTML = total;
        }

    })
    restDays.addEventListener('input', function () {
        daysSum = this.value
        total = (parseInt(daysSum) + parseInt(personsSum)) * 4000
        if (persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = '0';

        }   else {
            totalValue.innerHTML = total
        }
    })

    place.addEventListener('change', function () {
    if ((persons.value == '') || (restDays.value == '')) {
        totalValue.innerHTML = '0';
    }
    else {
        let a = total;
        totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
    });
});

