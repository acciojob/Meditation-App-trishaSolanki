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

// Function to update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Event listeners for time buttons
timeButtons.forEach(button => {
    button.addEventListener('click', function() {
        clearInterval(interval);
        duration = this.id === 'smaller-mins' ? 120 : this.id === 'medium-mins' ? 300 : 600;
        updateTimerDisplay();
        playButton.textContent = 'Play';
        isPlaying = false;
        audio.pause();
        video.pause();
    });
});

// Event listeners for sound buttons
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

// Event listener for play/pause button
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
                updateTimerDisplay();
            } else {
                clearInterval(interval);
                audio.pause();
                video.pause();
                playButton.textContent = 'Play';
                duration = 600; // Reset to default duration
                updateTimerDisplay();
                isPlaying = false;
            }
        }, 1000);
    }
    isPlaying = !isPlaying;
});

updateTimerDisplay(); // Initialize the timer display
