let deleteDialog = document.getElementById("delete__dialog");
let inputData = new Object();
let fileName;
let sendData = new Object();
let ajaxReturnData;

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
});
function makeCastingTable() {
  var fileName = "SelCasting.php";
  var sendData = {
      dummy: "dummy",
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#casting_table tbody"));
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
$(document).on("click", "#casting_table tbody tr", function (e) {
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#selected__tr").removeAttr("id");
    $(this).attr("id", "selected__tr");
    // $("#selected__tr td:nth-child(3) input").attr("id", "selected__date");
  } else {
    let codeid = $(this).find("td:nth-child(1)").html();
    let code = $(this).find("td:nth-child(3)").html();
    let material = $(this).find("td:nth-child(4)").html();
      var newTr = $("<tr>");

      $("<td>").html(code).appendTo(newTr);
      $("<td>").html(code).appendTo(newTr);
      $("<td>").append(makeInput("")).appendTo(newTr);
      $("<td>").html(material).appendTo(newTr);
      $("<td>").append(makeBilletLength("")).appendTo(newTr);
      $("<td>").append(makeInput("0")).appendTo(newTr);
      $("<td>").append(makeInput("").removeClass("number-input").addClass("text-input")).appendTo(newTr);
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
}
$(document).on("change", "#import_date", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkSave();
});
function checkSave() {
  let check = true;
  if ($("#add__table tbody tr").length==0 || $("#import_date").val()=="") {
    check = false;
  }
  $("#add__table tbody input").each(function() {
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
  console.log(tableData);
  return tableData;
};
$(document).on("click", "#save__button", function () {
  var fileName = "InsData.php";
  tableData = getTableDataInput($("#add__table tbody tr"))
    console.log(tableData); 
    jsonData = JSON.stringify(tableData);
    
    var sendData = {
        data : jsonData,
        import_date : $("#import_date").val(),
    };
    console.log(sendData);
  // myAjax.myAjax(fileName, sendData);
  // makeSummaryTable();
  // clearInputData();
});