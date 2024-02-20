const triline_menu = document.querySelector('.menu');
const mobile_menu = document.querySelector('.mobile-menu');

triline_menu.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu(){

    mobile_menu.classList.toggle('inactive');
}


function clearScreen() {
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

    if (document.getElementById('menu').value == "Emoji")
    {
        document.getElementById('screen3').value = getRandomEmoji();
        return;
    }

try {
    
    document.getElementById('screen3').value = '';

    const mask = parseInt(document.getElementById('menu').value);
    console.log(mask);

    if (mask >= 0 && mask <= 31) {

        if (mask === 24)
        {
            document.getElementById('screen3').value += `Even:\tx.x.x.0\t  0.0.0.254\n`;
            document.getElementById('screen3').value += `Odd:\tx.x.x.1\t  0.0.0.254\n`;
        }
        if (mask=== 16)
        {
            document.getElementById('screen3').value += `Even:\tx.x.x.0\t  0.0.255.254\n`;
            document.getElementById('screen3').value += `Odd:\tx.x.x.1\t  0.0.255.254\n`;
        }
        if (mask === 8)
        {
            document.getElementById('screen3').value += `Even: x.x.x.0  0.255.255.254\n`;
            document.getElementById('screen3').value += `Odd:  x.x.x.1  0.255.255.254\n`;
        }

    } else {
    
        document.getElementById('screen3').value = `Wrong mask: ${mask}`;

    }

    /* const result = eval(document.getElementById('screen').value);
    document.getElementById('screen').value = result; */
} catch (error) {
    document.getElementById('screen3').value = 'Error';
}
}
  
