const words = ["python", "javascript", "hangman", "developer", "programming"];
let secretWord = words[Math.floor(Math.random() * words.length)];
let lettersGuessed = [];
let guessesLeft = 6;
const maxGuesses = 6; // Maximum guesses allowed

const wordDisplay = document.getElementById("word-display");
const message = document.getElementById("message");
const guessesLeftDisplay = document.getElementById("guesses-left");
const lettersGuessedDisplay = document.getElementById("letters-guessed");
const guessInput = document.getElementById("guess-input");
const canvas = document.getElementById("hangman-canvas");
const ctx = canvas.getContext("2d");

// Function to update the display of the guessed word
function updateWordDisplay() {
    wordDisplay.textContent = secretWord
        .split("")
        .map((letter) => (lettersGuessed.includes(letter) ? letter : "_"))
        .join(" ");
}

// Function to update guesses left and letters guessed
function updateGuesses() {
    guessesLeftDisplay.textContent = guessesLeft;
    lettersGuessedDisplay.textContent = lettersGuessed.join(", ");
}

// Function to draw the hangman
function drawHangman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.strokeStyle = "#000"; // Black color for the hangman
    ctx.lineWidth = 2;

    // Draw gallows
    ctx.beginPath();
    ctx.moveTo(10, 190); // Base
    ctx.lineTo(70, 190); // Base
    ctx.moveTo(40, 190); // Pole
    ctx.lineTo(40, 20); // Pole height
    ctx.lineTo(150, 20); // Beam
    ctx.lineTo(150, 40); // Noose
    ctx.stroke();

    // Draw hangman based on incorrect guesses
    if (maxGuesses - guessesLeft >= 1) {
        // Head
        ctx.beginPath();
        ctx.arc(150, 50, 10, 0, Math.PI * 2, true); // Head
        ctx.stroke();
    }
    if (maxGuesses - guessesLeft >= 2) {
        // Body
        ctx.beginPath();
        ctx.moveTo(150, 60); // Neck
        ctx.lineTo(150, 120); // Body
        ctx.stroke();
    }
    if (maxGuesses - guessesLeft >= 3) {
        // Left arm
        ctx.beginPath();
        ctx.moveTo(150, 80); // Shoulder
        ctx.lineTo(130, 100); // Left arm
        ctx.stroke();
    }
    if (maxGuesses - guessesLeft >= 4) {
        // Right arm
        ctx.beginPath();
        ctx.moveTo(150, 80); // Shoulder
        ctx.lineTo(170, 100); // Right arm
        ctx.stroke();
    }
    if (maxGuesses - guessesLeft >= 5) {
        // Left leg
        ctx.beginPath();
        ctx.moveTo(150, 120); // Hip
        ctx.lineTo(130, 150); // Left leg
        ctx.stroke();
    }
    if (maxGuesses - guessesLeft >= 6) {
        // Right leg
        ctx.beginPath();
        ctx.moveTo(150, 120); // Hip
        ctx.lineTo(170, 150); // Right leg
        ctx.stroke();
    }
}

// Function to handle guesses
function handleGuess() {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = ""; // Clear input

    if (guess && !lettersGuessed.includes(guess) && guess.length === 1) {
        lettersGuessed.push(guess);

        if (secretWord.includes(guess)) {
            message.textContent = "Good guess!";
        } else {
            guessesLeft--;
            message.textContent = "Wrong guess!";
            drawHangman(); // Draw hangman after an incorrect guess
        }

        if (guessesLeft === 0) {
            message.textContent = `Game over! The word was "${secretWord}".`;
            guessInput.disabled = true;
            document.getElementById("guess-button").disabled = true;
            document.getElementById("play-again-button").style.display = "block"; // Show the Play Again button
        } else if (secretWord.split("").every((letter) => lettersGuessed.includes(letter))) {
            message.textContent = "Congratulations, you won!";
            guessInput.disabled = true;
            document.getElementById("guess-button").disabled = true;
            document.getElementById("play-again-button").style.display = "block"; // Show the Play Again button
        }

        updateWordDisplay();
        updateGuesses();
    } else {
        message.textContent = "Invalid input or already guessed!";
    }
}

// Adding event listener to the guess button
document.getElementById("guess-button").addEventListener("click", handleGuess);

// Adding event listener for pressing Enter
guessInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleGuess();
    }
});

// Adding event listener for the Play Again button
document.getElementById("play-again-button").addEventListener("click", function() {
    // Reset the game state
    secretWord = words[Math.floor(Math.random() * words.length)];
    lettersGuessed = [];
    guessesLeft = maxGuesses;

    // Update the display
    message.textContent = "";
    updateWordDisplay();
    updateGuesses();
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Enable the input and button
    guessInput.disabled = false;
    document.getElementById("guess-button").disabled = false;
    document.getElementById("play-again-button").style.display = "none"; // Hide the Play Again button again
});

// Initialize display
updateWordDisplay();
updateGuesses();
