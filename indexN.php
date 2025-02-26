<!DOCTYPE html>
<html>
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Billet Casting</title>
  <link rel="stylesheet" href="./Lib/main.css" />
  <link rel="stylesheet" href="./Lib/home.css" />
  </head>
  <body>
    <?php include("header.php");?>
      <div style="flex-direction: row; display:flex;">
            <button id="plan">Plan</button>
            <button id="plan_view">Plan View</button>
            <button id="mold_history">Mold History</button>
            <button id="daily_input">Daily Input</button>
            <button id="homogenizing_input">Homogenizing Input</button>
            <button id="cutting_input">Cutting Input</button>
            <button id="mea_file">Measurement File</button>
            <button id="import">Import</button>
            <button id="export">Export</button>
      </div>
      <div>
        <table id="summary_table" style="height: 450px;">
          <thead>
            <tr>
              <th>Stt</th>
              <th colspan="2"><input type="date" id="start" style="width: 97px;"></th>
              <th>Ngày đúc</th>
              <th colspan="2"><input type="date" id="end" style="width: 97px;"></th>
              <th>Kết thúc</th>
              <th>Material</th>
              <th>Total Weight ①</th>
              <th>Total Ingot</th>
              <th>Total Scrap</th>
              <th>TT HK</th>
              <th>Cr</th>
              <th>Cu</th>
              <th>Fe</th>
              <th>Mg</th>
              <th>Mn</th>
              <th>Si</th>
              <th>Ti</th>
              <th>Zn</th>
              <th>Billet Weight ②</th>
              <th>Billet OK Weight ③</th>
              <th>Total 1200</th>
              <th>Total 600</th>
              <th>③/②</th>
              <th>③/①</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <script src="./Lib/jquery.min.js"></script>
      <script>
        $(document).on("click", "#plan", function () {
          window.open("/Billet_Casting/Plan","_self","_self");
        });

        $(document).on("click", "#plan_view", function () {
          window.open("/Billet_Casting/PlanView","_self");
        });

        $(document).on("click", "#mold_history", function () {
          window.open("/Billet_Casting/MolDHistory","_self");
        });
  
      $(document).on("click", "#daily_input", function () {
        window.open("/Billet_Casting/DailyReport","_self");
      });

      $(document).on("click", "#homogenizing_input", function () {
        window.open("/Billet_Casting/Homo","_self");
      });

      $(document).on("click", "#cutting_input", function () {
        window.open("/Billet_Casting/Cutting","_self");
      });
      $(document).on("click", "#warehouse_input", function () {
        window.open("/Billet_Casting/Warehouse","_self");
      });
      $(document).on("click", "#mea_file", function () {
        window.open("/Billet_Casting/Measurement","_self");
      });
      $(document).on("click", "#import", function () {
        window.open("/Billet_Casting/Importbillet","_self");
      });
      $(document).on("click", "#export", function () {
        window.open("/Billet_Casting/Exportbillet","_self");
      });
      </script>
      <script>
        let fileName;
        let sendData = new Object();
        let ajaxReturnData;
        const myAjax = {
          myAjax: function (fileName, sendData) {
            $.ajax({
              type: "POST",
              url: "./Lib/"+fileName,
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
          var now = new Date();
          var MonthLastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          var MonthFirstDate = new Date(now.getFullYear(), (now.getMonth() + 12) % 12, 1);
          var formatDateComponent = function(dateComponent) {
            return (dateComponent < 10 ? '0' : '') + dateComponent;
          };
          var formatDate = function(date) {
            return date.getFullYear()  + '-' + formatDateComponent(date.getMonth() + 1) + '-' + formatDateComponent(date.getDate()) ;
          };
          var a = formatDate(MonthFirstDate);
          var b = formatDate(MonthLastDate);
          // $("#start").val(a);
          // $("#end").val(b);
          makeSummaryTable();
        });
        function makeSummaryTable() {
          if ($("#start").val() == "") {
            st = "2022-01-01"
          } else {
            st = $("#start").val();
          }
          if ($("#end").val() == "") {
            en = "2030-01-01"
          } else {
            en = $("#end").val();
          }
          var fileName = "SelSummaryV2.php";
          var sendData = {
              start: st,
              end: en,
          };
          myAjax.myAjax(fileName, sendData);
          fillTableBody(ajaxReturnData, $("#summary_table tbody"));
        };
        function fillTableBody(data, tbodyDom) {
          $(tbodyDom).empty();
          data.forEach(function(trVal, index) {
              let newTr = $("<tr>");
                $("<td>").html(index + 1).appendTo(newTr);
              Object.keys(trVal).forEach(function(tdVal, index) {
                  $("<td>").html(trVal[tdVal]).appendTo(newTr);
              });
              $(newTr).appendTo(tbodyDom);
          });
        };
        $(document).on("change", "#start", function () {
          makeSummaryTable();
        });
        $(document).on("change", "#end", function () {
          makeSummaryTable();
        });
      </script>
</html>