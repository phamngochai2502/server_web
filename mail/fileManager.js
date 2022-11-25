
import data from '../mail/mail.json' assert { type: "json" };
import nodeMailer from 'nodemailer';
import cron from 'node-cron';
const lstMail = data["email"];
const tranPost = nodeMailer.createTransport({
   service : "gmail",
   auth: {
    user :'boybeobanhbao1@gmail.com',
    pass : 'frrhrtakkiswaojp'
   }
});
let mailSend = {
    from : 'boybeobanhbao1@gmail.com',
    to : lstMail,
    subject : 'hello word',
    text : 'hai dep trai'
} 
// tranPost.sendMail(mailSend, (err) =>{
//     if(err){
//         console.log(err);
//     }else {
//         console.log(`send mail to ${lstMail} success ! ` );
//     }
// });
var today = new Date();
let minute = today.getMinutes();
let time = '24'+' */1 * * *';
console.log('time = ' + time);
cron.schedule(time+"'", () => {
    console.log('running a task every 1 hour');
  });
//console.log(`list mail : ${lstMail}`); 