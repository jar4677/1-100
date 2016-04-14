/**
 * Created by jar4677 on 4/14/16.
 */

//Basic Guess Event
var theNumber = null;

function pickNumber() {
    return (Math.ceil(Math.random() * 10));
}

$("document").ready(function () {
    theNumber = pickNumber()
});

function makeGuess() {
    var theGuess = $("#guess_input").val();

    if (theGuess > theNumber){
        $("#response").html("Too High!");
        $("#guess").css('background-color', 'red');
    } else if (theGuess < theNumber){
        $("#response").html("Too Low!");
        $("#guess").css('background-color', 'blue');
    } else {
        $("#response").html("You guessed it!");
        $("#guess").css('background-color', 'green');
    }

    // switch (true){
    //     case (isNaN(theGuess) || theGuess < 1 || theGuess > 10):
    //         $("#response").html("Invalid Input");
    //         break;
    //     case (theGuess > theNumber):
    //         $("#response").html("Too High!");
    //         $("#guess").css('background-color', 'red');
    //         break;
    //     case (theGuess < theNumber):
    //         $("#response").html("Too Low!");
    //         $("#guess").css('background-color', 'blue');
    //         break;
    //     default :
    //         $("#response").html("You guessed it!");
    //         $("#guess").css('background-color', 'green');
    //         break;
    // }
}

$("#guess").click(function () {
    makeGuess();
});