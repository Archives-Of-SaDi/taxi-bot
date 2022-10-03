import { bot } from '../core/bot.ts';
import { customerOrChauffeur } from '../utils/keyboards.ts';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

bot.callbackQuery('true', async (ctx) => {
  await ctx.editMessageText("Tez orada siz bilan bog'lanishadi!");
  if (ctx.session.role === 'customer') {
    const text = await Deno.readTextFile('./src/data/customers.json');

    await Deno.writeTextFile(
      './src/data/customers.json',
      `${text}\n{\n  \n},\n`
    );
  }
  await ctx.reply('Goodbye World!', { reply_markup: customerOrChauffeur });
  ctx.session.step = 'role';
});

bot.callbackQuery('false', async (ctx) => {
  ctx.session.step = 'role';
  await ctx.deleteMessage();
  await ctx.reply('Goodbye World!', { reply_markup: customerOrChauffeur });
  ctx.session.step = 'role';
});
