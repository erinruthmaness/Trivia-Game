var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;

var timer
var counter = 0; //to cycle through the array

var questionArray = [
    question1 = {
        asking: "Which of the following is NOT a member of ABBA?",
        right: "Astrid",
        wrong: ["Benny", "Björn", "Frida"],
        correction: "ABBA stands for Agnetha, Björn, Benny, and Anni-Frid (Frida).",
        srcPic: "./assets/images/abba1.jpg",
    },

    question2 = {
        asking: "Which of these songs was the quartet's first single to chart in the United States?",
        right: "People Need Love",
        wrong: ["Dancing Queen", "Voulez-vous", "Two For the Price of One"],
        correction: "People Need Love was ABBA's first single to chart in the UK.",
        srcPic: "./assets/images/abba2.jpg",

    },

    question3 = {
        asking: "What song did they perform for Eurovision in 1974?",
        right: "Waterloo",
        wrong: ["Dancing Queen", "Take A Chance On Me", "The Winner Takes it All"],
        correction: "ABBA performed Waterloo during Eurovision.",
        srcPic: "./assets/images/abba3.jpg",
    },

    question4 = {
        asking: "Where is ABBA from?",
        right: "Sweden",
        wrong: ["Switzerland", "Finland", "Austria"],
        correction: "All four members of ABBA are from Sweden.",
        srcPic: "./assets/images/abba4.jpg",
    },

    question5 = {
        asking: "Which album was their first to chart at #1 in the UK?",
        right: "Greatest Hits",
        wrong: ["Arrival", "ABBA", "Ring Ring"],
        correction: "'Greatest Hits' was ABBA's first album to top the UK charts.",
        srcPic: "./assets/images/abba5.jpg",
    },
]


function questionSetup() {
    //displays the question in each object in the array
    if (counter >= questionArray.length) {
        clearPage();
        clearInterval(pageTimer);
        $("#timer").text("That's it!")
        $("<div> Correct Answers: " + correctAnswers + "</div>").appendTo("#questionBox");
        $("<div> Incorrect Answers: " + wrongAnswers + "</div>").appendTo("#questionBox");;
        $("<div> Unanswered: " + unanswered + "</div>").appendTo("#questionBox");;
        $("<div id='continue'> Click to Try Again! </div>").appendTo("#buttons").on("click", function () {
            resetGame();
        })
        return;
    }
    var timeleft = 14;
    var pageTimer = setInterval(function () {
        $("#timer").text("Time Left: " + timeleft);
        timeleft--;
        if (timeleft <= 0) {
            clearInterval(pageTimer);
            unanswered++;
            clearPage();
            $("#question").text("Out of time! " + questionArray[counter].correction);
            makeContinueButton();

        }
    }, 1000);

    $("#question").text(questionArray[counter].asking);
    //creates divs on the DOM for the right answer..
    var correctButton = $("<div>");
    correctButton.attr("id", "correct");
    correctButton.attr("class", "answerChoice");
    correctButton.text(questionArray[counter].right);
    $("#buttons").append(correctButton);
    //and for all three wrong answers
    for (var i = 0; i < questionArray[counter].wrong.length; i++) {
        var wrongButton = $("<div>");
        wrongButton.attr("class", "wrong answerChoice");
        wrongButton.text(questionArray[counter].wrong[i]);
        $("#buttons").append(wrongButton);
    }
    //to randomize the order of elements with class answerChoice
    var answerChoice = $(".answerChoice");
    for (var i = 0; i < answerChoice.length; i++) {
        var target = Math.floor(Math.random() * answerChoice.length - 1) + 1;
        var target2 = Math.floor(Math.random() * answerChoice.length - 1) + 1;
        answerChoice.eq(target).before(answerChoice.eq(target2));

    }

    //waits for a click on one of the button divs
    $(".answerChoice").on("click", function () {
        if (this.id === "correct") {
            console.log("YEP");
            clearInterval(pageTimer);
            correctAnswers++;
            clearPage();
            $("#question").text("Well done! " + questionArray[counter].correction);
            makeContinueButton();

        }

        else if ($(this).hasClass("wrong")) {
            console.log("NOPE");
            clearInterval(pageTimer);
            wrongAnswers++;
            clearPage();
            $("#question").text(questionArray[counter].correction);
            $("#question").text("Nope! " + questionArray[counter].correction);
            makeContinueButton();

        }

    })

}

function clearPage() {
    $("#timer").text("Time Left: 15");
    $("#questionBox").empty();
    $("<div>").attr("id", "question").appendTo("#questionBox");
    $("#buttons").empty();
}

function makeContinueButton() {
    //erases existing answer buttons
    $("#buttons").empty();
    //makes one continue button
    var continueButton = $("<div>")
    continueButton.attr("id", "continue").text("Click to continue...").appendTo("#questionBox");
    $("#continue").on("click", function () {
        counter++;
        console.log(counter);
        clearPage();
        questionSetup();
    })
    //makes an img and sticks it in there
    var addPic = $("<img>").attr("src", questionArray[counter].srcPic);
    addPic.appendTo("#buttons");
}

function resetGame() {
    clearPage();
    unanswered = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    counter = 0;
    questionSetup();

}


questionSetup();

