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
  // fillTableBody(ajaxReturnData, $("#summary_table tbody"));
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
  checkUpdate();
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
  checkUpdate();
});
$(document).on("keyup", "#code", function() {
  $(this).val($(this).val().toUpperCase());
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("change", "#product_type", function() {
  if ($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
      var fileName = "SelMaterialElement.php";
      var sendData = {
        product_type: $("#product_type").val(),
      };
      myAjax.myAjax(fileName, sendData);
    $("#si_req").text(ajaxReturnData[0]["si"]);
    $("#mg_req").text(ajaxReturnData[0]["mg"]);
    $("#mn_req").text(ajaxReturnData[0]["mn"]);
    $("#cr_req").text(ajaxReturnData[0]["cr"]);
    $("#cu_req").text(ajaxReturnData[0]["cu"]);
    $("#fe_req").text(ajaxReturnData[0]["fe"]);
    $("#zn_req").text(ajaxReturnData[0]["zn"]);
    $("#ti_b_req").text(ajaxReturnData[0]["ti_b"]);
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("keyup", "#extrusion_scrap", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("keyup", "#casting_scrap", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("keyup", "#aluminium_ingot", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("keyup", ".number-input", function() {
  if($.isNumeric($(this).val())){
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
function getInputData() {
  let inputData = new Object();
    $(".top__wrapper input.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    $(".top__wrapper select.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
  console.log(inputData);
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
});
$(document).on("click", "#update", function () {
  fileName = "UpdateData.php";
  inputData = getInputData();
  inputData["targetId"] = $("#selected__tr").find("td").eq(0).html();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  clearInputData();
  makeSummaryTable();
});
function checkInput() {
  let check = true;
  $(".top__wrapper input").each(function() {
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
function checkUpdate() {
  let check = true;
  $(".top__wrapper input .save-data").each(function() {
    if ($(this).val() == "") {
      check = false;
    }
  });
  $(".top__wrapper select .save-data").each(function() {
    if ($(this).val() == 0) {
      check = false;
    }
  });
  if (!$("#summary_table tbody tr").hasClass("selected-record")) {
      check = false;
  }
  if (check) {
    $("#update").attr("disabled", false);
  } else {
    $("#update").attr("disabled", true);
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
  donwloadFileName = data["plan_date_at"] + "_" + data["die_number"] + ".xlsx";
  let JSONdata = JSON.stringify(data);

  $.ajax({
    async: false,
    url: "./py/MakeExcelFile.py",
    type: "post",
    data: JSONdata,
    dataType: "json",
  }).done(function(data) {
    console.log(data);
    downloadExcelFile(donwloadFileName);
  }).fail(function() {
    alert("Tải file thất bại");
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