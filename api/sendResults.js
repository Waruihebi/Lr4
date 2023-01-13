const nodemailer = require('nodemailer');
const config = require('../config/config.json');
const http = require('request')
const TelegramBot = require('node-telegram-bot-api');

const token = config.telegram.token;
const bot = new TelegramBot(token, {polling: true});

module.exports.sendMsg = (req, res) => {
  let reqBody = req.body
  let fields = [
    `Ім'я: ${reqBody.name}`,
    `Група: ${reqBody.group}`,
    `Результат тестування: ${reqBody.results}`,
    `ЛР JS2022`
  ]
  let msg = ''
  fields.forEach(field => {
    msg += field + '\n'
  });

  
  HTMLmsg = encodeURI(msg);
  bot(no, module)
  // Send to telegram bot (no module)
   http.post(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${HTMLmsg}`, function (error, response, body) {
     console.log('error:', error); 
     console.log('statusCode:', response && response.statusCode); 
     console.log('body:', body); 
     if(response.statusCode===200){
       res.status(200).json({status: 'ok', message: 'Успешно отправлено!'});
     }
     if(response.statusCode===400){
      res.status(400).json({status: 'error', message: 'Произошла ошибка!'});
     }
   });

  // Send to telegram bot(module)
  bot.sendMessage(config.telegram.chat, msg);

  // Send to email
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email.user,
      pass: config.email.pass
    },
  });

  transporter.sendMail({
    from: '"Test results"',
    to: 'webkpi21@gmail.com',
    subject: 'Test results',
    text: msg,
  });
}