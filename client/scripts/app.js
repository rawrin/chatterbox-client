// YOUR CODE HERE:
$(document).ready(function(){
  var getURLParameter = function(name){
    return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [null])[1]);
  };

  var mArray;

  var getMsg = function(){
    $.ajax({
    // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      data: 'order=-createdAt',
      contentType: 'application/json',

      success: function (data) {
        mArray = data.results;
        _.each(mArray, function(msg){
          var roomArray = [];
          var currentMessage = msg.username + " : " + msg.text;
          var $room = $("<div class=" + msg.roomname + "></div>");
          var $message = $('<ul class=' + msg.username + '></ul>').text(currentMessage);
          $room.append($message);
          $('.chatbox').append($room);
          // '<div class="text"></div>'

        });
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: fail');
      }
    });
  };

  var username = getURLParameter("username");

  console.log(username);

  var postMsg = function(Message){

    $.ajax({
    // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(Message),
      contentType: 'application/json',
      success: function (data) {

        console.log('chatterbox: Message sent');
      },
      error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  };

    $('#clickbutton').on('click', function(){
     var Message = {};
      Message.text = $('#userInput').val();
      Message.username = username;
      Message.roomname = '4chan';
      postMsg(Message);
      $('#userInput').val("");
      // location.reload(true);
    });

     $('#refresh').on('click', function(){
       location.reload(true);
     });

     $('#userInput').keyup(function(event){
       if(event.keyCode == 13){
         $('#clickbutton').click();
       }
     })

//



  getMsg();

});