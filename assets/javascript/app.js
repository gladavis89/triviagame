// (1) create a set of questions and answers
var questions =[{test1:[{question:"test"},{answer1:"test",answer2:"test",answer3:"test",answer4:"test"},{actual:0}]}, "test2"];
// (2) start page with rules with start button
$("#question").html(
    "<h2>All about that funk!</h2><button class='btn bg-primary'><h1 id='start'>Start</h1></button>"
)
// (3) if user clicks start button start timer and create loop with sets of questions and possible answers
$("#start").click(function(){
    $("#question").html(questions[0].test1[0].question);
    $("#answers").html("<p>" + questions[0].test1[1].answer1 + "</p>")
    $("#answers").append("<p>" + questions[0].test1[1].answer2 + "</p>")
    $("#answers").append("<p>" + questions[0].test1[1].answer3 + "</p>")
    $("#answers").append("<p>" + questions[0].test1[1].answer4 + "</p>")
})
// (4) if user clicks correct answer advance to 'correct' page and set 3 second timer then advance loop to next questions

// (5) if user clicks wrong answer advance to 'wrong' page, show correct answer and set 3 second timer then advance loop to next questions

// (6) when all questions are complete show page with all questions that were correct and all questions wrong. add restart button

// (7) if user clicks restart button, start at (2)