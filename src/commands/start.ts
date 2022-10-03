import { bot } from '../core/bot.ts';
import { customerOrChauffeur } from '../utils/keyboards.ts';

bot.command('start', async (ctx) => {
  await ctx.reply('Goodbye World!', { reply_markup: customerOrChauffeur });
  ctx.session.step = 'role';
});
