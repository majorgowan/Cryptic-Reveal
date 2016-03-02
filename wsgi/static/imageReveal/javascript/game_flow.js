
function updateScore(change) {
    // update score
    var scoreDisplay = document.getElementById("score");
    var score = parseInt(scoreDisplay.textContent);
    var newscore = Math.max(Math.floor(score/2), score+change);
    var scoreString = "" + newscore;
    if (newscore < 1000) {
        scoreString = "0" + scoreString;
        if (newscore < 100) {
            scoreString = "0" + scoreString;
            if (newscore < 10) {
                scoreString = "0" + scoreString;
            }
        }
    }
    scoreDisplay.textContent = scoreString;
    return (newscore-score);
}

function updatePoints(change) {
    // update score
    var pointsDisplay = document.getElementById("points");
    var points = parseInt(pointsDisplay.textContent);
    var newpoints = points + change;
    var pointsString = "" + newpoints;
    if (newpoints < 1000) {
        pointsString = "0" + pointsString;
        if (newpoints < 100) {
            pointsString = "0" + pointsString;
            if (newpoints < 10) {
                pointsString = "0" + pointsString;
            }
        }
    }
    pointsDisplay.textContent = pointsString;
}

function gameOver(success) {
    if (success) {
        stopTimer();
        // increment total_points by adding score
        updatePoints(parseInt(document.getElementById("score").textContent));
    }
    // slow full-reveal of image, rest of function is callback for after reveal
    fullReveal(25,100, function() {
        // complete blanks display
        setClueBlanksElement(true);
        window.setTimeout(function() {
            // alert to submit form to move to next clue bzw hippo birdie screen
            alert('Next clue?');
            var total_points = parseInt(document.getElementById("points").textContent);
            document.getElementById("total_points").value = "" + total_points;
            console.log(document.getElementById("total_points").value);
            document.forms["next_clue_or_end"].submit();
        },2500);
    });
}

