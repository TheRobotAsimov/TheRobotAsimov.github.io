const triline_menu = document.querySelector('.menu');
const mobile_menu = document.querySelector('.mobile-menu');

const accessList = document.getElementById('accessID');

var menuCT = document.getElementById("menuCT");
var menuAT = document.getElementById("menuAT");

/* Acces list 100 - 199 para extended */


triline_menu.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu(){
    mobile_menu.classList.toggle('inactive');
}

menuAT.addEventListener("change", extendedOption);
const protocols = document.querySelector('.protocols');
const ports = document.querySelector('.ports');
function extendedOption() {
    var selectedOption = document.getElementById("menuAT").value;
    if(selectedOption === "standard") {
        protocols.classList.add('inactive');
        ports.classList.add('inactive');
        accessList.value = '1';
    } else if(selectedOption === "extended") {
        protocols.classList.remove('inactive');
        ports.classList.remove('inactive');
        accessList.value = '100';
    }
}

const protocol = document.getElementById("protocol");
const port = document.getElementById("port");

protocol.addEventListener("change", selectProtocol);

function selectProtocol() {
    
    port.innerHTML = '';

    if(protocol.value === "icmp" || protocol.value === "ip") {
        ports.classList.add('inactive');
    }

    if(protocol.value === "tcp") {
        ports.classList.remove('inactive');
        port.appendChild(new Option("FTP", "21"));
        port.appendChild(new Option("SSH", "22"));
        port.appendChild(new Option("Telnet", "23"));
        port.appendChild(new Option("WEB", "web"));
    }

    if(protocol.value === "udp") {
        ports.classList.remove('inactive');
        port.appendChild(new Option("DNS", "53"));
        port.appendChild(new Option("DHCP", "dhcp"));
    }

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

function ipValidation(iIp1v, iIp2v, iIp3v, iIp4, lIp4) {
    if (iIp1v < 255 && iIp2v < 255 && iIp3v < 255 && iIp4 < 255 && lIp4 < 255 && iIp4 < lIp4) {
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
    
try {
    
    document.getElementById('screen3').value = '';
    document.getElementById('description').textContent = '';
    
    const iIp4 = parseInt(iIp4Value);

    const lIp4 = parseInt(document.getElementById('lIp4').value);

    const rule = document.getElementById('rule').value;
    
    if (ipValidation(iIp1.value, iIp2.value, iIp3.value, iIp4, lIp4)) {

        if(menuAT.value === "extended" && (parseInt(accessList.value) < 100 || parseInt(accessList.value) > 199)){
            document.getElementById('screen3').value = `Wrong access list number ex\n`;
            return;
        }
        if(menuAT.value === "standard" && (parseInt(accessList.value) < 1 || parseInt(accessList.value) > 99)){
            document.getElementById('screen3').value = `Wrong access list number st\n`;
            return;
        }

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

        const accessName = document.getElementById('accessName').value;
        if(menuAT.value === "standard" && menuCT.value === "name"){
            document.getElementById('screen3').value += `ip access-list standard ${accessName}\n`;
        }

        if(menuAT.value === "extended" && menuCT.value === "name"){
            document.getElementById('screen3').value += `ip access-list extended ${accessName}\n`;
        }
        
        while (spaces !== 0) {
            
            /* console.log(`\n.${ipAux} + .${currentSerie}`); */
            
            if(menuAT.value === "standard" && menuCT.value === "number"){
                document.getElementById('screen3').value += `access-list ${accessList.value} ${rule} ${iIp1.value}.${iIp2.value}.${iIp3.value}.${ipAux} 0.0.0.${currentSerie}\n`;
            }
            
            if(menuAT.value === "standard" && menuCT.value === "name"){
                document.getElementById('screen3').value += `${rule} ${iIp1.value}.${iIp2.value}.${iIp3.value}.${ipAux} 0.0.0.${currentSerie}\n`;
            }

            if(menuAT.value === "extended" && menuCT.value === "number"){
                if(port.value === "web"){
                    document.getElementById('screen3').value += `access-list ${accessList.value} ${rule} ${protocol.value} ${iIp1.value}.${iIp2.value}.${iIp3.value}.${ipAux} 0.0.0.${currentSerie} eq 80\n`;
                    document.getElementById('screen3').value += `access-list ${accessList.value} ${rule} ${protocol.value} ${iIp1.value}.${iIp2.value}.${iIp3.value}.${ipAux} 0.0.0.${currentSerie} eq 443\n`;
                } else if(port.value === "dhcp"){
                    document.getElementById('screen3').value += `access-list ${accessList.value} ${rule} ${protocol.value} ${iIp1.value}.${iIp2.value}.${iIp3.value}.${ipAux} 0.0.0.${currentSerie} eq 67\n`;
                    document.getElementById('screen3').value += `access-list ${accessList.value} ${rule} ${protocol.value} ${iIp1.value}.${iIp2.value}.${iIp3.value}.${ipAux} 0.0.0.${currentSerie} eq 68\n`;
                } else {
                    document.getElementById('screen3').value += `access-list ${accessList.value} ${rule} ${protocol.value} ${iIp1.value}.${iIp2.value}.${iIp3.value}.${ipAux} 0.0.0.${currentSerie} eq ${port.value}\n`;
                }
                
            }

            if(menuAT.value === "extended" && menuCT.value === "name"){
                if(port.value === "web"){
                    document.getElementById('screen3').value += `deny ${protocol.value} ${iIp1.value}.${iIp2.value}.${iIp3.value}.${ipAux} 0.0.0.${currentSerie} eq 80\n`;
                    document.getElementById('screen3').value += `deny ${protocol.value} ${iIp1.value}.${iIp2.value}.${iIp3.value}.${ipAux} 0.0.0.${currentSerie} eq 443\n`;
                } else if(port.value === "dhcp"){
                    document.getElementById('screen3').value += `deny ${protocol.value} ${iIp1.value}.${iIp2.value}.${iIp3.value}.${ipAux} 0.0.0.${currentSerie} eq 67\n`;
                    document.getElementById('screen3').value += `deny ${protocol.value} ${iIp1.value}.${iIp2.value}.${iIp3.value}.${ipAux} 0.0.0.${currentSerie} eq 68\n`;
                } else {
                    document.getElementById('screen3').value += `deny ${protocol.value} ${iIp1.value}.${iIp2.value}.${iIp3.value}.${ipAux} 0.0.0.${currentSerie} eq ${port.value}\n`;
                }
            }

            document.getElementById('description').textContent += `Wilcard mas cercana: ${currentSerie}\n\n`;
            document.getElementById('description').textContent += `IP \tWILDCARD\n`;
            document.getElementById('description').textContent += `x.x.x.${ipAux} + 0.0.0.${currentSerie}\n`;
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

        /* permit any */
        if(menuAT.value === "standard" && menuCT.value === "number" && rule === "permit"){
            document.getElementById('screen3').value += `access-list ${accessList.value} deny any\n`;
        }
        if(menuAT.value === "standard" && menuCT.value === "number" && rule === "deny"){
            document.getElementById('screen3').value += `access-list ${accessList.value} permit any\n`;
        }

        if(menuAT.value === "standard" && menuCT.value === "name" && rule === "permit"){
            document.getElementById('screen3').value += `deny any\n`;
        }
        if(menuAT.value === "standard" && menuCT.value === "name" && rule === "deny"){
            document.getElementById('screen3').value += `permit any\n`;
        }

        if(menuAT.value === "extended" && menuCT.value === "number" && rule === "permit"){
            document.getElementById('screen3').value += `access-list ${accessList.value} deny ip any any\n`;
        }
        if(menuAT.value === "extended" && menuCT.value === "number" && rule === "deny"){
            document.getElementById('screen3').value += `access-list ${accessList.value} permit ip any any\n`;
        }

        if(menuAT.value === "extended" && menuCT.value === "name" && rule === "permit"){
            document.getElementById('screen3').value += `deny ip any any\n`;
        }
        if(menuAT.value === "extended" && menuCT.value === "name" && rule === "deny"){
            document.getElementById('screen3').value += `permit ip any any\n`;
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
  
