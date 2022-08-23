function calTotal(id, type) {
  var total = 0;
  $("#material_table tbody tr").each(function (index, element) {
    if ($(this).find("td:nth-child(2) select").val() == type) {
      total += parseInt($(this).find("td:nth-child(4) input").val());
// console.log(total);
    }
    $("#" + id).html(total);
  });
};
function Total() {
  calTotal("plextrusion", 1);
  calTotal("pldiscard", 2);
  calTotal("plcut", 3);
  calTotal("plcast", 4);
  calTotal("plgcng", 5);
  calTotal("plingot", 6);
  calTotal("plalloy", 7);
  calTotal("plorther", 8);
  var total = 0;
    $("#material_table tbody tr").each(function (index, element) {
      total += parseInt($(this).find("td:nth-child(4) input").val());
    }
  );
  $("#ttmate").html(total);
};