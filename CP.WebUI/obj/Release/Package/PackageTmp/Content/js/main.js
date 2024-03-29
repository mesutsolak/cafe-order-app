﻿$(document).ready(function () {
    $(function () {
        NiceScrool(new ScroolModel("menu-scrool", "7px", "#E1E1E1"))
        NiceScrool(new ScroolModel("modal-body", "10px", "#A5A5A5"))
        NiceScrool(new ScroolModel("tblresponsive", "10px", "#A5A5A5"))
    });
});

$(document).on("click", ".form-clear", function () {
    $(".CategoryUpdateModalContent").find('form').get(0).reset();
});

$(document).on("change", "input[type='file']", function (e) {
    if (e.target.files[0] != undefined) {
        var fileName = e.target.files[0].name;
        $(this).next('.custom-file-label').html(fileName);
        var _formgroup = $(this).parent().parent();
        /*
         * İlk açıldıgında img olmayabilir ama sonra eklenebilir.Eklendigi zamanda orda bulunnmadıgı için show yapılamayacak hata vericektir
           bunun önüne geçmek için kullanılır
          */
        if ($(_formgroup).find(".ImageCancel").length == 0) {
            var _string = '<div class="mt-2 ImageCancel">' +
                '<i class="fas fa-times text-danger mr-2" style = "color:red" ></i><label class="text-danger">Resmi kaldır</label>' +
                '</div>';
            $(_formgroup).append(_string);
        }
        $(_formgroup).find(".ImageCancel").show();
    }
});


$(document).on("change", "input[type='checkbox']", function () {
    var _result = $(this).prop("checked");
    if (_result == true) {
        $(this).val("true");
        $(this).prop("checked", true);
    }
    else {
        $(this).val("false");
        $(this).prop("checked", false);

    }
});


$(document).on("click", ".CategoryDelete", function () {
    var _checked = $(this).parent().parent().children().find(".check").is(":checked");
    var _removeItem = $(this).parent().parent();
    var _id = $(this).data("id");
    var _name = $(_removeItem).children(":nth-child(2)").html().trim();

    var RemoveItems = {
        id: _id,
        name: _name,
        url: "Category/CategoryDeleteOperation",
        fullname: _name + " isimli kategori",
        removeitem: _removeItem,
        checked: _checked
    };

    RemoveBasicOperations(RemoveItems);

});



function RemoveBasicOperations(RemoveItem) {
    Swal.fire({
        title: 'Silme İşlemi',
        text: RemoveItem.fullname + " silinsin mi ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet',
        cancelButtonText: "Kapat"
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                async: false,
                url: RemoveItem.url,
                data: '{id:' + RemoveItem.id + '}',
                dataType: 'json',
                success: function (data) {
                    if (data.Description === "Başarıyla Silindi") {
                        SweetAlert(data.Icon, "Silme İşlemi", RemoveItem.fullname + " başarıyla silindi");
                        //RemoveItem.removeitem.remove();
                        RemoveItem.Method();
                        //CategoryListFill();
                        //if (RemoveItem.checked == true) {
                        //    CookieRemoveValue("Secilenler", RemoveItem.id.toString());
                        //    CookieRemoveValue("SecilenName", RemoveItem.name.toString());
                        //    CookieValueWrite("Secilenler");
                        //    CategoryCheckedList();
                        //}
                    }
                    else {
                        SweetAlert("error", "Bir hata oluştu");
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("error", ajaxOptions + "" + xhr.status + "" + thrownError);
                }
            });
        }
    });
}


function RemoveAllOperations(RemoveItems) {
    Swal.fire({
        title: 'Çoklu Silme İşlemi',
        text: RemoveItems.name + " silinsin mi ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet',
        cancelButtonText: "Kapat"
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: RemoveItems.url,
                data: '{id:' + JSON.stringify(RemoveItems.id) + '}',
                async: false,
                dataType: 'json',
                success: function (data) {
                    if (data.Description === "Başarıyla Silindi") {
                        SweetAlert(data.Icon, "Çoklu Silme İşlemi", RemoveItems.name + " başarıyla silindi");
                        CookieReset('Secilenler');
                        CookieReset('SecilenName');
                        CookieValueWrite("Secilenler");
                        CategoryListFill();
                    }
                    else {
                        SweetAlert(data.Icon, "Çoklu Silme İşlemi", RemoveItems.name + " Başarısız");
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("error", ajaxOptions + "" + xhr.status + "" + thrownError);
                }
            });
        }
    });
}

function ModalShow(ModalId) {
    $(document).find('#' + ModalId).modal('show');
}

function FormPost(FormId) {
    $(document).find('#' + FormId).submit();
}

function FormClear(FormId) {
    $(document).find('#' + FormId).trigger("reset");
    $(document).find('#' + FormId).find(".error-validate").html("");
    $(document).find('#' + FormId).find("input[type='file']").val('');
    $(document).find("input[type='file']").each(function () {
        var _name = $(this).attr("name");
        $(this).val('');
        var _children = $(this).next();
        _children.val('');
        _children.next().next().val('');
        if (_name == "Images") {
            _children.html("Resim Seçiniz");
        }
        else if (_name == "Banners") {
            _children.html("Afiş Seçiniz");
        }
    });
    $(document).find(".ImageCancel").hide();
}


/**
 *  TextArea Convert CKEditor
 * @param {string} Name CkEditorsName
 * @param {string} language Language Type
 * @returns {void}
 */
function ConvertCkEditor(Name, language) {
    //txtCV,ckProjectContent,CkEditorUpdate,content
    CKEDITOR.replace(Name, {
        language: language,
        fullPage: true
    });
}


function SweetAlert(erroricon, errortitle, errortext) {
    Swal.fire({
        icon: erroricon,
        title: errortitle,
        text: errortext,
        confirmButtonText: "Tamam"
    })
}

/**
 *
 * @param {string} CkEditorName CKEditorName
 */
function CkEditorResetValue(CkEditorName) {
    CKEDITOR.instances[CkEditorName].content.setData('');
}




/**
 * 
 * @param {string} key   Cookie Adının Verilmesi
 * @param {string} value  Cookie Atılacak Olan Value
 * @returns {void}
 */
function CookieAddValue(key, value) {
    if ($.cookie(key) == null) {
        $.cookie(key, "");
    }
    var _CookieValue = CookieGetValue(key);
    _CookieValue += value + ",";

    $.cookie(key, _CookieValue);
}

/**
 * 
 * @param {string} key Cookie Adının Verilmesi
 * @returns {string}
 */
function CookieGetValue(key) {
    if ($.cookie(key) == null) {
        $.cookie(key, "");
    }
    return $.cookie(key);
}

/**
 * 
 * @param {string} key Cookie Adının Alınması
 * @returns {string} 
 *  
 */

function CookieArrayGetValue(key) {


    var _cookieValue = CookieGetValue(key);
    return _cookieValue.split(',');

}


/**
 * 
 * @param {string} key Cookie Adının Alınması
 */
function CookieCount(key) {
    return CookieArrayGetValue(key).length - 1;
}

/**
 * 
 * @param {string} key Cookie Adının Alınması
 * @param {string} id Değer
 */

function CookieRemoveValue(key, id) {

    var _values = CookieGetValue(key);

    var arr = _values.split(',');
    $.each(arr, function (index, value) {
        if (value === id) {
            arr.splice($.inArray(value, arr), 1);
            _values = arr;
        }
    });

    $.cookie(key, _values.toString());
}

function CookieRemoveAllValue(key, _values) {
    var arr = _values.split(',');
    $.each(arr, function (index, value) {
        CookieRemoveValue(key, value);
    });
}

function CookieReset(key) {
    $.removeCookie(key);
}


function returnPostJson(data) {

    if (!$.null(data.Modal)) {
        $(document).find("#" + data.Modal).modal("hide");
    }

    if (!$.null(data.Function)) {
        Function();
    }

    SweetAlert(data.Icon, data.Title, data.Description);
    if (!$.null(data.Url)) {
        setTimeout(function () {
            window.location.replace(data.Url);
        }, 1500);
    }

}

$.extend({
    null: function (value) {
        if (value == null) {
            return true;
        }
        else {
            return false;
        }
    }
});

$("#btnSignOut").on("click", function () {
    Swal.fire({
        title: 'Çıkış İşlemi',
        text: "Çıkmak İstiyor musunuz ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet',
        cancelButtonText: 'Hayır'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: 'POST',
                url: "User/LogOut",
                success: function () {
                    window.location.replace("/Giriş Yap");
                }
            });
        }
    })
});


/**
 * 
 * @param {ScroolModel} Scrool
 */
function NiceScrool(Scrool) {
    $("." + Scrool.ClassName).niceScroll({ cursorwidth: Scrool.Width, cursorborder: "1px solid #B5AEAE", autohidemode: false, zindex: 999, cursorcolor: Scrool.CurserColor });
}


class ScroolModel {

    constructor(ClassName, Width, CurserColor) {
        this.ClassName = ClassName;
        this.Width = Width;
        this.CurserColor = CurserColor;
    }
}


$(document).on("click", ".ImageCancel", function () {
    var custom_file = $(this).parent();
    custom_file.find("input[name='Image']").attr("value", "");
    custom_file.find(".custom-file-label").html("Resim Seçiniz");
    $(this).hide();
});


/**
 * 
 * @param {string} _id Tablo Id'si
 * @returns {void}
 * Convert table to datatable
 */
function TableConvertDataTables(_id) {

    //bool dönücektir burda 
    /*
      Gelen id'ye sahip table datatable jquery'mi ? bunu kontrol ediyorsun eğer değilse çevir demiş olduk.Kontrol etmek
      her zaman hataları önler.
     Default olarak dil ingilizce ayarladır.Bunu Türkçeye çevirmek için ya localden ya da cdn yardımıyla json datası alınır.
    Çoklu silme işlemlerinde ya da herhangi bir tablo yapısında ilk sütunun order(sıralama) almasını istemeyebiliriz.Bu gibi durumlarda aşağıdaki kod bloğu kullanılmalıdır.Order ve columnDefs kullanilmalidir/
*/

    if (!$.fn.DataTable.isDataTable('#' + _id)) {
        $(document).find("#" + _id).DataTable({

            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Turkish.json",
            },
            order: [],
            columnDefs: [
                {
                    "orderable": false,
                    "targets": [0],
                    "render": function (data, type, full, meta) {
                        return meta.settings._iDisplayStart + meta.row + 1;
                    }
                }
            ]
        });
    }
}