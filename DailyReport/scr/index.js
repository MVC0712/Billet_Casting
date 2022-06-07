let deleteDialog = document.getElementById("delete__dialog");

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
  MaterialNameCode();
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

$(document).on("change", "#product_type", function() {
  if ($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
      var fileName = "SelMaterialElement.php";
      var sendData = {
        product_type: $("#product_type").val(),
      };
      myAjax.myAjax(fileName, sendData);
    console.log(ajaxReturnData);
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
      ajaxReturnData.forEach(function(value) {
          $("#material_type").append(
              $("<option>").val(value["id"]).html(value["material_name_type"])
          );
      });
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
});
$(document).on("change", "#material_type", function() {
  add_material_check();
  if ($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
});
$(document).on("keyup", "#material_weight", function() {
  add_material_check();
  if ($(this).val() > 0) {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
});
function checkTimeValue(inputValue) {
  let flag = false;
  if (inputValue.substr(0, 1) == "1" && inputValue.length == 4) {
    if (
      0 <= Number(inputValue.substr(1, 1)) &&
      Number(inputValue.substr(1, 1)) <= 9 &&
      0 <= Number(inputValue.substr(2, 2)) &&
      Number(inputValue.substr(2, 2) <= 59)
    ) {
      flag = true;
    } else {
      flag = false;
    }
  } else if (inputValue.substr(0, 1) == "2" && inputValue.length == 4) {
    if (
      0 <= Number(inputValue.substr(1, 1)) &&
      Number(inputValue.substr(1, 1)) <= 3 &&
      0 <= Number(inputValue.substr(2, 2)) &&
      Number(inputValue.substr(2, 2) <= 59)
    ) {
      flag = true;
    } else {
      flag = false;
    }
  } else if (
    0 <= Number(inputValue.substr(0, 1)) &&
    Number(inputValue.substr(0, 1)) <= 9 &&
    inputValue.length == 3
  ) {
    if (
      0 <= Number(inputValue.substr(1, 2)) &&
      Number(inputValue.substr(1, 2) <= 59)
    ) {
      flag = true;
    } else {
      flag = false;
    }
  } else {
    flag = false;
  }
  return flag;
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
  return tableData;
}

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
      $("#material").val("").focus().removeClass("complete-input").addClass("no-input");
      $("#material_type").val("").removeClass("complete-input").addClass("no-input");
      $("#material_weight").val("").removeClass("complete-input").addClass("no-input");
      $("#material_note").val("");
    break;
    case "Add":
      let fileName;
      let sendData = new Object();
      fileName = "./php/DailyReport/AddError13.php";
      sendData = {
        press_id: $("#selected__tr td:nth-child(1)").text(),
        err_code: $("#material").val(),
        material_type: $("#material_type").val(),
        material_weight: $("#material_weight").val(),
        material_note: $("#material_note").val(),
      };
      myAjax.myAjax(fileName, sendData);
      makeErrorTable();
      $("#material").val("").removeClass("complete-input").addClass("no-input");
      $("#material_type").val("").removeClass("complete-input").addClass("no-input");
      $("#material_weight").val("").removeClass("complete-input").addClass("no-input");
      $("#add_material").prop("disabled", true);
    break;
  }
});
function add_material_check() {
  if (($("#material").hasClass("no-input")) ||
      ($("#material_type").hasClass("no-input")) ||
      ($("#material_weight").hasClass("no-input"))) {
      $("#add_material").prop("disabled", true);
  } else {
      $("#add_material").prop("disabled", false);
  }
};
function makeErrorTable() {
  fileName = "./php/DailyReport/SelError.php";
  sendData = {
    id: $("#selected__tr").find("td").eq(0).html(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#error__table tbody").empty();
  ajaxReturnData.forEach(function (trVal) {
    var newTr = $("<tr>");
    Object.keys(trVal).forEach(function (tdVal) {
      if (tdVal == "id") {
        $("<td>")
            .append(ErrorCodeOption(trVal[tdVal]))
            .appendTo(newTr);
      } else if (tdVal == "id") {
        $("<td>").html(trVal[tdVal]).appendTo(newTr);
    } else {
      $("<td>").append($("<input>").val(trVal[tdVal])).appendTo(newTr);
    }   
    });
    $(newTr).appendTo("#error__table tbody");
  });
};

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