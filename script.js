//your JS code here. If required.
const app = document.getElementById('app');
const video = document.getElementById('video');
const audio = document.getElementById('audio');
const playButton = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');
const timeButtons = document.querySelectorAll('.time-select button');
const soundButtons = document.querySelectorAll('.sound-picker button');

let duration = 600; // Default duration is 10 minutes (600 seconds)
let interval;
let isPlaying = false;

timeButtons.forEach(button => {
    button.addEventListener('click', function() {
        clearInterval(interval);
        const time = this.id === 'smaller-mins' ? 120 : this.id === 'medium-mins' ? 300 : 600;
        duration = time;
        timeDisplay.textContent = `${Math.floor(duration / 60)}:00`;
        playButton.textContent = 'Play';
        isPlaying = false;
        audio.pause();
        video.pause();
    });
});

soundButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.id === 'beach-sound') {
            video.src = 'videos/beach.mp4';
            audio.src = 'sounds/beach.mp3';
        } else {
            video.src = 'videos/rain.mp4';
            audio.src = 'sounds/rain.mp3';
        }
        if (isPlaying) {
            audio.play();
            video.play();
        }
    });
});

playButton.addEventListener('click', function() {
    if (isPlaying) {
        clearInterval(interval);
        audio.pause();
        video.pause();
        playButton.textContent = 'Play';
    } else {
        audio.play();
        video.play();
        playButton.textContent = 'Pause';
        interval = setInterval(() => {
            if (duration > 0) {
                duration--;
                const minutes = Math.floor(duration / 60);
                const seconds = duration % 60;
                timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            } else {
                clearInterval(interval);
                audio.pause();
                video.pause();
                playButton.textContent = 'Play';
                timeDisplay.textContent = '10:00';
                duration = 600; // Reset to default duration
                isPlaying = false;
            }
        }, 1000);
    }
    isPlaying = !isPlaying;
});
