/* global $: false, console: false */
$(document).ready(function(){
    'use strict';
    function changeLength( isIncrement, lengthString) {

        if (lengthString === 'break') {
            if (isIncrement === false && breakLength > 0) {
                breakLength += -1;
            } else if (isIncrement === true) {
                breakLength += 1;
            }
        } else if (lengthString === 'session') {
            if (isIncrement === false && sessionLength > 0) {
                sessionLength += -1;
            } else if (isIncrement === true ) {
                sessionLength += 1;
            }
        }
        if (currentType === lengthString ) {
            if (currentType === 'session') {
                currentMinutes = sessionLength;
                currentSeconds = 0;
                displayTime();
            } else if (currentType === 'break') {
                currentMinutes = breakLength;
                currentSeconds = 0;
                displayTime();
            }
        }

    }
    function displayTime() {
        //pad single digit second value with a zero
        var seconds = currentSeconds.toString().length === 1 ? '0'+currentSeconds:currentSeconds;
        currentTimeDisplay.text(currentMinutes+':'+seconds);

        if (sessionLength === 0) {
            fill.attr('style', 'top:0%');
        } else {
            var percentDone = 100 -
                100 * (60 * currentMinutes + currentSeconds) /
                (60 * sessionLength);
            //move the fill div up by setting the top attr from 100% to 0%
            fill.attr('style', 'top:'+ (100 - percentDone)+'%');
        }

    }
    function displayType() {
        currentTypeDisplay.text(currentType);
    }
    function countDown() {
        if (currentSeconds > 0) {
            currentSeconds -= 1;
        } else {
            currentMinutes -= 1;
            currentSeconds = 59;
        }
        if (currentMinutes < 0) {
            if (currentType === 'session') {
                currentType = 'break';
                currentMinutes = breakLength;
                currentSeconds = 0;
                fillingCircle.removeClass('green-border');
                fillingCircle.addClass('red-border');
                fill.removeClass('green-background');
                fill.addClass('red-background');
                displayType();
            } else if (currentType === 'break') {
                currentType = 'session';
                currentMinutes = sessionLength;
                currentSeconds = 0;
                fillingCircle.removeClass('red-border');
                fillingCircle.addClass('green-border');
                fill.removeClass('red-background');
                fill.addClass('green-background');
                displayType();
            }
        }
    }
    function pause() {
        isPaused = true;
        $('#break-decrement').on('click', function(){
            changeLength( false, 'break');
            $('#break-time-indicator').text(breakLength);
        });
        $('#break-increment').on('click', function() {
            changeLength( true, 'break');
            $('#break-time-indicator').text(breakLength);
        });
        $('#session-decrement').on('click', function(){
            changeLength( false, 'session');
            $('#session-time-indicator').text(sessionLength);
        });
        $('#session-increment').on('click', function() {
            changeLength( true, 'session');
            $('#session-time-indicator').text(sessionLength);
        });
        clearInterval(intervalID);
    }
    function start() {
        isPaused = false;
        breakDecrement.off();
        breakIncrement.off();
        sessionDecrement.off();
        sessionIncrement.off();

        intervalID = window.setInterval(function(){
            countDown();
            displayTime();
        }, 1000);
    }
    var intervalID;
    var timerText = $('#timer-text');
    var currentTypeDisplay = timerText.find('h2');
    var currentTimeDisplay = timerText.find('h3');
    var breakDecrement = $('#break-decrement');
    var breakIncrement = $('#break-increment');
    var sessionDecrement = $('#session-decrement');
    var sessionIncrement = $('#session-increment');
    var fillingCircle = $('#filling-circle');
    var fill = $('#fill');
    var currentType = 'session';
    var breakLength = 5;
    var sessionLength = 25;
    var currentMinutes = 25;
    var currentSeconds = 0;
    var isPaused;
    pause();
        fillingCircle.on('click', function(){
        if (isPaused) {
            start();
        } else {
            pause();
        }

    });


});