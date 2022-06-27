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
  clearInputData();
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
    myAjax.myAjax(fileName, sendData);
    console.log(ajaxReturnData.length);
    if (ajaxReturnData.length > 0) {
      putDataToInput(ajaxReturnData);
      $("#save__button").attr("disabled", true);
      $("#update__button").attr("disabled", false);
    } else {
      $("#save__button").attr("disabled", false);
      $("#update__button").attr("disabled", true);
    }

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
$(document).on("click", "#save__button", function () {
  fileName = "InsData.php";
  inputData = getInputData();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  clearInputData();
  $("#save__button").attr("disabled", true);
  $("#update__button").attr("disabled", true);
});
$(document).on("click", "#update__button", function () {
  fileName = "UpdateData.php";
  inputData = getInputData();
  // inputData["targetId"] = $("#selected__tr").find("td").eq(0).html();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  clearInputData();
  $("#save__button").attr("disabled", true);
  $("#update__button").attr("disabled", true);
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
};

$(document).on("change", "#A2S", function () {
  if ($(this).val() == 1) {
    changeColumn(3);
  }
});
$(document).on("change", "#A3S", function () {
  if ($(this).val() == 1) {
    changeColumn(4);
  }
});
$(document).on("change", "#B1S", function () {
  if ($(this).val() == 1) {
    changeColumn(5);
  }
});
$(document).on("change", "#B2S", function () {
  if ($(this).val() == 1) {
    changeColumn(6);
  }
});
$(document).on("change", "#B3S", function () {
  if ($(this).val() == 1) {
    changeColumn(7);
  }
});
$(document).on("change", "#B4S", function () {
  if ($(this).val() == 1) {
    changeColumn(8);
  }
});
$(document).on("change", "#C1S", function () {
  if ($(this).val() == 1) {
    changeColumn(9);
  }
});
$(document).on("change", "#C2S", function () {
  if ($(this).val() == 1) {
    changeColumn(10);
  }
});
$(document).on("change", "#C3S", function () {
  if ($(this).val() == 1) {
    changeColumn(11);
  }
});
$(document).on("change", "#C4S", function () {
  if ($(this).val() == 1) {
    changeColumn(12);
  }
});
$(document).on("change", "#D2S", function () {
  if ($(this).val() == 1) {
    changeColumn(13);
  }
});
$(document).on("change", "#D3S", function () {
  if ($(this).val() == 1) {
    changeColumn(14);
  }
});
function changeColumn(col) {
  var  table, tr, td, i;
  table = document.getElementById("data__table");
  var tbody = table.getElementsByTagName("tbody")[0];
  var tr = tbody.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    if (i==0 || i == 4 || i == 5 || i == 6) {
      td = tr[i].getElementsByTagName("td")[col].getElementsByTagName("input")[0];
      td.value = 0;
      td.classList.remove("no-input");
      td.classList.add("complete-input")
      if (tr[i].getElementsByTagName("td")[col].getElementsByTagName("input")[1]) {
        td = tr[i].getElementsByTagName("td")[col].getElementsByTagName("input")[1];
        td.value = 0;
        td.classList.remove("no-input");
        td.classList.add("complete-input")
      }
    } else if (i==1) {
      td = tr[i].getElementsByTagName("td")[col].getElementsByTagName("select")[0];
    } else if (i==2) {
     
    } else if (i == 3) {
      td = tr[i].getElementsByTagName("td")[col].getElementsByTagName("input")[0];
      td.value = "DN";
      td.classList.remove("no-input");
      td.classList.add("complete-input")
      if (tr[i].getElementsByTagName("td")[col].getElementsByTagName("input")[1]) {
        td = tr[i].getElementsByTagName("td")[col].getElementsByTagName("input")[1];
        td.value = "DN";
        td.classList.remove("no-input");
        td.classList.add("complete-input")
      }
    }
  }
};
function putDataToInput(data) {
  data.forEach(function (trVal) {
    Object.keys(trVal).forEach(function (tdVal) {
      $("#" + tdVal).val(trVal[tdVal]).removeClass("no-input").addClass("complete-input");
    });
});
};
function clearInputData() {
$("#file_url").html("No file");
$(".need-clear").each(function (index, element) {
  $(this).val("").removeClass("complete-input").addClass("no-input");
});
}