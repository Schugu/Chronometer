'use strict'; 

let cronometro = document.querySelector('.tiempo__span');
let botonActivity = document.getElementById('botonPlayPausa');
let botonReinciar = document.getElementById('botonRestart');
let botonHistorial = document.getElementById('botonHistory');
let [hs, mins, secs] = [0, 0, 0]; 
let intervaloDeTiempo; 
let estadoDelCronometro = 'pausado';
let estadoClick = 'no-clickeado';
let vuelta = 0;
let historial;
let tiempoTotal = ['00', '00', '00'];

function asignarFormato (unidadDeTiempo) {
    return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
};

function actualizarCronometro () {
    secs++;
    if (secs / 60 === 1 ) {
        secs = 0;
        mins++;
    } else if (mins / 60 === 1){    
        mins = 0;
        hs++;
    }

    const formatoSecs = asignarFormato (secs);
    const formatoMins = asignarFormato (mins);
    const formatoHs = asignarFormato (hs);

    cronometro.textContent = `${formatoHs}:${formatoMins}:${formatoSecs}`;

    tiempoTotal = [formatoHs, formatoMins, formatoSecs];
};

botonActivity.addEventListener('click', ()=> {
    if (estadoDelCronometro === 'pausado') {
        intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000);
        botonActivity.src = 'media/pause.svg';
        estadoDelCronometro = 'corriendo';
    } else {
        window.clearInterval(intervaloDeTiempo);
        botonActivity.src = 'media/play-fill.svg';
        estadoDelCronometro = 'pausado';
    }
});

botonReinciar.addEventListener('click', ()=> {
    window.clearInterval(intervaloDeTiempo);

    secs = 0;
    mins = 0;
    hs = 0;

    cronometro.textContent = '00:00:00';
    botonActivity.src = 'media/play-fill.svg';

    estadoDelCronometro = 'pausado'; 
});


function crearHistorial () {
    if (estadoClick === 'no-clickeado') {
        const article = document.createElement('article');
        const contenedor = document.getElementById('cronometro');
        article.classList.add('container', 'historial');
        contenedor.appendChild(article);

        let primerDiv = document.createElement('div');
        primerDiv.classList.add('vueltasDiv', 'tituloVueltaDiv');
        article.appendChild(primerDiv);

        let spanVueltas = document.createElement('span');
        spanVueltas.textContent = 'Vuelta';
        let spanTiempoTotal = document.createElement('span');
        spanTiempoTotal.textContent = 'Tiempo total';
        primerDiv.appendChild(spanVueltas);
        primerDiv.appendChild(spanTiempoTotal);
        estadoClick = 'clickeado';

        historial = article;
    }
}

botonHistorial.addEventListener('click', ()=> {
    if (tiempoTotal[2] !== '00') {
        crearHistorial();
        vuelta++;

        let divVuelta = document.createElement('div');
        divVuelta.classList.add('vueltasDiv');
        historial.appendChild(divVuelta);

        let spanVuelta = document.createElement('span');
        spanVuelta.textContent = vuelta;
        divVuelta.appendChild(spanVuelta);

        let spanTiempoTotal = document.createElement('span');
        spanTiempoTotal.textContent = `${tiempoTotal[0]}:${tiempoTotal[1]}:${tiempoTotal[2]}`;
        divVuelta.appendChild(spanTiempoTotal);
    }
});