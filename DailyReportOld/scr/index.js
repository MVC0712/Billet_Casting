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
// sendObj["maintenance_start"] =getDateTime(new Date($("#maintenance_start").val()));
$(function () {
  MaterialNameCode();
  makeSummaryTable();
  var now = new Date();
  var MonthLastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  var MonthFirstDate = new Date(now.getFullYear(), (now.getMonth() + 12) % 12, 1);
  var formatDateComponent = function(dateComponent) {
    return (dateComponent < 10 ? '0' : '') + dateComponent;
  };

  var formatDate = function(date) {
    return date.getFullYear().toString().substr(-2);  + '-' + formatDateComponent(date.getMonth() + 1) + '-' + formatDateComponent(date.getDate()) ;
  };

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
    putDataToInput(ajaxReturnData);
    $("#add_material").text("Add");
  } else {
    // deleteDialog.showModal();
  }
  $("#save").attr("disabled", true);
  checkUpdate();
  makeAddMaterial();
  $(".save-data").each(function (index, element) {
    $(this).removeClass("no-input").addClass("complete-input");
  });
  Total();
});
function MaterialNameCode() {
  var fileName = "SelMaterialName.php";
  var sendData = {
      dummy: "dummy",
  };
  myAjax.myAjax(fileName, sendData);
  $("#material option").remove();
  $("#material").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#material").append(
          $("<option>").val(value["id"]).html(value["material_name"])
      );
  });
};
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
$(document).on("change", "#material", function() {
  add_material_check();
  if ($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
      var fileName = "SelMaterialNameType.php";
      var sendData = {
        material_name_id: $("#material").val(),
      };
      myAjax.myAjax(fileName, sendData);
      $("#material_type option").remove();
      $("#material_type").append($("<option>").val(0).html("NO"));
      $("#material_type").removeClass("complete-input").addClass("no-input");
      ajaxReturnData.forEach(function(value) {
          $("#material_type").append(
              $("<option>").val(value["id"]).html(value["material_name_type"])
          );
      });
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("change", "#material_type", function() {
  add_material_check();
  if ($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("keyup", "#material_weight", function() {
  add_material_check();
  if ($(this).val() > 0) {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});

$(document).on("keyup", "#melting_table thead input", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("change", "#melting_table thead input", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("keyup", "#element_table tbody input", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("keyup", ".casting__wrapper thead input", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("change", ".casting__wrapper thead input", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
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
}
$("#file_upload").on("change", function () {
  var file = $(this).prop("files")[0];
  console.log(file.name);
  $("#file_url").html(file.name);
  $("#preview__button").prop("disabled", false);
  readNewFile = true;
});
$(document).on("click", "#preview__button", function () {

      window.open("./DailyReportSub.html");
  
});
$("#add_material").on("click", function () {
  switch ($(this).text()) {
    case "Save":
      $("<tr>")
        .append("<td></td>")
        .append($("<td>").append(MaterialNameOption($("#material").val())))
        .append($("<td>").append(MaterialNameTypeOption($("#material_type").val())))
        .append($("<td>").append($("<input>").val($("#material_weight").val())))
        .append($("<td>").append($("<input>").val($("#material_note").val())))
        .appendTo("#material_table tbody");
      $(this).prop("disabled", true);
      $("#material").val("0").focus().removeClass("complete-input").addClass("no-input");
      $("#material_type").val("0").removeClass("complete-input").addClass("no-input");
      $("#material_weight").val("").removeClass("complete-input").addClass("no-input");
      $("#material_note").val("");
    break;
    case "Add":
      let fileName;
      let sendData = new Object();
      fileName = "AddMaterial.php";
      sendData = {
        t_casting: $("#selected__tr td:nth-child(1)").text(),
        material: $("#material").val(),
        material_type: $("#material_type").val(),
        weight: $("#material_weight").val(),
        note: $("#material_note").val(),
      };
      myAjax.myAjax(fileName, sendData);
      makeAddMaterial();
      $("#material").val("").removeClass("complete-input").addClass("no-input");
      $("#material_type").val("").removeClass("complete-input").addClass("no-input");
      $("#material_weight").val("").removeClass("complete-input").addClass("no-input");
      $("#add_material").prop("disabled", true);
    break;
  }
  Total();
});
function add_material_check() {
  if ($("#material").val() == 0 ||
      $("#material_type").val() == 0 ||
      $("#material_weight").val() <= 0) {
      $("#add_material").prop("disabled", true);
  } else {
      $("#add_material").prop("disabled", false);
  }
};
function makeAddMaterial() {
  fileName = "SelAddMaterial.php";
  sendData = {
    t_casting: $("#selected__tr td:nth-child(1)").text(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#material_table tbody").empty();
  ajaxReturnData.forEach(function (trVal) {
    var newTr = $("<tr>");
    Object.keys(trVal).forEach(function (tdVal) {
      if (tdVal == "material") {
        $("<td>")
            .append(MaterialNameOption(trVal[tdVal]))
            .appendTo(newTr);
      } else if (tdVal == "material_type") {
        $("<td>")
            .append(MaterialNameTypeOpt(trVal[tdVal], trVal.material))
            .appendTo(newTr);
    } else if ((tdVal == "weight") || (tdVal == "note")) {
      $("<td>").append($("<input>").val(trVal[tdVal])).appendTo(newTr);
    } else {
      $("<td>").html(trVal[tdVal]).appendTo(newTr);
    }
    });
    $(newTr).appendTo("#material_table tbody");
  });
};
function MaterialNameTypeOpt(seletedId, material) {
  let targetDom = $("<select>");
  fileName = "SelMaterialNameType.php";
  sendData = {
    material_name_id: material,
  };
  myAjax.myAjax(fileName, sendData);
  ajaxReturnData.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["material_name_type"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["material_name_type"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
}
function MaterialNameOption(seletedId) {
  let targetDom = $("<select>");

  fileName = "SelMaterialName.php";
  sendData = {
      ng_code: "%",
  };
  myAjax.myAjax(fileName, sendData);
  ajaxReturnData.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["material_name"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["material_name"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
}
function MaterialNameTypeOption(seletedId) {
  let targetDom = $("<select>");

  fileName = "SelMaterialNameType.php";
  sendData = {
    material_name_id: $("#material").val(),
  };
  myAjax.myAjax(fileName, sendData);
  ajaxReturnData.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["material_name_type"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["material_name_type"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
}

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
  if ($("#file_upload").prop("files")[0]) {
    inputData["file_url"] = $("#file_url").html();
    ajaxFileUpload();
  } else {
    inputData["file_url"] = $("#file_url").html();
  }
  $(".material__wrapper .right__material input.save-data").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  $(".material__wrapper .right__material input.date-time").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  $(".element__wrapper input.save-data").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  $(".casting__wrapper input.save-data").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  $(".casting__wrapper input.date-time").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  console.log(inputData);
  console.log(Object.keys(inputData).length);
  return inputData;
}
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

  $("#file_url").html("No file");

  $(".material__wrapper .right__material input.need-clear").each(function (index, element) {
    $(this).val("").removeClass("complete-input").addClass("no-input");
  });
  $(".material__wrapper .right__material input.no-need").each(function (index, element) {
    $(this).val("").removeClass("no-input").addClass("complete-input");
  });
  $(".element__wrapper input.need-clear").each(function (index, element) {
    $(this).val("").removeClass("complete-input").addClass("no-input");
  });
  $(".element__wrapper input.no-need").each(function (index, element) {
    $(this).val("").removeClass("no-input").addClass("complete-input");
  });
  $(".casting__wrapper input.need-clear").each(function (index, element) {
    $(this).val("").removeClass("complete-input").addClass("no-input");
  });
  $(".casting__wrapper input.no-need").each(function (index, element) {
    $(this).val("").removeClass("no-input").addClass("complete-input");
  });
  $("#material_table tbody").empty();
}
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
}
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
}

$(document).on("click", "#save", function () {
  fileName = "InsData.php";
  inputData = getInputData();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  let targetId = ajaxReturnData[0]["id"];
  tableData = getTableData($("#material_table tbody tr"));
  tableData.push(targetId);
  fileName = "InsMaterialData.php";
  sendData = JSON.stringify(tableData);
  console.log(sendData);
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
$(document).on("click", "#material_table tbody tr", function() {
  if (!$(this).hasClass("selected-record")) {
      $(this).parent().find("tr").removeClass("selected-record");
      $(this).addClass("selected-record");
      $("#material_selected").removeAttr("id");
      $(this).attr("id", "material_selected");
  } else {
      // $(this).removeClass("selected-record");
      // $(this).removeAttr("id");
  }
});
$(document).on("change", "#material_table tbody tr", function () {
  let sendData = new Object();
  let fileName;
  fileName = "UpdateAddMaterial.php";
  sendData = {
    id: $("#material_selected td:nth-child(1)").html(),
    material : $("#material_selected td:nth-child(2) select").val(),
    material_type: $("#material_selected td:nth-child(3) select").val(),
    material_weight: $("#material_selected td:nth-child(4) input").val(),
    material_note: $("#material_selected td:nth-child(5) input").val(),
  };
  console.log(sendData);
  myAjax.myAjax(fileName, sendData);
  Total();
});
function putDataToInput(data) {
    data.forEach(function (trVal) {
      Object.keys(trVal).forEach(function (tdVal) {
        $("#" + tdVal).val(trVal[tdVal]); 
      });
  });
  $("#file_url").html(data[0].file_url);
};

function checkInput() {
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
  $(".material__wrapper .right__material input").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  $("#element_table tbody input").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  $(".casting__wrapper input").each(function() {
    if ($(this).hasClass("no-input")) {
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
  // $(".top__wrapper input .save-data").each(function() {
  //   if ($(this).val() == "") {
  //     check = false;
  //   }
  // });
  // $(".top__wrapper select .save-data").each(function() {
  //   if ($(this).val() == 0) {
  //     check = false;
  //   }
  // });
  // $(".material__wrapper .right__material input").each(function() {
  //   if ($(this).val() == "") {
  //     check = false;
  //   }
  // });
  if (!$("#summary_table tbody tr").hasClass("selected-record")) {
      check = false;
    }
  if (check) {
    $("#update").attr("disabled", false);
  } else {
    $("#update").attr("disabled", true);
  } 
  return check;
};