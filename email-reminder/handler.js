'use strict';

module.exports.sendReminderDaily = (event, context, callback) => {
  var AWS = require('aws-sdk');
  AWS.config.update({ region: 'ap-south-1' });
  var ses = new AWS.SES();
  var fs = require('fs');

    var emailHtml = fs.readFileSync('./dailyReminder.html', 'utf-8');

    var toAndFromAdress = 'asisjena03@gmail.com'
    var params = {
        Destination: {
            ToAddresses: [toAndFromAdress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8", 
                    Data: emailHtml
                }, 
                Text: {
                    Charset: "UTF-8", 
                    Data: "Remember to continue helping the Woof Garden in your Pluralsight course!"
                }
            }, 
            Subject: {
                Charset: "UTF-8", 
                Data: "Woof Garden Reminder"
            }
        },
        ReplyToAddresses: [toAndFromAdress],
        Source: toAndFromAdress, 
    };

    ses.sendEmail(params, function(err, data) {
        // an error occurred
        if (err) console.log(err, err.stack); 
        // successful response
        else callback(null, data);
    }); 
};

module.exports.sendReminderWeekend = async (event, context, callback) => {
  var AWS = require('AWS-SDK');
  AWS.config.update({ region: 'ap-south-1' });
  var ses = new AWS.SES();
  var fs = require('fs');
  var emailHtml = fs.readFileSync('./weekendReminder.html', 'utf-8');

  var toAndFromAddress = 'asisjena03@gmail.com'
  var params = {
    Destination: { ToAddressess: [toAndFromAddress] },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailHtml
        },
        Text: {
          Charset: "UTF-8",
          Data: "Remember to do POC"
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Woof Garden Reminder!"
      }
    },
    ReplyToAddresses: [toAndFromAddress],
    Source: toAndFromAddress,

  }
  ses.sendEmail(params, function (err, data) {
    if (err) console.log(err, err.stack)
    else callback(null, data)
  });
};