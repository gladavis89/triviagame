
var questions = [{
        question: "Who made this song?",
        answers: ["Marvin Gaye", "Rick James", "James Brown", "Eddy Grant"],
        actual: "Eddy Grant",
        audio: new Audio("assets/audio/EddyGrant_ElectricAvenue.mp3"),
        image: "assets/images/eddy.jpg"
    },
    {
        question: "This song is titled..",
        answers: ["Cissy Strut", "Funky Chicken", "Funky Duck", "Give it up"],
        actual: "Cissy Strut",
        audio: new Audio("assets/audio/METERS_CissyStrut.mp3"),
        image: "assets/images/meters.jpg"
    }, {
        question: "Marvin Gaye made Let's get it on in what year?",
        answers: ["1965", "1981", "1970", "1973"],
        actual: "1973",
        audio: new Audio("assets/audio/MarvinGaye_LetsGetItOn.mp3"),
        image: "assets/images/marvin.jpg"
    }, {
        question: "This song's distinctive bass line, usually contributed to Bootsy Collins, is played by:",
        answers: ["Bootsy Collins", "Les Claypool", "Bernie Worrell", "Catfish Collins"],
        actual: "Bernie Worrell",
        audio: new Audio("assets/audio/Parliament_Flashlight.mp3"),
        image: "assets/images/flash.jpg"
    }, {
        question: "Earth, Wind and Fire made released this song on what album?",
        answers: ["September","I Am", "All 'n All", "Raise!"],
        actual: "Semptember",
        audio: new Audio("assets/audio/EarthWindFire_September.mp3"),
        image: "assets/images/september.jpg"
    }, {
        question: "Rick James made this song titled:",
        answers: ["Super freak","Give it to me baby", "Brick House", "Let's get it started"],
        actual: "Give it to me baby",
        audio: new Audio("assets/audio/RickJames_GiveItToMeBaby.mp3"),
        image: "assets/images/rick.jpg"
    }, {
        question: "Vulfpeck was founded when?",
        answers: ["1971","1969","1999","2011"],
        actual: "2011",
        audio: new Audio("assets/audio/VULFPECK _1612.mp3"),
        image: "assets/images/vulfpeck.jpg"
    }, {
        question: "On what number album did Stevie come out with Superstition?",
        answers: ["His second album", "His fifteenth album", "His fourth album", "His first album"],
        actual: "His fifteenth album",
        audio: new Audio("assets/audio/StevieWonder_Superstition.mp3"),
        image: "assets/images/stevie.jpg"
    }, {
        question: "Does James Brown feel good?",
        answers: ["Yeah he does", "No way"],
        actual: "Yeah he does",
        audio: new Audio("assets/audio/JamesBrown_I Feel Good.mp3"),
        image: "assets/images/james.jpg"
    }
]


var panel = $('#question');
var countStartNumber = 30;
$(document).on('click', '#start-over', function (e) {
    game.reset();
});

$(document).on('click', '.answer-button', function (e) {
    game.clicked(e);

});
$(document).on('click', '#start', function (e) {

    game.load();
});

$("#question").html("<h2>All about that Funk</h2><button id='start'>Start</button>")

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,
    countdown: function () {
        game.counter--;
        $('#time').html(game.counter);

        if (game.counter === 0) {
            console.log('TIME UP');
            game.timeUp();
        }
    },
    load: function () {
        timer = setInterval(game.countdown, 1000);
        questions[this.currentQuestion].audio.play();
        panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
        }
    },
    next: function () {
        questions[game.currentQuestion].audio.pause();
        game.counter = countStartNumber;
        $('#time').html(game.counter);
        game.currentQuestion++;
        game.load();
    },
    timeUp: function () {
        clearInterval(timer);
        $('#time').html(game.counter);
        panel.html('<h2>Out of Time!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].actual);
        panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.next, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);
        panel.html('<h2>All done, heres how you did!</h2>');
        $('#counter-number').html(game.counter);
        panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
        panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
        panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
        panel.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).data("name") === questions[this.currentQuestion].actual) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },
    answeredIncorrectly: function () {
        game.incorrect++;
        clearInterval(timer);
        panel.html('<h2>Nope!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].actual + '</h3>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.next, 3 * 1000);
        }
    },
    answeredCorrectly: function () {
        clearInterval(timer);

        game.correct++;
        panel.html('<h2>Correct!</h2>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.next, 3 * 1000);
        }
    },
    reset: function () {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.load();
    }
};
