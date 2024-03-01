const triline_menu = document.querySelector('.menu');
const mobile_menu = document.querySelector('.mobile-menu');

const menuCT = document.getElementById("menuCT");


triline_menu.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu(){
    
    mobile_menu.classList.toggle('inactive');
}

menuCT.addEventListener("change", selectOption);
const ac_number = document.querySelector('.ac-number');
const ac_name = document.querySelector('.ac-name');
function selectOption() {
    var selectedOption = document.getElementById("menuCT").value;
    if(selectedOption === "number") {
        ac_number.classList.remove('inactive');
        ac_name.classList.add('inactive');
    } else if(selectedOption === "name") {
        ac_name.classList.remove('inactive');
        ac_number.classList.add('inactive');
    }
}

/* function toggleACNumber(){
    ac_number.classList.toggle('inactive');
}

function toggleACName(){
    ac_name.classList.toggle('inactive');
}
 */

//const screen1 = document.getElementById('screen1');

const ipInputs = document.querySelectorAll('.ip-input');

ipInputs.forEach(function(input) {
    input.addEventListener('input', function(event) {
    let currentValue = event.target.value;
    let sanitizedValue = currentValue.replace(/[^0-9]/g, '');
    event.target.value = sanitizedValue;
    });
});

const iIp1 = document.getElementById('iIp1');
const iIp2 = document.getElementById('iIp2');
const iIp3 = document.getElementById('iIp3');

iIp1.addEventListener('input', function(event) {
    let currentValue = event.target.value;
    //let sanitizedValue = currentValue.replace(/[^0-9]/g, '');
    document.getElementById('lIp1').value = currentValue;
});
iIp2.addEventListener('input', function(event) {
    let currentValue = event.target.value;
    //let sanitizedValue = currentValue.replace(/[^0-9]/g, '');
    document.getElementById('lIp2').value = currentValue;
});
iIp3.addEventListener('input', function(event) {
    let currentValue = event.target.value;
    //let sanitizedValue = currentValue.replace(/[^0-9]/g, '');
    document.getElementById('lIp3').value = currentValue;
});
  
function clearScreen() {
    document.getElementById('screen1').value = '';
    document.getElementById('screen2').value = '';
    document.getElementById('screen3').value = '';

    document.getElementById('description').textContent = ``;

}

function getRandomEmoji() {
    const emojis = [
      '😊', '😂', '😍', '🥳', '🎉', '👍', '🌟', '❤️', '🎈', '🍕', '🍩', '🚀', '🦄', '🌈', '🎶'
    ];
  
    const randomIndex = Math.floor(Math.random() * emojis.length);
  
    return emojis[randomIndex];
  }

function ipValidation(iIp1, iIp2, iIp3, iIp4, lIp4) {
    if (iIp1 < 255 && iIp2 < 255 && iIp3 < 255 && iIp4 < 255 && lIp4 < 255) {
        return true;
    }

    if (iIp4 < lIp4) {
        return true;
    }

    return false;
}

function calculate() {

    const iIp4Value = document.getElementById('iIp4').value;
  
    if (iIp4Value.trim() === null || iIp4Value.trim() === ''){
        document.getElementById('screen3').value = getRandomEmoji();
        return;
    }
    
    const menuCT = document.getElementById("menuCT");

try {
    
    document.getElementById('screen3').value = '';
    document.getElementById('description').textContent = '';
    
    const menuAT = document.getElementById("menuAT").value;

    const iIp1 = parseInt(document.getElementById('iIp1').value);
    const iIp2 = parseInt(document.getElementById('iIp2').value);
    const iIp3 = parseInt(document.getElementById('iIp3').value);
    const iIp4 = parseInt(document.getElementById('iIp4').value);

    const lIp4 = parseInt(document.getElementById('lIp4').value);
/* 
    if (ip)

    if(menuAT === "standard" && menuCT === "number"){

    } */


    // const iIp4 = parseInt(document.getElementById('screen1').value);
    // const lIp4 = parseInt(document.getElementById('screen2').value);


    const accessList = document.getElementById('accessID').value;

    if (ipValidation(iIp1, iIp2, iIp3, iIp4, lIp4)) {


        const serie = [0, 1, 3, 7, 15, 31, 63, 127, 254, 255];

        let spaces = lIp4 - iIp4 + 1;
        let currentSerie;
        document.getElementById('description').textContent += `[${lIp4}] - [${iIp4}] + 1 = ${spaces} espacios\n`;
        document.getElementById('description').textContent += `-------------------------------------\n`;
        
        let i = 9;
        
        while (spaces <= serie[i]) {
            i--;
        }
        
        currentSerie = serie[i];
        
        let ipAux = iIp4;
        
        while (spaces !== 0) {
            document.getElementById('description').textContent += `Wilcard mas cercana: ${currentSerie}\n\n`;

            /* console.log(`\n.${ipAux} + .${currentSerie}`); */
            
            document.getElementById('description').textContent += `IP \tWILDCARD\n`;
            document.getElementById('description').textContent += `x.x.x.${ipAux} + 0.0.0.${currentSerie}\n`;
            
            document.getElementById('screen3').value += `access-list ${accessList} deny ${iIp1}.${iIp2}.${iIp3}.${ipAux} 0.0.0.${currentSerie}\n`;
            
            document.getElementById('description').textContent += `\nRANGO\n`;
            document.getElementById('description').textContent += `x.x.x.${ipAux} - `;
            
            ipAux += currentSerie;
            
            document.getElementById('description').textContent += `x.x.x.${ipAux}\n`;
            
            spaces = spaces - (currentSerie + 1);
            
            document.getElementById('description').textContent += `\nAbarco ${currentSerie + 1} y resta ${spaces}\n`;
            document.getElementById('description').textContent += `-------------------------------------\n\n`;

            while (spaces <= serie[i]) {
                i--;
            }

            currentSerie = serie[i];

            ipAux++;
        }
    
    } else {
    
        document.getElementById('screen3').value = `Wrong IP range\n`;

    }

    /* const result = eval(document.getElementById('screen').value);
    document.getElementById('screen').value = result; */
} catch (error) {
    document.getElementById('screen').value = 'Error';
}
}
  
