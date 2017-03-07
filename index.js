//This is still work in progress
/*
Please report any bugs to nicomwaks@gmail.com

i have added console.log on line 48 




 */
'use strict'

var express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 3000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
})

 app.get('/webhook/', function (req, res) {
  console.log('Reached');
  if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);

  } else {
    res.send('Error, wrong token')
    console.log('Reached but error');
  }
});



// to post data
var userPayload;
var watsonPayload;
var context;
var resp =''
var res1234
var message_aagya;

app.post('/webhook/', function (req, res) {

  //console.log("Reached");  
  //user = require('./index');
  //console.log('----%%%%%%%%%%%%%&&&&&&&&&&&&&&&&@@@@@'+ current_user+ 'csac '+current_user.name);
  let messaging_events = req.body.entry[0].messaging
  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i]
    let sender = event.sender.id;
    // console.log("sender " +sender );
    if (event.message && event.message.text) {
      let text = event.message.text
   // Api.postConversationMessage(text);
       var data = {'input': {'text': text}};
      if (context) {
        data.context = context;
      }
     // res1234 ='';
      //var result = BOT_testmessage(data, resp);
      console.log("Message  ----- " + event.message.text);
      if (text === 'sign me up') {
        console.log("welcome to chatbot")
        sendGenericMessage(sender)
        continue
      } 
        //var result = BOT_testmessage(data, sender, resp);
         sendTextMessage(sender, "Text received, echo: " + text);
        //sendTextMessage(sender, result.output.text);
       // console.log('Response from text ------------- '+ result );
}
    if (event.postback) {
      let text = JSON.stringify(event.postback);
      //passport.authenticate('google', { scope: ['profile', 'email'] });
      sendTextMessage(sender, "Postback received: " + text.substring(0, 200), token)
      continue
    }
  }
  res.sendStatus(200)
})



// recommended to inject access tokens as environmental variables, e.g.
 
 var fbbotData = require('./fbbot_cred');
const token = fbbotData.facebook.pageAccessToken;

function sendTextMessage(sender, text) {
  let messageData = { text: text }

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: token },
    method: 'POST',
    json: {
      recipient: { id: sender },
      message: messageData,
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}



  function sendGenericMessage(sender) {
  let messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Bennit AI",
          "subtitle": "Welcome to Work evolved",
          "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
          "buttons": [{
            "type": "web_url",
            "url": "http://bennitfbbot.mybluemix.net/auth/google",
            "title": "Actual website"
          }, {
            "type": "postback",
            "title": "signup & continue",
            "payload": "Payload for first element in a generic bubble",
          }],
        },
        ]
      }
    }
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: token },
    method: 'POST',
    json: {
      recipient: { id: sender },
      message: messageData,
    }
  }, function (error, response, body) {

    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error Gundruk: ', response.body.error)
    }
    //else{

    //   }
  })
}
  // Send a message request to the server

// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
