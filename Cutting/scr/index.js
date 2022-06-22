let deleteDialog = document.getElementById("delete__dialog");
let ajaxReturnData;
let cancelKeyupEvent = false;
let cancelKeydownEvent = false;
let editMode = false;
let readNewFile = false;

const myAjax = {
  myAjax: function (fileName, sendData) {
    $.ajax({
      type: "POST",
      url: "./php/"+fileName,
      dataType: "json",
      data: sendData,
      async: false,
    })
      .done(function (data) {
        ajaxReturnData = data;
      })
      .fail(function () {
        alert("DB connect error");
      });
  },
};

$(function () {
  makeCastingTable();
});
function makeCastingTable() {
  var fileName = "SelCasting.php";
  var sendData = {
      dummy: "dummy",
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#casting__table tbody"));
};
function fillTableBody(data, tbodyDom) {
  $(tbodyDom).empty();
  data.forEach(function(trVal) {
      let newTr = $("<tr>");
      Object.keys(trVal).forEach(function(tdVal, index) {
          $("<td>").html(trVal[tdVal]).appendTo(newTr);
      });
      $(newTr).appendTo(tbodyDom);
  });
};
$(document).on("click", "#casting__table tbody tr", function (e) {
  let fileName = "SelUpdateData.php";
  let sendData;
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#selected__tr").removeAttr("id");
    $(this).attr("id", "selected__tr");
    sendData = {
      targetId: $("#selected__tr").find("td").eq(0).html(),
    };
    console.log(sendData);
    // myAjax.myAjax(fileName, sendData);
    // putDataToInput(ajaxReturnData);

  fileName = "SelUpdateCastingData.php";
  sendData = {
    targetId: $("#selected__tr").find("td").eq(0).html(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#file_url").html(ajaxReturnData[0].file_url);

  } else {
    // deleteDialog.showModal();
  }
  checkInput();
});
$(document).on("keyup", "#data__table tbody input", function() {
  if ($(this).val() != "") {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
function checkInput() {
  let check = true;
  $("#data__table tbody input").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  if (!$("#selected__tr").find("td").eq(0).html()) {
    check = false;
  };
  if (check) {
    $("#save__button").attr("disabled", false);
  } else {
    $("#save__button").attr("disabled", true);
  } 
};
function getInputData() {
  let inputData = new Object();
    $("input.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    $("select.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    inputData["targetId"] = $("#selected__tr").find("td").eq(0).html();
  console.log(Object.keys(inputData).length);
  return inputData;
};
$("#file_upload").on("change", function () {
  var file = $(this).prop("files")[0];
  console.log(file.name);
  $("#file_url").html(file.name);
  $("#preview__button").prop("disabled", false);
});
$(document).on("change", "#file_upload", function () {
  ajaxFileUpload();
  fileName = "UpdateCastingData.php";
  sendData = {
    targetId: $("#selected__tr").find("td").eq(0).html(),
    file_url: $("#file_url").html(),
  };
  myAjax.myAjax(fileName, sendData);
  console.log(sendData);
});
$(document).on("click", "#preview__button", function () {
  window.open("../DailyReport/DailyReportSub.html");
});
function ajaxFileUpload() {
  var file_data = $('#file_upload').prop('files')[0];
  var form_data = new FormData();
  form_data.append('file', file_data);
  $.ajax({
      url: "./php/FileUpload.php",
      dataType: 'text',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: 'post',
  });
}