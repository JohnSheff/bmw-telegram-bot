const Telegraf = require ('telegraf');
const fetch = require ('node-fetch');
const FileParser = require ('./fileParser');
const Linker = require ('./linker');
require ('http').createServer ().listen (process.env.PORT || 5000).on ('request', function (req, res) {
  res.end ('');
});

const bot = new Telegraf (process.env.BOT_TOKEN);

bot.start ((ctx) => ctx.reply ('Здравствуйте, загрузите файл формата .xlsx'));
// bot.on ('sticker', (ctx) => ctx.replyWithSticker ('CAADAgADRgADUomRI_j-5eQK1QodFgQ'));
bot.on ('sticker', (ctx) => {
   ctx.reply("Ох ты ж, вот это да-а-а!!!")
   ctx.replyWithSticker ('CAADAgADXAADUomRI1aEI4rcKZp0FgQ')});


  bot.hears('elbrus', (ctx) => { ctx.replyWithPhoto({
    url: 'https://avatars.mds.yandex.net/get-altay/1627037/2a0000016740010b71c956fcd006150ebf0c/XXL',
     })
  ctx.reply("https://www.youtube.com/watch?v=2pQ1vp0mcXQ Всё о БУТКЕМПАХ / КРЕПКИЙ программист за три месяца")})
bot.on ('photo', (ctx) => ctx.reply ('👍Неплохо, и все-таки я принимаю только файлы формата .xlsx'));
bot.on ('video', (ctx) => ctx.reply ('Слишком тяжело, лучше бы файл формата .xlsx 👍'));
bot.on ('audio', (ctx) => ctx.reply ('👍Отличная песня, но что то пошло не так и это не файл формата .xlsx'));
bot.on ('voice', (ctx) => ctx.reply ('👍Ммм, прекрасный голос мне бы такой, и все-таки я принимаю только файлы формата .xlsx'));


bot.on ('document', async (ctx) => {
  const fileId = ctx.message.document.file_id;
  fetch (`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=${fileId}`)
   .then (res => res.json ())
   .then (json => json.result.file_path)
   .then (file_path => fetch (`http://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file_path}`))
   .then (res => res.buffer ())
   .then (buffer => {
     const parser = new FileParser (buffer);
     const res = parser.createResultCollection ();
     const link = new Linker (res);
     return link.linkMaker ();
   }).then (newUrl => {
    ctx.replyWithPhoto ({
      url: "https://cosy.bmwgroup.com/connext/cosySec?COSY-EU-100-7331c9Nv2Z7d5yKlHS9P3AKWL2JeivzGEgpn23HGfvQFi5jNE47UAzLekjnWAESVrxlcqgv2Z7d3EWqfRUQAP13%25P6K2bjIjAr8snRBDF7UrO5eqKSGZIgMLWopRBvhJPvOjhwmzqIb%25snvzfAxPs8%25P69XUKIjAOihIQBzcKt3aJkeYVo70U29lGNHf1hJP%25sY1coKGfXD58HS9HZTn7C5lk53UDJgpnXJCpLpFpgZlZQ6KAwXXRaYWFtHQ5nmPKMRagOybWw5nvIT9PglO2B3ibMPIjedw9hDBDMztio1eqhk7ZiuMLoACRO%25hJHFl5JAou%25KXgc6HSfWQvbW%25V1PaHMGfNEbn%25hV10s9Of0JE4riI14oscZwBE2HrxRtesoPZ857MrNRRUgChZu15GvloRkdgp2XH5Axv6jQ%25gT92YDafvzQjmqn12cjDyLOEoypqTJIsHRSL3uBr%25AvJdSeZfFeuzVMR1L7SkNh5EJRVA0og8QWNF4HvUbJ0Kc%252G9a4WxfjpiOcP81D6BGxbUEqYdp89GsLmzmUiprJXDKGw6ZuQqpptYRSaPP67m5VnHYYCygNOflmlTv0ThUyX324LItTQLbpbSht9lZyRB3jw0MA88i"});
    ctx.reply (`Ваш собранный автомобиль: ${newUrl} `);
  }).catch (err =>
 
   ctx.reply (`Загружен неверный файл, повторите попытку.`));
  
});
bot.on ('message', (ctx) => ctx.reply ('О как здорова, но я принимаю только файлы формата .xlsx с конфигурацией автомобиля BMW'));


bot.launch ();