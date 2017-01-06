'use strict';
const qs = require('querystring');
const twilio = require('twilio');

module.exports.receivesms= (event, context, callback) => {
  var sms_data = qs.parse(event.body);
  console.log(sms_data);
  var resp = new twilio.TwimlResponse();
  var response_str = "";
  var media_url = "";
  // if message is from Maksim
  if(sms_data.From === "+17736777755") {
    response_str = "Hi Maksim";
  }
  // if message is from Karen
  else if(sms_data.From === "+16193707037") {
    //if message includes the word "KPI"
    if(sms_data.Body.search("KPI") !== -1) {
      response_str = "What is the target for FY2018?";
      media_url = "http://mrm-screen.s3.amazonaws.com/Solomon%20babies%20visual.jpg";
    }
    // if message does not include
    else{
      response_str = "It should be 100%";
    }
  }
  // if message is from someone that Almis does not know
  else{
    response_str = "I don't recognize you!";
  }
  resp.message(function() {
      this.body(response_str);
      if(media_url !== "") {
        this.media(media_url);
      }
      //this.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');
  });

  const response = {
    statusCode: 200,
    body: resp.toString(),
    headers: {
        "Content-Type" : "text/xml"
    }
  };

  callback(null, response);
};
