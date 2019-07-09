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
    //displays the timer in id timer
    //displays the question in each object in the array
    if (counter >= questionArray.length) {
        return;
    }
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
            correctAnswers++;
            clearPage();
            $("#timer").text("Well done! "+questionArray[counter].correction);
            $("#question").text("Click to continue...");
            var addPic = $("<img>").attr("src", questionArray[counter].srcPic);
            $("#buttons").empty();
            addPic.appendTo("#buttons");
            $("#question").on("click", function() {
                counter++;
                clearPage();
            })
        }

        else if ($(this).hasClass("wrong")) {
            console.log("NOPE");
            wrongAnswers++;
            clearPage();
            $("#question").text(questionArray[counter].correction);
            var addPic = $("<img>").attr("src", questionArray[counter].srcPic);
            $("#buttons").empty();
            addPic.appendTo("#buttons");
            $("#timer").text("Nope! "+questionArray[counter].correction);
            $("#question").text("Click to continue...");
            var addPic = $("<img>").attr("src", questionArray[counter].srcPic);
            $("#buttons").empty();
            addPic.appendTo("#buttons");
            $("#question").on("click", function() {
                counter++;
                clearPage();
            })
        }

        else {
            unanswered++;
            clearPage();
            $("#timer").text("Out of time! "+questionArray[counter].correction);
            $("#question").text("Click to continue...");
            var addPic = $("<img>").attr("src", questionArray[counter].srcPic);
            $("#buttons").empty();
            addPic.appendTo("#buttons");
            $("#question").on("click", function() {
                counter++;
                clearPage();
            })

        }


    })



}


function clearPage() {
    $("#timer").empty();
    $("#question").empty();
    $("#buttons").empty();
}


function resetGame() {
    //sets all three variables to zero
    //starts the questions over
}

// for (var j = 0; j < questionArray.length; j++) {
//     questionSetup(questionArray[j]);
// }

questionSetup();
// counter++;
// setInterval(questionSetup, 30000);
