'use strict';

/////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');



const openModal = function (e) {
  e.preventDefault();             
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(event =>{
  event.addEventListener('click',openModal)
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

//////    SMOOTH SCROLLING   ---------------->

const btnScrollTo =document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');


btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});












/////////////////////////////////////////////////////////






/*

/////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////

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


//-------------------------------------------------
// 2 way to creating element 

const message = document.createElement('div');
// manually insert it before it in not any where in dom object
// adding class 
message.classList.add('cookie-message');
// this insert simply text
message.textContent="we use cookied for improved functionality and analytics."
// also insert innerHtmlTag
message.innerHTML=`we use cookied for improved functionality and analytics. <button class="btn btn-close--cookie">Got it!</button>`;
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

//----------------------------------------------------------
// STYLES ATTRIBTES AND CLASSES IN DOM

//style
// set as inline style direcltly in Dom
message.style.backgroundColor = '#37383d';
message.style.width='120%';

// it doen't work because we are not setting it inline 
console.log(message.style.color);
console.log(message.style.height);
console.log(message.style.backgroundColor);

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
console.log(logo.src);
console.log(logo.className);

// also set the attributes
logo.alt='Beautiful minimalist logo';

// non-standard
console.log(logo.designer); // undefine not standerd propety
//reading from the Dom 
console.log(logo.getAttribute('designer'));
// setting new attributes in Dom object
logo.setAttribute('company','Bankist');

// getting the href relative url of dom use getAttribute
console.log(logo.src);
console.log(logo.getAttribute('src'));

// same for href attrubutes in link
const link = document.querySelector('.nav__link--btn');

console.log(link.href); // absolute url
console.log(link.getAttribute('href'));// relative url

// Data attributes (special attributes)
// read from logo we set it data variable
// work with ui and store data in html userinterface
console.log(logo.dataset.versionNumber);

// classes IN DOM
logo.classList.add('c','j'); // pass multiple class
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');


*/
/////////////////////////////////////////////////////////////














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









































