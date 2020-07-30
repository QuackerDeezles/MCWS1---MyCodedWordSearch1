// Only thing you need to change is wordMaze, allWords, columnLength, font-size, and dimensions!
var wordMaze = "WAMEDICAMENTATIONAAA" + "EBBBBN7777ABTBBBBIBA" + "ACGASTROENTERITISNMP" + "TDDMDEDDDDIDI777DAIP" + "HAEAERCEEEO7PFFFICLR" + "ECGGGPHGGGNGLGGGSCLO" + "RCONGRATULATIONSAEIP" + "BOPEIERI77LICONIDSER" + "OMITJTAJJJIJIJOJVSQI" + "APSO7ACKKKSTFKIKAIUA" + "RLTELTTLLLALOLTLNBIT" + "DIHLMIEMMNT7LMAMTIVE" + "ISOENORNINININCNALAN" + "NHGCONITOOOOUOIOGILE" + "GMNTPSS777NPMPFPETES" + "QEARQATRRRR777IROYNS" + "SNTIRSISSYSSSSNSUSTS" + "7THC77C77T7777O7S77E" + "7SO7MISCHIEVOUSNESSL" + "7RU77TRIFLUOPERAZINE" + "P7SYTILIBAREVUENAM7C" + "777777777I7777P7777T" + "TTSTRAIGHTFORWARDTTR" + "UUUUUUUUUNUUUUUUUUUO" + "77777ACADEMICIANSHIP" + "V777ACHONDROPLASTICO" + "7FORTHCOMINGNESS777S" + "WWWWACHOOFRONTIEREDI" + "777777777N777777777T" + "XYXHYPOPROTEINEMIAXI" + "ELECTRIFICATIONYEETV" + "ZZINSTRUMENTALISTZZE";
var allWords = ["PROCRASTINATION", "PERSONIFICATION","CHARACTERISTICS", "CONGRATULATIONS", "ACCOMPLISHMENTS", "MANEUVERABILITY", "NATIONALISATION", "CONFIDENTIALITY", "ACHONDROPLASTIC", "MEDICAMENTATION", "ELECTRIFICATION", "INSTRUMENTALIST", "ATRIPLICIFOLIUM", "STRAIGHTFORWARD", "ACADEMICIANSHIP", "APPROPRIATENESS", "INACCESSIBILITY", "TRIFLUOPERAZINE", "GASTROENTERITIS", "WEATHERBOARDING", "DISADVANTAGEOUS", "FORTHCOMINGNESS", "MAGNETOELECTRIC", "MISCHIEVOUSNESS", "OPISTHOGNATHOUS", "INTERPRETATIONS", "ELECTROPOSITIVE", "HYPOPROTEINEMIA", "MILLIEQUIVALENT"];
var columnLength = 20;
var xLowLimit = 20;
var yLowLimit = 0;
var xHighLimit;
var yHighLimit;
var answers = [];
var lastLetter = -1;
var firstClick = -1;
var secondClick = -1;
var score = 0;
function createWordSearch() {
  var canvas = document.getElementById("mazeCanvas");
  var ctx = canvas.getContext("2d");
  ctx.font = "20pt Courier";
  var x = 30;
  var y = 30;
  for (var i = 0; i < wordMaze.length; i++) {
    var c = wordMaze.charAt(i);
    if (c != '7') {
      ctx.fillStyle = "#000000";
      ctx.fillText(c, x, y);
    } else {
      ctx.fillStyle = "#888888";
      ctx.fillRect(x, y - 16, 16, 16);
    }
    if (i == columnLength - 1) {
      xHighLimit = x + 20;
    }
    if (i == wordMaze.length - 1) {
      yHighLimit = y + 10;
    }
    x += 30;
    if ((i + 1) % 20 == 0) {
      y += 30;
      x = 30;
    }
  }
  // Draw Word Bank
  ctx.beginPath();
  ctx.rect(30, 1000, 480, 470);
  ctx.stroke();
  ctx.font = "15pt Courier";
  ctx.fillStyle = "#000000";
  var x = 50;
  var y = 1030;
  for (var i = 0; i < allWords.length; i++) {
    ctx.fillText(allWords[i], x, y);
    if (x == 300) {
      y += 30;
    }
    if (x == 50) {
      x = 300;
    } else {
      x = 50;
    }
  }
  canvas.addEventListener("mousemove", doMouseMove, false);
  canvas.addEventListener("mousedown", doMouseDown, false);
  canvas.addEventListener("mouseup", doMouseUp, false);
  solveMaze4Me();
}
function doMouseMove(event) {
  var canvas = document.getElementById("mazeCanvas");
  var ctx = canvas.getContext("2d");
  ctx.font = "20pt Courier";
  var canvasLocation = canvas.getBoundingClientRect();
  var canvas_x = parseInt(event.x - canvasLocation.left);
  var canvas_y = parseInt(event.y - canvasLocation.top);
  var exMod = canvas_x % 30;
  var whyMod = canvas_y % 30;
  var exAdmin = parseInt(canvas_x / 30);
  var whyAdmin = parseInt(canvas_y / 30) + 1;
  if ((canvas_x > xLowLimit) && (canvas_x < xHighLimit) && (canvas_y >= yLowLimit) && (canvas_y < yHighLimit)) {
    if ((canvas_x >= exAdmin * 30) && (canvas_x <= exAdmin * 30 + 15) && (canvas_y >= whyAdmin * 30 - 15) && (canvas_y <= whyAdmin * 30)) {
      var index = (whyAdmin - 1) * 20 + (exAdmin - 1);
      var c = wordMaze.charAt(index);
      if ((index != lastLetter) && (firstClick != index) && (secondClick != index)) {
        if (lastLetter != -1) {
          var c1 = wordMaze.charAt(lastLetter);
          ctx.fillStyle = "#000000";
          var x1 = (lastLetter % columnLength + 1) * 30;
          var y1 = (parseInt(lastLetter / columnLength) + 1) * 30;
          ctx.fillText(c1, x1, y1);
        }
        if (c != '7') {
          lastLetter = index;
          ctx.fillStyle = "#ff0000";
          ctx.fillText(c, exAdmin * 30, whyAdmin * 30);
        }
      }
    } else {
      if (lastLetter != -1) {
        var c1 = wordMaze.charAt(lastLetter);
        if (lastLetter != '7') {
          ctx.fillStyle = "#000000";
          var x1 = (lastLetter % columnLength + 1) * 30;
          var y1 = (parseInt(lastLetter / columnLength) + 1) * 30;
          ctx.fillText(c1, x1, y1);
        }
        lastLetter = -1;
      }
    }
  }
}
function doMouseDown(event) {
  var canvas = document.getElementById("mazeCanvas");
  var ctx = canvas.getContext("2d");
  ctx.font = "20pt Courier";
  var canvasLocation = canvas.getBoundingClientRect();
  var canvas_x = parseInt(event.x - canvasLocation.left);
  var canvas_y = parseInt(event.y - canvasLocation.top);
}
function doMouseUp(event) {
  var canvas = document.getElementById("mazeCanvas");
  var ctx = canvas.getContext("2d");
  ctx.font = "20pt Courier";
  var canvasLocation = canvas.getBoundingClientRect();
  var canvas_x = parseInt(event.x - canvasLocation.left);
  var canvas_y = parseInt(event.y - canvasLocation.top);
  if (lastLetter > -1) {
    if (firstClick == -1) {
      firstClick = lastLetter;
      ctx.fillStyle = "#0000FF";
      var c1 = wordMaze.charAt(firstClick);
      var x1 = (firstClick % columnLength + 1) * 30;
      var y1 = (parseInt(firstClick / columnLength) + 1) * 30;
      ctx.fillText(c1, x1, y1);
      lastLetter = -1;  
    } else if (secondClick == -1) {
      secondClick = lastLetter;
      lastLetter = -1;
      var wordFound = false;
      // Check code for actual answer
      for (var i = 0; i < answers.length; i++) {
        var element = answers[i];
        if ((answers[i][4] == false) && (((answers[i][1] == firstClick) && (answers[i][2] == secondClick)) || ((answers[i][1] == secondClick) && (answers[i][2] == firstClick)))) {
          wordFound = true;
          // Draw line from first character to last character
          var xIndexWon = firstClick % columnLength;
          var yIndexWon = parseInt(firstClick / columnLength);
          var xIndexToo = secondClick % columnLength;
          var yIndexToo = parseInt(secondClick / columnLength);
          xIndexWon = (xIndexWon + 1) * 30 + 7;
          yIndexWon = (yIndexWon + 1) * 30 - 7;
          xIndexToo = (xIndexToo + 1) * 30 + 7;
          yIndexToo = (yIndexToo + 1) * 30 - 7;
          ctx.beginPath(); 
          ctx.moveTo(xIndexWon,yIndexWon);
          ctx.lineTo(xIndexToo,yIndexToo);
          ctx.strokeStyle = "#FF0000";
          ctx.lineWidth = 2;
          ctx.stroke();
          // Show the word in black on top of the line
          ctx.font = "20pt Courier";
          ctx.fillStyle = "#000000";
          var xVal = ((answers[i][1] % columnLength) + 1) * 30;
          var yVal = (parseInt(answers[i][1] / columnLength)+ 1) * 30;
          for (var j = 0; j < answers[i][0].length; j++) {
            var c = answers[i][0].charAt(j);
            ctx.fillText(c, xVal, yVal);
            switch (answers[i][3]) {
              case "N":
                yVal -= 30;
                break;
              case "NE":
                xVal += 30;
                yVal -= 30;
                break;
              case "E":
                xVal += 30;
                break;
              case "SE":
                xVal += 30;
                yVal += 30;
                break;
              case "S":
                yVal += 30;
                break;
              case "SW":
                xVal -= 30;
                yVal += 30;
                break;
              case "W":
                xVal -= 30;
                break;
              case "NW":
                xVal -= 30;
                yVal -= 30;
                break;
            }
          }
          // Cross the word with a red line in word bank
          var bankRowNumber = parseInt(i / 2);
          var bankColumnNumber = i % 2;
          console.log("row: " + bankRowNumber + ",,, col: " + bankColumnNumber + "!");
          ctx.beginPath(); 
          var ex1 = 50;
          var why1 = 1030;
          if (bankColumnNumber == 1) {
            ex1 = 300;
          }
          why1 += (30 * bankRowNumber) - 5;
          var why2 = why1;
          var ex2 = ex1 + (12 * answers[i][0].length);
          ctx.moveTo(ex1,why1);
          ctx.lineTo(ex2,why2);
          ctx.strokeStyle = "#FF0000";
          ctx.lineWidth = 2;
          ctx.stroke();
          score++;
          console.log("score is.... " + score + "!");
          answers[i][4] = true;
          console.log("setting true for " + answers[i][0] + "!");
          if (score == allWords.length) {
            $("#txtStatus").val("YOU ARE DONE!!!!!!! DO MY OTHER WORD SEARCHES IF YOU FIND THEM :D ");
          }
          break;
        }
        if (!wordFound) {
          ctx.fillStyle = "#000000";
          var c1 = wordMaze.charAt(firstClick);
          var x1 = (firstClick % columnLength + 1) * 30;
          var y1 = (parseInt(firstClick / columnLength) + 1) * 30;
          ctx.fillText(c1, x1, y1);
        }
      }
      firstClick = -1;
      secondClick = -1;
    }
  }
}
function solveMaze4Me() {
  for (var i = 0; i < allWords.length; i++) {
    var word = allWords[i];
    console.log(word);
    for (var j = 0; j < wordMaze.length; j++) {
      var c = wordMaze.charAt(j);
      if (word.charAt(0) == c) {
        // Check N (north)
        if ((word.charAt(1) == wordMaze.charAt(j - columnLength)) && (j >= columnLength * (word.length - 1))) {
          var foundWord = findWord(word, j, "N");
        }
        // Check E (east)
        if ((word.charAt(1) == wordMaze.charAt(j + 1)) && (j % columnLength + word.length <= columnLength)) {
          var foundWord = findWord(word, j, "E");
        }
        // Check W (west)
        if ((word.charAt(1) == wordMaze.charAt(j - 1)) && (((j % columnLength) + 1) >= word.length)) {
          var foundWord = findWord(word, j, "W");
        }
        // Check NW (northwest)
        if ((word.charAt(1) == wordMaze.charAt(j - columnLength - 1)) && (j >= columnLength * (word.length - 1)) && (((j % columnLength) + 1) >= word.length)) {
          var foundWord = findWord(word, j, "NW");
        }
        // Check SW (southwest)
        if ((word.charAt(1) == wordMaze.charAt(j + columnLength + 1)) && (j <= wordMaze.length - (columnLength * (word.length - 1))) && (((j % columnLength) + 1) >= word.length)) {
          var foundWord = findWord(word, j, "SW");
        }
        // Check NE (northeast)
        if ((word.charAt(1) == wordMaze.charAt(j - columnLength + 1)) && (j >= columnLength * (word.length - 1)) && (j % columnLength + word.length <= columnLength)) {
          var foundWord = findWord(word, j, "NE");
        }
        // Check SE (southeast)
        if ((word.charAt(1) == wordMaze.charAt(j + columnLength + 1)) && (j <= wordMaze.length - (columnLength * (word.length - 1))) && (j % columnLength + word.length <= columnLength)) {
          var foundWord = findWord(word, j, "SE");
        }
        // Check S (South)
        if ((word.charAt(1) == wordMaze.charAt(j + columnLength)) && (j <= wordMaze.length - (columnLength * (word.length - 1)))) {
          var foundWord = findWord(word, j, "S");
        }
      }
    }
  }
}
function findWord(word, position, direction) {
  var flag = true;
  var nextPosition = position;
  var lastPosition = position;
  for (var i = 0; i < word.length; i++) {
    if (word.charAt(i) != wordMaze.charAt(nextPosition)) {
      flag = false;
      break;
    }
    lastPosition = nextPosition;
    switch (direction) {
      case "N": 
        nextPosition -= columnLength;
        break;
      case "E":
        nextPosition++;
        break;
      case "W":
        nextPosition--;
        break;
      case "NW":
        nextPosition = nextPosition - (columnLength + 1);
        break;
      case "NE":
        nextPosition = nextPosition - (columnLength - 1);
        break;
      case "S":
        nextPosition += columnLength;
        break;
      case "SE":
        nextPosition = nextPosition + (columnLength + 1);
        break;
      case "SW":
        nextPosition = nextPosition + (columnLength - 1);
    }
  } 
  if (flag) {
    answers.push([word, position, lastPosition, direction, false]);
  }
  return flag;
}
