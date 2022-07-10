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
  makeSummaryTable();
});
function makeSummaryTable() {
  var fileName = "SelSummary.php";
  var sendData = {
      dummy: "dummy",
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#summary_table tbody"));
};
function fillTableBody(data, tbodyDom) {
  $(tbodyDom).empty();
    data.forEach(function(trVal) {
      var newTr = $("<tr>");
      Object.keys(trVal).forEach(function(tdVal) {
        if (tdVal == "product_dim") {
          $("<td>").append(makeDimSel(trVal[tdVal])).appendTo(newTr);
        }else if (tdVal == "product_type") {
              $("<td>").append(makeMaterialSel(trVal[tdVal])).appendTo(newTr);
        } else if (tdVal == "product_date") {
            $("<td>").append(makeDatePlan(trVal[tdVal])).appendTo(newTr);
        } else if ((tdVal == "code")||(tdVal == "extrusion_scrap")||
                (tdVal == "casting_scrap")||(tdVal == "aluminium_ingot")||
                (tdVal == "aluminium_orther")) {
            $("<td>").append(makeInput(trVal[tdVal])).appendTo(newTr);
        } else {
            $("<td>").html(trVal[tdVal]).appendTo(newTr);
        }
      });
      $(newTr).appendTo(tbodyDom);
  });
};
function makeMaterialSel(seletedId) {
  let targetDom = $("<select>");
  fileName = "SelMaterialType.php";
  sendData = {
    dummy: "dummy",
  };
  myAjax.myAjax(fileName, sendData);
  ajaxReturnData.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["material_type"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["material_type"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
};
function makeDimSel(seletedId) {
  let targetDom = $("<select>");
  var dim=[{
                "id": 1,
                "dim": "9 inch"
            },
            {
                "id": 2,
                "dim": "14 inch"
            }];
dim.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["dim"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["dim"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
}
function makeDatePlan(datePlan) {
  let targetDom = $("<input>");
  targetDom.attr("type", "date");
  targetDom.val(datePlan);
  return targetDom;
}
function makeInput(qty) {
  let targetDom = $("<input>");
  targetDom.attr("type", "text");
  targetDom.val(qty);
  return targetDom;
}
$(document).on("click", "#summary_table tbody tr", function (e) {
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
    myAjax.myAjax(fileName, sendData);
    // putDataToInput(ajaxReturnData);
  } else {
    // deleteDialog.showModal();
  }
  $("#save").attr("disabled", true);
  $("#print").attr("disabled", false);
  $(".save-data").each(function (index, element) {
    $(this).removeClass("no-input").addClass("complete-input");
  });
});
$(document).on("change", "#product_date", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
$(document).on("keyup", "#code", function() {
  $(this).val($(this).val().toUpperCase());
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
$(document).on("change", "#product_type", function() {
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
function getInputData() {
  let inputData = new Object();
    $(".top__wrapper input.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    $(".top__wrapper select.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
  return inputData;
};
function clearInputData() {
  $(".top__wrapper input.need-clear").each(function (index, element) {
    $(this).val("").removeClass("complete-input").addClass("no-input");
  });
  $(".top__wrapper input.no-need").each(function (index, element) {
    $(this).val("").removeClass("no-input").addClass("complete-input");
  });
  $(".top__wrapper select.need-clear").each(function (index, element) {
    $(this).val("0").removeClass("complete-input").addClass("no-input");
  });
};
$(document).on("click", "#save", function () {
  fileName = "InsData.php";
  inputData = getInputData();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  clearInputData();
  makeSummaryTable();
  $("#save").attr("disabled", true);
});
function checkInput() {
  let check = true;
  $(".top__wrapper input .check").each(function() {
    if ($(this).val() == "") {
      check = false;
    }
  });
  $(".top__wrapper select").each(function() {
    if ($(this).val() == 0) {
      check = false;
    }
  });
  if ($("#summary_table tbody tr").hasClass("selected-record")) {
    check = false;
  }
  if (check) {
    $("#save").attr("disabled", false);
  } else {
    $("#save").attr("disabled", true);
  } 
};
$(document).on("click", "#print", function() {
  ajaxSelForExcel($("#selected__tr").find("td").eq(0).html());
});
function ajaxSelForExcel(targetId) {
  $.ajax({
    type: "POST",
    url: "./php/SelForExcel.php",
    dataType: "json",
    async: false,
    data: {
      targetId: targetId,
    },
  }).done(function(data) {
    ajaxPyMakeExcelFile(data);
  }).fail(function() {
    alert("DB connect error");
  });
}
function ajaxPyMakeExcelFile(inputData) {
  let data = new Object();
  let donwloadFileName;
  data = inputData[0];
  donwloadFileName = data["code"] + "_" + data["product_date"] + "_" + data["material_type"] + ".xlsx";   
  let JSONdata = JSON.stringify(data);

  $.ajax({
    async: false,
    url: "./py/MakeExcelFile.py",
    type: "post",
    data: JSONdata,
    dataType: "json",
  }).done(function(data) {
    downloadExcelFile(donwloadFileName);
  }).fail(function(e) {
    // alert("Tải file thất bại");
  });
}
function downloadExcelFile(donwloadFileName) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = donwloadFileName;
  a.href = "../../FileDownLoad/ExcelFile/" + donwloadFileName;
  a.click();
  a.remove();
}
function caculating() {
  let exd_scrap = $("#extrusion_scrap").val();
  let cast_scrap = $("#casting_scrap").val();
  let al_ingot = $("#aluminium_ingot").val();
  let al_orther = $("#aluminium_other").val();
  let total_weight = exd_scrap + cast_scrap + al_ingot + al_orther;
  let al_degas = 1000;
  let al_filter = 250;
  let al_table = total_weight - al_degas - al_filter;
}
$(document).on("change", "#summary_table tbody tr", function () {
  let sendData = new Object();
  let fileName;
  fileName = "UpdateData.php";
  sendData = {
    targetId : $("#selected__tr td:nth-child(1)").html(),
    product_date : $("#selected__tr td:nth-child(2) input").val(),
    product_dim: $("#selected__tr td:nth-child(3) select").val(),
    product_type: $("#selected__tr td:nth-child(4) select").val(),
    code: $("#selected__tr td:nth-child(5) input").val(),
    extrusion_scrap : $("#selected__tr td:nth-child(6) input").val(),
    casting_scrap: $("#selected__tr td:nth-child(7) input").val(),
    aluminium_ingot : $("#selected__tr td:nth-child(8) input").val(),
    aluminium_orther : $("#selected__tr td:nth-child(9) input").val(),
  };
  console.log(sendData);
  myAjax.myAjax(fileName, sendData);
});