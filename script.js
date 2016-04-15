/**
 * Created by jar4677 on 4/14/16.
 */

//Basic Guess Event
var theNumber = null;
var correct = false;
var score = 101;

//color change variables
var hiRange;
var loRange;
var guessDif;
var rgb = [255, 0, 255];
var color = "rgb(" + rgb.join(", ") + ")";


//pick a random number
function pickNumber() {
    var randomNumber = (Math.ceil(Math.random() * 100));
    loRange = (randomNumber - 1);
    hiRange = (100 - (randomNumber + 1));
    console.log('random #: ', randomNumber);
    // console.log('loRange : ', loRange);
    // console.log('hiRange : ', hiRange);
    console.log('rgb_1: ', rgb);
    return (randomNumber);
}

//run the first time
$("document").ready(function () {
    theNumber = pickNumber();
});

//submit guess
function makeGuess() {
    var theGuess = $("#guess_input").val();
    guessDif = (Math.abs(theNumber - theGuess) - 1);

    //set rgb values by %
    function setColor(loOrhi) {
        var x = ((loOrhi - guessDif) / loOrhi);
        console.log('dif %: ', x);
        if (x < .5){
            rgb[0] = Math.round(255 * x);
            rgb[2] = 255;
        } else if (x > .5){
            rgb[2] = Math.round(255 * x);
            rgb[0] = 255;
        }
        color = "rgb(" + rgb.join(", ") + ")";
    }

    switch (true){
        case (isNaN(theGuess) || theGuess < 1 || theGuess > 100):
            $("#response").html("Invalid Input");
            $("#reprompt").css('display', 'block');
            $("#guess_input").focus();
            break;
        case (theGuess > theNumber):
            $("#response").html("Too High!");
            $("#reprompt").css('display', 'block');
            setColor(hiRange);
            console.log('rgb: ', rgb, 'color: ', color);
            $("#guess").css('background-color', color);
            $("#guess_input").focus();
            break;
        case (theGuess < theNumber):
            $("#response").html("Too Low!");
            $("#reprompt").css('display', 'block');
            setColor(loRange);
            console.log('rgb: ', rgb, 'color: ', color);
            $("#guess").css('background-color', color);
            $("#guess_input").focus();
            break;
        default :
            $("#response").html("You guessed it!");
            $("#reprompt").css('display', 'none');
            $("#new-game").css('display', 'block');
            $("#guess").css('background-color', 'green');
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
        score--;
        makeGuess();
    }
});

// $("#reset").click(function () {
//     reset();
// });