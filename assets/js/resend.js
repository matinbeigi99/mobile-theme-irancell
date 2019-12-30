var _MAX_CALL_CNT = 2;

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function circularTimer() {
    //console.log(getCookie('rsp_tkn_err'));
    var countdownNumberEl = $('#countdown-number')[0];
    $('.btn-resend').hide();
    if (countdownNumberEl) {
        var countdown = 30;
        countdownNumberEl.textContent = countdown;
        var timer = setInterval(function () {
            if (countdown > 1) {
                countdownNumberEl.textContent = --countdown;
            } else {
                clearInterval(timer);
                $('.wrapper').hide();
                $('.btn-resend').fadeIn();

                if (Number(getCookie('_call_cnt')) < _MAX_CALL_CNT) {
                    $('.btn-resend-typ-call').show();
                    $('.btn-resend-typ-phone').hide();
                } else {
                    $('.btn-resend-typ-call').hide();
                    $('.btn-resend-typ-phone').show();
                }
            }
        }, 1000);
    }
}

if (typeof observer !== 'undefined') {
    observer.disconnect();
}
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var observer = new MutationObserver(start_timer);
var container = document.getElementsByClassName('container')[0];
if (typeof container !== 'undefined') {
    observer.observe(container, {childList: true, subtree: true});
}
observer.disconnect();
//$('.container').bind("DOMSubtreeModified DOMNodeInserted DOMNodeRemoved", start_timer());
// OTP resend timer circular
function start_timer() {
}

if (getCookie('_tkn_cnt')) {
    if (getCookie('_tkn_cnt') === 'false') {
        $('.wrapper').hide();
        $('.btn-resend').show();
        if (Number(getCookie('_call_cnt')) < _MAX_CALL_CNT) {
            $('.btn-resend-typ-call').show();
            $('.btn-resend-typ-phone').hide();
        } else {
            $('.btn-resend-typ-call').hide();
            $('.btn-resend-typ-phone').show();
        }
    } else {
        circularTimer();
    }
} else {
    circularTimer();
}
//}
//circularTimer();
