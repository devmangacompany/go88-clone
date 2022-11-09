"use strict";

$(document).ready(function () {
    onRegFrmSubmit();
    $('.tab-content #register').addClass('in active show');

});

var onRegFrmSubmit = function () {
    $("#registerForm").validate({
        rules: {
            password: {
                required: true,
                minlength: 6
            },
            confirmPassword: {
                required: true,
                equalTo: "#pwd"
            },
            username: {
                required: true,
                minlength: 6
            },
            phone: {
                required: true,
                minlength: 10,
                maxlength: 12
            },
        },
        messages: {
            password: {
                required: "Vui lĂ²ng nháº­p máº­t kháº©u",
                minlength: "Máº­t kháº©u tá»‘i thiá»ƒu 6 kĂ½ tá»±"
            },

            confirmPassword: {
                required: "Vui lĂ²ng nháº­p máº­t kháº©u",
                equalTo: "Nháº­p láº¡i máº­t kháº©u khĂ´ng khá»›p",
                required: "Vui lĂ²ng nháº­p láº¡i máº­t kháº©u"

            },
            username: {
                required: "Vui lĂ²ng nháº­p tĂªn Ä‘Äƒng nháº­p",
                minlength: "TĂªn Ä‘Äƒng nháº­p khĂ´ng Ä‘Æ°á»£c Ă­t hÆ¡n 6 kĂ½ tá»±",
                maxlength: "TĂªn Ä‘Äƒng nháº­p khĂ´ng Ä‘Æ°á»£c nhiá»u hÆ¡n 30 kĂ­ tá»±"
            },

        },
        errorElement: "div",
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element
            error.addClass("errors");
            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            //$( element ).parents( ".col-xs-6" ).addClass( "warning" ).removeClass( "success" );

        },
        unhighlight: function (element, errorClass, validClass) {
            //$( element ).parents( ".col-xs-6" ).addClass( "success" ).removeClass( "warning" );
            //console.log(element.name);
        },
        showErrors: function (errorMap, errorList) {
            this.defaultShowErrors();
        },
        submitHandler: function (form) {
            onRegister();
            return false;
        }
    });

    return;
}

var onRegister = function () {
    // call api register
    // $.ajax({
    //     type: "POST",
    //     url: "/register.html",
    //     beforeSend: function (request) {
    //         $(".loading").show();
    //     },
    //     data: $("form[name='registerForm']").serialize(),
    //     dataType: 'json',
    //     success: function (result) {
    //         if (result.code == 200 && result.status == 'OK') {
    //             // gtm
    //             if (typeof dataLayer !== "undefined") {
    //                 dataLayer.push({ "event": "formSubmitted", "formName": 'Form_Register' });
    //             }

    //             window.location = "https://five88.com/user/loginToken?token=" + result.token;
    //             return;
    //         }

    //         $(".loading").hide();
    //         if (result.status != 'OK') {
    //             $('#alertModal .modal-body').html(result.message);
    //             $('#alertModal').modal();
    //         }
    //     },
    //     error: function (data, status, e) {
    //         $('.loading').hide();
    //         $('#alertModal .modal-body').html("Lá»—i xáº£y ra trong quĂ¡ trĂ¬nh xá»­ lĂ½ há»‡ thá»‘ng. Xin vui lĂ²ng thá»­ láº¡i!");
    //         $('#alertModal').modal();
    //     }
    // });
};

let isContainSpecialCharacter = (text) => {
    if (
        text.search(
            /[Ă€ĂĂ‚ĂƒĂˆĂ‰ĂĂŒĂĂ’Ă“Ă”Ă•Ă™ĂĂĂ Ă¡Ă¢Ă£Ă¨Ă©ĂªĂ¬Ă­Ă²Ă³Ă´ĂµĂ¹ĂºĂ½á»²á»¸á»³á»¹á»¶á»·á»´á»µá»±á»°á»­á»¬á»¯á»®á»«á»ªá»©á»¨Æ°Æ¯á»¥á»¤á»§á»¦Å©Å¨á»£á»¢á»Ÿá»á»¡á» á»á»œá»›á»Æ¡Æ á»™á»˜á»•á»”á»—á»–á»“á»’á»‘á»á»á»Œá»á»á»‹á»á»‰á»ˆÄ©Ä¨á»‡á»†á»ƒá»‚á»…á»„á»á»€áº¿áº¾áº¹áº¸áº»áººáº½áº¼áº·áº¶áº³áº²áºµáº´áº±áº°áº¯áº®ÄƒÄ‚áº­áº¬áº©áº¨áº«áºªáº§áº¦áº¥áº¤áº¡áº áº£áº¢Ä‘Ä !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
        ) >= 0
    ) {
        return true;
    }
    return false;
}

const requestGetHttp = (url, onSuccess, onError) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 400) {
                // var response = xhr.responseText;
                // var obj = JSON.parse(response);
                // console.log(obj);

                onSuccess(xhr.responseText);
            } else {
                console.log("KhĂ´ng thá»ƒ káº¿t ná»‘i Ä‘áº¿n mĂ¡y chá»§, xin hĂ£y thá»­ láº¡i.");
            }
        }
    };

    xhr.onerror = () => {
        onError(xhr.responseText);

        // var errtext = "KhĂ´ng thá»ƒ káº¿t ná»‘i Ä‘áº¿n mĂ¡y chá»§, xin hĂ£y thá»­ láº¡i.";
        // if (!StringUtil.isNullOrEmpty(xhr.responseText)) {
        //     var obj = JSON.parse(xhr.responseText);
        //     if (
        //         obj !== null &&
        //         obj !== undefined &&
        //         !StringUtil.isNullOrEmpty(obj.msg)
        //     ) {
        //         errtext = obj.msg;
        //     }
        // }

        console.log(xhr.responseText);
    };

    xhr.ontimeout = () => {
        console.log("KhĂ´ng thá»ƒ káº¿t ná»‘i Ä‘áº¿n mĂ¡y chá»§, xin hĂ£y thá»­ láº¡i.");
    };

    xhr.open("GET", url, true);
    xhr.send();
}