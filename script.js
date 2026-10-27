// LÓGICA DE VALIDACIÓN DEL CÓDIGO ENCRIPTADO CON LÍMITE Y GLITCH
const accessInput = document.getElementById('access-code');
const terminalContainer = document.getElementById('terminal-container');
const shopContainer = document.getElementById('shop-container');
const errorMsg = document.getElementById('error-msg');
const corruptScreen = document.getElementById('corrupt-screen');
const timerDisplay = document.getElementById('timer');

const VALID_CODES = ['xipe totec', 'xipe tótec', 'tezcatlipoca rojo'];

let remainingAttempts = 3;
let countdownInterval;

accessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const userInput = accessInput.value.toLowerCase().trim();
        
        if (VALID_CODES.includes(userInput)) {
            // Transición a la tienda segura
            terminalContainer.classList.add('hidden');
            shopContainer.classList.remove('hidden');
        } else {
            remainingAttempts--;
            
            if (remainingAttempts > 0) {
                errorMsg.classList.remove('hidden');
                errorMsg.innerHTML = `❌ CÓDIGO INCORRECTO. Intentos restantes: ${remainingAttempts}`;
                accessInput.value = '';
            } else {
                // ACTIVACIÓN DE CORRUPCIÓN Y GLITCH (ARG EVENT)
                errorMsg.classList.add('hidden');
                accessInput.disabled = true;
                accessInput.value = 'CORRUPCION_DETECTADA';
                
                // Efecto visual de fallo en el contenedor
                terminalContainer.classList.add('glitch-active');
                corruptScreen.classList.remove('hidden');

                // Posiciona el botón cerca del centro para invitar al mouse
                fakeEscapeBtn.style.top = '50%';
                fakeEscapeBtn.style.left = '50%';
                fakeEscapeBtn.style.transform = 'translate(-50%, -50%)';
                
                // Iniciar cuenta regresiva de pánico (30 segundos)
                startPanicCountdown(30);
            }
        }
    }
});

function startPanicCountdown(seconds) {
    let timeLeft = seconds;
    
    countdownInterval = setInterval(() => {
        timeLeft--;
        let displaySec = timeLeft < 10 ? `0${timeLeft}` : timeLeft;
        
        // Actualizamos el reloj original de la terminal mientras corre el pánico
        if (timerDisplay) {
            timerDisplay.textContent = `00:${displaySec}`;
        }
        
        // Cuando el tiempo de pánico se agota, transformamos la pantalla a la purga con barra de progreso
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            
            // Reemplazamos el cuerpo con la pantalla negra de acceso denegado y la barra de purificación
            document.body.innerHTML = `
                <div id="purge-screen" style="background:#000; color:#ff3333; height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:monospace; text-align:center; padding:20px;">
                    <h1 style="font-size:2.5rem; margin-bottom:10px;">[ ACCESO DENEGADO ]</h1>
                    <div style="border: 1px dashed #ff3333; padding: 20px; border-radius: 6px; max-width: 550px; background: rgba(255, 51, 51, 0.05); margin-bottom: 20px;">
                        <p style="color: #ff3333; font-weight: bold; font-size: 14px; line-height: 1.5; margin-bottom: 15px;">
                            ⚠️ ERROR CRÍTICO: El servidor está siendo purgado. Espera a que la oscuridad abandone el lugar; los purificadores están haciendo su trabajo.
                        </p>
                        
                        <!-- BARRA DE PROGRESO DE LA LUZ VS OSCURIDAD -->
                        <div style="width: 100%; background: #220000; border: 1px solid #ff3333; height: 20px; border-radius: 4px; overflow: hidden; position: relative;">
                            <div id="progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #ff3333, #ffcc00); transition: width 0.5s ease;"></div>
                        </div>
                        <p id="purge-status" style="color: #aaa; font-size: 12px; margin-top: 10px;">La oscuridad domina el núcleo...</p>
                        <p id="purge-timer-text" style="color: #ff3333; font-size: 14px; font-weight: bold; margin-top: 5px;">00:20</p>
                    </div>
                    <p style="color: #666; font-size: 12px; font-style: italic;">SISTEMA DE SEGURIDAD KOTOKKA // RECONEXIÓN AUTOMÁTICA EN CURSO</p>
                </div>
            `;

            // Iniciamos una segunda cuenta regresiva puramente para la barra de progreso (20 segundos de espera)
            let purgeTime = 20;
            let purgeInterval = setInterval(() => {
                purgeTime--;
                let purgeProgress = ((20 - purgeTime) / 20) * 100;
                
                let statusText = "La oscuridad domina el núcleo...";
                if (purgeProgress > 30 && purgeProgress < 70) {
                    statusText = "⚡ Los purificadores están haciendo retroceder a la Tze...";
                } else if (purgeProgress >= 70) {
                    statusText = "✨ El Tonalli se purifica. Casi listo para reconectar...";
                }

                const progressBar = document.getElementById('progress-bar');
                const purgeStatus = document.getElementById('purge-status');
                const purgeTimerText = document.getElementById('purge-timer-text');

                if (progressBar) progressBar.style.width = `${purgeProgress}%`;
                if (purgeStatus) purgeStatus.textContent = statusText;
                if (purgeTimerText) purgeTimerText.textContent = `00:${purgeTime < 10 ? '0' + purgeTime : purgeTime}`;

                if (purgeTime <= 0) {
                    clearInterval(purgeInterval);
                    location.reload(); // Se reinicia limpio para dar otra oportunidad al usuario
                }
            }, 1000);
        }
    }, 1000);
}

// INTERACCIONES DE LA PASARELA DE PAGOS (BOFU / CONVERSIÓN)
const buyBtn = document.getElementById('buy-btn');
const paymentModal = document.getElementById('payment-modal');
const closeModal = document.getElementById('close-modal');
const paymentForm = document.getElementById('payment-form');
const successScreen = document.getElementById('success-screen');
const productCard = document.querySelector('.product-card');

buyBtn.addEventListener('click', () => {
    paymentModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    paymentModal.classList.add('hidden');
});

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    paymentModal.classList.add('hidden');
    productCard.classList.add('hidden');
    successScreen.classList.remove('hidden');
});


// INTERACCIÓN DEL BOTÓN FALSO QUE HUYE DENTRO DE LOS LÍMITES VISIBLES
const fakeEscapeBtn = document.getElementById('fake-escape-btn');

const panicTexts = [
    "⬅ No caigas en la desesperación",
    "⚠️ ¡NO PUEDES HUIR DE TU DESTINO!",
    "🏃‍♂️ ¡SÁLVATE, CORRE!",
    "🚫 La oscuridad esta aqui",
    "❌ Tu Tonalli se debilita..."
];

function dodgeButton() {
    // Definimos los límites exactos de la ventana actual menos el tamaño del botón para que no se escape
    const padding = 50;
    const maxX = window.innerWidth - fakeEscapeBtn.offsetWidth - padding;
    const maxY = window.innerHeight - fakeEscapeBtn.offsetHeight - padding;

    // Coordenadas aleatorias seguras dentro de la pantalla
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    // Aplicamos la nueva posición flotante
    fakeEscapeBtn.style.position = 'fixed';
    fakeEscapeBtn.style.left = `${randomX}px`;
    fakeEscapeBtn.style.top = `${randomY}px`;
    fakeEscapeBtn.style.transform = 'none'; // Quitamos el centrado inicial para que vuele libre

    // Cambia el texto de pánico
    const randomText = panicTexts[Math.floor(Math.random() * panicTexts.length)];
    fakeEscapeBtn.textContent = randomText;
}

// Al acercar el cursor, se escapa de inmediato
fakeEscapeBtn.addEventListener('mouseover', dodgeButton);

fakeEscapeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dodgeButton();
});




