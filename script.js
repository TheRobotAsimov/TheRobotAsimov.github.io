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
}

function calculate() {
try {
    
    document.getElementById('screen3').value = '';

    const ipIni = parseInt(document.getElementById('screen1').value);
    const ipFin = parseInt(document.getElementById('screen2').value);

    if (ipIni >= 0 && ipIni <= 255 && ipFin >= 0 && ipFin <= 255 && ipIni < ipFin) {


        const serie = [0, 1, 3, 7, 15, 31, 63, 127, 254, 255];

        let spaces = ipFin - ipIni + 1;
        let currentSerie;

        let i = 9;

        while (spaces < serie[i]) {
            i--;
        }

        currentSerie = serie[i];

        let ipAux = ipIni;

        while (spaces !== 0) {
            console.log("\n\n--------------\n");

            console.log(`\n.${ipAux} + .${currentSerie}`);
            document.getElementById('screen3').value += `.${ipAux} + .${currentSerie}\n`;
            console.log(`.${ipAux} - `);

            ipAux += currentSerie;

            console.log(`.${ipAux}`);

            spaces = spaces - (currentSerie + 1);

            console.log(`Abarco ${currentSerie + 1} y resta ${spaces}`);

            while (spaces <= serie[i]) {
                i--;
            }

            currentSerie = serie[i];

            ipAux++;
        }
    
    } else {
    
        document.getElementById('screen3').value += `Wrong IP range: ${ipIni} - ${ipFin}\n`;

    }

    /* const result = eval(document.getElementById('screen').value);
    document.getElementById('screen').value = result; */
} catch (error) {
    document.getElementById('screen').value = 'Error';
}
}
  
