// if (document.URL.search('topbar=true') > 0) {
    if (!atopCheckCookie('asHideCartBanner')) {
        setTimeout(function(){
            jQuery('.atop-bar').css('display', 'block');
            // atoppersWidget.API.Behavioral.showModal('5a9427a0d55930dec4469645', true);
            jQuery('body').css('marginTop','50px');
            jQuery('.header-content').css('marginTop','50px');
            console.log('setting cookie');
            atopSetCookie('asSeenRaf',1,7);
        }, 1000);
    }
// }


function asCloseBanner(){
    jQuery('.atop-bar').css('display', 'none');
    // atoppersWidget.API.Behavioral.closeModal("5a9427a0d55930dec4469645");
    jQuery('body').css('marginTop','0px');
    jQuery('.header-content').css('marginTop','0px');
    atopSetCookie('asHideCartBanner',1,7);
}

if(atopCheckCookie('asHideCartBanner')){
    //hide banner
    jQuery('.atop-bar').css('display', 'none');
    // atoppersWidget.API.Behavioral.closeModal("5a9427a0d55930dec4469645");
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    console.log('mobile');
    setTimeout(function(){    
        jQuery('body').css('marginTop','50px');
        jQuery('.header-content').css('marginTop','50px');
    },  1000);
}



// FLASH SALE TIMER

// console.log(testDate);
flashSale('Test Flash Sale Minutes', 1440, 'newcountdown');
// flashSale('Test Flash Sale Date', testDate, 'newcountdown');
// atopDeleteCookie('Test Flash Sale Minutes')

/**
 * accepts timer end date and element id for displaying countdown
 *
 * @param {*Object} end - Date object marking timer end
 * @param {*String} id - String for element ID
 */

function countdownTimer(end, id) {

    var day = 86400000;
    var hour = 3600000;
    var minute = 60000;
    var second = 1000;
    var timer;

    function showRemaining() {
        var distance = end - new Date();

        var days = Math.floor(distance / day);
        var hours = Math.floor(distance % day / hour);
        var minutes = Math.floor(distance % hour / minute);
        var seconds = Math.floor(distance % minute / second);
        
        if (distance < 0) {
            clearInterval(timer);
            try {
                document.getElementById(id).innerHTML = 'EXPIRED!';
                // document.getElementById('pillcountdown').innerHTML = 'EXPIRED!';
                // atopPortal.PillMessageHide();
                // atopSetCookie('asShowFlash', false, 1);
            } catch (e) {}

            return;
        }

        try {

            seconds = seconds >= 10 ? seconds : ('0' + seconds);

            if (days > 0) {
                document.getElementById(id).innerHTML = days > 1 ? (days + ' : ') : (days + ' : ');
                document.getElementById(id).innerHTML += hours > 1 ? (hours + ' : ') : (hours + ' : ');
                document.getElementById(id).innerHTML += minutes > 1 ? (minutes + ' : ') : (minutes + ' : ');
                document.getElementById(id).innerHTML += seconds > 1 ? (seconds + ' ') : (seconds + ' ');

                // var timeLeft = days + ' Days ' + hours + ':' + minutes + ':' + seconds;
                // document.getElementById('pillcountdown').innerHTML = timeLeft;
            }
            if (days < 1 && hours > 0) {
                document.getElementById(id).innerHTML = hours > 1 ? (hours + ' : ') : (hours + ' : ');
                document.getElementById(id).innerHTML += minutes > 1 ? (minutes + ' : ') : (minutes + ' : ');
                document.getElementById(id).innerHTML += seconds > 1 ? (seconds + ' ') : (seconds + ' ');

                // timeLeft = hours + ':' + minutes + ':' + seconds;
                // document.getElementById('pillcountdown').innerHTML = timeLeft;
            }
            if (days < 1 && hours < 1 && minutes > 0) {
                document.getElementById(id).innerHTML = minutes > 1 ? (minutes + ' : ') : (minutes + ' : ');
                document.getElementById(id).innerHTML += seconds > 1 ? (seconds + ' ') : (seconds + ' ');

                // timeLeft = minutes + ':' + seconds;
                // document.getElementById('pillcountdown').innerHTML = timeLeft;
            }
            if (days < 1 && hours < 1 && minutes < 1) {
                document.getElementById(id).innerHTML = seconds > 1 ? (seconds + ' ') : (seconds + ' ');

                // timeLeft = seconds;
                // document.getElementById('pillcountdown').innerHTML = timeLeft;
            }
        } catch (e) {}
        
    }

    timer = setInterval(showRemaining, 1000);
}

/**
 * checks for existing cookie for specified flash sale,
 * if none found and type is static,
 * sets a new cookie based on provided end date,
 * with one year expiration for cookie
 *
 * @param {*String} timerCookieName - name of the flash sale for the cookie
 * @param {*Object || Number} countdownEndDate - end Date or total time in minutes
 * @param {*String} countdownId - element ID for displaying the countdown
 * @param {*String} countdownType - static if to be stored in cookie, dynamic if not
 */

function flashSale(timerCookieName, countdownEndDate, countdownId, countdownType) {

    var flashEnd;
    var now;
    var timerCookie;
    var diff;

    if (countdownType === undefined) {
        countdownType = 'static';
    }

    // check for cookie
    if (atopCheckCookie(timerCookieName)) {
        flashEnd = new Date(atopGetCookie(timerCookieName));
    } else if (typeof countdownEndDate === 'object' && countdownType === 'static') {
        flashEnd = countdownEndDate;
        // set cookie with countdown end date, 1 year expiration
        atopSetCookie(timerCookieName, countdownEndDate, 365);
    } else if (typeof countdownEndDate === 'number' && countdownType === 'static') {
        diff = countdownEndDate * 60000;

        now = new Date();
        flashEnd = new Date(now.getTime() + diff);
        // set cookie with countdown end of now + number of minutes
        atopSetCookie(timerCookieName, flashEnd, 365);
    } else if (typeof countdownEndDate === 'number' && countdownType === 'dynamic') {
        diff = countdownEndDate * 60000;
        
        now = new Date();
        flashEnd = new Date(now.getTime() + diff);
    }

    // console.log(flashEnd);
    countdownTimer(flashEnd, countdownId);

}



//-------UPDATED COOKIE FUNCTIONS--------//
function atopSetCookie(atop_cookie_name, atop_cookie_value, atop_cookie_expires) {
  var d = new Date();
  d.setTime(d.getTime() + (atop_cookie_expires * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = atop_cookie_name + "=" + atop_cookie_value + "; " + expires + ";path=/";
  //document.cookie = atop_cookie_name + "=" + atop_cookie_value + "; " + expires + ";domain=.example.com;path=/";
}

function atopGetCookie(atop_cookie_name) {
  var name = atop_cookie_name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

function atopCheckCookie(atop_cookie_name) {
  var atop_cookie_val = atopGetCookie(atop_cookie_name);
  if (atop_cookie_val != "" && atop_cookie_val != null) {
    return true;
  } else {
    return false;
  }
}

function atopDeleteCookie(atop_cookie_name){
 atopSetCookie(atop_cookie_name , "" , -1);
}