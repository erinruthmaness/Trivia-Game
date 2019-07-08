var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;

var timer

var question1 = {
    asking: "Which of the following is NOT a member of ABBA?",
    right: "Astrid",
    wrong: ["Benny", "Björn", "Frida"],
    correct: "ABBA stands for Agnetha, Björn, Benny, and Anni-Frid (Frida).",
    srcPic: "assets/images/abba1.jpg",
}

var question2 = {
    asking: "Which of these songs was the quartet's first single to chart in the United States?",
    right: "People Need Love",
    wrong1: "Dancing Queen",
    wrong2: "Voulez-vous",
    wrong3: "Two For the Price of One",
    correct: "People Need Love was ABBA's first single to chart in the UK.",
    srcPic: "../assets/images/abba2.jpg",

}

//eventually we'll use this to cycle through questions
var questionArray = [question1, question2]

function questionSetup(object) {
    //displays the timer in id timer
    //displays the question in each object in the array
    $("#question").text(object.asking);
    //creates divs on the DOM for the right answer..
    var correctButton = $("<div>");
    correctButton.attr("id", "correct");
    correctButton.attr("class", "answerChoice");
    correctButton.text(object.right);
    $("#buttons").append(correctButton);
    //and for all three wrong answers
    for (var i = 0; i < object.wrong.length; i++) {
        var wrongButton = $("<div>");
        wrongButton.attr("class", "wrong answerChoice");
        wrongButton.text(object.wrong[i]);
        $("#buttons").append(wrongButton);
    }
    //to randomize the order of elements with class answerChoice
    var answerChoice = $(".answerChoice");
    for (var i = 0; i < answerChoice.length; i++) {
        var target = Math.floor(Math.random() * answerChoice.length - 1) + 1;
        var target2 = Math.floor(Math.random() * answerChoice.length - 1) + 1;
        answerChoice.eq(target).before(answerChoice.eq(target2));

    }

    $(".answerChoice").on("click", function () {
        if (this.id === "correct") {
            console.log("YEP");
            correctAnswers++;
            $("#question").text("Well done!");
            var winnerPic = $("<img>").attr("src", object.srcPic);
            $("#buttons").empty();
            winnerPic.appendTo("#buttons");
            //and move on to the next question
        }

        else if ($(this).hasClass("wrong")) {
            console.log("NOPE");
            wrongAnswers++;
            badGuess();
            //and move on to the next question
        }


    })

    //times out the display after thirty seconds
    timer = setTimeout(function () {
        console.log("OUTTA TIME");
    }, 30 * 1000)




}

// function goodGuess() {
//     $("#question").text("Well done!");
//     var winnerPic = $("<img>").attr("src", object.srcPic);
//     winnerPic.appendTo("#buttons");
// }

function badGuess() {
    //loads in nope and the right answer
}

function outtaTime() {
    //brings up the next question
}

function resetGame() {
    //sets all three variables to zero
    //starts the questions over
}

questionSetup(question1);


