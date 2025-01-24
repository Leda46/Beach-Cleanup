const gameContainer = document.getElementById('game-container');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const endScreen = document.getElementById('end-screen');
const finalScore = document.getElementById('final-score');
const pauseButton = document.getElementById('pause-button');
const quizButton = document.getElementById('quiz-button');
const quizPage = document.getElementById('quiz-page');
const quizForm = document.getElementById('quiz-form');
const learnMoreButton = document.getElementById('learn-more-button');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const howToPlayButton = document.getElementById('how-to-play-button');
const howToPlayModal = document.getElementById('how-to-play-modal');
const closeModal = document.getElementById('close-modal');
const backToStartButton = document.getElementById('back-to-start-button');
const backToStartScreen = document.getElementById('back-to-start-screen');
const submitButton = document.getElementById('submit-button');

let timeLeft = 30;
let score = 0;
let highScore = 0;
let gameInterval;
let isPaused = false;

highScoreElement.textContent = `High Score: ${highScore}`;

        const trashImages = [
            'https://cdn.pixabay.com/photo/2015/11/07/12/00/alcohol-1031713_1280.png',
            'https://cdn.pixabay.com/photo/2019/04/14/15/37/bottledwater-4127009_1280.png',
            'https://cdn.pixabay.com/photo/2016/09/28/02/17/shopping-bag-1699644_1280.png'
        ];

        const powerUpImages = [
            'https://cdn.pixabay.com/photo/2016/04/01/00/10/flat-1298035_1280.png',
            'https://cdn.pixabay.com/photo/2012/04/10/16/12/clock-26108_1280.png'
        ];

        const penaltyImages = [
            'https://cdn.pixabay.com/photo/2021/05/19/20/34/jellyfish-6267169_960_720.png',
            'https://cdn.pixabay.com/photo/2014/12/21/23/58/lobster-576487_960_720.png'
        ];

        function spawnTrash() {
            const trash = document.createElement('img');
            trash.src = trashImages[Math.floor(Math.random() * trashImages.length)];
            trash.className = 'trash';
            trash.style.top = Math.random() * (window.innerHeight - 50) + 'px';
            trash.style.left = Math.random() * (window.innerWidth - 50) + 'px';

            trash.addEventListener('click', () => {
                if (isPaused) return;
                score += Math.floor(Math.random() * 3) + 1; // Random points between 1-3
                scoreElement.textContent = `Score: ${score}`;
                displayFact();
                trash.remove();
            });

            gameContainer.appendChild(trash);

            setTimeout(() => {
                if (isPaused) return;
                if (trash.parentElement) {
                    trash.remove();
                }
            }, 3000);
        }

    
        
        function spawnPowerUp() {
            const powerUp = document.createElement('img');
            powerUp.src = powerUpImages[Math.floor(Math.random() * powerUpImages.length)];
            powerUp.className = 'power-up';
            powerUp.style.top = Math.random() * (window.innerHeight - 60) + 'px';
            powerUp.style.left = Math.random() * (window.innerWidth - 60) + 'px';
        
            powerUp.addEventListener('click', () => {
                if (isPaused) return;
                if (powerUp.src.includes('1298035')) { 
                    score += 10;
                } else if (powerUp.src.includes('clock')) { 
                    timeLeft += 5; // Add 5 seconds to the timer
                    if (timeLeft > 30) timeLeft = 30; // Cap time at 30 seconds
                }
                scoreElement.textContent = `Score: ${score}`;
                timerElement.textContent = `Time: ${timeLeft}`;
                powerUp.remove();
            });
        
            gameContainer.appendChild(powerUp);
        
            setTimeout(() => {
                if (isPaused) return;
                if (powerUp.parentElement) {
                    powerUp.remove();
                }
            }, 5000); // Power-up disappears after 5 seconds
        }
        

        function spawnPenalty() {
            const penalty = document.createElement('img');
            penalty.src = penaltyImages[Math.floor(Math.random() * penaltyImages.length)];
            penalty.className = 'penalty';
            penalty.style.top = Math.random() * (window.innerHeight - 50) + 'px';
            penalty.style.left = Math.random() * (window.innerWidth - 50) + 'px';

            penalty.addEventListener('click', () => {
                if (isPaused) return;
                score -= 5;
                scoreElement.textContent = `Score: ${score}`;
                penalty.remove();
            });

            gameContainer.appendChild(penalty);

            setTimeout(() => {
                if (isPaused) return;
                if (penalty.parentElement) {
                    penalty.remove();
                }
            }, 3000);
        }

        function displayFact() {
            const facts = [
                'Plastic takes 450 years to decompose!',
                'Glass can be recycled endlessly!',
                'Metal recycling saves energy and resources!',
                'More than 8 million tonnes of plastic enter the oceans every year!',
                'Animals mistake plastic waste for prey.',
                '100,000 animals die from entanglement each year.',
                'Three billion people in the world depend on fish as a source of protein.'
            ];
            const randomIndex = Math.floor(Math.random() * facts.length)
            const notification = document.getElementById("event-notification");
            notification.textContent = facts[randomIndex];
            notification.style.display = "block";
        }

        function clearTrash() {
            document.querySelectorAll('.trash').forEach(trash => trash.remove());
        }

        function updateTimer() {
            timeLeft--;
            timerElement.textContent = `Time: ${timeLeft}`;

            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                endGame();
            }
        }

        function endGame() {
            finalScore.textContent = `Your Score: ${score}`;
            if (score > highScore) {
                highScore = score;
                highScoreElement.textContent = `High Score: ${highScore}`;
            }
            endScreen.style.display = 'flex';
        }

        function startGame() {
            timeLeft = 30;
            score = 0;
            timerElement.textContent = `Time: ${timeLeft}`;
            scoreElement.textContent = `Score: ${score}`;
            endScreen.style.display = 'none';
            pauseButton.style.display = 'block';

            gameInterval = setInterval(() => {
                if (isPaused) return;
                updateTimer();
                spawnTrash();
                if (Math.random() < 0.3) spawnPowerUp();
                if (Math.random() < 0.2) spawnPenalty();
                
            }, 1000);
        }


// Start the game
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    startGame();
});

// Show "How to Play" modal
howToPlayButton.addEventListener('click', () => {
    howToPlayModal.style.display = 'flex';
});

// Close the modal
closeModal.addEventListener('click', () => {
    howToPlayModal.style.display = 'none';
});

pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
});


backToStartScreen.addEventListener('click', () => {
    endScreen.style.display = 'none';
    startScreen.style.display = 'flex';
});

// Show quiz page
quizButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    quizPage.style.display = 'block';
});

// Handle quiz submission
submitButton.addEventListener('click', () => {
    // Fetch quiz answers
    const formData = new FormData(quizForm);
    const userAnswers = [];
    for (let [key, value] of formData.entries()) {
        userAnswers.push(value);
    }

    // Simple example: Check answers
    const correctAnswers = ['A', 'B', 'A', 'C', 'B', 'C', 'A'];
    let correctCount = 0;

    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            correctCount++;
        }
    });

    // Display results
    const resultMessage = document.getElementById('quiz-result');
    resultMessage.textContent = `You answered ${correctCount} out of ${correctAnswers.length} questions correctly!`;

    // Show back-to-start-button
    backToStartButton.style.display = 'block';
});

// Go back to the start screen from quiz page
backToStartButton.addEventListener('click', () => {
    quizPage.style.display = 'none';
    startScreen.style.display = 'flex';
});

