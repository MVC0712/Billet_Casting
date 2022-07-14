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
});

function fillSelectBox(arr, targetDom) {
  $("#"+targetDom).append($("<option>").val(0).html("No"));
  arr.forEach(function(ar) {
    $("#"+targetDom).append(
        $("<option>").val(ar.id).html(ar.type)
    );
  });
};

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
$(document).on("change", "#check_date", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
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
$(document).on("click", "#error_table tbody tr", function (e) {
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#selected__tr").removeAttr("id");
    $(this).attr("id", "selected__tr");
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
        check_date: $("#check_date").val(),
        position: $("#position").val(),
        error: $("#error").val(),
        note: $("#note").val(),
      };
      myAjax.myAjax(fileName, sendData);
      makeScrapTable();
      $("#position").val("").removeClass("complete-input").addClass("no-input");
      $("#error").val("").removeClass("complete-input").addClass("no-input");
      $("#add_error").prop("disabled", true);
    break;
  }
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