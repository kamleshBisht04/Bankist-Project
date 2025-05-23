'use strict';

/////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(event => {
  event.addEventListener('click', openModal);
});

// above we are using for each loop instred of for loop
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////////////

//////    SMOOTH SCROLLING   ---------------->

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////////////////////////////

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   if (e.target.classList.contains('nav__link')) {
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });

// btnScrollTo.addEventListener('click',function(e){

// learning about section cordinates and scrollx and Y cordinatec ||
// current scroll|| height and width of viewPort

// const s1coords= section1.getBoundingClientRect();
// console.log(s1coords);

// console.log(e.target.getBoundingClientRect());

// console.log('current scroll X/Y : ', window.scrollX,window.scrollY);

// console.log('Height/Width of viewPort : ',
// document.documentElement.clientHeight,
// document.documentElement.clientWidth
// );

// fuction calculating distance but not from top
// window.scrollTo(s1coords.left,s1coords.top);

// Scrolling
// window.scrollTo(
//   s1coords.left + window.scrollX,
//   s1coords.top + window.scrollY
// );

//---------------- older way to scroll the section

// window.scrollTo({
//   left: s1coords.left + window.scrollX,
//   top: s1coords.top + window.scrollY,
//   behavior: 'smooth',
// });
//------------------mordern way to scroll
// section1.scrollIntoView({behavior :'smooth'});
// });

////////////////////////////////////////////////////
// Event Delegation implementing page
// Page navigation

// document.querySelectorAll('.nav__link').forEach((el)=>{
//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     const id = e.target.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({behavior : 'smooth'});
//   });
// });

// Better way to do it using event delegation

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);

  // Matching strategy

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////////////////////////////////////////////////
// Tabbed component

// not good to attached eventlistener at every tab
// tabs.forEach(t=>t.addEventListener('click',()=>{
//   console.log('tab');
// }));

////////////////////////////////////////////////////////

// using event delegation
tabsContainer.addEventListener('click', function (e) {
  // matching parent strategy (button)
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // Guard clause ==> null in container no matching parent
  // if null return otherwise rest of code will exexute.
  if (!clicked) return;
  //  Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activating tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////////////////////////

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation:

// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll',function(e){
//   // console.log(window.scrollY);
//   if(this.window.scrollY >initialCoords.top){
//    nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });
///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entire) {
  const [entry] = entire;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // rootMargin :'-90px'
  rootMargin: `${-navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////////////////////////
// Reveal sections

const allSection = document.querySelectorAll('.section');

const revelSection = function (entire, observe) {
  entire.forEach(entry => {
    // not intersectiong return gaurd clause // loop over the entries array to observe all
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observe.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revelSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////////////////////////
// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entire, observe) {
  const [entry] = entire;
  //  console.log(entry);
  if (!entry.isIntersecting) return;

  // Replace src with data-src and remove blur class
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.8, //   => 0,1 ,2 ,3
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////////////////
// SLIDER LOGIC

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide ="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      //let curSlide = 1 =>  -100% 0% 100% 200%
    });
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // previous slide -1 is becoz node is not index based
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // make initial vaule as function
  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };

  init();

  //Event handler
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // for keyboard event left and right
  document.addEventListener('keydown', function (e) {
    // if and else or sort circiting version
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();

///////////////////////////////////////////////////////////
///////////   LEARNING SLIDER ////////////////////////////
// Slider

// const slides = document.querySelectorAll('.slide');
// const btnLeft = document.querySelector('.slider__btn--left');
// const btnRight = document.querySelector('.slider__btn--right');
// const slider = document.querySelector('.slider');
// const dotContainer = document.querySelector('.dots');

// // slider.style.transform = 'scale(0.4) translateX(-800px';
// // slider.style.overflow = 'visible';

// let curSlide = 0;
// const maxSlide = slides.length;

// const createDots = function () {
//   slides.forEach((_, i) => {
//     dotContainer.insertAdjacentHTML(
//       'beforeend',
//       `<button class="dots__dot" data-slide="${i}"></button>`
//     );
//   });
// };
// createDots();

// const activateDot = function (slide) {
//   document
//     .querySelectorAll('.dots__dot')
//     .forEach(dot => dot.classList.remove('dots__dot--active'));
//   // select on the base the data set attribute
//   document
//     .querySelector(`.dots__dot[data-slide="${slide}"]`)
//     .classList.add('dots__dot--active');   
// };

// const goToSlide = function (slide) {
//   slides.forEach(
//     (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
//   );
// };
// // initial setting
// goToSlide(0);
// activateDot(0);

// const nextSlide = function () {
//   if (curSlide === maxSlide - 1) {
//     curSlide = 0;
//   } else {
//     curSlide++;
//   }
//   goToSlide(curSlide);
//   activateDot(curSlide);
// };

// const prevSlide = function () {
//   if (curSlide == 0) {
//     curSlide = maxSlide-1;
//   }
//   curSlide--;
//   goToSlide(curSlide);
//   activateDot(curSlide);
// };

// btnRight.addEventListener('click', nextSlide);
// btnLeft.addEventListener('click', prevSlide);

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'ArrowLeft') prevSlide();
//   e.key === 'ArrowRight' && nextSlide();
// });

// // useing event delegations
// dotContainer.addEventListener('click', function (e) {
//   if (e.target.classList.contains('dots__dot'));
//   curSlide = Number(e.target.dataset.slide);
//   goToSlide(curSlide);
//   activateDot(curSlide)
// });


/*

///////////////////////////////////////////////////////////
//////////////  ==> Quick reference for future 

// 1 .selecting element (dom object)

// selecting whole entire document css inwhole doc 
console.log(document.documentElement);

// selecting the head and body
console.log(document.head);
console.log(document.body);

// quarySelector
const header =document.querySelector('.header');
console.log(header);

// quaryselectorAll for multiple document 
// nodelist 
const allSection = document.querySelectorAll('.section');
console.log(allSection);

// id selector
document.getElementById('section--1');

// tag selector (selection button tag) return htmlcollections live collection => dom changes => collection change 
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// class selector
console.log(document.getElementsByClassName('btn'));


///////////////////////////////////////////////////

// creating and inserting element 

// in movement section 
// .insertAdjacentHTML

// ADDING MOVEMENTS IN THE SCROLL BAR
const displayMovements = function(movements ,sort=false){
  containerMovements.innerHTML = ' ';
  //.textContent = 0
  // SORT IN ASSIENDING  SICE SHELLO COPY BUT SORT CHANGE UNDERLAYING DATA
  const movs= sort ? movements.slice().sort( (a,b)=> a-b) : movements;

 movs.forEach(function(mov,i){
  const type =mov > 0 ?'deposit' : 'withdrawal'
  const html = `
   <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1}
        ${type}</div>
        
        <div class="movements__value">${mov} ₹</div>
      </div>
  `;
  containerMovements.insertAdjacentHTML("afterbegin",html)

 });
};

/////////////////////////////////////////////////////////
//-------------------------------------------------
// 2 way to creating element 

const message = document.createElement('div');
// manually insert it before it in not any where in dom object
// adding class 
message.classList.add('cookie-message');
// this insert simply text
message.textContent="we use cookied for improved functionality and analytics."
// also insert innerHtmlTag
message.innerHTML=`we use cookied for improved functionality and analytics. 
                   <button class="btn btn-close--cookie">Got it!</button>`;
// adding inside the header
// header.prepend(message);                 // first child
header.append(message);                  // last child 
// it append ones in the html document   // live element 
// insert multiple copy if we want 
// header.append(message.cloneNode(true));

// 2 more method befor and after 

// header.before(message);
// header.after(message);

// DELETE THE ELEMENTS

document.querySelector('.btn-close--cookie').addEventListener('click',()=>{
  message.remove();
   // old ways
  // message.parentElement.removeChild(message);
});

/////////////////////////////////////////////////////////
//----------------------------------------------------------
// STYLES ATTRIBTES AND CLASSES IN DOM

//style
// set as inline style direcltly in Dom
message.style.backgroundColor = '#37383d';
message.style.width='120%';

// it doen't work because we are not setting it inline 
console.log(message.style.color);
console.log(message.style.height);
console.log(message.style.backgroundColor); /// IT WORK

// we can get style use getComputedStyle() function

console.log(getComputedStyle(message).color);
// we are not define but brower calculated the height.
console.log(getComputedStyle(message).height); 

// setting the height of the message element 
message.style.height= Number.parseFloat(getComputedStyle(message).height)+40+"px";

// css custom property === css variables 
// change the clour of page by setting ones
// we can set all type of properties 
document.documentElement.style.setProperty('--color-primary','orange');

// Attributes
// we can acess the attributes of the element (html)
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); // Absolute
console.log(logo.className);

// also set the attributes
logo.alt='Beautiful minimalist logo';

// non-standard
console.log(logo.designer); // undefine not standerd propety
//reading from the Dom 
console.log(logo.getAttribute('designer'));

// setting new attributes in Dom object
logo.setAttribute('company','Bankist);

// getting the href relative url of dom use getAttribute
console.log(logo.src);
console.log(logo.getAttribute('src')); // relative

// same for href attrubutes in link
const link = document.querySelector('.nav__link--btn');

console.log(link.href); // absolute url
console.log(link.getAttribute('href'));// relative url

// important 

// Data attributes (special attributes)
// read from logo we set it data variable
// work with ui and store data in html userinterface
console.log(logo.dataset.versionNumber);

// classes IN DOM
// adding the class in our dom html element 
logo.classList.add('c','j'); // pass multiple class
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

*/
/////////////////////////////////////////////////////////////
/*

//EVENT PROPOGATION EXAMPLE (Event Propagation in Practice) => 

const randomInt = (min ,max)=>
  Math.floor(Math.random() * (max -min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

//  console.log(randomColor(0,255));
document.querySelector('.nav__link').addEventListener('click',function(e){
  this.style.backgroundColor =randomColor();

  // e.target is eventtarget where the click happend current target will be different 
  // this keyword and e.target is same 
  console.log(e.target ,e.currentTarget);
  console.log(e.currentTarget === this);

  // STOP PROPOGATION
  e.stopPropagation();
  
  //  WORK WHERE MULTIPLE HANDLER ATTACHED TO SINGLE CLASS 
  // e.stopImmediatePropagation();
});

document.querySelector('.nav__links').addEventListener('click',function(e){
    this.style.backgroundColor =randomColor();
    console.log(e.target ,e.currentTarget);
  
});
document.querySelector('.nav').addEventListener('click',function(e){
    this.style.backgroundColor =randomColor();
     console.log(e.target ,e.currentTarget);
},true);
// true and false as third flag variable  in addeventlistner for capaturing phase event occour.

*/

/*

/////////////////////////////////////////////////////////
// Reference lacture for 
// ------------- DOM TRAVERSING ------------
// walking through the DOM 
// we can select an element based on another element 
const h1= document.querySelector('h1');

// GOING DOWNWORDS (---DEEPER IN DOM SELECTING)
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color ='orange';

// GOING UPWARDS : SELECTING THE PARENT

console.log(h1.parentElement);
console.log(h1.parentNode);

h1.closest('.header').style.background ="var(--gradient-secondary)";
h1.closest('h1').style.background ="var(--gradient-primary)";

console.log(
  (h1.closest('.header').querySelector('.nav').style.color = 'green')
);

//GOING SIDEWAYS : SIBLINGS

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling.style.color ='white');

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(e){
  if(e!== h1){
    e.style.transform= 'scale(0.5)';
  }
})

*/
/////////////////////////////////////////////////////////

// Menu fade animation

// Refectoring  the menu fade animation

// const handleHover =function(){

// }

// nav.addEventListener('mouseover',function(e){
// if(e.target.classList.contains('nav__link')){
//    const link =e.target;
//    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//    const logo = link.closest('.nav').querySelector('img');
//    siblings.forEach(el=>{
//     if(el!==link) el.style.opacity = 0.5;
//    });
//    logo.style.opacity = 0.5;
// };
// });

// nav.addEventListener('mouseout',function(e){
// if(e.target.classList.contains('nav__link')){
//    const link =e.target;
//    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//    const logo = link.closest('.nav').querySelector('img');
//    siblings.forEach(el=>{
//     if(el!==link) el.style.opacity = 1;
//    });
//    logo.style.opacity = 1;
// };
// });

///////////////////////////////////////////////////////////////

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

// const obsCallback = function(entires ,observer){
//    entires.forEach(entry=>{
//   console.log(entry);
// add class and condition isIntersection true or false
//    });
// };

// const obsOptions ={
//   root :null,      // viewport
//   threshold : 0.1 // [0.1,0.2]
//  rootMargin: '-90px'
// };

// const observe = new IntersectionObserver(obsCallback ,obsOptions);
// observe.observe(section1);

////////////////////////////////////////////////////////////
// ---------------entry k badle m entries ko check for all section

// const allSections = document.querySelectorAll('.section');

// const revealSection = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   entry.target.classList.remove('section--hidden');
//   observer.unobserve(entry.target);
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
// });

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

//  rough learining phase for slider

// const slides= document.querySelectorAll('.slide');
// const slider = document.querySelector('.slider');
// const btnLeft = document.querySelector('.slider__btn--left');
// const btnRight = document.querySelector('.slider__btn--right');
// const dotContainer = document.querySelector('.dots');

// let curSlide = 0;
// const maxSlide = slides.length;

// // slider.style.transform ='scale(0.4) translateX(-800px)';
// // slider.style.overflow = 'visible';

// const createDots = function(){
//   slides.forEach(function(_,i){
//    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`);
//   });
// };

// createDots();

// const activateDot = function(slide){
//   document.querySelectorAll('.dots__dot').forEach((dot)=>
//    dot.classList.remove('dots__dot--active'));

//   document.querySelector(`.dots__dot[data-slide ="${slide}"]`).classList.add('dots__dot--active');
// };

//  activateDot(0);

// const goToSlide = function(slide){
// slides.forEach((s,i)=>{
//     s.style.transform = `translateX(${100 *(i-slide)}%)`;
//     //let curSlide = 1 =>  -100% 0% 100% 200%
//   });
// };

// goToSlide(0);

// // Next slide
// const nextSlide = function(){
// if(curSlide ===maxSlide-1){
//  curSlide =0
// }else{
// curSlide++;
// }
//   goToSlide(curSlide);
//   activateDot(curSlide);
// };

// // previous slide -1 is becoz node is not index based
// const prevSlide = function(){
//   if(curSlide===0){
//     curSlide=maxSlide-1;
//   }else{
//     curSlide--;
//   }
//   goToSlide(curSlide);
//   activateDot(curSlide);
// };

// btnRight.addEventListener('click', nextSlide);
// btnLeft.addEventListener('click',prevSlide);

// // for keyboard event left and right
// document.addEventListener('keydown',function(e){
//   // if and else or sort circiting version
//     if(e.key==='ArrowLeft')prevSlide();
//     e.key === 'ArrowRight' && nextSlide();
// });

// dotContainer.addEventListener('click',function(e){
//   if(e.target.classList.contains('dots__dot')){
//     curSlide = Number(e.target.dataset.slide);
//     goToSlide(curSlide);
//     activateDot(curSlide);
//   }
// });

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

///////////////////////////////////////
// Lifecycle DOM Events

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML parsed and DOM tree built!', e);
// });

// window.addEventListener('load', function (e) {
//   console.log('Page fully loaded', e);
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

//***************************************************************** */
//***************************************************************** */
//***************************************************************** */
//***************************************************************** */

/////////////////////////////////////////////////////////////
// // problem 1
// JS is const or the if condation is false

// const JS  = "💔";

// if(0===1){
//   JS = "💰";
// }

// console.log(JS)

// problem 2
// let keyword msg can share same scope

// let  a ="🤡";

// switch (a) {
//   case '🤡':

//       let msg = 'moye moye';
//       console.log(msg);
//       break;

//   case '😊':
//     let msg = 'happy happy';
//     console.log(msg1);
//     break;
// }

// problem 3
// in java array is flexiable can change length at given time
// loop Hole ==>  for each loop when ever we skip the index in javascript create empty slots and
// these empty slots don't have initilization (fact)

// const arr =[];
// arr[10]=10;
// console.log(arr);

// arr[100]=100;
// console.log(arr);

// arr.forEach(b =>console.log("hi"));

// problem 4
// reference error  z is not define
// hoisting m scope setting and initilization hota hai if z is declare  it is hoisting to UNDIFINE

// console.log(z);

//  z=1;

// problem 5
// foreach loop don't work no index is initilize (index must)
// console print an array of [empty * 2]
// if we distructur we will print that emoji==>dowm example

// [...arr].forEach(elem => {
//   console.log('😀');
// });

// var arr = new Array(2);
// console.log(arr);

// arr.forEach(elem =>{
//   console.log("😀");
// });

// problem 6 (check again for hoiesting )
// becasuse  show functin not called anywhere ...
//

// var show =1;
// console.log(show);

// function show(){
//   console.log("😀");
// }

// console.log(show);

// problem 7
// better way to acess the array elements in reverse order  At() method

// let a =[4,2,5,6,8,9];

// console.log(a[a.length-1]);

// better way

// console.log(a.at(-1));
// console.log(a.at(0));
// console.log(a.at(-2));
// console.log(a.at(-3));
// console.log(a.at(-4));
// console.log(a.at(-5));
// console.log(a.at(-6));

// problem 8
// both are the way to initilize the array
// Array() and new Array() does same thing
// coma , will initilize the value

// console.log(new Array(1,2));
// console.log(Array(2));        // create [2 * empty]

// problem 9
// NaN is false value in javascript
// it is a value that not equal to itself

// if(NaN){
//   console.log('Sucess');
// }else{
//   console.log('Fail');
// }

// console.log(NaN == false);
// console.log(NaN === 0);
// console.log(NaN ==="");
// console.log(NaN == 0);

// console.log(NaN == NaN);
// console.log(NaN === NaN);

// // to check the equal
// console.log(Object.is(NaN,NaN));

// problem 10
// str templete lettrel settime out use evel function

// setTimeout(()=>{
//   console.log("🌳🌳");
// },1000)

// const str = `let n1 = 2; let n2 =2 ;
// console.log(n1 + n2);
// `
// setTimeout(str,1000)

// problem 11
