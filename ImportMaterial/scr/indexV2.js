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
      .fail(function (err) {
        alert(err.responseText);
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
  $("#import_date").val(formatDate(now));
  makeSummaryTable();
  makeRemainTable();
  makeSummaryRemainTable();
  makeSummaryInputTable();
  selStaff();
  selMaterialType();
  selDimention();
  selmaterialOrigin();
  makeSummaryAlloyRemainTable();
});
function makeSummaryTable() {
  var fileName = "SelSummaryV2.php";
  var sendData = {
    start: $("#import_start_date").val(),
    end: $("#import_end_date").val(),
    search: $("#search_summary_input").val(),
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#summary__table tbody"));
};
function makeRemainTable() {
  var fileName = "SelRemainV2.php";
  var sendData = {
    search: $("#search_remain_input").val(),
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#remain__table tbody"));
};
function makeSummaryRemainTable() {
  var fileName = "SelSummaryRemain.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#summary_remain__table tbody"));
  remakeSummaryRemainTable();
};
function remakeSummaryRemainTable() {
  var fileName = "SelSummaryTotalAlloyUsed.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  let ttt = ajaxReturnData[0]["TTT"];
  $("#summary_remain__table tbody tr").each(function (index, element) {
    var tr = [];
    $(this).find("td").each(function (index, element) {
      if (index == 1 ) {
        if ($(this).html()=="Ingot/Alloy") {
          $(this).closest('td').next('td').text((Number($(this).closest('td').next('td').text()) - ttt).toFixed(1));
        }
      }
    });
  });
};
function makeSummaryAlloyRemainTable() {
  var fileName = "SelSummaryAlloyRemain.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#alloy_remain__table tbody"));
  remakeSummaryAlloyRemainTable();
};
function remakeSummaryAlloyRemainTable() {
  var fileName = "SelSummaryAlloyUsed.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  let IG = ajaxReturnData[0]["IG"];
  let CR = ajaxReturnData[0]["CR"];
  let CU = ajaxReturnData[0]["CU"];
  let MG = ajaxReturnData[0]["MG"];
  let MN = ajaxReturnData[0]["MN"];
  let SI = ajaxReturnData[0]["SI"];
  let TI = ajaxReturnData[0]["TI"];
  let ZN = ajaxReturnData[0]["ZN"];
  $("#alloy_remain__table tbody tr").each(function (index, element) {
    var tr = [];
    $(this).find("td").each(function (index, element) {
      if (index == 1 ) {
        if ($(this).html()=="IG") {
          $(this).closest('td').next('td').text((Number($(this).closest('td').next('td').text()) - IG).toFixed(1));
        } else if ($(this).html()=="CR") {
          $(this).closest('td').next('td').text((Number($(this).closest('td').next('td').text()) - CR).toFixed(1));
        } else if ($(this).html()=="CU") {
          $(this).closest('td').next('td').text((Number($(this).closest('td').next('td').text()) - CU).toFixed(1));
        } else if ($(this).html()=="MG") {
          $(this).closest('td').next('td').text((Number($(this).closest('td').next('td').text()) - MG).toFixed(1));
        } else if ($(this).html()=="MN") {
          $(this).closest('td').next('td').text((Number($(this).closest('td').next('td').text()) - MN).toFixed(1));
        } else if ($(this).html()=="SI") {
          $(this).closest('td').next('td').text((Number($(this).closest('td').next('td').text()) - SI).toFixed(1));
        } else if ($(this).html()=="TI") {
          $(this).closest('td').next('td').text((Number($(this).closest('td').next('td').text()) - TI).toFixed(1));
        } else if ($(this).html()=="ZN") {
          $(this).closest('td').next('td').text((Number($(this).closest('td').next('td').text()) - ZN).toFixed(1));
        } else {

        }
      }
    });
  });
};

function makeSummaryInputTable() {
  var fileName = "SelSummaryInput.php";
  var sendData = {
    start: $("#import_start_date").val(),
    end: $("#import_end_date").val(),
    search: $("#search_summary_input").val(),
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#summary_input__table tbody"));
};
function fillTableBody(data, tbodyDom) {
  $(tbodyDom).empty();
  data.forEach(function(trVal) {
      let newTr = $("<tr>");
      Object.keys(trVal).forEach(function(tdVal, index) {
        if ((tdVal == "note")) {
          $("<td>").append($("<input>").val(trVal[tdVal])).appendTo(newTr);
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
function selMaterialType() {
  var fileName = "SelMaterialType.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  $("#material_id option").remove();
  $("#material_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#material_id").append(
          $("<option>").val(value["id"]).html(value["material_type"])
      );
  });
};
function selDimention() {
  var fileName = "SelDimention.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  $("#dimention_id option").remove();
  $("#dimention_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#dimention_id").append(
          $("<option>").val(value["id"]).html(value["dimention"])
      );
  });
};
function selmaterialOrigin() {
  var fileName = "SelMaterialOrigin.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  $("#material_origin_id option").remove();
  $("#material_origin_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#material_origin_id").append(
          $("<option>").val(value["id"]).html(value["material_origin"])
      );
  });
};
$(document).on("click", "#add__button", function (e) {
  var newTr = $("<tr>");
  $("<td>").html(makeInputCode($("#code_name").val())).appendTo(newTr);
  $("<td>").html(makeMaterial($("#material_id").val())).appendTo(newTr);
  $("<td>").html(makeInput($("#weight").val())).appendTo(newTr);
  $("<td>").html(makeInput($("#note").val())).appendTo(newTr);
  $("<td>").append($("<button class='remove'>RM</button>")).appendTo(newTr);
  $(newTr).appendTo("#add__table tbody");
  resetValue();
  changeOrigin();
  checkSave();
});
function makeInput(qty) {
  let targetDom = $("<input>");
  targetDom.attr("type", "text");
  targetDom.val(qty).addClass("number-input");
  return targetDom;
}
function makeInputCode(qty) {
  let targetDom = $("<input>");
  targetDom.attr("type", "text");
  targetDom.val(qty).addClass("regex-text");
  return targetDom;
}
function makeOrigin(seletedId) {
  let targetDom = $("<select>");
  var fileName = "SelMaterialOrigin.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  ajaxReturnData.forEach(function(element) {
    if (element["id"] == seletedId) {
      $("<option>")
        .html(element["material_origin"])
        .val(element["id"])
        .prop("selected", true)
        .appendTo(targetDom);
    } else {
      $("<option>")
        .html(element["material_origin"])
        .val(element["id"])
        .appendTo(targetDom);
    }
  });
  return targetDom;
};
function makeDimention(seletedId) {
  let targetDom = $("<select>");
  var fileName = "SelDimention.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  ajaxReturnData.forEach(function(element) {
    if (element["id"] == seletedId) {
      $("<option>")
        .html(element["dimention"])
        .val(element["id"])
        .prop("selected", true)
        .appendTo(targetDom);
    } else {
      $("<option>")
        .html(element["dimention"])
        .val(element["id"])
        .appendTo(targetDom);
    }
  });
  return targetDom;
};
function makeMaterial(seletedId) {
  let targetDom = $("<select>");
  var fileName = "SelMaterialType.php";
  var sendData = {
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
  return check;
};
function checkAdd() {
  let add = true;
  $("#material_table tbody input").each(function() {
    if ($(this).hasClass("no-input")) {
      add = false;
    }
  });
  $("#material_table tbody select").each(function() {
    if ($(this).hasClass("no-input")) {
      add = false;
    }
  });
  if (add) {
    $("#add__button").attr("disabled", false);
  } else {
    $("#add__button").attr("disabled", true);
  } 
  return add;
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
  checkAdd();
});
$(document).on("change", "#staff_id", function() {
  if ($(this).val() != 0) {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  checkSave();
  checkAdd();
});
$(document).on("keyup", ".number-input", function() {
  if($.isNumeric($(this).val())){
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkSave();
  checkAdd();
});
$(document).on("keyup", ".text-input", function() {
  if($(this).val()!=""){
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkSave();
  checkAdd();
});
$(document).on("change", ".select-input", function() {
  if($(this).val()!=0){
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkSave();
  checkAdd();
});
$(document).on("keyup", ".regex-text", function() {
  if(inputCheck($(this).val())){
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkSave();
  checkAdd();
});
$(document).on("keyup", "#code_name", function() {
  if (inputCheck($(this).val())) {
    fileName = "CheckImportMaterial.php";
    sendData = {
      code_name: $("#code_name").val(),
    };
    myAjax.myAjax(fileName, sendData);
    if(ajaxReturnData.length == 0) {
      $("#code_name").removeClass("no-input").addClass("complete-input");
    } else {
      $("#code_name").removeClass("complete-input").addClass("no-input");
    }
  }
  checkAdd();
});
$(document).on("keyup", "#weight", function() {
  if (1 < $(this).val() && $(this).val() < 500000 && $.isNumeric($(this).val())) {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  checkAdd();
});
$(document).on("change", "#origin", function() {
  changeOrigin();
});
function changeOrigin() {
  switch ($("#origin").val()) {
    case "N11_NG":
      $("#code_name").val("N11-NG-");
      $("#material_id option[value='1']").show();
      $("#material_id option[value='2']").show();
      $("#material_id option[value='3']").show();
      $("#material_id option[value='4']").show();
      $("#material_id option[value='10']").hide();
    break;
    case "N11_DI":
      $("#code_name").val("N11-DI-");
      $("#material_id option[value='1']").show();
      $("#material_id option[value='2']").show();
      $("#material_id option[value='3']").show();
      $("#material_id option[value='4']").show();
      $("#material_id option[value='10']").hide();
    break;
    case "N14_NG":
      $("#code_name").val("N14-NG-");
      $("#material_id option[value='1']").show();
      $("#material_id option[value='2']").show();
      $("#material_id option[value='3']").show();
      $("#material_id option[value='4']").show();
      $("#material_id option[value='10']").hide();
    break;
    case "N14_HE":
      $("#code_name").val("N14-HE-");
      $("#material_id option[value='1']").show();
      $("#material_id option[value='2']").show();
      $("#material_id option[value='3']").show();
      $("#material_id option[value='4']").show();
      $("#material_id option[value='10']").hide();
    break;
    case "N14_IN":
      $("#code_name").val("N14-IG-");
      $("#material_id option[value='1']").hide();
      $("#material_id option[value='2']").hide();
      $("#material_id option[value='3']").hide();
      $("#material_id option[value='4']").hide();
      $("#material_id option[value='10']").show();
    break;
    case "N14_CR":
      $("#code_name").val("N14-CR-");
      $("#material_id option[value='1']").hide();
      $("#material_id option[value='2']").hide();
      $("#material_id option[value='3']").hide();
      $("#material_id option[value='4']").hide();
      $("#material_id option[value='10']").show();
    break;
    case "N14_CU":
      $("#code_name").val("N14-CU-");
      $("#material_id option[value='1']").hide();
      $("#material_id option[value='2']").hide();
      $("#material_id option[value='3']").hide();
      $("#material_id option[value='4']").hide();
      $("#material_id option[value='10']").show();
    break;
    case "N14_MG":
      $("#code_name").val("N14-MG-");
      $("#material_id option[value='1']").hide();
      $("#material_id option[value='2']").hide();
      $("#material_id option[value='3']").hide();
      $("#material_id option[value='4']").hide();
      $("#material_id option[value='10']").show();
    break;
    case "N14_MN":
      $("#code_name").val("N14-MN-");
      $("#material_id option[value='1']").hide();
      $("#material_id option[value='2']").hide();
      $("#material_id option[value='3']").hide();
      $("#material_id option[value='4']").hide();
      $("#material_id option[value='10']").show();
    break;
    case "N14_SI":
      $("#code_name").val("N14-SI-");
      $("#material_id option[value='1']").hide();
      $("#material_id option[value='2']").hide();
      $("#material_id option[value='3']").hide();
      $("#material_id option[value='4']").hide();
      $("#material_id option[value='10']").show();
    break;
    case "V44_NG":
      $("#code_name").val("V44-NG-");
      $("#material_id option[value='1']").show();
      $("#material_id option[value='2']").show();
      $("#material_id option[value='3']").show();
      $("#material_id option[value='4']").show();
      $("#material_id option[value='10']").hide();
    break;
    case "V33_NG":
      $("#code_name").val("V33-NG-");
      $("#material_id option[value='1']").show();
      $("#material_id option[value='2']").show();
      $("#material_id option[value='3']").show();
      $("#material_id option[value='4']").show();
      $("#material_id option[value='10']").hide();
    break;
    case "N97_NG":
      $("#code_name").val("N97-NG-");
      $("#material_id option[value='1']").show();
      $("#material_id option[value='2']").show();
      $("#material_id option[value='3']").show();
      $("#material_id option[value='4']").show();
      $("#material_id option[value='10']").hide();
    break;
  }
  $("#code_name").removeClass("complete-input").addClass("no-input").focus();
};
$(function() {
  var interval = $("#origin option").clone();
  $("#material_origin").on("change", function() {
    var val = this.value;
    $("#origin").html( 
      interval.filter(function() { 
        return this.value.indexOf( val + "_" ) === 0; 
      })
    );
    switch ($("#material_origin").val()) {
      case "N14":
        $("#material_id option[value='10']").show();
      break;
      default:
        $("#material_id option[value='10']").hide();
    }
    changeOrigin();
  }).change();
});

function resetValue() {
  $("#note").val("");
  $("#weight").val("").removeClass("complete-input").addClass("no-input");
  $("#code_name").removeClass("complete-input").addClass("no-input").focus();
  checkAdd();
};
function inputCheck(val) {
  let regexp = /^[A-Z]{1}[0-9]{2}-[N|D|H|I|C|M|S][G|I|E|N|R|U|N|I]-[0-9]+$/;
  return regexp.test(val);
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
$(document).on("click", "#save__button", function () {
  var fileName = "InsDataV2.php";
  tableData = getTableData($("#add__table tbody tr"))
    jsonData = JSON.stringify(tableData);
    var sendData = {
        data : jsonData,
        import_date : $("#import_date").val(),
        staff_id : $("#staff_id").val(),
    };
  myAjax.myAjax(fileName, sendData);
  makeSummaryTable();
  makeSummaryInputTable();
  $("#add__table tbody tr").remove();
  $("#material_id").val(0).removeClass("complete-input").addClass("no-input");
  $("#weight").val("").removeClass("complete-input").addClass("no-input");
  $("#staff_id").val(0).removeClass("complete-input").addClass("no-input");
  changeOrigin();
  checkSave();
  checkAdd();
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
$(document).on("click", "#add__table tbody tr td button", function (e) {
  console.log($(this).parent().parent());
  if ($(this).parent().parent().hasClass("add-record")) {
    $(this).parent().parent().remove();
  }
});
$(document).on("change", "#import_start_date", function (e) {
  makeSummaryTable();
  makeSummaryInputTable();
});
$(document).on("change", "#import_end_date", function (e) {
  makeSummaryTable();
  makeSummaryInputTable();
});
$(document).on("keyup", "#search_summary_input", function() {
  makeSummaryTable();
  makeSummaryInputTable();
});
$(document).on("keyup", "#search_remain_input", function() {
  makeRemainTable();
});
$(document).on("click", "#summary__table tbody tr", function (e) {
  if (!$(this).hasClass("update-sel")) {
    $(this).parent().find("tr").removeClass("update-sel");
    $(this).addClass("update-sel");
    $("#update__tr").removeAttr("id");
    $(this).attr("id", "update__tr");
  } else {
  let pas = prompt("Please enter your Password", "********");
    if ((pas == '01910926') || (pas == '02216872')) {
      deleteDialog.showModal();
    } else {
      alert("Wrong pas");
    }
  }
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
  makeSummaryInputTable();
  makeSummaryRemainTable();
  makeSummaryAlloyRemainTable
});

$(document).on("change", "#summary__table tbody tr", function () {
  let sendData = new Object();
  let fileName;
  fileName = "UpdateData.php";
  sendData = {
    id: $("#update__tr td:nth-child(1)").html(),
    note: $("#update__tr td:nth-child(7) input").val(),
  };
  myAjax.myAjax(fileName, sendData);
  makeSummaryTable();
  makeSummaryInputTable();
});