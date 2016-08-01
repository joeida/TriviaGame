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
    win: 0,
    loss: 0,
    unanswered: 0,
    questionCounter: undefined,
    startGame: function() {
        gameCounter = setInterval(compute.gameCount, 1000);
    },
    stopGame: function() {
        clearInterval(gameCounter);
    },
    gameCount: function() {
        compute.gameTime--;
    },
    startQuestion: function() {
        compute.questionTime = 30;
        compute.questionCounter = setInterval(compute.questionCount, 1000);
        output.questionTime();
        output.question();
    },
    stopQuestion: function() {
        clearInterval(compute.questionCounter);
    },
    questionCount: function() {
        compute.questionTime--;
        output.questionTime();
    },
    correct: function() {
        compute.win++;
        compute.stopQuestion();
        output.correct();
        setTimeout(compute.startQuestion, 2000);
    },
    wrong: function() {
        compute.loss++;
        compute.stopQuestion();
        output.wrong();
        setTimeout(compute.startQuestion, 2000);
    },
    nextQuestion: function() {
        compute.questionNumber++;
        if (compute.questionNumber > trivia.length -1) {
            compute.questionNumber = 0;
        }
    }


};

var output = {
    winOutput: 'You Got it Correct',
    loseOutput: 'Wrong!',

    // Output Time
    questionTime: function() {
        $('#timerDiv').html('Time Remaining: ' + compute.questionTime + ' Seconds');
    },
    // Output Trivia Question
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
    // Output Trivia Correct Answer Chosen
    correct: function() {
        $('#triviaDiv').html('<div>' + output.winOutput + '</div>');
        $('#timerDiv').css('display', 'none');
        compute.nextQuestion();
    },
    // Output Trivia Wrong Answer Chosen
    wrong: function() {
        $('#triviaDiv').html('<div>' + output.loseOutput + '</div>');
        $('#timerDiv').css('display', 'none');
        compute.nextQuestion();
    }
};

$(document).ready(function() {

    $('#startButton').on('click', function() {
        compute.startGame();
        compute.startQuestion();
        $(this).css('display', 'none');
    });

    $('#triviaDiv').on('click', '.btn', function() {
        buttonClicked = $(this).attr('value');
        if (buttonClicked === trivia[compute.questionNumber].correct) {
            compute.correct();
        } else {
            compute.wrong();
        }
    });

});