import { Router } from '../core/deps.ts';
import { bot, MyContext } from '../core/bot.ts';
import { regions, formCorrect, countOfSpaces } from '../utils/keyboards.ts';

const router = new Router<MyContext>((ctx) => ctx.session.step);

const role = router.route('role');
role.hears('Haydovchi', async (ctx) => {
  ctx.session.role = 'driver';
  await ctx.reply('Xozir qaysi viloyatdasiz?', { reply_markup: regions });
  ctx.session.step = 'dcurrentRegion';
});

const currentRegion = router.route('dcurrentRegion');
currentRegion.on(':text', async (ctx) => {
  ctx.session.currentRegion = ctx.message!.text;
  await ctx.reply('Qaysi viloyatga bormoqchisiz?', {
    reply_markup: regions,
  });
  ctx.session.step = 'dwhereTo';
});

const whereTo = router.route('dwhereTo');
whereTo.on(':text', async (ctx) => {
  ctx.session.whereTo = ctx.message!.text;
  await ctx.reply("Bo'sh joylar soni", { reply_markup: countOfSpaces });
  ctx.session.step = 'dcountOfSpaces';
});

const dcountOfSpaces = router.route('dcountOfSpaces');
dcountOfSpaces.on(':text', async (ctx) => {
  ctx.session.countOfSpaces = ctx.message!.text;
  await ctx.reply(
    `Ma'lumotlar to'grimi?\n${ctx.session.currentRegion}'dan ${ctx.session.whereTo}'ga\nBo'sh joy soni?\n${ctx.session.countOfSpaces}`,
    { reply_markup: formCorrect }
  );
});

bot.use(router);
