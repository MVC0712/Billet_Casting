let deleteDialog = document.getElementById("delete__dialog");

let ajaxReturnData;
let cancelKeyupEvent = false;
let cancelKeydownEvent = false;
let editMode = false;
let readNewFile = false;
let pos = ["A2","A3","B1","B2","B3","B4","C1","C2","C3","C4","D2","D3"];
let selectCode =[];

const myAjax = {
  myAjax: function (fileName, sendData) {
    $.ajax({
      type: "POST",
      url: fileName,
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
  fillSelectBox(pos);
  // fillInputBox(selectCode);
});

function fillSelectBox(posArray) {
  $(".select-pos").append($("<option>").val(0).html("NO"));
  posArray.forEach(function(value, index) {
    $(".select-pos").append(
        $("<option>").val(index+1).html(value)
    );
  });
};
function fillInputBox(posArray) {
  $("#data__table .input-code").each(function (index, element) {
    if (($(this).val() == 0) || ($(this).val() == "")) {
      $(this).empty().append($("<option>").val(0).html(""));
      for (let i = 0; i < posArray.length; i++) {
        $(this).append(
            $("<option>").val(posArray[i].id).html(posArray[i].code)
          );
      }
    }
  });
};
$(document).on("change", ".time-input", function() {
  if ($(this).val() != "") {
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
$(document).on("change", "#data__table tbody select", function() {
  if (($(this).val() != 0) && ($(this).parent().find("input").val() == "")) {
    $(this).parent().find("input").removeClass("complete-input").addClass("no-input");
  } else {
    $(this).parent().find("input").removeClass("no-input").addClass("complete-input");
  }
  checkInput();
});
$(document).on("keyup", "#data__table tbody input", function() {
  if ($(this).val() > 0) {
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
  $("#data__table tbody select").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  $(".input-group .time-input").each(function() {
    if ($(this).val() == "") {
      check = false;
    }
  });
  $(".input-group .number-input").each(function() {
    if(!$.isNumeric($(this).val())){
      check = false;
    }
  });
  if (check) {
    $("#save__button").attr("disabled", false);
  } else {
    $("#save__button").attr("disabled", true);
  } 
};
function getInputData() {
  let inputData = new Object();
    $(".input-group input.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    $("#data__table input.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    $("#data__table select.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
  console.log(inputData);
  console.log(Object.keys(inputData).length);
  return inputData;
}

$(document).on("click", "#summary__table tbody tr", function() {
  let selected = new Object();
  if (!$(this).hasClass("selected-record")) {
      $(this).addClass("selected-record");
      $(this).attr("id", "error__selected");
      selected.id = $(this).find("td").eq(0).html();
      selected.code = $(this).find("td").eq(1).html();
      selectCode.push(selected);
  } else {
    $(this).removeClass("selected-record");
    $(this).removeAttr("id");
    const code2s = $(this).find("td").eq(0).html();
    selectCode = selectCode.filter(obj => obj.id != code2s);
  }
  fillInputBox(selectCode);
  console.log(selectCode);
});

