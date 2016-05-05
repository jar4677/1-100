/**
 * Created by jar4677 on 4/14/16.
 */

//Basic Guess Event
var theNumber = null;
var correct = false;
var score = 105;

//color change variables
var low;
var high;
var color;
var indicator;


//pick a random number
function pickNumber() {
    var randomNumber = (Math.ceil(Math.random() * 100));
    low = ((randomNumber - 1)/2);
    high = (randomNumber + ((100 - (randomNumber + 1))/2));
    console.log(randomNumber);
    return (randomNumber);
}

//run the first time
$("document").ready(function () {
    theNumber = pickNumber();
});

//submit guess
function makeGuess() {
    var theGuess = $("#guess_input").val();

    //set rgb values by %
    function setColor(highLow) {
        //gets the absolute value of the difference from the median
        var guessDif = Math.abs(highLow - theGuess);

        //gets the rgb value depending on whether the guess is high or low
        if (theGuess < theNumber) {
            var x = Math.round(255 * ((highLow - guessDif) / highLow));
        } else {
            var y = 100 - highLow;
            var x = Math.round(255 * ((y - guessDif) / y));
        }

        //sets the rgb value to the color variable
        if (theGuess > low && theGuess < high){
            color = "rgb(255, 0, " + x + ")";
        } else {
            color = "rgb(" + x + ", 0, 255)";
        }

        indicator = 100 - ((x / 255) * 100);
    }

    //makes changes based on input
    switch (true){
        case (isNaN(theGuess) || theGuess < 1 || theGuess > 100):
            $("#response").html("Invalid Input");
            $("#reprompt").css('display', 'block');
            $("#guess_input").focus();
            break;
        case (theGuess > theNumber):
            $("#response").html("Too High!");
            $("#reprompt").css('display', 'block');
            setColor(high);
            $("#guess").css('background-color', color);
            $("#indicator").css('left', indicator + '%');
            $("#guess_input").focus();
            break;
        case (theGuess < theNumber):
            $("#response").html("Too Low!");
            $("#reprompt").css('display', 'block');
            setColor(low);
            $("#guess").css('background-color', color);
            $("#indicator").css('left', indicator + '%');
            $("#guess_input").focus();
            break;
        default :
            $("#response").html("You guessed it!");
            $("#reprompt").css('display', 'none');
            $("#new-game").css('display', 'block');
            $("#guess").css('background-color', 'green');
            $("#indicator").css('display', 'none');
            $("#your-score").html("Your score: " + score + "!").css('display', 'block');
            correct = true;
            break;
    }
}

//reset game
function reset() {
    theNumber = pickNumber();
    $("#response").html("Click Here");
    $("#reprompt, #new-game, #your-score").css('display', 'none');
    $("#guess").css('background-color', 'grey');
    $("#indicator").css('left', '50%').css('display', 'block');
    $("#guess_input").val('');
    $("#guess_input").focus();
    correct = false;
    score = 101;
}

//click handler
$("#guess").click(function () {
    if (correct) {
        reset();
    } else {
        score -= 5;
        makeGuess();
    }
});
