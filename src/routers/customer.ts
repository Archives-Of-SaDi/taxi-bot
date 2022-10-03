import { Router } from '../core/deps.ts';
import { bot, MyContext } from '../core/bot.ts';
import { regions, genderKeyboard, formCorrect } from '../utils/keyboards.ts';

const router = new Router<MyContext>((ctx) => ctx.session.step);

const role = router.route('role');
role.hears("Yo'lovchi", async (ctx) => {
  ctx.session.role = 'customer';
  await ctx.reply('Xozir qaysi viloyatdasiz?', { reply_markup: regions });
  ctx.session.step = 'ccurrentRegion';
});

const currentRegion = router.route('ccurrentRegion');
currentRegion.on(':text', async (ctx) => {
  ctx.session.currentRegion = ctx.message!.text;
  await ctx.reply('Qaysi viloyatga bormoqchisiz?', { reply_markup: regions });
  ctx.session.step = 'cwhereTo';
});

const whereTo = router.route('cwhereTo');
whereTo.on(':text', async (ctx) => {
  ctx.session.whereTo = ctx.message!.text;
  await ctx.reply('Qaysi vaqtda?\nMisol: 15:00');
  ctx.session.step = 'ctime';
});

const time = router.route('ctime');
time.on(':text', async (ctx) => {
  ctx.session.time = ctx.message!.text;
  await ctx.reply('Jinsingiz?', { reply_markup: genderKeyboard });
  ctx.session.step = 'cgender';
});

const gender = router.route('cgender');
gender.on(':text', async (ctx) => {
  ctx.session.gender = ctx.message!.text;
  await ctx.reply('Telefon raqamingizni kiriting\nMisol: +998 93 527 01 23');
  ctx.session.step = 'cphoneNumber';
});

const phoneNumber = router.route('cphoneNumber');
phoneNumber.on(':text', async (ctx) => {
  ctx.session.phoneNumber = ctx.message!.text;
  await ctx.reply(
    `Ma'lumotlar to'grimi?\n${ctx.session.currentRegion}'dan ${ctx.session.whereTo}'ga\nJinsi: ${ctx.session.gender}\nTelefon raqam: ${ctx.session.phoneNumber}\nVaqti: ${ctx.session.time}`,
    { reply_markup: formCorrect }
  );
});

bot.use(router);
