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
    console.log('load #:',theNumber);
});

function makeGuess() {
    var theGuess = $("#guess_input").val();

    switch (true){
        case (isNaN(theGuess) || theGuess < 1 || theGuess > 10):
            $("#response").html("Invalid Input");
            $("#reprompt").css('display', 'block');
            $("#guess_input").focus();
            break;
        case (theGuess > theNumber):
            $("#response").html("Too High!");
            $("#reprompt").css('display', 'block');
            $("#guess").css('background-color', 'red');
            $("#guess_input").focus();
            break;
        case (theGuess < theNumber):
            $("#response").html("Too Low!");
            $("#reprompt").css('display', 'block');
            $("#guess").css('background-color', 'blue');
            $("#guess_input").focus();
            break;
        default :
            $("#response").html("You guessed it!");
            $("#reprompt").css('display', 'none');
            $("#guess").css('background-color', 'green');
            break;
    }
}

$("#guess").click(function () {
    makeGuess();
});

$("#reset").click(function () {
    theNumber = pickNumber();
    $("#response").html("Guess");
    $("#reprompt").css('display', 'none');
    $("#guess_input").val('');
    $("#guess_input").focus();
})