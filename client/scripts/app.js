// YOUR CODE HERE:
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
      // mArray.sort(function(a, b) {
      //   var a = new Date(a.createdAt);
      //   var b = new Date(b.createdAt);
      //   return ((a > b) ? -1 : ((b > a) ? 1: 0));
      // });

      _.each(mArray, function(msg){
        var $message = '<div class="message"><div class="text"></div>';

        $('.chatbox').append($message);
        $('.text').text(msg.username + " : " + msg.text);

      });
        console.log(mArray);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: fail');
    }
  });
};

var message = {
  'username': 'MAJORAWESOME',
  'text': 'sausage anyone?',
  'roomname': '4chan'
};

var postMsg = function(){
  $.ajax({
  // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
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
postMsg();
getMsg();

