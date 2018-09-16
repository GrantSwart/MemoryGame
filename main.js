//var event1 = document.getElementById("quizCategory");
window.addEventListener('load', newBoard, false);


//var event1 = document.getElementById("button1");
//event1.addEventListener('click', Quiz.checkGuess, false);

//newBoard()

//card array
var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];

var tilesValues = [];
var tilesIds = [];
var tilesFlipped = 0;

var number_correct = 0;


/********************************** CREATE NEW BOARD ******************************/
// create a new board 
function newBoard() {

    tiles_flipped = 0;
    var output = '';
    //shuffle the array to mix up the elements before dynamically placing on the board
    shuffle(memory_array);

    for (var i = 0; i < memory_array.length; i++) {
        //dynamically display and set id and value of div tiles onto board, CSS used to style
        output += '<div id="tile_' + i + '" onclick="flipTile(this,\'' + memory_array[i] + '\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;

}

/********************************** END NEW BOARD ******************************/

/********************************** SHUFFLE ******************************/
//SHUFFLE Function

function shuffle(theArray){
    var i = theArray.length
    var j = 0;
    var temp = null;
   // console.log("theArrayBefore: " + theArray);
    while (--i > 0) {
    //get random index position in array
        j = Math.floor(Math.random() * (i + 1));
    //swap with current i index position
    temp = theArray[j];
    theArray[j] = theArray[i];
    theArray[i] = temp;

    //console.log("i: " + i);
    //console.log("j: " + j);
    //console.log("temp: " + temp);

    }
 //   console.log("theArrayAfter: " + theArray);
   // return theArray;

}

/********************************** END SHUFFLE ******************************/



/********************************** FLIP ******************************/
//memory flip tile function passes in 2 parameters  the actual div (this) and the value in the div
function flipTile(tile, val) {
 //   console.log("tile: " + tile + " value: " + val);

    //flip and show tiles
    if (tile.innerHTML == "" && tilesValues.length < 2) {
        tile.style.background = '#fff';
        tile.innerHTML = val;
        tilesFlipped += 1;
   //     console.log("tiles flipped counter: " + tilesFlipped);
   //     console.log("memory array length: " + memory_array.length);

    }

    //no cards flipped
    if (tilesValues.length == 0) {
        tilesValues.push(val);
        tilesIds.push(tile.id);
   //     console.log("mem tile 0 : " + tilesIds[0]);
    } //one card already flipped
    else if (tilesValues.length == 1) {
        //validate the same tile not been flipped
        uniqueTileCheck(tile.id)
        tilesValues.push(val);
        tilesIds.push(tile.id);
    //    console.log("mem tile 1 : " + tilesIds[1]);

    }

    //check for flipback
    if (tilesFlipped == 2) {
     //   console.log("tiles flipped = 2 test so test, updated and flip back or not");
        //2 tiles flipped and their value are the same
        if (tilesValues[0] == tilesValues[1]) {
            //2 tiles flipped and are the same
            tilesValues = [];
            tilesIds = [];
      //      console.log("tiles flipped are the same so keep visible");
            tilesFlipped = 0;
            number_correct = number_correct + 2;
      //      console.log("number correct: " + number_correct);
            document.getElementById('feedback1').innerHTML = "Number correctly matched: " + number_correct;
            document.getElementById('feedback2').innerHTML = "Number remaining to match: " + memory_array.length - number_correct;
            document.getElementById('feedback3').innerHTML = "Number correctly matched: " + number_correct;

            endOfGame();
        } else {
      //      console.log("2 tiles flipped are different so flipback after timeout of 900 milliseconds");
            setTimeout(flipBack, 900);
       //     console.log("number correct: " + number_correct);
            document.getElementById('feedback1').innerHTML = "Number correctly matched: " + number_correct;
            document.getElementById('feedback2').innerHTML = "Pairs remaining to match: " + ((memory_array.length - number_correct)/2);
            document.getElementById('feedback3').innerHTML = "Number guesses to date: ";

        }

    }//end if tiles flipped = 2
}

/********************************** END VALIDATION ******************************/

function uniqueTileCheck(tile) {
    //test if at end of game
   // console.log(tilesIds[0]);
   // console.log(tile);
    if (tile == tilesIds[0]) {
        alert("you have clicked on the same tile ! Please click on a different tile.");
    }
    setTimeout(flipBack, 900);
}
/********************************** FLIP BACK ******************************/

/********************************** END FLIP ******************************/

function endOfGame() {
    //test if at end of game
    if (number_correct == memory_array.length) {
        //alert("board cleared");
        document.getElementById('feedback4').innerHTML = "Game completed!";

        //document.getElementById('memory_board').innerHTML = "";
        //newBoard();
    }
}
/********************************** FLIP BACK ******************************/
function flipBack() {
    
    var tile_1 = document.getElementById(tilesIds[0]);
    var tile_2 = document.getElementById(tilesIds[1]);
    console.log(tile_1);
    console.log(tile_2);

   // output += '<div id="tile_' + i + '" onclick="flipTile(this,\'' + memory_array[i] + '\')"></div>';

    tile_1.style.background = 'url(puppy.jpg) no-repeat';
    tile_2.style.background = 'url(puppy.jpg) no-repeat';

    tile_1.innerHTML = "";
    tile_2.innerHTML = "";
    tilesValues = [];
    tilesIds = [];
    tilesFlipped = 0;
}//endflip2Back
/********************************** END FLIP BACK ******************************/




