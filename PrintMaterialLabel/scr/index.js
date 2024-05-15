let deleteDialog = document.getElementById("delete__dialog");
let inputData = new Object();
let fileName;
let sendData = new Object();
let ajaxReturnData, origin_code ="N11-NG-";
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

$(function () {
  changeOrigin();
});
$(document).on("change", "#origin", function() {
  changeOrigin();
});
function changeOrigin() {
  switch ($("#origin").val()) {
    case "N11NG":
      var origin_code ="N11-NG-";
    break;
    case "N11DI":
      var origin_code ="N11-DI-";
    break;
    case "N14NG":
      var origin_code ="N14-NG-";
    break;
    case "N14HE":
      var origin_code ="N14-HE-";
    break;
    case "V44":
      var origin_code ="V44-NG-";
    break;
    case "V33":
      var origin_code ="V33-NG-";
    break;
    case "N97":
      var origin_code ="N97-NG-";
    break;
    case "0":
      var origin_code ="0"
    break;
  }
  let fileName = "CheckLastNumber.php";
  sendData = {
    origin_code
  };
  myAjax.myAjax(fileName, sendData);
  $("#from").val(ajaxReturnData[0].last_numbers + 1);
  $("#quantity").val("").removeClass("complete-input").addClass("no-input");
};

$(document).on("keyup", ".number-input", function() {
  if($.isNumeric($(this).val())){
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
});
$(document).on("keyup", "#quantity", function() {
  if($.isNumeric($(this).val())){
    $("#print").attr("disabled", false);
  } else {
    $("#print").attr("disabled", true);
  }
});
$(function(){
	$('#print').click(function(){
		var from = Number($("#from").val()) + 1;
		var to = Number($("#quantity").val()) + from;
    var html_page = "";
    for (let i = from; i <= to; i += 4) {
      console.log(i)
      var page = `
    <div class="page">
      <div style="height: 25%;">
      <div style="height: 3%;"></div>
        <div style="display: flex; flex-direction: column; width: 93%; height: 90%; border: 1px solid; justify-content: space-around; margin-left: 5%; margin-right: 2%;">
          <div style="display: flex; height: 15%; margin-left: 30px;">
            <div>Mã quản lý:</div>
            <div id="mql">${i}</div>
          </div>
          <div style="display: flex; height: 55%; align-items: center; padding-top: 10px; justify-content: space-around; margin-left: 30px;">
            <div style="padding-left: 150px;">Mã vật liệu:</div>
            <div style="display: flex; flex-direction: column;">
              <div style="display: flex;">  
                <div class="square"></div>
                <div>6N01</div>
              </div>
              <div style="display: flex;">
                <div class="square"></div>
                <div>6N01A</div>
              </div>
              <div style="display: flex;">
                <div class="square"></div>
                <div>6061</div>
              </div>
              <div style="display: flex;">
                <div class="square"></div>
                <div>6063</div>
              </div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; height: 30%; margin-left: 30px;">
            <div>Khối lượng:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  Kg</div>
            <div>Ngày cân:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;/&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;/</div>
          </div>
        </div>
        <div style="height: 6%;"></div>
      </div>
      <div style="height: 25%;">
      <div style="height: 3%;"></div>
        <div style="display: flex; flex-direction: column; width: 93%; height: 90%; border: 1px solid; justify-content: space-around; margin-left: 5%; margin-right: 2%;">
          <div style="display: flex; height: 15%; margin-left: 30px;">
            <div>Mã quản lý:</div>
            <div id="mql">${i + 1}</div>
          </div>
          <div style="display: flex; height: 55%; align-items: center; padding-top: 10px; justify-content: space-around; margin-left: 30px;">
            <div style="padding-left: 150px;">Mã vật liệu:</div>
            <div style="display: flex; flex-direction: column;">
              <div style="display: flex;">  
                <div class="square"></div>
                <div>6N01</div>
              </div>
              <div style="display: flex;">
                <div class="square"></div>
                <div>6N01A</div>
              </div>
              <div style="display: flex;">
                <div class="square"></div>
                <div>6061</div>
              </div>
              <div style="display: flex;">
                <div class="square"></div>
                <div>6063</div>
              </div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; height: 30%; margin-left: 30px;">
            <div>Khối lượng:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  Kg</div>
            <div>Ngày cân:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;/&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;/</div>
          </div>
        </div>
        <div style="height: 6%;"></div>
      </div>
      <div style="height: 25%;">
      <div style="height: 3%;"></div>
        <div style="display: flex; flex-direction: column; width: 93%; height: 90%; border: 1px solid; justify-content: space-around; margin-left: 5%; margin-right: 2%;">
          <div style="display: flex; height: 15%; margin-left: 30px;">
            <div>Mã quản lý:</div>
            <div id="mql">${i + 2}</div>
          </div>
          <div style="display: flex; height: 55%; align-items: center; padding-top: 10px; justify-content: space-around; margin-left: 30px;">
            <div style="padding-left: 150px;">Mã vật liệu:</div>
            <div style="display: flex; flex-direction: column;">
              <div style="display: flex;">  
                <div class="square"></div>
                <div>6N01</div>
              </div>
              <div style="display: flex;">
                <div class="square"></div>
                <div>6N01A</div>
              </div>
              <div style="display: flex;">
                <div class="square"></div>
                <div>6061</div>
              </div>
              <div style="display: flex;">
                <div class="square"></div>
                <div>6063</div>
              </div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; height: 30%; margin-left: 30px;">
            <div>Khối lượng:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  Kg</div>
            <div>Ngày cân:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;/&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;/</div>
          </div>
        </div>
        <div style="height: 6%;"></div>
      </div>
      <div style="height: 25%;">
      <div style="height: 3%;"></div>
        <div style="display: flex; flex-direction: column; width: 93%; height: 90%; border: 1px solid; justify-content: space-around; margin-left: 5%; margin-right: 2%;">
          <div style="display: flex; height: 15%; margin-left: 30px;">
            <div>Mã quản lý:</div>
            <div id="mql">${i + 3}</div>
          </div>
          <div style="display: flex; height: 55%; align-items: center; padding-top: 10px; justify-content: space-around; margin-left: 30px;">
            <div style="padding-left: 150px;">Mã vật liệu:</div>
            <div style="display: flex; flex-direction: column;">
              <div style="display: flex;">  
                <div class="square"></div>
                <div>6N01</div>
              </div>
              <div style="display: flex;">
                <div class="square"></div>
                <div>6N01A</div>
              </div>
              <div style="display: flex;">
                <div class="square"></div>
                <div>6061</div>
              </div>
              <div style="display: flex;">
                <div class="square"></div>
                <div>6063</div>
              </div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; height: 30%; margin-left: 30px;">
            <div>Khối lượng:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  Kg</div>
            <div>Ngày cân:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;/&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;/</div>
          </div>
        </div>
        <div style="height: 6%;"></div>
      </div>
      </div>`
      html_page = html_page + page;
    }
  
		var _el = $('<div>');
    var sty = `
		<style>
      body {
        margin: 0;
        padding: 0;
        background-color: #FAFAFA;
        font: 18pt "Tahoma";
        width: 21cm;
        height: 29.7cm;
      }
      * {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
      }
      .page {
        width: 21cm;
        min-height: 29.7cm;
        border: 1px #D3D3D3 solid;
        border-radius: 5px;
        background: white;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      }
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        * { overflow: visible !important; } 
        .page {
            margin: 0;
            border: initial;
            border-radius: initial;
            width: initial;
            min-height: initial;
            box-shadow: initial;
            background: initial;
            page-break-after: always;
        }
      }
      .square {
        width: 35px;
        height: 35px;
        border: black solid 1px ;
        margin-right: 5px;
      }
      </style>`

      var hea = `
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>In phiếu cân NVL/PP</title>
      </head>`

		_el.append(sty);
		_el.append(hea);
		_el.append(html_page);
		var nw = window.open("","","width=1200,height=900,left=250,location=no,titlebar=yes")
			nw.document.write(_el.html())
			nw.document.close()
		setTimeout(() => {
			nw.print()
			setTimeout(() => {
			nw.close()
			}, 200);
		}, 500);
	})
});