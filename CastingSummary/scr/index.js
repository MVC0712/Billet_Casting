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
  $("#export_start_date").val(formatDate(MonthFirstDate));
  $("#export_end_date").val(formatDate(MonthLastDate));
  makeCastingTable();
  makeHomoTable();
  makeStockTable();
});
function makeCastingTable() {
  var fileName = "SelMeltingData.php";
  var sendData = {
    start: $("#export_start_date").val(),
    end: $("#export_end_date").val(),
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#casting__table tbody"));
};
function makeHomoTable() {
  var fileName = "SelHomoGas.php";
  var sendData = {
    start: $("#export_start_date").val(),
    end: $("#export_end_date").val(),
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#homo__table tbody"));
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

$(document).on("change", "#export_start_date", function() {
  makeCastingTable();
  makeHomoTable();
  makeStockTable();
});
$(document).on("change", "#export_end_date", function() {
  makeCastingTable();
  makeHomoTable();
  makeStockTable();
});
function makeStockTable() {
  var fileName = "SelStockSum.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#sum"));

  var fileName = "SelStock.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#stock_table tbody"));
  calTotalQty();
  calTotalWeight();
};
function calTotalQty() {
  var total = 0;
  $("#stock_table tbody tr").each(function (index, element) {
      total += parseInt($(this).find("td:nth-child(2)").html());
  });
  $("#qty").html(total);
};
function calTotalWeight() {
  var total = 0;
  $("#stock_table tbody tr").each(function (index, element) {
      total += parseInt($(this).find("td:nth-child(3)").html());
  });
  $("#weight").html(total);
};