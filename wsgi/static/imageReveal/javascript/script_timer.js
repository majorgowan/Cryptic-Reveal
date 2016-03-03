// from stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer

var myTimer;

function startTimer(duration) {
    var display = document.getElementById("counterdown");
    var timer = duration, minutes, seconds;

    var remaining_periods = 48-1;
    var period = Math.floor(duration/(remaining_periods+1)); 
    console.log('remaining_periods, period = ' + remaining_periods + ', ' + period);

    focusAnswer();

    myTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        console.log('  remaining_periods, period = ' + remaining_periods + ', ' + period);
        if (timer <= remaining_periods*period) {
            remaining_periods--;
            updateScore(-10);
            console.log('time penalty!')
        }
        timer -= 5;
        if (timer < 1) {
            stopTimer();
            display.textContent = "----";
            gameOver(false);
        }

    }, 5000);
}

function stopTimer() {
    clearInterval(myTimer);
}
