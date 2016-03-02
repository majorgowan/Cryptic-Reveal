var clue_blanks = new Array();
var clue_letters = new Array();
var clue_answer;
var blankChar = '-';

function init_clue_block(answer) {
    clue_answer = answer;

    var count = 0;
    for (var ii=0; ii < clue_answer.length; ii++) {
        if (clue_answer.charAt(ii) != ' ') {
            clue_blanks[count] = blankChar;
            clue_letters[count] = clue_answer[ii];
            count++;
        }
    }

}

function checkAnswer(e, rightAnswer) {
    if (e.keyCode == 13) {
        console.log("hmmm...");
        e.preventDefault();
        answerField = document.getElementById("answer");
        if (answerField.value == rightAnswer) {
            console.log("he got it!");
            answerField.value = 'Bingo!';
            answerField.readOnly = true;
            gameOver(true);
        } else {
            console.log("he didn't get it!");
            window.setTimeout(function() {
                answerField.value = '';
            },1000);
            var change = updateScore(-200);
            answerField.value = "Wrong!\n" + change;
            focusAnswer();
        }
    }
}

function count_blanks() {
    return count = clue_blanks.reduce(function(n, val) {
        return n + (val === blankChar);
    }, 0);
}

function setClueBlanksElement(full) {
    if (full) {
        document.getElementById("clue_blanks").textContent = clue_answer;
    } else {
        var count = 0;
        clueBlanksString = "";
        for (var ii=0; ii < clue_blanks.length; ii++) {
            if (clue_answer.charAt(count) == ' ') {
                count++;
                clueBlanksString += ' ';
            }
            clueBlanksString += clue_blanks[ii];
            count++;
        }
        document.getElementById("clue_blanks").textContent = clueBlanksString;
    }
}

function get_letter() {
    if (count_blanks() > 1) {
        var looking = true;
        var place = -1;
        while (looking) {
            // randomly pick a letter to reveal
            place = Math.floor(Math.random()*clue_letters.length);
            if (clue_letters[place] != clue_blanks[place]) {
                clue_blanks[place] = clue_letters[place];
                looking = false;
            }
        }
        setClueBlanksElement(false);
        updateScore(-200);
    }
    focusAnswer();
}

function focusAnswer() {
    document.getElementById("answer").focus();
}
