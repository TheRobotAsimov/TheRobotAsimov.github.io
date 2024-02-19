const screen1 = document.getElementById('screen1');

screen1.addEventListener('input', function(event) {
    let currentValue = event.target.value;
    
    let sanitizedValue = currentValue.replace(/[^0-9]/g, '');
    
    event.target.value = sanitizedValue;
});
  
function clearScreen() {
    document.getElementById('screen1').value = '';
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

    const mask = parseInt(document.getElementById('screen1').value);

    if (mask >= 0 && mask <= 31) {

        const maskValues = [0, 128, 64, 32, 16, 8, 2, 1];

        let i = 0;
        let maskDec = 0;

        /* En que octeto se calculara la mascara */
        let position = Math.floor(mask/8);

        let j = mask%8;

        while (i <= j)
        {
            maskDec += maskValues[i];
            i++;
        }

        let wilcard = 255 - maskDec;

        document.getElementById('description').textContent += `-------------------------------------\n`;
        document.getElementById('description').textContent += `\t255.255.255.255\n`;
        
        if (position === 3)
        {
            document.getElementById('screen3').value += `0.0.0.${wilcard}`;

            document.getElementById('description').textContent += `-\t255.255.255.${maskDec}\n`;
            document.getElementById('description').textContent += `_______________________\n`;
            document.getElementById('description').textContent += `\t0.0.0.${wilcard}\n`;
        }
        if (position === 2)
        {
            document.getElementById('screen3').value += `0.0.${wilcard}.255`;

            document.getElementById('description').textContent += `-\t255.255.${maskDec}.0\n`;
            document.getElementById('description').textContent += `_______________________\n`;
            document.getElementById('description').textContent += `\t0.0.${wilcard}.255\n`;
        }
        if (position === 1)
        {
            document.getElementById('screen3').value += `0.${wilcard}.255.255`;

            document.getElementById('description').textContent += `-\t255.${maskDec}.0.0\n`;
            document.getElementById('description').textContent += `_______________________\n`;
            document.getElementById('description').textContent += `\t0.${wilcard}.255.255\n`;
        }
        if (position === 0)
        {
            document.getElementById('screen3').value += `${wilcard}.255.255.255\n`;
            document.getElementById('screen3').value += `(Una mascara un poco rara)`;

            document.getElementById('description').textContent += `-\t${maskDec}.0.0.0\n`;
            document.getElementById('description').textContent += `_______________________\n`;
            document.getElementById('description').textContent += `\t${wilcard}.255.255.255\n`;
        }
        document.getElementById('description').textContent += `-------------------------------------\n`;
        
    } else {
    
        document.getElementById('screen3').value = `Wrong mask: ${mask}`;

    }

    /* const result = eval(document.getElementById('screen').value);
    document.getElementById('screen').value = result; */
} catch (error) {
    document.getElementById('screen').value = 'Error';
}
}
  
