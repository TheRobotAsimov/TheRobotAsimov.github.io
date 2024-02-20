const triline_menu = document.querySelector('.menu');
const mobile_menu = document.querySelector('.mobile-menu');

triline_menu.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu(){

    mobile_menu.classList.toggle('inactive');
}

const screen1 = document.getElementById('screen1');

screen1.addEventListener('input', function(event) {
    let currentValue = event.target.value;
    
    let sanitizedValue = currentValue.replace(/[^0-9]/g, '');
    
    event.target.value = sanitizedValue;
});

const screen2 = document.getElementById('screen2');

screen2.addEventListener('input', function(event) {
    let currentValue = event.target.value;
    
    let sanitizedValue = currentValue.replace(/[^0-9]/g, '');
    
    event.target.value = sanitizedValue;
});


function appendToScreen(value) {
    document.getElementById('screen').value += value;
  }
  
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

function calculate() {

    const screen1Value = document.getElementById('screen1').value;
  
    if (screen1Value.trim() === null || screen1Value.trim() === ''){
        document.getElementById('screen3').value = getRandomEmoji();
        return;
    }

try {
    
    document.getElementById('screen3').value = '';
    document.getElementById('description').textContent = '';

    const ipIni = parseInt(document.getElementById('screen1').value);
    const ipFin = parseInt(document.getElementById('screen2').value);

    if (ipIni >= 0 && ipIni <= 255 && ipFin >= 0 && ipFin <= 255 && ipIni < ipFin) {


        const serie = [0, 1, 3, 7, 15, 31, 63, 127, 254, 255];

        let spaces = ipFin - ipIni + 1;
        let currentSerie;
        document.getElementById('description').textContent += `[${ipFin}] - [${ipIni}] + 1 = ${spaces} espacios\n`;
        document.getElementById('description').textContent += `-------------------------------------\n`;
        
        let i = 9;
        
        while (spaces <= serie[i]) {
            i--;
        }
        
        currentSerie = serie[i];
        
        let ipAux = ipIni;
        
        while (spaces !== 0) {
            document.getElementById('description').textContent += `Wilcard mas cercana: ${currentSerie}\n\n`;

            /* console.log(`\n.${ipAux} + .${currentSerie}`); */
            
            document.getElementById('description').textContent += `IP \tWILDCARD\n`;
            document.getElementById('description').textContent += `x.x.x.${ipAux} + 0.0.0.${currentSerie}\n`;
            
            document.getElementById('screen3').value += `x.x.x.${ipAux} + 0.0.0.${currentSerie}\n`;
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
    
        document.getElementById('screen3').value = `Wrong IP range: ${ipIni} - ${ipFin}\n`;

    }

    /* const result = eval(document.getElementById('screen').value);
    document.getElementById('screen').value = result; */
} catch (error) {
    document.getElementById('screen').value = 'Error';
}
}
  
