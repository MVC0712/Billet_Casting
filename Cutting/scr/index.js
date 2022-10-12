let deleteDialog = document.getElementById("delete__dialog");
let ajaxReturnData;
let cancelKeyupEvent = false;
let cancelKeydownEvent = false;
let editMode = false;
let readNewFile = false;
let scapType = [{id: 1, type: "Xỉ"},
                {id: 2, type: "Nhôm dư"},
                {id: 3, type: "Cắt"},];

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
  makeCastingTable();
});
function makeCastingTable() {
  var fileName = "SelCasting.php";
  var sendData = {
      dummy: "dummy",
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#casting__table tbody"));
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
$(document).on("click", "#casting__table tbody tr", function (e) {
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
    console.log(sendData);
    myAjax.myAjax(fileName, sendData);
    console.log(ajaxReturnData.length);
    if (ajaxReturnData.length > 0) {
      clearInputData();
      putDataToInput(ajaxReturnData);
      $("#save__button").attr("disabled", true);
      $("#update__button").attr("disabled", false);
    } else {
      checkInput();
      $("#save__button").attr("disabled", false);
      $("#update__button").attr("disabled", true);
    }

  fileName = "SelUpdateCastingData.php";
  sendData = {
    targetId: $("#selected__tr").find("td").eq(0).html(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#file_url").html(ajaxReturnData[0].file_url);
  $("#add_scrap").text("Add");
  makeScrapTable();
  } else {
    // deleteDialog.showModal();
  }
  // checkInput();
});
$(document).on("click", "#save__button", function () {
  fileName = "InsData.php";
  inputData = getInputData();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  clearInputData();
  $("#save__button").attr("disabled", true);
  $("#update__button").attr("disabled", true);
  let targetId = $("#selected__tr td:nth-child(1)").text();
  tableData = getTableData($("#scrap_table tbody tr"));
  tableData.push(targetId);
  fileName = "InsScrapData.php";
  sendData = JSON.stringify(tableData);
  console.log(sendData);
  myAjax.myAjax(fileName, sendData);
  $("#add_scrap").text("Save");
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
$(document).on("click", "#update__button", function () {
  fileName = "UpdateData.php";
  inputData = getInputData();
  // inputData["targetId"] = $("#selected__tr").find("td").eq(0).html();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  clearInputData();
  $("#save__button").attr("disabled", true);
  $("#update__button").attr("disabled", true);
  $("#add_scrap").text("Save");
});
$(document).on("keyup", "#data__table tbody input", function() {
  if ($(this).val() != "") {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
function checkInput() {
  let check = true;
  $("#data__table tbody input").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  if (!$("#selected__tr").find("td").eq(0).html()) {
    check = false;
  };
  if (check) {
    $("#save__button").attr("disabled", false);
    $("#update__button").attr("disabled", true);
  } else {
    $("#save__button").attr("disabled", true);
    $("#update__button").attr("disabled", false);
  } 
};
function getInputData() {
  let inputData = new Object();
    $("input.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    $("select.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    inputData["targetId"] = $("#selected__tr").find("td").eq(0).html();
  console.log(Object.keys(inputData).length);
  return inputData;
};
$("#file_upload").on("change", function () {
  var file = $(this).prop("files")[0];
  console.log(file.name);
  $("#file_url").html(file.name);
  $("#preview__button").prop("disabled", false);
});
$(document).on("change", "#file_upload", function () {
  ajaxFileUpload();
  fileName = "UpdateCastingData.php";
  sendData = {
    targetId: $("#selected__tr").find("td").eq(0).html(),
    file_url: $("#file_url").html(),
  };
  myAjax.myAjax(fileName, sendData);
  console.log(sendData);
});
$(document).on("click", "#preview__button", function () {
  window.open("../DailyReport/DailyReportSub.html");
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

$(document).on("change", "#A2S", function () {
  if ($(this).val() == 1) {
    changeColumn(3);
  }
});
$(document).on("change", "#A3S", function () {
  if ($(this).val() == 1) {
    changeColumn(4);
  }
});
$(document).on("change", "#B1S", function () {
  if ($(this).val() == 1) {
    changeColumn(5);
  }
});
$(document).on("change", "#B2S", function () {
  if ($(this).val() == 1) {
    changeColumn(6);
  }
});
$(document).on("change", "#B3S", function () {
  if ($(this).val() == 1) {
    changeColumn(7);
  }
});
$(document).on("change", "#B4S", function () {
  if ($(this).val() == 1) {
    changeColumn(8);
  }
});
$(document).on("change", "#C1S", function () {
  if ($(this).val() == 1) {
    changeColumn(9);
  }
});
$(document).on("change", "#C2S", function () {
  if ($(this).val() == 1) {
    changeColumn(10);
  }
});
$(document).on("change", "#C3S", function () {
  if ($(this).val() == 1) {
    changeColumn(11);
  }
});
$(document).on("change", "#C4S", function () {
  if ($(this).val() == 1) {
    changeColumn(12);
  }
});
$(document).on("change", "#D2S", function () {
  if ($(this).val() == 1) {
    changeColumn(13);
  }
});
$(document).on("change", "#D3S", function () {
  if ($(this).val() == 1) {
    changeColumn(14);
  }
});
function changeColumn(col) {
  var  table, tr, td, i;
  table = document.getElementById("data__table");
  var tbody = table.getElementsByTagName("tbody")[0];
  var tr = tbody.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    if (i==0 || i == 4 || i == 5 || i == 6) {
      td = tr[i].getElementsByTagName("td")[col].getElementsByTagName("input")[0];
      td.value = 0;
      td.classList.remove("no-input");
      td.classList.add("complete-input")
      if (tr[i].getElementsByTagName("td")[col].getElementsByTagName("input")[1]) {
        td = tr[i].getElementsByTagName("td")[col].getElementsByTagName("input")[1];
        td.value = 0;
        td.classList.remove("no-input");
        td.classList.add("complete-input")
      }
    } else if (i==1) {
      td = tr[i].getElementsByTagName("td")[col].getElementsByTagName("select")[0];
    } else if (i==2) {
     
    } else if (i == 3) {
      td = tr[i].getElementsByTagName("td")[col].getElementsByTagName("input")[0];
      td.value = "DN";
      td.classList.remove("no-input");
      td.classList.add("complete-input")
      if (tr[i].getElementsByTagName("td")[col].getElementsByTagName("input")[1]) {
        td = tr[i].getElementsByTagName("td")[col].getElementsByTagName("input")[1];
        td.value = "DN";
        td.classList.remove("no-input");
        td.classList.add("complete-input")
      }
    }
  }
};
function putDataToInput(data) {
  data.forEach(function (trVal) {
    Object.keys(trVal).forEach(function (tdVal) {
      $("#" + tdVal).val(trVal[tdVal]).removeClass("no-input").addClass("complete-input");
    });
});
};
function clearInputData() {
$("#file_url").html("No file");
$(".need-clear").each(function (index, element) {
  $(this).val("").removeClass("complete-input").addClass("no-input");
});
};
$(document).on("change", "#scrap_type", function() {
  addScrapCheck();
  if ($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
});
$(document).on("change", "#scrap_weight", function() {
  addScrapCheck();
  if ($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
});
$("#add_scrap").on("click", function () {
  switch ($(this).text()) {
    case "Save":
      $("<tr>")
        .append("<td></td>")
        .append($("<td>").append(scapTypeOption($("#scrap_type").val())))
        .append($("<td>").append($("<input>").val($("#scrap_weight").val())))
        .append($("<td>").append($("<input>").val($("#scrap_note").val())))
        .appendTo("#scrap_table tbody");
      $(this).prop("disabled", true);
      $("#scrap_type").val("0").focus().removeClass("complete-input").addClass("no-input");
      $("#scrap_weight").val("").removeClass("complete-input").addClass("no-input");
      $("#scrap_note").val("");
    break;
    case "Add":
      let fileName;
      let sendData = new Object();
      fileName = "AddScrap.php";
      sendData = {
        casting_id: $("#selected__tr td:nth-child(1)").text(),
        scrap_type: $("#scrap_type").val(),
        scrap_weight: $("#scrap_weight").val(),
        scrap_note: $("#scrap_note").val(),
      };
      myAjax.myAjax(fileName, sendData);
      makeScrapTable();
      $("#scrap_type").val("").removeClass("complete-input").addClass("no-input");
      $("#scrap_weight").val("").removeClass("complete-input").addClass("no-input");
      $("#add_scrap").prop("disabled", true);
    break;
  }
});
function scapTypeOption(seletedId) {
  let targetDom = $("<select>");

scapType.forEach(function(element) {
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
}
function addScrapCheck() {
  if ($("#scrap_type").val() == 0 ||
      $("#scrap_weight").val() <= 0) {
      $("#add_scrap").prop("disabled", true);
  } else {
      $("#add_scrap").prop("disabled", false);
  }
};
function makeScrapTable() {
  fileName = "SelScrap.php";
  sendData = {
    t_casting: $("#selected__tr td:nth-child(1)").text(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#scrap_table tbody").empty();
  ajaxReturnData.forEach(function (trVal) {
    var newTr = $("<tr>");
    Object.keys(trVal).forEach(function (tdVal) {
      if (tdVal == "scrap_type") {
        $("<td>")
            .append(scapTypeOption(trVal[tdVal]))
            .appendTo(newTr);
    } else if ((tdVal == "scrap_weight") || (tdVal == "scrap_note")) {
      $("<td>").append($("<input>").val(trVal[tdVal])).appendTo(newTr);
    } else {
      $("<td>").html(trVal[tdVal]).appendTo(newTr);
    }
    });
    $(newTr).appendTo("#scrap_table tbody");
  });
};
$(document).on("click", "#scrap_table tbody tr", function(e) {
  if (!$(this).hasClass("selected-record")) {
      $(this).parent().find("tr").removeClass("selected-record");
      $(this).addClass("selected-record");
      $("#scrap_table_select").removeAttr("id");
      $(this).attr("id", "scrap_table_select");
  } else {
  }
});
$(document).on("change", "#scrap_table tbody tr", function () {
  let sendData = new Object();
  let fileName;
  fileName = "UpdateScrap.php";
  sendData = {
    id: $("#scrap_table_select td:nth-child(1)").html(),
    scrap_type : $("#scrap_table_select td:nth-child(2) select").val(),
    scrap_weight : $("#scrap_table_select td:nth-child(3) input").val(),
    scrap_note : $("#scrap_table_select td:nth-child(4) input").val(),
  };
  console.log(sendData);
  myAjax.myAjax(fileName, sendData);
});