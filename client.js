$(document).ready(function(){

  var uhr = new Date();
  var minuten = uhr.getMinutes();
  var stunden = uhr.getHours();
  var sekunden = uhr.getSeconds();

  var timestamp = stunden+':'+minuten+':'+sekunden;


  $("#startBTN").click(function() {
    $('input').attr('disabled', 'disabled');

    $.ajax({
      url: "./start",
    }).done(function ( data ) {
      $("#pTAG").html("<h2 style='color:red'>" + timestamp + ": &raquo;START&laquo; done! Please wait!</h2>");
    });
  });

  $("#stopBTN").click(function() {
    $('input').attr('disabled', 'disabled');

    $.ajax({
      url: "./stop",
    }).done(function ( data ) {
      $("#pTAG").html("<h2 style='color:red'>" + timestamp + ": &raquo;STOP&laquo; done! Please wait!</h2>");
    });
  });

  $("#restartBTN").click(function() {
    $('input').attr('disabled', 'disabled');

    $.ajax({
      url: "./restart",
    }).done(function ( data ) {
      $("#pTAG").html("<h2 style='color:red'>" + timestamp + ": &raquo;RESTART&laquo; done! Please wait!</h2>");
    });
  });

  $("#statusBTN").click(function() {
    $('input').attr('disabled', 'disabled');

    $.ajax({
      url: "./status",
    }).done(function ( data ) {
      console.log(data);
      if(data == "true"){
        $("#pTAG").html("<h2 style='color:red'>" + timestamp + ": Server is on!</h2>");
      }
      else{
        console.log("gotacha");
        $("#pTAG").html("<h2 style='color:red'>" + timestamp + ": Server is off!</h2>");                
      }

    });
  });
});