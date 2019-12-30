var csrftoken = $('meta[name=csrf-token]').attr('content');
//var csrftoken = document.getElementById('_csrf_token').value
lang = $("html").attr('lang');
error = {
    fa: {
        1: 'خطای نامشخص',
        429: 'تعداد درخواست نامتعارف',
        0: 'سرور پاسخی نمی‌دهد',
        500: 'خطای سرور',
        403: 'دسترسی غیر مجاز'
    },
    en: {
        1: 'Unknown Error!',
        429: 'Too Many Requests!',
        0: 'Server is not responding!',
        500: 'Server Error!',
        403: 'Not Authorized!'
    }
};


$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRF-Token", csrftoken)
        }
        $("button[type=submit]").prop('disabled', true);
    }
});

var send_ajax_request = function (url, initiator) {
    var xmlRequest = $.ajax({
        type: "POST",
        //async: false,
        //contentType: "application/x-www-form-urlencoded",
        url: url,
        data: $('form').serialize() + '&action=' + initiator
    });

    xmlRequest.done(function (data) {
        $('#placeholder').html(data);
    });

    xmlRequest.fail(function (jqXHR, textStatus, errorThrown) {
        var err_msg = error[lang][jqXHR.status.toString()] || error[lang]["1"];
        $(".loginerror-container").fadeIn();
        $(".loginerror").text(err_msg);
        $(".bar").addClass('bar-error');
        $("#otpinput").val('');
        $("#pininput").val('');
        $("#pininputClone").val('');
        $("#otpinput").focus();
        $("#inputemail").focus();
        $("button[type=submit]").prop('disabled', false);
    });

    xmlRequest.always(function () {
        $("button[type=submit]").prop('disabled', false);
    });
};

delete initiator;
$('form').submit(function (e) {

    if (typeof initiator === 'undefined') {
        initiator = $(this).find(':submit').attr('name');
    }
    _paq.push(['trackEvent', 'Submit Form', initiator]);
    send_ajax_request("_nextstep", initiator);
    e.preventDefault(); // block the traditional submission of the form.
});

$('button[type=submit]').click(function (e) {
    initiator = $(this).attr('name');
    //send_ajax_request("_nextstep", $(this).attr('name'));
    //e.preventDefault(); // block the traditional submission of the form.
});
