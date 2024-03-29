﻿$("#btnGeneralAdd").on("click", function () {
    if ($("#TdGeneralList").html().trim().length <= 0) {
        ModalShow("GeneralAddModal");
    }
    else {
        SweetAlert("error", "Hata", "Zaten genel bilgi eklenmiş");
    }
});

function GeneralList() {
    $.get("/GenelList", null, function (result) {
        $(".general-information-list").html(result);
    });
}

$(document).on("click", ".btnGeneralUpdate", function () {
    var _id = $(this).data("id");

    $.post("/GenelGüncelle", { id: _id }, function (result) {
        $(".general-information-update").html(result);
        ModalShow('GeneralUpdateModal');
    });
});

$(document).on("click", ".btnGeneralDelete", function () {
    var _id = $(this).data("id");

    var _fullname = $(this).parent().parent().children(":nth-child(2)").html().trim();

    var RemoveItems = {
        id: _id,
        name: _fullname,
        url: "/GeneralRemove",
        fullname: "Genel Bilgi",
        Method: GeneralList
    };

    RemoveBasicOperations(RemoveItems);

});

$(document).on("click", "#ImageView", function () {
    var _src = $(this).attr("src");

    if (_src.startsWith("/Content")) {
        SweetAlert("error", "Hata", "Resim Bulunamadı");
    }
    else {
        $("#ImgViewSrc").attr("src", _src);
        $("#ImageShowModal").modal("show");
    }

});