var trivia = [
    {
        question: 'Who is known as the Black Mamba?',
        correct: 'Kobe Bryant',
        answer: ['Michael Jordan', 'Kobe Bryant', 'Magic Johnson', 'Allen Iverson'],
        gif: "https://media3.giphy.com/media/1w9UOyHVcBt5u/200.gif" 
    },
    {
        question: 'Who is the NBA all time scoring leader?',
        correct: 'Kareem Abdul Jabbar',
        answer: ['Jerry West', 'Michael Jordan', 'Wilt Chaimberlain', 'Kareem Abdul Jabbar'],
        gif: "http://media2.giphy.com/media/vTUqXBbRhVRSM/200.gif"
    },
    {
        question: 'Which team won the 2009 NBA championship?',
        correct: 'Los Angeles Lakers',
        answer: ['Los Angeles Lakers', 'Chicago Bulls', 'Portland Trailblazers', 'San Antonio Spurs'],
        gif: "http://media1.giphy.com/media/6nkc7Q4fTVZu0/200.gif"
    },
    {
        question: 'Which country won the first olympic gold medal in basketball?',
        correct: 'USA',
        answer: ['Russia', 'Germany', 'USA', 'Spain'],
        gif: "http://media1.giphy.com/media/lve8yY5NwwUJq/200.gif"
    },
    {
        question: 'Whose silhouette serves as the modern day logo of the NBA?',
        correct: 'Jerry West',
        answer: ['Michael Jordan', 'Wilt Chaimberlain', 'Bill Russel', 'Jerry West'],
        gif: "http://media0.giphy.com/media/ySsvSqqvAJWvu/200.gif"
    },
    {
        question: 'Who holds the record for most points in a single NBA game?',
        correct: 'Wilt Chaimberlain',
        answer: ['Larry Bird', 'Michael Jordan', 'Wilt Chaimberlain', 'Kobe Bryant'],
        gif: "http://media0.giphy.com/media/BwFoijAZtoUxO/200.gif"
    },
    {
        question: 'How many teams are in the NBA?',
        correct: '30',
        answer: ['15', '25', '30', '35'],
        gif: "http://media0.giphy.com/media/u30NotdkEajGo/200.gif"
    },
    {
        question: 'Which team has the record amount of NBA Championships?',
        correct: 'Boston Celtics',
        answer: ['Los Angeles Lakers', 'Boston Celtics', 'Chicago Bulls', 'San Antonio Spurs'],
        gif: "http://media0.giphy.com/media/12ZVSHKrVcckfe/200.gif"
    },
    {
        question: 'What is the name of the Championship trophy given to the team who wins the NBA finals?',
        correct: "Larry O'Brien Championship Trophy",
        answer: ['NBA Finals Championship Trophy', 'Bill Russel Championship Trophy', 'McDonalds Championship Trophy', "Larry O'Brien Championship Trophy"],
        gif: "http://media4.giphy.com/media/yo6ntHXOpVIqY/200.gif"
    },
    {
        question: 'What year was the NBA first established?',
        correct: "1946",
        answer: ['1923', '1946', '1955', "1962"],
        gif: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgjgDzK-0wb-aWy7XNdxCiSmNw5kPwrMh9lDOEv_WF7npm8YvM"
    },
    {
        question: 'Who is the only coach to win both a NCAA and NBA championship?',
        correct: "Larry Brown",
        answer: ['Phil Jackson', "Pat O'Reilly", 'Mike Krzyzewski', "Larry Brown"],
        gif: "http://www.trbimg.com/img-55079af2/turbine/la-sp-ucla-smu-larry-brown-20150317"
    },
    {
        question: 'Who was the first African American to play in an NBA game?',
        correct: "Earl Lloyd",
        answer: ['Earl Lloyd', 'Bill Russel', 'Chuck Cooper', "Harry Lew"],
        gif: "https://s-media-cache-ak0.pinimg.com/236x/78/4b/42/784b427419a949f4f16666af3555b110.jpg"
    }

];

var compute = {
    questionNumber: 0,
    gameTime: 90,
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
            setTimeout(compute.startQuestion, 4000);
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
            setTimeout(compute.startQuestion, 4000);
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
            setTimeout(compute.startQuestion, 4000);
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
        compute.gameTime = 90;
        compute.winCount = 0;
        compute.lossCount = 0;
        compute.unansweredCount = 0;
        compute.gameOver = false;
    }

};

var output = {
    winOutput: 'You Got it Correct!',
    loseOutput: 'Wrong Answer!',

    // Output trivia question timer
    questionTime: function() {
        $('#timerDiv').html('Time Remaining: ' + compute.questionTime + ' Seconds');
    },

    // Output trivia question
    question: function() {
        $('#timerDiv').css('display', 'inline-block');
        $('#triviaDiv').html('');
        var currentQuestion = trivia[compute.questionNumber];
        $('#triviaDiv').append('<div id="triviaQuestion">' + currentQuestion.question + '</div><br>');
        for (var i = 0; i < currentQuestion.answer.length; i++) {
            var availableAnswer = $('<p><a class="btn btn-warning" value="' + currentQuestion.answer[i] + '">' + currentQuestion.answer[i] + '</a></p>');
            $('#triviaDiv').append(availableAnswer);
        }
    },

    // Output trivia correct answer chosen text
    correct: function() {
        $('#triviaDiv').html('<div>' + output.winOutput + '</div><br>');
        $('#timerDiv').css('display', 'none');
        output.gifAnimate();
    },

    // Display Correct Answer Gif
    gifAnimate: function() {
        var imageGif = trivia[compute.questionNumber].gif; 
        $('#triviaDiv').append('<img src=' + imageGif +  ' />');
    },

    // Output trivia wrong answer chosen text and output correct answer
    wrong: function() {
        $('#triviaDiv').html('<div>' + output.loseOutput + '<br>The correct answer is ' + trivia[compute.questionNumber].correct + '.</div><br>');
        $('#timerDiv').css('display', 'none');
        var imageGif = "http://media1.giphy.com/media/33bpFN25l6qNW/200.gif";
        $('#triviaDiv').append('<img src=' + imageGif +  ' >');
    },

    // Output trivia unanswered text and output correct answer
    unanswered: function() {
        $('#triviaDiv').html('<div>Times Up!<br>The correct answer is<br>' + trivia[compute.questionNumber].correct + '.</div><br>');
        $('#timerDiv').css('display', 'none');
        var imageGif = "https://media.giphy.com/media/Emg9qPKR5hquI/giphy.gif";
        $('#triviaDiv').append('<img src=' + imageGif +  ' >');
    },

    // Output end game statistics and display play again button
    endGame: function() {
        $('#triviaDiv').html('<div>Game Over</div><div>Your Stats Are Below</div><div>Wins: ' + compute.winCount + '</div><div>Losses: ' + compute.lossCount + '</div><div>Unanswered: ' + compute.unansweredCount + '</div><div>Press Below To Play Again</div>');
        $('#timerDiv').css('display', 'none');
        $('#playAgainButton').css('display', 'inline-block');
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