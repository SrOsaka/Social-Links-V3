const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const progressBar = document.getElementById('progressBar');
const progressTrack = document.getElementById('progressTrack');
const currentTimeSpan = document.getElementById('currentTime');
const durationTimeSpan = document.getElementById('durationTime');
const volumeBar = document.getElementById('volumeBar');
const volumeTrack = document.getElementById('volumeTrack');

// Atualiza o tempo da música e a barra de progresso
audio.addEventListener('timeupdate', updateProgressBar);

// Botão de Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<ion-icon name="pause"></ion-icon>';  // Ícone de pausa
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<ion-icon name="play"></ion-icon>';  // Ícone de play
    }
});

// Atualiza a barra de progresso e o rastro da música
function updateProgressBar() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;
    progressTrack.style.width = `${progressPercent}%`;

    updateTimeDisplay();
}

// Controla o movimento da barra de progresso manualmente
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Formata o tempo exibido
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Atualiza o tempo exibido
function updateTimeDisplay() {
    currentTimeSpan.innerText = formatTime(audio.currentTime);
    durationTimeSpan.innerText = formatTime(audio.duration);
}

// Atualiza a duração total quando o áudio estiver carregado
audio.addEventListener('loadedmetadata', () => {
    durationTimeSpan.innerText = formatTime(audio.duration);
});

// Controle de volume
volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value;
    const volumePercent = volumeBar.value * 100;
    volumeTrack.style.width = `${volumePercent}%`;
});

// Inicializa o rastro do volume
window.addEventListener('DOMContentLoaded', () => {
    const volumePercent = volumeBar.value * 100;
    volumeTrack.style.width = `${volumePercent}%`;
});
