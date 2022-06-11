let deleteDialog = document.getElementById("delete__dialog");
let ajaxReturnData;
let cancelKeyupEvent = false;
let cancelKeydownEvent = false;
let editMode = false;
let readNewFile = false;

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
  if (check) {
    $("#save__button").attr("disabled", false);
  } else {
    $("#save__button").attr("disabled", true);
  } 
};