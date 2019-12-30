var connection = "";
var isActive = "";
var clientChatId = "";
var chatinstance_id = "";
var newID = 0;


var websocketURL = "";

$(document).ready(function(){
	
	document.getElementById("startChat-buttons").style.display = "none";
	$("#chooseFile").change(function(){
		readURL(this);
	});
	
	// var device = $("#device").text();
	//
	// if(device == "ios"){
	// 	document.getElementsByClassName("menu")[0].style.display = "none";
	// } else {
	// 	document.getElementsByClassName("menu")[0].style.display = "block";
	// }
	
	getHistoryDetails();
	$("#startChat").click(function(){
		firstTry=0;
		startChat();
			
	});
	
	
	
	$("#startChat1").click(function(){
		firstTry=0;
		startChat();
			
	});
	
	
			
	document.getElementById("inputMessage").addEventListener('input', function(e){
		if (e.target.value.length === 0) {
				document.getElementById('btnSend').innerHTML = '<img src="/images/Inactivesend.png"/>';
		} else {
			document.getElementById('btnSend').removeAttribute('disabled');
			document.getElementById('btnSend').innerHTML = '<img src="/images/Activesend.png"/>';
		}
	},true)
			


	
	$('#star1').click(function () {
        $('#star1').attr('class', 'star-active');
        $('#star2').attr('class', 'star-inactive');
        $('#star3').attr('class', 'star-inactive');
        $('#star4').attr('class', 'star-inactive');
        $('#star5').attr('class', 'star-inactive');

    });
    $('#star2').click(function () {
        $('#star1').attr('class', 'star-active');
        $('#star2').attr('class', 'star-active');
        $('#star3').attr('class', 'star-inactive');
        $('#star4').attr('class', 'star-inactive');
        $('#star5').attr('class', 'star-inactive');
    });
    $('#star3').click(function () {
        $('#star1').attr('class', 'star-active');
        $('#star2').attr('class', 'star-active');
        $('#star3').attr('class', 'star-active');
        $('#star4').attr('class', 'star-inactive');
        $('#star5').attr('class', 'star-inactive');

    });
    $('#star4').click(function () {
        $('#star1').attr('class', 'star-active');
        $('#star2').attr('class', 'star-active');
        $('#star3').attr('class', 'star-active');
        $('#star4').attr('class', 'star-active');
        $('#star5').attr('class', 'star-inactive');
    });
    $('#star5').click(function () {
        $('#star1').attr('class', 'star-active');
        $('#star2').attr('class', 'star-active');
        $('#star3').attr('class', 'star-active');
        $('#star4').attr('class', 'star-active');
        $('#star5').attr('class', 'star-active');
    });
	
	
	$('#sendNPSBtn').click(function () {
		//alert("click");
        var npsRate = $('.star-active').length;
		//alert(npsRate);
		if(npsRate != 0){
			if(npsRate<3){
				npsRate=1;
			} else if(npsRate==3){
				npsRate=2;
			} else {
				npsRate =3;
			}
			//alert(chatinstance_id);
			var data = 'npsrate=' + npsRate + '&chatinstanceid=' + chatinstance_id + "&_csrf=" +  $("#csrf").text();
			ajaxHelper("/api/sendchatnps", "POST", data, false, null, function (result) {
				if (result.status == 0) {
					// We can remove chat history from local storage HERE!
					var primaryAction1 = "refreshChat()";
					AlertCustomModal(JSON.stringify("<center><img src='/images/successGreen.png' id='modalIconMessage'></center>"), JSON.stringify($("#NPSSuccess").text()), $("#OK").text(), primaryAction1); 
					/* document.getElementById("nps-buttons").style.display = "none";
					document.getElementById("Feedback-section").style.display = "block"; */
				} else {
					console.log('error');
					AlertCustomModal(JSON.stringify("<center><img src='/images/warningRed.png' id='modalIconMessage'></center>"), JSON.stringify($("#NPSFailure").text()), $("#OK").text());
				}
			}, function (xhr, status, text) {
					AlertCustomModal(JSON.stringify("<center><img src='/images/warningRed.png' id='modalIconMessage'></center>"), JSON.stringify($("#NPSFailure").text()), $("#OK").text());
			}, null);
		} else {
			var primaryAction1 = "refreshChat()";
			AlertCustomModal(JSON.stringify("<center><img src='/images/warningRed.png' id='modalIconMessage'></center>"), JSON.stringify($("#NPSFailure").text()), $("#OK").text(), primaryAction1);
		}
    });
	
	
			

	
	document.getElementById('inputMessage').addEventListener('input',function(){
		/* alert("a".charCodeAt(0));
		alert(this.value.charCodeAt(0)); */
		var start = this.selectionStart;
		
		var lastChar = String.fromCharCode(this.value.charCodeAt(start - 1));
		//alert(lastChar.charCodeAt())
		//alert(lastChar + " " + isPersian(lastChar) + " " + String.fromCharCode(lastChar));
		//alert(lastChar.charCodeAt());
		//alert(this.value.charCodeAt(this.value.length-1) + " " + this.value + " " + this.value.length-1 + " " + isPersian(this.value.charCodeAt(this.value.length-1)));
     if ((lastChar.charCodeAt() >= 97 && lastChar.charCodeAt() <= 122) || (lastChar.charCodeAt()>=65 && lastChar.charCodeAt()<=90)){
		 //alert("en");
		document.getElementById('inputMessage').style.direction = "ltr";
		
     } else if((lastChar.charCodeAt() >= 49 && lastChar.charCodeAt() <= 57)){
		 document.getElementById('inputMessage').style.direction = "ltr";
	 } else if(lastChar.charCodeAt() == 10 || lastChar.charCodeAt() == 32){
		  
		 var dir = document.getElementById('inputMessage').style.direction;
		 //alert("check" + " " + dir);
		 if(dir == "ltr"){
			 document.getElementById('inputMessage').style.direction = "ltr";
		 } else {
			 document.getElementById('inputMessage').style.direction = "rtl";
		 }
	 } else if(isPersian(lastChar)){
		  //alert("fa");
       document.getElementById('inputMessage').style.direction = "rtl";
	  }
       
	});
	
	
	
});

function readURL(input) {
	//alert(JSON.stringify(input.files[0]));
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
			//alert("abc");
			var data = new FormData();
			var fileExtention = document.getElementById("chooseFile").files[0].name.split(".");
			if(document.getElementById("chooseFile").files.length == 1){
				if(fileExtention[fileExtention.length-1].toLowerCase() == "png" || fileExtention[fileExtention.length-1].toLowerCase() == "jpg" || fileExtention[fileExtention.length-1].toLowerCase() == "jpeg" ){
				
					
					if(document.getElementById("chooseFile").files[0].size < (8*1024*1024)){
						var date = new Date();
						var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
						var month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
						var year = date.getFullYear();
						var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
						var mins = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
						var date1 = year + "-" + month + "-" + day + " " + hour + ":" + mins;
						data.append('userfile', document.getElementById("chooseFile").files[0]);
						jQuery.ajax({
							url: '/chat/fileuploader',
							data: data,
							cache: false,
							contentType: false,
							processData: false,
							method: 'POST',
							type: 'POST', // For jQuery < 1.9
							success: function(data1){
								var res = JSON.parse(data1);
								//alert(res.pathName);
								//var source = "file:/" + res.pathName;
								//alert(source);
								newID++;
								var fullIPPort = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
								var myMessage = '<li class="self">\n';
									myMessage += '<div class="msg" style="height:20em;">\n';
									myMessage += '<a href="'+fullIPPort + '/chat/getImageFile?_csrf=' +  $("#csrf").text() + "&name=" + res.pathName + '" data-lightbox="image-' + newID + '">';
									myMessage += '<img id="chatImage' + newID + '" style="max-width:100%;height:95%;object-fit:contain"';
									myMessage += 'src="/chat/getImageFile?_csrf=' +  $("#csrf").text() + "&name=" + res.pathName +  '" onerror="this.src=\'/images/image_not_found.png\'"/>\n';
									if($("#language").text() == "en"){
										myMessage += '<time style="direction:ltr;float:right">' + date1 + '</time>\n';
									} else {
										myMessage += '<time style="direction:ltr;float:left">' + date1 + '</time>\n';
									}
									
									myMessage += '</div>\n';
									myMessage += '</li>';
									
									///alert(myMessage);
									
									$('#chatTimeLine').append(myMessage);
									scrollToBottom('timeLineRow');
									sendmessage(res.pathName);
									
								//$('#uploadedImg').attr('src', "/getImageFile?name=scenery.png");
								/*var reader = new FileReader();
								reader.onload = imageIsLoaded(file);
								reader.readAsDataURL(this.files[0]);*/
							}
						});
					} else {
						AlertCustomModal(JSON.stringify("<center><img src='/images/warningRed.png' id='modalIconMessage'></center>"), JSON.stringify($("#UploadSmallFile").text()), $("#OK").text());
					}
					
				} else {
					AlertCustomModal(JSON.stringify("<center><img src='/images/warningRed.png' id='modalIconMessage'></center>"), JSON.stringify($("#UploadOnlyImg").text()), $("#OK").text());
				}
			} else {
				AlertCustomModal(JSON.stringify("<center><img src='/images/warningRed.png' id='modalIconMessage'></center>"), JSON.stringify($("#UploadOnlyOneFile").text()), $("#OK").text());
			}
			/* var myMessage = '<li class="self">\n' +
				'                <div class="msg">\n' +
				'                    <img src="' + e.target.result +  '"/>\n'+
				'                <time>' + new Date() + '</time>\n' +
				'                </div>\n' +
				'            </li>';
				
				$('#chatTimeLine').append(myMessage);
				scrollToBottom('timeLineRow'); */
				$(input).val("");
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function isPersian(str){
    var p = /^[\u0600-\u06FF\s]+$/;
    return p.test(str);
}

function refreshChat(){
	window.location.href = "/chat";
}
var firstTry = 0;
function startChat(){
		
	if(!isActive){	
		document.getElementById("connectInProgress").style.display = "block";
		document.getElementById("startChat-buttons").style.display = "none";
		document.getElementById("chat-buttons").style.display = "none";
		var data = "_csrf=" + $("#csrf").text();
        ajaxHelper("/api/startchat", "POST", data, false, null, function (result) {
            console.log(result);
            clientChatID = result.value.result[0].clientChatID;
            chatinstance_id = result.value.result[0].chatinstance_id;
            if (result.status == 0) {
                if (result.value.result[0].queued == 'true') {
					document.getElementById("connectInProgress").style.display = "none";
					document.getElementById("startChat-buttons").style.display = "block";
					document.getElementById("chat-buttons").style.display = "none";

					if(firstTry == 0){
						AlertCustomModal(JSON.stringify("<center><img src='/images/warningIcon.png' id='modalIconMessage'></center>"), JSON.stringify(result.value.result[0].default_message), $("#OK").text());
					}
					setTimeout(function(){
						startChat();
					}, 3000);
					firstTry++;
                }
                else {
                    if(firstTry == 0){
						closeLastOpenedModal(function(){
							setupWebSocket(result);
						}); 
					} else {
						window.location.href = "/chat";
					}
                }
            } else {
                //AlertCustomModal(JSON.stringify("<center><img src='/images/warningRed.png' id='modalIconMessage'></center>"), JSON.stringify($('#CannotStartChat').text()), $("#OK").text());
				$('#chatTimeLine').append('<div class="day">Failed to get start chat</div>');
            }
        }, function (xhr, status, text) {
            //AlertCustomModal(JSON.stringify("<center><img src='/images/warningRed.png' id='modalIconMessage'></center>"), JSON.stringify($('#CannotStartChat').text()), $("#OK").text());
			$('#chatTimeLine').append('<div class="day">Failed to get start chat</div>');
        }, null);
	} else {
		setupWebSocket();
	}
}

function setupWebSocket(res){
	
	if(res){
		websocketURL = "wss://ichat.mtnirancell.ir/chat/" + res.token;
	}
	
	if(connection != "" && connection != null)
	{
		connection.close();
	}
	connection = new WebSocket(websocketURL);

	//connection = new WebSocket("wss://ichat.mtnirancell.ir/chat/" + res.token);
	//connection = new WebSocket("ws://10.132.65.128:8080/chat/" + clientChatId);
	//$('#chatTimeLine').append("page loaded");
	//document.getElementById("btnSend").removeAttribute("disabled");
	//document.getElementById("btnSend").innerHTML = '<img src="/images/Activesend.png"/>';
	
	connection.onopen = function () {
		//$('#chatTimeLine').append("web socket opened");	
		document.getElementById("connectInProgress").style.display = "none";
		document.getElementById("startChat-buttons").style.display = "none";
		document.getElementById("chat-buttons").style.display = "block";
		if(res != undefined && res.value != undefined){
		if(res.value.result[0].default_message != undefined){
			
			var date = new Date();
			var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
			var month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
			var year = date.getFullYear();
			var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
			var mins = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
			var date1 = year + "-" + month + "-" + day + " " + hour + ":" + mins;
			
			
			var splitText = res.value.result[0].default_message.split("\n");
			
				
				if($("#language").text() == "en"){
					var myMessage = '<li class="other">\n';
					if(isPersian(res.value.result[0].default_message[0])){
						myMessage += '<div class="msg" style="direction:rtl">\n';
					} else {
						myMessage += '<div class="msg" style="direction:ltr">\n';
					}
					for(var i=0; i<splitText.length; i++ )
					{
						myMessage += "<p style='word-wrap: break-word;'>" + splitText[i] + "</p>\n"; 
					}
					if($("#language").text() == "en"){
						myMessage += '<time style="direction:ltr;float:right">' + date1 + '</time>\n';
					} else {
						myMessage += '<time style="direction:ltr;float:left">' + date1 + '</time>\n';
					}
					
					myMessage += '</div>\n';
					myMessage += '</li>';
				} else {
					var myMessage = '<li class="other">\n';
					if(isPersian(res.value.result[0].default_message[0])){
						myMessage += '<div class="msg" style="direction:rtl">\n';
					} else {
						myMessage += '<div class="msg" style="direction:ltr">\n';
					}
					for(var i=0; i<splitText.length; i++ )
					{
						myMessage += "<p style='word-wrap: break-word;'>" + splitText[i] + "</p>\n"; 
					}
					if($("#language").text() == "en"){
						myMessage += '<time style="direction:ltr;float:right">' + date1 + '</time>\n';
					} else {
						myMessage += '<time style="direction:ltr;float:left">' + date1 + '</time>\n';
					}
					myMessage += '</div>\n';
					myMessage += '</li>';
				}

			/* var myMessage = '<li class="other">\n' +
				'                <div class="msg">\n' +
				'                    <p style="word-wrap: break-word;">' + res.value.result[0].default_message + '</p>\n' +
				'                <time>' + date1 + '</time>\n' +
				'                </div>\n' +
				'            </li>'; */
				$('#chatTimeLine').append(myMessage);
				scrollToBottom();
		}
		}
	};
	
	connection.onclose = function () {
		console.log("connection closed");
		refreshChat();
		/* primaryAction1 = "refreshChat()"
		AlertCustomModal(JSON.stringify("<center><img src='/images/warningRed.png' id='modalIconMessage'></center>"), JSON.stringify("Your connection has expired."), $("#OK").text(), primaryAction1); */
		/*if(connection.readyState != connection.OPEN)
		{
			setupWebSocket();
		}
*/
	};

	document.getElementById("btnSend").onclick = function() { 
		var input = document.getElementById('inputMessage');
		document.getElementById("inputMessage").rows = "1";
		//$('#chatTimeLine').append(input.value);
        sendmessage();
		
	};
	
	connection.onerror = function (error) {
	  console.log('WebSocket Error ' + error);
		if(connection.readyState != connection.OPEN)
		{
			setupWebSocket();
		}
	};
	
	connection.onmessage = function (evt) {
        var data = JSON.parse(evt.data);
        var data = JSON.parse(evt.data);
       var date = new Date();
			var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
			var month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
			var year = date.getFullYear();
			var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
			var mins = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
			var date1 = year + "-" + month + "-" + day + "T" + hour + ":" + mins;
			///alert(date1);
			var date2 = new Date(date1);
			var day1 = date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate();
			var month1 = (date2.getMonth()+1) < 10 ? '0' + (date2.getMonth()+1) : (date2.getMonth()+1);
			var year1 = date2.getFullYear();
			var hour1 = date2.getHours() < 10 ? '0' + date2.getHours() : date2.getHours();
			var mins1 = date2.getMinutes() < 10 ? '0' + date2.getMinutes() : date2.getMinutes();
			var date3 = year1 + "-" + month1 + "-" + day1 + " " + hour1 + ":" + mins1;
		
		var date1 = year + "-" + month + "-" + day + " " + hour + ":" + mins;
        var obj = {};
        obj.sender = (data.is_agent ? 'other' : 'self');
        obj.time = hour + ':' + mins;
        
		
		if(data.msg_type == "text")
		{
			obj.value = data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
			
			if(validateUSSD(obj.value)){
				var myMessage = '<li class="' + (data.is_agent ? 'other' : 'self') + '">\n' +'<div class="msg">\n' ;
				
				myMessage += "<p style='word-wrap: break-word;direction:ltr'>" + obj.value + "</p>\n"; 
				
				if($("#language").text() == "en"){
					myMessage += "<time style='float:right;direction:ltr'>" + date3 + "</time>\n'";
				} else {
					myMessage += "<time style='float:left;direction:ltr'>" + date3 + "</time>\n'";
				}
				myMessage += "</div>\n'";
				myMessage += "</li>";
				
		
				$('#chatTimeLine').append(myMessage);
				scrollToBottom('timeLineRow');
			} else {
				var splitText = obj.value.split("\n");
				
						var myMessage = '<li class="' + (data.is_agent ? 'other' : 'self') + '">\n' +'<div class="msg">\n' ;
									
						for(var i=0; i<splitText.length; i++ )
						{
							var charCheckValue= "";
							for(var j=0; j<splitText[i].length; j++){
								var charCheck = splitText[i].charCodeAt(j);
								//alert(j + " " + splitText[i][j] + " " + charCheck);
								if ((charCheck >= 97 && charCheck <= 122) || (charCheck>=65 && charCheck<=90)){
									charCheckValue = "ltr";
									break;
								} else if(validateUSSD(splitText[i])){
									charCheckValue = "ltr";
									break;
								} else if((charCheck == 10 || charCheck == 32)){
									
								} else if(isPersian(splitText[i][j])){
									charCheckValue = "rtl";
									break;
								}
							}
							//alert(charCheckValue);
							if(charCheckValue == "ltr"){
								myMessage += "<p style='word-wrap: break-word;direction:ltr'>" + splitText[i] + "</p>\n"; 
							} else {
								myMessage += "<p style='word-wrap: break-word;direction:rtl'>" + splitText[i] + "</p>\n"; 
							}
						}
					
						/* '                <time>' + hour + ':' + mins + '</time>\n' + */
									if($("#language").text() == "en"){
										myMessage += '<time style="direction:ltr;float:right">' + date1 + '</time>\n';
									} else {
										myMessage += '<time style="direction:ltr;float:left">' + date1 + '</time>\n';
									}
									myMessage += "</div>\n";
									myMessage += "</li>";
				
				$('#chatTimeLine').append(myMessage);
				scrollToBottom();
			}
		}
		else if(data.msg_type == "photo" && data.is_agent)
		{
			newID++;
			var fullIPPort = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
			var myMessage = '<li class="' + (data.is_agent ? 'other' : 'self') + '">\n' ;
			myMessage += '<div class="msg" style="height:20em;">\n' + 
'           <a href="'+fullIPPort + '/chat/getImageFile?_csrf=' +  $("#csrf").text() + "&name=" + data.message + '" data-lightbox="image-' + newID + '" data-title="My caption" disableScrolling=true>' +
'                    <img style="max-width:100%;height:95%;object-fit:contain" id=chatImage' + newID +
'			src="/chat/getImageFile?_csrf=' +  $("#csrf").text() + "&name=" + data.message +  '" onclick="showImageModal(\'' + data.message + '\',' + newID + ')" onerror="this.src=\'/images/image_not_found.png\'"/></a>\n';

			if($("#language").text() == "en"){
				myMessage += '<time style="direction:ltr;float:right">' + date1 + '</time>\n';
			} else {
				myMessage += '<time style="direction:ltr;float:left">' + date1 + '</time>\n';
			}
			myMessage += "</div>";
			myMessage += "</li>";
			
			$('#chatTimeLine').append(myMessage);
			scrollToBottom('timeLineRow');
		}
		else if(data.cr_attach)
		{
			if(data.cr_attach.type == "photo" && data.is_agent)
			{
				newID++;
				var fullIPPort = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
				var myMessage = '<li class="' + (data.is_agent ? 'other' : 'self') + '"><div class="msg">\n' ;
				myMessage += '<div class="msg" style="height:20em;">\n' + 
	'           <a href="'+fullIPPort + '/chat/getImageFile?_csrf=' +  $("#csrf").text() + "&name=" + data.cr_attach.url + '" data-lightbox="image-' + newID + '" data-title="My caption">' +
	'                    <img style="max-width:100%;height:95%;object-fit:contain" id=chatImage' + newID +
	'			src="/chat/getImageFile?_csrf=' +  $("#csrf").text() + "&name=" + data.cr_attach.url +  '" onclick="showImageModal(\'' + data.cr_attach.url + '\',' + newID + ')" onerror="this.src=\'/images/image_not_found.png\'"/></a>\n';

				if($("#language").text() == "en"){
					if(data.is_cr == true){
						if(isPersian(data.cr_caption[0])){
							myMessage += "<span style='color:#000000;float:left;direction:rtl'>" + data.cr_caption + "</span>";
						} else {
							myMessage += "<span style='color:#000000;float:left'>" + data.cr_caption + "</span>";
						}
					}
					myMessage += "<time style='float:right;direction:ltr'>" + date3 + "</time>";
				} else {
					if(data.is_cr == true){
						if(isPersian(data.cr_caption[0])){
							myMessage += "<span style='color:#000000;float:left;direction:rtl'>" + data.cr_caption + "</span>";
						} else {
							myMessage += "<span style='color:#000000;float:left'>" + data.cr_caption + "</span>";
						}
					}
					myMessage += "<time style='float:left;direction:ltr'>" + date3 + "</time>";
				}
				myMessage += "</div></div>";
				myMessage += "</li>";
				
				$('#chatTimeLine').append(myMessage);
				scrollToBottom('timeLineRow');
			}
		}
		
		if (data.is_ended) {
            $('#chatTimeLine').append('<div class="day">' + data.timestamp + '</div>');
           /*  var obj = {};
            obj.sender = 'other';
            obj.time = data.timestamp;
            obj.is_ended = true;
            chatHistory.push(obj);
            localStorage.setItem('chat', JSON.stringify(chatHistory)); */
            $('#chat-buttons').fadeOut("slow", function () {
                $('#nps-buttons').fadeIn("slow")
            }); 
			
			if(connection != "" && connection != null)
			{
				connection.close();
			}
        }
    };
	
}

function npsStarsEvents() {
    
}

function NPSSectionButtons() {
    
}

function inputEvents(connection) {
	
	

    /* $('#inputMessage').on("input", function (e) {
        if (e.target.value.length === 0) {
            $('#btnSend').html('<img src="/images/Inactivesend.png"/>');
            //$("#btnSend").attr("disabled", "disabled");
        }
        else {
            $("#btnSend").removeAttr("disabled");
            $('#btnSend').html('<img src="/images/Activesend.png"/>');
        }
    }); */
	
	
	
}

function sendmessage(msg)
{
	
	if(connection.readyState != connection.OPEN)
	{
		setupWebSocket();
	}
	
	if(connection.readyState == connection.OPEN)
	{
		if(msg != undefined){
			var input = msg;
			if (input.trim() !== '') {
			//alert(input.value);
				var message = {msg_type: "photo", message: msg, is_agent: false};
				connection.send(JSON.stringify(message));
				// $('#chatTimeLine').append("sent on socket "+input.value);
				input.value = '';
			}
		} else {
			var input = document.getElementById('inputMessage');
			var str = input.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
			//document.getElementById('chatTimeLine').innerHTML += input.value;
			if (str.trim() !== '') {
			//alert(input.value);
				var message = {msg_type: "text", message: str, is_agent: false};
				connection.send(JSON.stringify(message));
				// $('#chatTimeLine').append("sent on socket "+input.value);
				input.value = '';
			}
		}
		document.getElementById('inputMessage').style.height="80%";
		document.getElementById('btnSend').innerHTML = '<img src="/images/Inactivesend.png"/>';
	}
	else
	{
		refreshChat();		
	}
}

function getHistoryDetails(){
	
	var output = "";
	var instanceid = "";
	ajaxHelper("/api/getchathistory", "GET", null, false, null, function(result) {
		if (result.status == 0) {
            clientChatId = result.clientChatID;
			//alert(JSON.stringify(result));
			//alert(result.chatHistory[0].results.length);
			if (result.chatHistory[0].results != null){
                if(result.chatHistory[0].results.length>0)
                {
                    for (var i = result.chatHistory[0].results.length-1; i >= 0; i--) {

                        for(j=0;j<result.chatHistory[0].results[i].messages.length;j++){				
								
								if(result.chatHistory[0].results[i].messages[j].msg_type == "text")
								{
									result.chatHistory[0].results[i].messages[j].message = result.chatHistory[0].results[i].messages[j].message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
									
									if(validateUSSD(result.chatHistory[0].results[i].messages[j].message)){
				
										output += '<li class="' + (result.chatHistory[0].results[i].messages[j].is_agent ? 'other' : 'self') + '">\n' +'<div class="msg">\n' ;
										
										output += "<p style='word-wrap: break-word;direction:ltr'>" + result.chatHistory[0].results[i].messages[j].message + "</p>\n"; 
										
									} else {
										var splitText = result.chatHistory[0].results[i].messages[j].message.split("\n");
										
										
											output += '<li class="' + (result.chatHistory[0].results[i].messages[j].is_agent ? 'other' : 'self') + '">\n' +'<div class="msg">\n' ;
											for(var k=0; k<splitText.length; k++ )
											{
												var charCheckValue= "";
												for(var z=0; z<splitText[k].length; z++){
													var charCheck = splitText[k].charCodeAt(z);
													
													
													if ((charCheck >= 97 && charCheck <= 122) || (charCheck>=65 && charCheck<=90)){
														charCheckValue = "ltr";
														break;
													} else if(validateUSSD(splitText[k])){
														charCheckValue = "ltr";
														break;
													} else if((charCheck == 10 || charCheck == 32)){
														
													} else if(isPersian(splitText[k][z])){
														charCheckValue = "rtl";
														break;
													}
												}
												//alert(charCheckValue);
												if(charCheckValue == "ltr"){
													output += "<p style='word-wrap: break-word;direction:ltr'>" + splitText[k] + "</p>\n"; 
												} else {
													output += "<p style='word-wrap: break-word;direction:rtl'>" + splitText[k] + "</p>\n";
												}
												 
											}
									}
									
								}
								else if(result.chatHistory[0].results[i].messages[j].msg_type == "photo")
								{
									
									newID++;
									var fullIPPort = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
									
									output += '<li class="' + (result.chatHistory[0].results[i].messages[j].is_agent ? 'other' : 'self') + '">\n' +'<div class="msg">\n' ;
									output += '<div class="msg" style="height:20em;">\n' + 
						'           <a href="'+fullIPPort + '/chat/getImageFile?_csrf=' +  $("#csrf").text() + "&name=" + result.chatHistory[0].results[i].messages[j].message + '" data-lightbox="image-' + newID + '" data-title="My caption">' +
						'                    <img style="max-width:100%;height:95%;object-fit:contain" id=chatImage' + newID +
						'			src="/chat/getImageFile?_csrf=' +  $("#csrf").text() + "&name=" + result.chatHistory[0].results[i].messages[j].message +  '" onclick="showImageModal(\'' + result.chatHistory[0].results[i].messages[j].message + '\',' + newID + ')" onerror="this.src=\'/images/image_not_found.png\'"/></a>\n';
								}
								else if(result.chatHistory[0].results[i].messages[j].cr_attach.type == "photo")
								{
									newID++;
									var fullIPPort = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
									output += '<li class="' + (result.chatHistory[0].results[i].messages[j].is_agent ? 'other' : 'self') + '">\n' +'<div class="msg">\n' ;
									output += '<div class="msg" style="height:20em;">\n' + 
						'           <a href="'+fullIPPort + '/chat/getImageFile?_csrf=' +  $("#csrf").text() + "&name=" + result.chatHistory[0].results[i].messages[j].cr_attach.url + '" data-lightbox="image-' + newID + '" data-title="My caption">' +
						'                    <img style="max-width:100%;height:95%;object-fit:contain" id=chatImage' + newID +
						'			src="/chat/getImageFile?_csrf=' +  $("#csrf").text() + "&name=" + result.chatHistory[0].results[i].messages[j].cr_attach.url +  '" onclick="showImageModal(\'' + result.chatHistory[0].results[i].messages[j].cr_attach.url + '\',' + newID + ')" onerror="this.src=\'/images/image_not_found.png\'"/></a>\n';
								}
								if($("#language").text() == "en"){
									if(result.chatHistory[0].results[i].messages[j].is_cr == true){
										if(isPersian(result.chatHistory[0].results[i].messages[j].cr_caption[0])){
											output += "<span style='color:#000000;float:left;direction:rtl'>" + result.chatHistory[0].results[i].messages[j].cr_caption + "</span>";
										} else {
											output += "<span style='color:#000000;float:left'>" + result.chatHistory[0].results[i].messages[j].cr_caption + "</span>";
										}
										
									}
									output += "<time style='float:right;direction:ltr'>" + result.chatHistory[0].results[i].messages[j].timestamp + "</time>";
								} else {
									if(result.chatHistory[0].results[i].messages[j].is_cr == true){
										if(isPersian(result.chatHistory[0].results[i].messages[j].cr_caption[0])){
											output += "<span style='color:#000000;float:left;direction:rtl'>" + result.chatHistory[0].results[i].messages[j].cr_caption + "</span>";
										} else {
											output += "<span style='color:#000000;float:left'>" + result.chatHistory[0].results[i].messages[j].cr_caption + "</span>";
										}
									}
									output += "<time style='float:left;direction:ltr'>" + result.chatHistory[0].results[i].messages[j].timestamp + "</time>";
								}
								
								output += "</div>";
								output += "</li>";

                        }
                    }
                }
                else
                {
                    //var str = "-----------------------Failed to get chat history----------------------";
                    var date = new Date();
                    $('#chatTimeLine').append('<div class="day">' + $("#ClickStartChat").text() + '</div>');
                }
				$('#chatTimeLine').append(output);
				var messages = document.getElementById("chatTimeLine");
				//alert(messages.scrollTop + " " + messages.clientHeight + " " + messages.scrollHeight);
				/* var shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;
				//alert(shouldScroll);
				if (shouldScroll) {
					scrollToBottom();
				 } */
				 
				 scrollToBottom();
				
				//alert((result.chatHistory[0].results[result.chatHistory[0].results.length-1].active == false) + " " + result.chatHistory[0].results[result.chatHistory[0].results.length-1].id);
				/* alert(result.chatHistory[0].results[result.chatHistory[0].results.length-1].active);
				alert(result.chatHistory[0].nps_required); */
                if(result.chatHistory[0].results.length>0)
                {
                    if(result.chatHistory[0].results[0].active == true)
                    {
                            isActive = true;
                    }
                }
				if(isActive == false){
					if(result.chatHistory[0].nps_required == false){
						document.getElementById("startChat-buttons").style.display = "block";
						document.getElementById("connectInProgress").style.display = "none";
						document.getElementById("chat-buttons").style.display = "none";
					} else {
                        chatinstance_id = result.chatHistory[0].results[0].id;
						document.getElementById("startChat-buttons").style.display = "none";
						document.getElementById("nps-buttons").style.display = "block";
						document.getElementById("connectInProgress").style.display = "none";
					}
				} else {
					chatinstance_id = result.chatHistory[0].results[0].id;
					document.getElementById("connectInProgress").style.display = "block";
					document.getElementById("startChat-buttons").style.display = "none";
					document.getElementById("chat-buttons").style.display = "none";
					setupWebSocket(result);
				}
				
			}
            else
            {
                //var str = "-----------------------Failed to get chat history----------------------";
                var date = new Date();
                $('#chatTimeLine').append('<div class="day">' + $("#ClickStartChat").text() + '</</div>');
				document.getElementById("startChat-buttons").style.display = "block";
            }
			
			
		} else {
			//AlertCustomModal(JSON.stringify("<center><img src='/images/warningRed.png' id='modalIconMessage'></center>"), JSON.stringify("Failed to get history"), $("#OK").text());
			
			//var str = "-----------------------Failed to get chat history----------------------";
			var date = new Date();
			$('#chatTimeLine').append('<div class="day">' + $("#FailedToGetChatHistory").text() + '</div>');
			document.getElementById("startChat-buttons").style.display = "block";
			//$('#chatTimeLine').append(str);
		}
	}, function(xhr, status, text) {
		//var str = "-----------------------Failed to get chat history----------------------";
		//$('#chatTimeLine').append(str);
		var date = new Date();
		$('#chatTimeLine').append('<div class="day">' + $("#FailedToGetChatHistory").text() + '</div>');
		document.getElementById("startChat-buttons").style.display = "block";
		//AlertCustomModal(JSON.stringify("<center><img src='/images/warningRed.png' id='modalIconMessage'></center>"), JSON.stringify("Failed to get history"), $("#OK").text());
	}, null);
	
	
}

function scrollToBottom() {
  var objDiv = document.getElementById("chatTimeLine");
	objDiv.scrollTop = objDiv.scrollHeight;
}



function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function lines() { return this.split(/\r*\n/); }
var i=0;
function textAreaAdjust(o) {
	
	var lht = parseInt($('#inputMessage').css('lineHeight'));
	var lines = o.scrollHeight / lht;
	
	alert("abc" + " " + i);
	i++;
  //o.style.height = "1px";
  o.style.height = (25+o.scrollHeight)+"px";
  /* $('#inputMessage').style.height = "1px";
  $('#inputMessage').style.height = (25+o.scrollHeight)+"px"; */
  $('#inputMessage').html($('#inputMessage').val()+'&#10;');
}

function do_resize(textbox) {

 var maxrows=5; 
  var txt=textbox.value;
  var cols=textbox.cols;

 var arraytxt=txt.split('\n');
  var rows=arraytxt.length; 

 for (i=0;i<arraytxt.length;i++) 
  rows+=parseInt(arraytxt[i].length/cols);

 if (rows>maxrows) textbox.rows=maxrows;
  else textbox.rows=rows;
 }
 
  function validateUSSD(str){
  var regex1 = /^\*[0-9\*#]*[0-9]+[0-9\*#]*#$/;
  var valid= regex1.test(str);
  return valid;
}
