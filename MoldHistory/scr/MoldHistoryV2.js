function getInputDataV2() {
  let inputData = [];
  let data = new Object();

    $(".have-mold").each(function () {
      data[$(this).attr("id")] = $(this).attr("id");
      $(this).each(function () {
        $(this).each(function () {
          data[$(this).attr("id")] = $(this).val();  
        });
        $(".check_box input[type=checkbox]").each(function () {
          data[$(this).attr("id")] = this.checked ? "1" : "0";
        });
      });
      
      inputData.push(data);
      data = new Object();
    });
    data = new Object();
    if ($("#file_upload").prop("files")[0]) {
      data["file_url"] = $("#file_url").html();
      ajaxFileUpload();
    } else {
      data["file_url"] = $("#file_url").html();
    }
    inputData.push(data);
    data = new Object();
    data["targetId"] = $("#selected__tr").find("td").eq(0).html();
    inputData.push(data);
  return inputData;
};