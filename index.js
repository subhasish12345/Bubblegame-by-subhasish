let timerValue = 30;
let totalScore = 0;
let levelScore = 0;
let hitsValue = 0;
let levelValue = 1;
let correctClicks = 0;
let totalClicks = 0;
let isPaused = false;
let timeInterval;

// Function to create bubbles
const createBubble = () => {
    let contentbox = '';
    for (let i = 1; i <= 208 + levelValue * 10; i++) {
        const randomNum = Math.floor(Math.random() * 10);
        contentbox += `
            <div class="bubble" style="background-color: hsl(${Math.random() * 360}, 70%, 60%)">
                <p class="bubble-number">${randomNum}</p>
            </div>`;
    }

    // Add a special "boost bubble" occasionally
    if (Math.random() < 0.2) {
        contentbox += `
            <div class="bubble boost" style="background-color: gold;">
                <p class="bubble-number">+</p>
            </div>`;
    }

    document.querySelector('.content').innerHTML = contentbox;
};

// Timer
const setTiming = () => {
    const timerNode = document.querySelector('.timer');
    timeInterval = setInterval(() => {
        if (!isPaused && timerValue > 0) {
            timerValue--;
            timerNode.textContent = timerValue;
        } else if (timerValue === 0) {
            clearInterval(timeInterval);
            document.querySelector('.content').innerHTML = `
                <h1 class="gameOver">Game Over<br>
                    <button onclick="restartGame()">Restart</button>
                </h1>`;
            saveToLeaderboard();
        }
    }, 1000);
};

// Hits generator
const hitsGenerate = () => {
    hitsValue = Math.floor(Math.random() * 10);
    document.querySelector('.hitsvalue').textContent = hitsValue;
};

// Update scores and level
const updateScores = (correctHit) => {
    totalClicks++;
    if (correctHit) {
        totalScore += 10;
        levelScore += 10;
        correctClicks++;
    }
    document.querySelector('.scoreValue').textContent = totalScore;
    document.querySelector('.levelScoreValue').textContent = levelScore;
    updateAccuracy();

    // Level up every 50 points
    if (levelScore >= 50) {
        levelUp();
    }
};

// Update accuracy
const updateAccuracy = () => {
    const accuracy = ((correctClicks / totalClicks) * 100).toFixed(1) + '%';
    document.querySelector('.accuracyValue').textContent = accuracy;
};

// Level up
const levelUp = () => {
    levelValue++;
    levelScore = 0; // Reset level score
    timerValue += 10; // Add extra time
    document.querySelector('.levelValue').textContent = levelValue;
    document.querySelector('.timer').textContent = timerValue;

    // Notify level up
    document.querySelector('.content').innerHTML = `
        <h1>Level ${levelValue}!</h1>`;
    setTimeout(() => {
        createBubble();
        hitsGenerate();
    }, 1000);
};

// Handle bubble clicks
document.querySelector('.content').addEventListener('click', (e) => {
    if (e.target.closest('.bubble')) {
        const bubble = e.target.closest('.bubble');

        if (bubble.classList.contains('boost')) {
            timerValue += 5; // Add 5 seconds for boost bubble
            document.querySelector('.timer').textContent = timerValue;
            bubble.remove();
        } else {
            const clickedNumber = Number(bubble.textContent);
            if (clickedNumber === hitsValue) {
                updateScores(true);
                createBubble();
                hitsGenerate();
            } else {
                updateScores(false);
            }
        }
    }
});

// Restart game
const restartGame = () => {
    totalScore = 0;
    levelScore = 0;
    levelValue = 1;
    timerValue = 30;
    correctClicks = 0;
    totalClicks = 0;

    document.querySelector('.scoreValue').textContent = totalScore;
    document.querySelector('.levelScoreValue').textContent = levelScore;
    document.querySelector('.levelValue').textContent = levelValue;
    document.querySelector('.timer').textContent = timerValue;
    document.querySelector('.accuracyValue').textContent = '100%';

    createBubble();
    setTiming();
    hitsGenerate();
};

// Start game
const Startingfun = () => {
    createBubble();
    setTiming();
    hitsGenerate();
};
const togglePause = () => {
    isPaused = !isPaused; // Toggle the pause state

    // Update button text based on the pause state
    const pauseButton = document.querySelector('.pause-btn');
    if (isPaused) {
        pauseButton.textContent = 'Resume';
    } else {
        pauseButton.textContent = 'Pause';
    }
};
