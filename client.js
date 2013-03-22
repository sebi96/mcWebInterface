$(document).ready(function(){

	var time = new Date();
	var minutes = time.getMinutes();
	var hours = time.getHours();
	var seconds = time.getSeconds();

	var timestamp = hours+':'+minutes+':'+seconds;


	$('input').click(function(){
		$('input').attr('disabled', 'disabled');
	});


	$("#startBTN").click(function() {
		$.ajax({
			url: "./start",
		}).done(function ( data ) {
			$("#pTAG").html("<h2 style='color:red'>" + timestamp + ": &raquo;START&laquo; done! Please wait!</h2>");
		});
	});


	$("#stopBTN").click(function() {
		$.ajax({
			url: "./stop",
		}).done(function ( data ) {
			$("#pTAG").html("<h2 style='color:red'>" + timestamp + ": &raquo;STOP&laquo; done! Please wait!</h2>");
		});
	});


	$("#restartBTN").click(function() {
		$.ajax({
			url: "./restart",
		}).done(function ( data ) {
			$("#pTAG").html("<h2 style='color:red'>" + timestamp + ": &raquo;RESTART&laquo; done! Please wait!</h2>");
		});
	});
	
	
	$("#backupBTN").click(function() {
		$.ajax({
			url: "./backup",
		}).done(function ( data ) {
			$("#pTAG").html("<h2 style='color:red'>" + timestamp + ": &raquo;BACKUP&laquo; done! Please wait! NEED realy some time....</h2>");
		});
	});


	$("#statusBTN").click(function() {
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