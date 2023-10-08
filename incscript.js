const slider= document.querySelector('[data-length-slider]');
const passlentgh= document.querySelector('[passlength]');
const datapassworddisplay = document.querySelector('[data-password-display]');
const copymsg = document.querySelector('[copy-msg]');
const copybutton = document.querySelector('[copy-button]');
const uppercheck= document.querySelector('#uppercase');
const lowercheck= document.querySelector('#lowercase');
const numbercheck= document.querySelector('#numbers');
const symbolcheck= document.querySelector('#symbols');
const marker= document.querySelector('[marker]');
const generatebutton= document.querySelector('.generatebutton');
const checkboxes = document.querySelectorAll('input[type=checkbox]');
const symbols= '~`!@#$%^&*()_+-={}[]:;<>?,./|';

let password="";
let passwordlength=10;
let checkcount=0;
handleslider();
uppercheck.checked=true;
changecolor('#ccc');


//functions
//to handle slider
function handleslider(){
    slider.value= passwordlength;
    passlentgh.innerText= passwordlength;
}

//function to change indicator color

function changecolor(color){
    marker.style.backgroundColor= color;

}
changecolor('#ccc');

//function to generate random integers

function getrandominteger(min, max){
    return Math.floor(Math.random()*(max-min))+min;
}

//function to get random numbers

function getrandomnumber(){
    return getrandominteger(0,9);
}

//function to get random lowercase

function getrandomlowercase(){
    return String.fromCharCode( getrandominteger(97,123));

}

//function to get uppercase
function getrandomuppercase(){
    return String.fromCharCode( getrandominteger(65,91));
}


//function to get random symbols

function getrandomsymbols(){
    let rand= getrandominteger(0,symbols.length);
    return symbols.charAt(rand);

}

//function to display strength

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercheck.checked) hasUpper = true;
    if(lowercheck.checked) hasLower = true;
    if(numbercheck.checked) hasNumber = true;
    if(symbolcheck.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordlength >= 8){
        changecolor("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordlength >= 6){
        changecolor("#ff0");
    }
    else{
        changecolor("#f00");
    }
}


//function to show copied text

async function copy(){
    try{
        await navigator.clipboard.writeText(datapassworddisplay.value);
        copymsg.innerText= 'Copied';
    }
    catch(e){
        copymsg.innerText="Failed";
    }

    copymsg.classList.add("active");

    setTimeout(()=>{
        copymsg.classList.remove("active");
    },2000);
}

copybutton.addEventListener("click", () => {
    // if (password) copyContent();
    copy();
});

//adding event listener to slider

slider.addEventListener('input', (e)=>{
    passwordlength= e.target.value;
    handleslider();
})

//checkbox event

function handlechange(){
    checkcount=0;
    checkboxes.forEach((checkbox)=>{
        if(checkbox.checked){
            checkcount++; 
        }
    })

    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
}

checkboxes.forEach( (checkbox)=> {
    checkbox.addEventListener('change', handlechange);

})

//adding eventlistener to button

generatebutton.addEventListener('click',()=>{
    if(checkcount==0){
        return;
    }

    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }

    //finding a password

    password="";


    let funcArr= [];
    if(uppercheck.checked){
        funcArr.push(getrandomuppercase);
    }
    if(lowercheck.checked){
        funcArr.push(getrandomlowercase);
    }
    if(numbercheck.checked){
        funcArr.push(getrandomnumber);
    }
    if(symbolcheck.checked){
        funcArr.push(getrandomsymbols);
    }

    //compusory addition

    for(let i=0; i<funcArr.length; i++){
        password+= funcArr[i]();
    }

    //remaining addition
    for(let i=0; i<passwordlength-funcArr.length; i++){
        let randint= getrandominteger(0, funcArr.length);
        password+= funcArr[randint]();


    }

    datapassworddisplay.value= password;

    marker();

})



