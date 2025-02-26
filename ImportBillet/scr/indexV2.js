let deleteDialog = document.getElementById("delete__dialog");
let inputData = new Object();
let fileName;
let sendData = new Object();
let ajaxReturnData;

let pos = [{id: 0, type: "--"},
          {id: 1, type: "A2"},
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

const getTwoDigits = (value) => value < 10 ? `0${value}` : value;
const getDateTime = (date) => {
    const day = getTwoDigits(date.getDate());
    const month = getTwoDigits(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = getTwoDigits(date.getHours());
    const mins = getTwoDigits(date.getMinutes());
    return `${year}-${month}-${day} ${hours}:${mins}:00`;
}
$(function () {
  var now = new Date();
  var MonthLastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  var MonthFirstDate = new Date(now.getFullYear(), (now.getMonth() + 12) % 12, 1);
  var formatDateComponent = function(dateComponent) {
    return (dateComponent < 10 ? '0' : '') + dateComponent;
  };

  var formatDate = function(date) {
    return date.getFullYear()  + '-' + formatDateComponent(date.getMonth() + 1) + '-' + formatDateComponent(date.getDate()) ;
  };
  $("#import_start_date").val(formatDate(MonthFirstDate));
  $("#import_end_date").val(formatDate(MonthLastDate));
  makeCastingTable();
  makeSummaryTable();
  selStaff();
});
function makeCastingTable() {
  var fileName = "SelCasting.php";
  var sendData = {
    code_input: $("#code_input").val(),
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#casting_table tbody"));
};
function makeSummaryTable() {
  var fileName = "SelSummary.php";
  var sendData = {
    start: $("#import_start_date").val(),
    end: $("#import_end_date").val(),
    search: $("#search_summary_input").val(),
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#summary__table tbody"));
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
function fillTableBody(data, tbodyDom) {
  $(tbodyDom).empty();
    data.forEach(function(trVal) {
      var newTr = $("<tr>");
      Object.keys(trVal).forEach(function(tdVal) {
          if (tdVal == "billet_length") {
              $("<td>").append(makeBilletLength(trVal[tdVal])).appendTo(newTr);
          } else if (tdVal == "import_date") {
              $("<td>").append(makeImpDate(trVal[tdVal])).appendTo(newTr);
          } else if (tdVal == "billet_position") {
              $("<td>").append(makeBilletPos(trVal[tdVal])).appendTo(newTr);
          } else if ((tdVal == "quantity")||(tdVal == "bundle")||(tdVal == "note")) {
              $("<td>").append(makeInput(trVal[tdVal]).removeClass("no-input number-input")).appendTo(newTr);
          } else {
              $("<td>").html(trVal[tdVal]).appendTo(newTr);
          }
      });
      $(newTr).appendTo(tbodyDom);
  });
};
function makeImpDate(impDate) {
  let targetDom = $("<input>");
  targetDom.attr("type", "date");
  targetDom.val(impDate);
  return targetDom;
}
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
$(document).on("click", "#casting_table tbody tr", function (e) {
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#selected__tr").removeAttr("id");
    $(this).attr("id", "selected__tr");
  } else {
    let codeid = $(this).find("td:nth-child(1)").html();
    let code = $(this).find("td:nth-child(3)").html();
    let material = $(this).find("td:nth-child(4)").html();
      var newTr = $("<tr>");

      $("<td>").html(codeid).appendTo(newTr);
      $("<td>").html(code).appendTo(newTr);
      $("<td>").append(makeInput("")).appendTo(newTr);
      $("<td>").html(material).appendTo(newTr);
      $("<td>").append(makeBilletLength(0).addClass("no-input len-input")).appendTo(newTr);
      $("<td>").append(makeBilletPos("0")).appendTo(newTr);
      $("<td>").append(makeInput("7")
        .removeClass("no-input number-input")
        .addClass("quantity")
      ).appendTo(newTr);
      $("<td>").append(makeInput("")
        .removeClass("no-input number-input")
      ).appendTo(newTr);
      $(newTr).appendTo("#add__table tbody");
      // $(this).remove();
  }
  checkSave();
});
function makeInput(qty) {
  let targetDom = $("<input>");
  targetDom.attr("type", "text");
  targetDom.val(qty).addClass("no-input number-input");
  return targetDom;
}
function makeBilletLength(seletedId) {
  let targetDom = $("<select>");
  var length=[{
    "id": "0",
    "length": "--",
  },{
    "id": "1",
    "length": "1200",
  },{
    "id": "2",
    "length": "600",
  }];
  length.forEach(function(element) {
    if (element["id"] == seletedId) {
      $("<option>")
        .html(element["length"])
        .val(element["id"])
        .prop("selected", true)
        .appendTo(targetDom);
    } else {
      $("<option>")
        .html(element["length"])
        .val(element["id"])
        .appendTo(targetDom);
    }
  });
  return targetDom;
};
function makeBilletPos(position) {
  let targetDom = $("<select>");
  pos.forEach(function(element) {
    if (element["id"] == position) {
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
$(document).on("keyup", "#code_input", function() {
  makeCastingTable();
});
$(document).on("change", "#import_date", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkSave();
});
$(document).on("change", "#staff_id", function() {
  if ($(this).val() != 0) {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  checkSave();
});
function checkSave() {
  let check = true;
  if ($("#add__table tbody tr").length==0 || $("#import_date").val()=="" || $("#staff_id").val()==0) {
    check = false;
  }
  $("#add__table tbody input").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  $("#add__table tbody select").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  if (check) {
    $("#save__button").attr("disabled", false);
  } else {
    $("#save__button").attr("disabled", true);
  } 
};
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
$(document).on("keyup", ".number-input", function() {
  if($.isNumeric($(this).val())){
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkSave();
});
$(document).on("change", ".len-input", function() {
  if($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkSave();
});
$(document).on("keyup", ".text-input", function() {
  if($(this).val()!=""){
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkSave();
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
$(document).on("click", "#save__button", function () {
  var fileName = "InsDataV2.php";
  tableData = getTableData($("#add__table tbody tr"))
    jsonData = JSON.stringify(tableData);
    var sendData = {
        data : jsonData,
        import_date : $("#import_date").val(),
        staff_id : $("#staff_id").val(),
    };
    console.log(sendData);
  myAjax.myAjax(fileName, sendData);
  makeSummaryTable();
  $("#add__table tbody tr").remove();
  $("#import_date").val("").removeClass("complete-input").addClass("no-input");
  $("#staff_id").val(0).removeClass("complete-input").addClass("no-input");
  checkSave();
});
$(document).on("click", "#add__table tbody tr", function (e) {
  if (!$(this).hasClass("add-record")) {
    $(this).parent().find("tr").removeClass("add-record");
    $(this).addClass("add-record");
    $("#add__tr").removeAttr("id");
    $(this).attr("id", "add__tr");
  } else {
      // $(this).remove();
  }
});
$(document).on("change", "#import_start_date", function (e) {
  makeSummaryTable();
});
$(document).on("change", "#import_end_date", function (e) {
  makeSummaryTable();
});$(document).on("keyup", "#search_summary_input", function() {
  makeSummaryTable();
});
$(document).on("click", "#summary__table tbody tr", function (e) {
  if (!$(this).hasClass("update-sel")) {
    $(this).parent().find("tr").removeClass("update-sel");
    $(this).addClass("update-sel");
    $("#update__tr").removeAttr("id");
    $(this).attr("id", "update__tr");
  } else {
  let pas = prompt("Please enter your Password", "********");
    if (pas == '01910926') {
      deleteDialog.showModal();
    } else {
      alert("Wrong pas");
    }
  }
});
$(document).on("change", "#summary__table tbody tr td", function () {
  let sendData = new Object();
  let fileName;
  fileName = "UpdateData.php";
  sendData = {
    targetId : $("#update__tr td:nth-child(1)").html(),
    import_date : $("#update__tr td:nth-child(2) input").val(),
    billet_position : $("#update__tr td:nth-child(7) select").val(),
    bundle : $("#update__tr td:nth-child(4) input").val(),
    billet_length : $("#update__tr td:nth-child(6) select").val(),
    quantity : $("#update__tr td:nth-child(8) input").val(),
    note : $("#update__tr td:nth-child(9) input").val(),
  };
  console.log(sendData);
  myAjax.myAjax(fileName, sendData);
  makeSummaryTable();
});
$(document).on("click", "#delete-dialog-cancel__button", function () {
  deleteDialog.close();
});
$(document).on("click", "#delete-dialog-delete__button", function () {
  let fileName = "DeleteData.php";
  sendData = {
    targetId : $("#update__tr td:nth-child(1)").html(),
  };
  console.log(sendData);
  myAjax.myAjax(fileName, sendData);
  deleteDialog.close();
  makeSummaryTable();
});