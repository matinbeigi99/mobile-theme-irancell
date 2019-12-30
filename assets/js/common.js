var _paq = _paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function () {
    var u = "//analytics.irancell.ir:9090/";
    _paq.push(['setTrackerUrl', u + 'piwik.php']);
    _paq.push(['setSiteId', '8']);
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.async = true;
    g.defer = true;
    g.src = u + 'piwik.js';
    s.parentNode.insertBefore(g, s);
})();

//     // Some default pre init
//     var Countly = Countly || {};
//     Countly.q = Countly.q || [];
//
// // Provide your app key that you retrieved from Countly dashboard
//     Countly.app_key = "ff20c613649838fac4d634cf14326468632082de";
//
// // Provide your server IP or name. Use try.count.ly or us-try.count.ly
// // or asia-try.count.ly for EE trial server.
// // If you use your own server, make sure you have https enabled if you use
// // https below.
//     Countly.url = "https://analytics.irancell.ir:9090";
//
// // Countly.debug = true;
//
// // Start pushing function calls to queue
// // Track sessions automatically (recommended)
//     Countly.q.push(['track_sessions']);
//
// //track web page views automatically (recommended)
//     Countly.q.push(['track_pageview']);
//
// // Uncomment the following line to track web heatmaps (Enterprise Edition)
// // Countly.q.push(['track_clicks']);
//
// // Uncomment the following line to track web scrollmaps (Enterprise Edition)
// // Countly.q.push(['track_scrolls']);
//
// // Load Countly script asynchronously
//     (function() {
//         var cly = document.createElement('script');
//         cly.type = 'text/javascript';
//         cly.async = true;
//         // Enter url of script here (see below for other option)
//         cly.src = '/javascripts/countly.js';
//         cly.onload = function(){
//             Countly.init();
//         };
//         var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cly, s);
//     })();

var lastOpenedModal = null;
$(document).ready(function () {


});

function ajaxHelper(url, method, data, async, beforeSend, success, error, complete) {
    if (!async) {
        $("#progressdlg").modal({backdrop: 'static', keyboard: false});
    }

    $.ajax({
        beforeSend: beforeSend,
        url: url,
        type: method,
        cache: false,
        async: true,
        data: data,
        timeout: 30000,
        success: function (result) {
            success(result);
        },
        error: function (xhr, status, text) {
            if (status == 401) {
                window.location.reload();
            } else if (error) {
                error(xhr, status, text);
            }
        },
        complete: function () {
            if (!async) {
                $("#progressdlg").modal("hide");
            }

            if (complete) {
                complete();
            }
        }
    });
}


function ajaxHelperSyncAsync(url, method, data, async, beforeSend, success, error, complete) {
    if (!async) {
        $("#progressdlg").modal({backdrop: 'static', keyboard: false});
    }

    $.ajax({
        beforeSend: beforeSend,
        url: url,
        type: method,
        cache: false,
        async: async,
        data: data,
        timeout: 30000,
        success: function (result) {
            success(result);
        },
        error: function (xhr, status, text) {
            if (status == 401) {
                window.location.reload();
            } else if (error) {
                error(xhr, status, text);
            }
        },
        complete: function () {
            if (!async) {
                $("#progressdlg").modal("hide");
            }

            if (complete) {
                complete();
            }
        }
    });
}


function NormalSearchBar() {
    document.getElementById("topNavContents").style.display = "block";
    document.getElementById("topNavSearchBar").style.display = "none";
    document.getElementById("mySidenavPanel").style.display = "none";
}

$('input').keyup(function () {
    if (this.value.length == $(this).attr("maxlength")) {
        $(this).next().focus();
    }
});

$('select').change(function () {
    if ($(this).val() == "") {
        $(this).css({color: "#a9a9a9"});
    } else {
        $(this).css({color: "#000000"});
    }
});

function numbersonly(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8) { //if the key isn't the backspace key (which we should allow)
        if (unicode < 48 || unicode > 57) { //if not a number
            return false; //disable key press
        }
    }
}

function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) {
            theEvent.preventDefault();
        }
    }
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

function AlertCustomModal(modalTitleMessage1, modalBodyMessage1, PrimaryAction1Button, primaryAction1, dismissAction) {
    //$("#myModalOneButton").modal('hide');
    $("#modalTitleMessage1").html(JSON.parse(modalTitleMessage1));
    $("#modalBodyMessage1").html(JSON.parse(modalBodyMessage1));
    $("#PrimaryAction1Button").html(PrimaryAction1Button);
    if (primaryAction1) {
        if (typeof primaryAction1 === "string") {
            document.getElementById("PrimaryAction1Button").setAttribute("onclick", primaryAction1);
        } else {
            document.getElementById("PrimaryAction1Button").onclick = primaryAction1;
        }
        if (!dismissAction && typeof dismissAction !== "undefined") {
            document.getElementById("PrimaryAction1Button").removeAttribute("data-dismiss");
        }
    } else {
        if (dismissAction || typeof dismissAction === "undefined" || dismissAction === null) {
            document.getElementById("PrimaryAction1Button").setAttribute("data-dismiss", "modal");
            document.getElementById("PrimaryAction1Button").setAttribute("onclick", "closeCustomAlertModal()");
        } else {
            document.getElementById("PrimaryAction1Button").removeAttribute("data-dismiss");
        }
    }
    $("#myModalOneButton").modal();
    lastOpenedModal = "myModalOneButton";
}

function ConfirmCustomModal(modalTitleMessage2, modalBodyMessage2, PrimaryAction2Button, SecondaryAction2Button, primaryAction2, secondaryAction2) {
    //$("#myModalTwoButtons").modal('hide');
    $("#modalTitleMessage2").html(JSON.parse(modalTitleMessage2));
    $("#modalBodyMessage2").html(JSON.parse(modalBodyMessage2));
    $("#PrimaryAction2Button").html(PrimaryAction2Button);
    $("#SecondaryAction2Button").html(SecondaryAction2Button);
    if (primaryAction2) {
        document.getElementById("PrimaryAction2Button").setAttribute("onclick", primaryAction2);
    } else {
        document.getElementById("PrimaryAction2Button").setAttribute("data-dismiss", "modal");
        document.getElementById("PrimaryAction1Button").setAttribute("onclick", "closeTwoButtonModal()");
    }
    if (secondaryAction2) {
        document.getElementById("SecondaryAction2Button").setAttribute("onclick", secondaryAction2);
    } else {
        document.getElementById("SecondaryAction2Button").setAttribute("data-dismiss", "modal");
        document.getElementById("SecondaryAction2Button").setAttribute("onclick", "closeTwoButtonModal()");
    }
    $("#myModalTwoButtons").modal();
    lastOpenedModal = "myModalTwoButtons";
}

function ThreeButtonCustomModal(modalTitleMessage3, modalBodyMessage3, PrimaryAction3Button, SecondaryAction3Button, TertiaryAction3Button, primaryAction3, secondaryAction3, tertiaryAction3) {
    //$("#myModalThreeButtons").modal('hide');
    $("#modalTitleMessage3").html(JSON.parse(modalTitleMessage3));
    $("#modalBodyMessage3").html(JSON.parse(modalBodyMessage3));
    $("#PrimaryAction3Button").html(PrimaryAction3Button);
    $("#SecondaryAction3Button").html(SecondaryAction3Button);
    $("#TertiaryAction3Button").html(TertiaryAction3Button);
    document.getElementById("PrimaryAction3Button").setAttribute("onclick", primaryAction3);
    document.getElementById("SecondaryAction3Button").setAttribute("onclick", secondaryAction3);
    if (tertiaryAction3) {
        document.getElementById("TertiaryAction3Button").setAttribute("onclick", tertiaryAction3);
    } else {
        document.getElementById("TertiaryAction3Button").setAttribute("data-dismiss", "modal");
        document.getElementById("TertiaryAction3Button").setAttribute("onclick", "closeThreeButtonModal()");
    }
    $("#myModalThreeButtons").modal();
    lastOpenedModal = "myModalThreeButtons";
}


function closeTwoButtonModal() {
    $("#myModalTwoButtons").modal('hide');

}

function closeThreeButtonModal() {
    $("#myModalThreeButtons").modal('hide');
}

function closeCustomAlertModal() {
    $("#myModalOneButton").modal('hide');
    $("#myModalOneButton").css("visibility", "visible")
}

function closeLastOpenedModal(callBack) {
    if (lastOpenedModal == null) {
        callBack();
    }
    else {
        $("#" + lastOpenedModal).modal("hide");

        $("#" + lastOpenedModal).on('hidden.bs.modal', function () {
            $("#" + lastOpenedModal).off('hidden.bs.modal');
            lastOpenedModal = null;
            callBack();
        });
    }
}
