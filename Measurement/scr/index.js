let deleteDialog = document.getElementById("delete__dialog");

let ajaxReturnData;
let cancelKeyupEvent = false;
let cancelKeydownEvent = false;
let editMode = false;
let readNewFile = false;
let pos = ["A2","A3","B1","B2","B3","B4","C1","C2","C3","C4","D2","D3"];
let selectCode =[];

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

$(function () {var now = new Date();
  var formatDateComponent = function(dateComponent) {
    return (dateComponent < 10 ? '0' : '') + dateComponent;
  };
  var formatDate = function(date) {
    return date.getFullYear()  + '-' + formatDateComponent(date.getMonth() + 1) + '-' + formatDateComponent(date.getDate()) ;
  };
  $("#mea_date").val(formatDate(new Date()));
  makeFileListTable();
});
function makeFileListTable() {
  var fileName = "SelSummary.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#file_list__table tbody"));
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
$(document).on("click", "#file_list__table tbody tr", function() {
  var fileName = "SelUpdateData.php";
  var sendData = new Object();
  document.getElementById("file_area").innerHTML = ``;
  if (!$(this).hasClass("selected-record")) {
      $(this).parent().find("tr").removeClass("selected-record");
      $(this).addClass("selected-record");
      $("#file_list__selected").removeAttr("id");
      $(this).attr("id", "file_list__selected");
      sendData = {
          targetId: $("#file_list__selected").find("td").eq(0).html(),
      };
      myAjax.myAjax(fileName, sendData);
      $("#mea_date").html(ajaxReturnData[0].mea_date);
      $("#file_url_1").html(ajaxReturnData[0].file_url_1);
      $("#preview__button_1").attr("disabled", false);
      $("#file_url_2").html(ajaxReturnData[0].file_url_2);
      $("#preview__button_2").attr("disabled", false);
      $("#file_url_3").html(ajaxReturnData[0].file_url_3);
      $("#preview__button_3").attr("disabled", false);
  } else {
      $(this).removeClass("selected-record");
      document.getElementById("file_area").innerHTML = ``;
  }
});
$("#file_upload_1").on("change", function () {
  var file = $(this).prop("files")[0];
  console.log(file.name);
  $("#file_url_1").html(file.name);
  $("#preview__button_1").prop("disabled", false);
});
$("#file_upload_2").on("change", function () {
  var file = $(this).prop("files")[0];
  console.log(file.name);
  $("#file_url_2").html(file.name);
  $("#preview__button_2").prop("disabled", false);
});
$("#file_upload_3").on("change", function () {
  var file = $(this).prop("files")[0];
  console.log(file.name);
  $("#file_url_3").html(file.name);
  $("#preview__button_3").prop("disabled", false);
});
$(document).on("change", "#file_upload_1", function () {
  ajaxFileUpload(1);
  if ($("#file_list__selected").find("td").eq(0).html()) {
    updateData();
  }
  checkInput();
});
$(document).on("change", "#file_upload_2", function () {
  ajaxFileUpload(2);
  if ($("#file_list__selected").find("td").eq(0).html()) {
    updateData();
  }
  checkInput();
});
$(document).on("change", "#file_upload_3", function () {
  ajaxFileUpload(3);
  if ($("#file_list__selected").find("td").eq(0).html()) {
    updateData();
  }
  checkInput();
});
$(document).on("click", "#preview__button_1", function () {
  getFileUpload(1);
});
$(document).on("click", "#preview__button_2", function () {
  getFileUpload(2);
});
$(document).on("click", "#preview__button_3", function () {
  getFileUpload(3);
});

$(document).on("keyup", "#total_weight", function() {
  if($.isNumeric($(this).val())){
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
});
$(document).on("change", "#material", function() {
  if ($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
    changeElement();
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
      $(".need-clear").val("");
  }
});
function changeElement() {
    var fileName = "SelMaterialElement.php";
    var sendData = {
      material: $("#material").val(),
    };
    myAjax.myAjax(fileName, sendData);
    putEl(ajaxReturnData);
    $(".clear").removeClass("no-input").addClass("complete-input");
}
function putEl(data) {
  data.forEach(function(trVal) {
    Object.keys(trVal).forEach(function(tdVal, index) {
      $("#"+tdVal).val(trVal[tdVal]);
    });
  });
}
function getNum(a) {
  if(a!="" && a!=0 && $.isNumeric(a)) {
    return a;
  } else return 0;
}
function calEl(name, per) {
  if ($("#"+name+"_ac").val() > $("#"+name+"_max").val()) {
    $("#"+name+"_add").css("background-color","red");
    $("#"+name+"_max").css("color","red");
  } else {
    $("#"+name+"_add").val(Math.round(($("#total_weight").val())* 10*(getNum($("#"+name+"_ex").val()) - getNum($("#"+name+"_ac").val()))/per)/10);
    $("#"+name+"_add").removeAttr("style");
    $("#"+name+"_max").removeAttr("style");
    $("#"+name+"_add").css("font-weight","900");
    // $("#"+name+"_add").css("color","red");
  }

  if ($("#"+name+"_ac").val() < $("#"+name+"_min").val()) {
    $("#"+name+"_min").css("color","red");
  } else $("#"+name+"_min").removeAttr("style");

  if ($("#"+name+"_ac").val() > $("#"+name+"_ex").val()) {
    $("#"+name+"_ex").css("color","red");
  } else $("#"+name+"_ex").removeAttr("style");

  if (getNum($("#"+name+"_ac").val()) == 0) {
    $("#"+name+"_add").val(0);
  }
}
$(document).on("keyup change", ".caculating", function() {
  if($.isNumeric($(this).val())){
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
    return;
  }
  calEl("si", 25);
  calEl("mg", 100);
  calEl("cu", 32);
  calEl("mn", 10);
  calEl("cr", 5);
});
function getFileUpload(fileN) {
  document.getElementById("file_area").innerHTML = ``;
  var file_data = $("#file_upload_"+fileN).prop('files')[0];
  if (file_data) {
    var fileType = file_data.name.substr(file_data.name.lastIndexOf(".") + 1, 3);
  var reader = new FileReader(file_data);
  reader.readAsDataURL(file_data);
  reader.onload = function () {
    switch (fileType) {
      case "pdf":
      case "PDF":
        $("<object>")
          .attr("data", reader.result + "#toolbar=0&navpanes=0")
          .attr("type", "application/pdf")
          .appendTo("#file_area");
        break;
      case "jpg":
      case "JPG":
        $("<object>")
          .attr("data", reader.result)
          .attr("type", "image/jpeg")
          .appendTo("#file_area");
        break;
    }
  };
} else {
var filename = $("#file_url_"+fileN).html();
var fileType = filename.substr(filename.lastIndexOf(".") + 1, 3);
switch (fileType) {
  case "pdf":
  case "PDF":
    $("<object>")
      .attr(
        "data",
        "../FileUpload/MeasurenFIle/" + filename + "#toolbar=0&navpanes=0")
      .attr("type", "application/pdf")
      .appendTo("#file_area");
    break;
  case "jpg":
  case "JPG":
    $("<object>")
      .attr("data", "../FileUpload/MeasurenFIle/" + filename)
      .attr("type", "image/jpeg")
      .appendTo("#file_area");
    break;
};
}
};
function ajaxFileUpload(fileN) {
  var file_data = $("#file_upload_"+fileN).prop('files')[0];
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
};
$(document).on("click", "#save__button", function () {
  fileName = "InsData.php";
  sendData = {
    mea_date : $("#mea_date").val(),
    file_url_1 : $("#file_url_1").html(),
    file_url_2 : $("#file_url_2").html(),
    file_url_3 : $("#file_url_3").html(),
  };
  myAjax.myAjax(fileName, sendData);
  makeFileListTable();
  $("#mea_date").val("").removeClass("complete-input").addClass("no-input");
  $("#file_url_1").html("No file");
  $("#file_url_2").html("No file");
  $("#file_url_3").html("No file");
  $("#save__button").attr("disabled", true);
});
function updateData() {
  fileName = "UpdateData.php";
  sendData = {
    targetId: $("#file_list__selected").find("td").eq(0).html(),
    mea_date : $("#mea_date").val(),
    file_url_1 : $("#file_url_1").html(),
    file_url_2 : $("#file_url_2").html(),
    file_url_3 : $("#file_url_3").html(),
  };
  myAjax.myAjax(fileName, sendData);
  makeFileListTable();
  console.log(sendData);
  $("#mea_date").val("").removeClass("complete-input").addClass("no-input");
  $("#file_url_1").html("No file");
  $("#file_url_2").html("No file");
  $("#file_url_3").html("No file");
};
function checkInput() {
  if (($("#mea_date").val() != "") && (($("#file_upload_1").prop('files')[0]) || ($("#file_upload_2").prop('files')[0]) || ($("#file_upload_3").prop('files')[0]))) {
    $("#save__button").attr("disabled", false);
  } else {
    $("#save__button").attr("disabled", true);
  }
};
$(document).on("change", "#mea_date", function (e) {
  if ($(this).val() != "") {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
});