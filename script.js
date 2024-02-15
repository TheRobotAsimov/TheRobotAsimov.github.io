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

    /* const result = eval(document.getElementById('screen').value);
    document.getElementById('screen').value = result; */
} catch (error) {
    document.getElementById('screen').value = 'Error';
}
}
