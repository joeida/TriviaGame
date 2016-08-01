var trivia = [
    {
        question: 'Who is known as the Black Mamba?',
        correct: 'Kobe Bryant',
        answer: ['Michael Jordan', 'Kobe Bryant', 'Magic Johnson', 'Allen Iverson']
    },
    {
        question: 'Who is the NBA all time scoring leader?',
        correct: 'Kareem Abdul Jabbar',
        answer: ['Jerry West', 'Michael Jordan', 'Wilt Chaimberlain', 'Kareem Abdul Jabbar']
    }
];

var compute = {
    questionNumber: 0,
    gameTime: 100,
    questionTime: 30,
    betweenTime: 2,
    winCount: 0,
    lossCount: 0,
    unansweredCount: 0,
    gameCounter: undefined,
    questionCounter: undefined,
    gameOver: false,

    // Start game timer
    startGame: function() {
        compute.gameCounter = setInterval(compute.gameCount, 1000);
    },

    // Stop game timer
    stopGame: function() {
        clearInterval(compute.gameCounter);
    },

    // Increment game timer and stop and set gameOver siwtch to true when game timer is 0
    gameCount: function() {
        compute.gameTime--;
        if (compute.gameTime === 0) {
            compute.gameOver = true;
            compute.stopGame();
        }
    },

    // Start trivia question timer and output timer and question
    startQuestion: function() {
        compute.questionTime = 30;
        compute.questionCounter = setInterval(compute.questionCount, 1000);
        output.questionTime();
        output.question();
    },

    // Stop trivia question timer
    stopQuestion: function() {
        clearInterval(compute.questionCounter);
    },

    // Increment trivia question timer and run unanswered method when trivia timer is 0
    questionCount: function() {
        compute.questionTime--;
        output.questionTime();
        if (compute.questionTime === 0) {
            compute.unanswered();
        }
    },

    // Increment question number and reset to 0 when number larger than number of questions in trivia array
    nextQuestion: function() {
        compute.questionNumber++;
        if (compute.questionNumber > trivia.length -1) {
            compute.questionNumber = 0;
        }
    },

    // Increment correctly answered questions, get next question, then start trivia question timer and output timer and question again
    correct: function() {
        output.correct();
        compute.winCount++;
        compute.stopQuestion();
        compute.nextQuestion();

        // Check to see if game timer is expired and if so, output end game statistics and restart button
        if (compute.gameOver) {
            compute.endGame();
        } else {
            setTimeout(compute.startQuestion, 2000);
        }
    },

    // Increment wrongly answered questions, get next question, then start trivia question timer and output timer and question again
    wrong: function() {
        output.wrong();
        compute.lossCount++;
        compute.stopQuestion();
        compute.nextQuestion();

        // Check to see if game timer is expired and if so, output end game statistics and restart button
        if (compute.gameOver) {
            compute.endGame();
        } else {
            setTimeout(compute.startQuestion, 2000);
        }
    },
    // Increment unanswered questions, get next question, then start trivia question timer and output timer and question again
    unanswered: function() {
        output.unanswered();
        compute.unansweredCount++;
        compute.stopQuestion();
        compute.nextQuestion();

        // Check to see if game timer is expired and if so, output end game statistics and restart button
        if (compute.gameOver) {
            compute.endGame();
        } else {
            setTimeout(compute.startQuestion, 2000);
        }
    },

    // Stop question timer, choose next question, and output end game statistics
    endGame: function() {
        compute.stopQuestion();
        compute.nextQuestion();
        output.endGame();
    },

    // Reset game after restart game is pressed at end of game
    resetGame: function() {
        compute.gameTime = 100;
        compute.winCount = 0;
        compute.lossCount = 0;
        compute.unansweredCount = 0;
        compute.gameOver = false;
    }

};

var output = {
    winOutput: 'You Got it Correct',
    loseOutput: 'Wrong!',

    // Output trivia question timer
    questionTime: function() {
        $('#timerDiv').html('Time Remaining: ' + compute.questionTime + ' Seconds');
    },

    // Output trivia question
    question: function() {
        $('#timerDiv').css('display', 'block');
        $('#triviaDiv').html('');
        var currentQuestion = trivia[compute.questionNumber];
        $('#triviaDiv').append('<div id="triviaQuestion">' + currentQuestion.question + '</div>');
        for (var i = 0; i < currentQuestion.answer.length; i++) {
            var availableAnswer = $('<p><a class="btn btn-danger" value="' + currentQuestion.answer[i] + '">' + currentQuestion.answer[i] + '</a></p>');
            $('#triviaDiv').append(availableAnswer);
        }
    },

    // Output trivia correct answer chosen text
    correct: function() {
        $('#triviaDiv').html('<div>' + output.winOutput + '</div>');
        $('#timerDiv').css('display', 'none');
    },

    // Output trivia wrong answer chosen text and output correct answer
    wrong: function() {
        $('#triviaDiv').html('<div>' + output.loseOutput + ' The correct answer is ' + trivia[compute.questionNumber].correct + '.</div>');
        $('#timerDiv').css('display', 'none');
    },

    // Output trivia unanswered text and output correct answer
    unanswered: function() {
        $('#triviaDiv').html('<div>The correct answer is ' + trivia[compute.questionNumber].correct + '.</div>');
        $('#timerDiv').css('display', 'none');
    },

    // Output end game statistics and display play again button
    endGame: function() {
        $('#triviaDiv').html('<div>Game Over</div><div>Your Stats Are Below</div><div>Wins: ' + compute.winCount + '</div><div>Losses: ' + compute.lossCount + '</div><div>Unanswered: ' + compute.unansweredCount + '</div><div>Press Below To Play Again</div>');
        $('#timerDiv').css('display', 'none');
        $('#playAgainButton').css('display', 'block');
    }

};

$(document).ready(function() {

    // Start game and hide start button
    $('#startButton').on('click', function() {
        compute.startGame();
        compute.startQuestion();
        $(this).css('display', 'none');
    });

    // Choose available answers, evaluate whether corect or wrong, and compute result
    $('#triviaDiv').on('click', '.btn', function() {
        buttonClicked = $(this).attr('value');
        if (buttonClicked === trivia[compute.questionNumber].correct) {
            compute.correct();
        } else {
            compute.wrong();
        }
    });

    // Restart game, reset statistics, and hide restart game button
    $('#playAgainButton').on('click', function() {
        compute.resetGame();
        compute.startGame();
        compute.startQuestion();
        $(this).css('display', 'none');
    });

});