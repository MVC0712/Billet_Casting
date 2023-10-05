let deleteDialog = document.getElementById("delete__dialog");

let ajaxReturnData;
let fileName;
let sendData;
let pos = [{id: 1, type: "A2"},
                {id: 2, type: "A3"},
                {id: 3, type: "B1"},
                {id: 4, type: "B2"},
                {id: 5, type: "B3"},
                {id: 6, type: "B4"},
                {id: 7, type: "C1"},
                {id: 8, type: "C2"},
                {id: 9, type: "C3"},
                {id: 10, type: "C4"},
                {id: 11, type: "D2"},
                {id: 12, type: "D3"}
              ];
let error = [{id: 1, type: "Xước"},
              {id: 2, type: "Rò nhôm"},
              {id: 3, type: "Khí không đủ"},
              {id: 4, type: "Cong"}
            ];

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
  fillSelectBox(pos, "position");
  fillSelectBox(error, "error");
  makeSummaryTable();
  selStaff();
});

function fillSelectBox(arr, targetDom) {
  $("#"+targetDom).append($("<option>").val(0).html("No"));
  arr.forEach(function(ar) {
    $("#"+targetDom).append(
        $("<option>").val(ar.id).html(ar.type)
    );
  });
};

function makeSummaryTable() {
  var fileName = "SelSummary.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#summary_table tbody"));
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
function selStaff() {
  var fileName = "SelStaff.php";
  var sendData = {
      dummy: "dummy",
  };
  myAjax.myAjax(fileName, sendData);
  $("#staff_id option").remove();
  $("#staff_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#staff_id").append(
          $("<option>").val(value["id"]).html(value["name"])
      );
  });
};
$(document).on("keyup", ".mold_id", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
$(document).on("change", "#check_date", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  $("#add_error").text("Save");
});
$(document).on("change", "#position", function() {
  addErrorCheck();
  if ($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
});
$(document).on("change", "#error", function() {
  addErrorCheck();
  if ($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
});
$(document).on("change", "#staff_id", function() {
  if ($(this).val() != 0) {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
$(document).on("keyup", ".number-input", function() {
  if($.isNumeric($(this).val())){
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
$(document).on("click", "#summary_table tbody tr", function (e) {
  let fileName = "SelUpdateDataV2.php";
  let sendData;
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#selected__tr").removeAttr("id");
    $(this).attr("id", "selected__tr");
    sendData = {
      targetId: $("#selected__tr").find("td").eq(0).html(),
    };
    myAjax.myAjax(fileName, sendData);
    putDataToInput(ajaxReturnData);
    makeError();
    $("#add_error").text("Add");
    $("#update").attr("disabled", false);
  } else {
    // deleteDialog.showModal();
    $(this).parent().find("tr").removeClass("selected-record");
    $("#selected__tr").removeAttr("id");
    $("#update").attr("disabled", true);
    $("#add_error").text("Save");
  }
  $("#save").attr("disabled", true);
  // $("#update").attr("disabled", false);
  // checkUpdate();
  // makeError();
  $(".save-data").each(function (index, element) {
    $(this).removeClass("no-input").addClass("complete-input");
  });
});
$(document).on("click", "#error_table tbody tr", function (e) {
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#selected__error").removeAttr("id");
    $(this).attr("id", "selected__error");
  } else {
    // deleteDialog.showModal();
  }
});
$("#add_error").on("click", function () {
  switch ($(this).text()) {
    case "Save":
      $("<tr>")
        .append("<td></td>")
        .append($("<td>").append(posOption($("#position").val())))
        .append($("<td>").append(errorOption($("#error").val())))
        .append($("<td>").append($("<input>").val($("#note").val())))
        .append($("<td>").append($("<button class='remove'>RM</button>")))
        .appendTo("#error_table tbody");
      $(this).prop("disabled", true);
      $("#position").val("0").focus().removeClass("complete-input").addClass("no-input");
      $("#error").val("").removeClass("complete-input").addClass("no-input");
      $("#note").val("");
    break;
    case "Add":
      let fileName;
      let sendData = new Object();
      fileName = "AddError.php";
      sendData = {
        mold_history_id: $("#selected__tr td:nth-child(1)").text(),
        position: $("#position").val(),
        error: $("#error").val(),
        note: $("#note").val(),
      };
      myAjax.myAjax(fileName, sendData);
      makeError();
      $("#position").val("").removeClass("complete-input").addClass("no-input");
      $("#error").val("").removeClass("complete-input").addClass("no-input");
      $("#add_error").prop("disabled", true);
    break;
  }
});
function makeError() {
  fileName = "SelError.php";
  sendData = {
    mold_history_id : $("#selected__tr td:nth-child(1)").text(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#error_table tbody").empty();
  ajaxReturnData.forEach(function (trVal) {
    var newTr = $("<tr>");
    Object.keys(trVal).forEach(function (tdVal) {
      if (tdVal == "position") {
        $("<td>")
            .append(posOption(trVal[tdVal])).appendTo(newTr);
      } else if (tdVal == "error") {
        $("<td>")
            .append(errorOption(trVal[tdVal])).appendTo(newTr);
    } else if (tdVal == "note") {
      $("<td>").append($("<input>").val(trVal[tdVal])).appendTo(newTr);
    } else {
      $("<td>").html(trVal[tdVal]).appendTo(newTr);
    }
    });
    $("<td>").append($("<button class='remove'>RM</button>")).appendTo(newTr);
    $(newTr).appendTo("#error_table tbody");
  });
};
$(document).on("change", "#error_table tbody tr", function () {
  let sendData = new Object();
  let fileName;
  fileName = "UpdateError.php";
  sendData = {
    id: $("#selected__error td:nth-child(1)").html(),
    position : $("#selected__error td:nth-child(2) select").val(),
    error: $("#selected__error td:nth-child(3) select").val(),
    note: $("#selected__error td:nth-child(4) input").val(),
  };
  console.log(sendData);
  myAjax.myAjax(fileName, sendData);
});
function posOption(seletedId) {
  let targetDom = $("<select>");

pos.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["type"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["type"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
};
function errorOption(seletedId) {
  let targetDom = $("<select>");

error.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["type"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["type"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
};
function addErrorCheck() {
  if ($("#position").val() == 0 ||
      $("#error").val() == 0) {
      $("#add_error").prop("disabled", true);
  } else {
      $("#add_error").prop("disabled", false);
  }
};
function checkInput() {
  let check = true;
  $(".top__wrapper input").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  if ($("#check_date").val() == "") {
    check = false;
  };
  if (check) {
    $("#save").attr("disabled", false);
  } else {
    $("#save").attr("disabled", true);
  } 
};
function getInputData() {
  let inputData = new Object();
    $("input.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    $("input[type=checkbox]").each(function (index, element) {
      inputData[$(this).attr("id")] = this.checked ? "1" : "0";
    });
    $("select.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    if ($("#file_upload").prop("files")[0]) {
      inputData["file_url"] = $("#file_url").html();
      ajaxFileUpload();
    } else {
      inputData["file_url"] = $("#file_url").html();
    }
    inputData["targetId"] = $("#selected__tr").find("td").eq(0).html();
  console.log(Object.keys(inputData).length);
  return inputData;
};

function checkTF(data) {
  if (data == "1") {
    return true;
  } else {
    return false;
  }
};
function putDataToInput(data) {
  data.forEach(function (trVal) {
    Object.keys(trVal).forEach(function (tdVal) {
      $("#" + tdVal).val(trVal[tdVal]);
    });
  });
  $("#file_url").html(data[0].file_url);
  $("#A2CGR").prop("checked", checkTF(data[0].A2CGR));
  $("#A2CTH").prop("checked", checkTF(data[0].A2CTH));
  $("#A3CGR").prop("checked", checkTF(data[0].A3CGR));
  $("#A3CTH").prop("checked", checkTF(data[0].A3CTH));
  $("#B1CGR").prop("checked", checkTF(data[0].B1CGR));
  $("#B1CTH").prop("checked", checkTF(data[0].B1CTH));
  $("#B2CGR").prop("checked", checkTF(data[0].B2CGR));
  $("#B2CTH").prop("checked", checkTF(data[0].B2CTH));
  $("#B3CGR").prop("checked", checkTF(data[0].B3CGR));
  $("#B3CTH").prop("checked", checkTF(data[0].B3CTH));
  $("#B4CGR").prop("checked", checkTF(data[0].B4CGR));
  $("#B4CTH").prop("checked", checkTF(data[0].B4CTH));
  $("#C1CGR").prop("checked", checkTF(data[0].C1CGR));
  $("#C1CTH").prop("checked", checkTF(data[0].C1CTH));
  $("#C2CGR").prop("checked", checkTF(data[0].C2CGR));
  $("#C2CTH").prop("checked", checkTF(data[0].C2CTH));
  $("#C3CGR").prop("checked", checkTF(data[0].C3CGR));
  $("#C3CTH").prop("checked", checkTF(data[0].C3CTH));
  $("#C4CGR").prop("checked", checkTF(data[0].C4CGR));
  $("#C4CTH").prop("checked", checkTF(data[0].C4CTH));
  $("#D2CGR").prop("checked", checkTF(data[0].D2CGR));
  $("#D2CTH").prop("checked", checkTF(data[0].D2CTH));
  $("#D3CGR").prop("checked", checkTF(data[0].D3CGR));
  $("#D3CTH").prop("checked", checkTF(data[0].D3CTH));
};
function clearInputData() {
  $("#file_url").html("No file");
  $("input[type=checkbox]").each(function (index, element) {
    $(this).prop("checked", false);
  });
  $("input.need-clear").each(function (index, element) {
    $(this).val("");
  });
  $("select.need-clear").each(function (index, element) {
    $(this).val(1);
  });
  $(".date-input").each(function (index, element) {
    $(this).val("").removeClass("complete-input").addClass("no-input");
  });
  $("#error_table").empty();
}
$("#file_upload").on("change", function () {
  var file = $(this).prop("files")[0];
  console.log(file.name);
  $("#file_url").html(file.name);
  $("#preview__button").prop("disabled", false);
});
$(document).on("click", "#preview__button", function () {
  window.open("./MoldHistorySub.html");
});
$(document).on("change", "#file_upload", function () {
  ajaxFileUpload();
  console.log("Change file");
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
$(document).on("click", "#save", function () {
  fileName = "InsDataV2.php";
  inputData = getInputData();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  let targetId = ajaxReturnData[0]["id"];
  tableData = getTableData($("#error_table tbody tr"));
  tableData.push(targetId);
  fileName = "InsErrorData.php";
  sendData = JSON.stringify(tableData);
  console.log(sendData);
  myAjax.myAjax(fileName, sendData);
  clearInputData();
  makeSummaryTable();
});
$(document).on("click", "#update", function () {
  fileName = "UpdateDataV2.php";
  inputData = getInputData();
  inputData["targetId"] = $("#selected__tr").find("td").eq(0).html();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  clearInputData();
  makeSummaryTable();
});
function getTableData(tableTrObj) {
  var tableData = [];
  tableTrObj.each(function (index, element) {
    var tr = [];
    $(this)
      .find("td")
      .each(function (index, element) {
        if ($(this).find("input").length) {
          tr.push($(this).find("input").val());
        } else if ($(this).find("select").length) {
          tr.push($(this).find("select").val());
        } else {
          tr.push($(this).html());
        }
      });
    tableData.push(tr);
  });
  return tableData;
};

$(document).on("click", "#error_table tbody tr td button", function (e) {
  console.log($(this).parent().parent());
  // if ($(this).parent().parent().hasClass("selected-record")) {
  //   $(this).parent().parent().remove();
  // }

  switch ($("#add_error").text()) {
    case "Save":
      if ($(this).parent().parent().hasClass("selected-record")) {
        $(this).parent().parent().remove();
      }
    break;
    case "Add":
      if ($(this).parent().parent().hasClass("selected-record")) {
        let sendData = new Object();
        fileName = "DeleteError.php";
        sendData = {
          error_id: $("#selected__error td:nth-child(1)").text(),
        };
        myAjax.myAjax(fileName, sendData);
        $(this).parent().parent().remove();
      }
    break;
  }

});