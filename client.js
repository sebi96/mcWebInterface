$(document).ready(function(){

  var uhr = new Date();
  var minuten = uhr.getMinutes();
  var stunden = uhr.getHours();
  var sekunden = uhr.getSeconds();

  var uhrzeuit = stunden+':'+minuten+':'+sekunden;


  $("#startBTN").click(function() {
    $('input').attr('disabled', 'disabled');

    $.ajax({
      url: "http://{url}/{securitytoken}/start",
    }).done(function ( data ) {
      $("#pTAG").html("<h2 style='color:red'>" + uhrzeuit + ": &raquo;START&laquo; done! Please wait!</h2>");
    });
  });

  $("#stopBTN").click(function() {
    $('input').attr('disabled', 'disabled');

    $.ajax({
      url: "http://{url}/{securitytoken}/stop",
    }).done(function ( data ) {
      $("#pTAG").html("<h2 style='color:red'>" + uhrzeuit + ": &raquo;STOP&laquo; done! Please wait!</h2>");
    });
  });

  $("#restartBTN").click(function() {
    $('input').attr('disabled', 'disabled');

    $.ajax({
      url: "http://{url}/{securitytoken}/restart",
    }).done(function ( data ) {
      $("#pTAG").html("<h2 style='color:red'>" + uhrzeuit + ": &raquo;RESTART&laquo; done! Please wait!</h2>");
    });
  });

  $("#statusBTN").click(function() {
    $.ajax({
      url: "http://{url}/{securitytoken}/status",
    }).done(function ( data ) {

      if(data == ""){
        $("#pTAG").html("<h2 style='color:red'>" + uhrzeuit + ": Server is on!</h2>");
      }
      else if (data == ""){
        $("#pTAG").html("<h2 style='color:red'>" + uhrzeuit + ": Server is off!</h2>");                
      }


    });
  });
});