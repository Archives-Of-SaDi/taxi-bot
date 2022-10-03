import {
  Bot,
  webhookCallback,
  serve,
  Context,
  SessionFlavor,
  session,
} from './deps.ts';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

interface SessionData {
  step:
    | 'role'
    | 'ccurrentRegion'
    | 'cwhereTo'
    | 'ctime'
    | 'cgender'
    | 'cphoneNumber'
    | 'dcurrentRegion'
    | 'dwhereTo'
    | 'dcountOfSpaces';
  role?: 'driver' | 'customer';
  currentRegion?: string;
  whereTo?: string;
  time?: string;
  gender?: string;
  phoneNumber?: string;
  countOfSpaces?: string;
}

type MyContext = Context & SessionFlavor<SessionData>;

const bot = new Bot<MyContext>(Deno.env.get('BOT_TOKEN')!);

const handleUpdate = webhookCallback(bot, 'std/http');

serve(async (req) => {
  if (req.method == 'POST') {
    const url = new URL(req.url);
    if (url.pathname.slice(1) == bot.token) {
      try {
        return await handleUpdate(req);
      } catch (err) {
        console.error(err);
      }
    }
  }
  return new Response();
});

bot.use(session({ initial: (): SessionData => ({ step: 'role' }) }));

Deno.env.get('MODE') === 'development' && bot.start();
Deno.env.get('MODE') === 'production' &&
  bot.api.setWebhook(
    Deno.env.get('WEBHOOK_URL')! + '/' + Deno.env.get('BOT_TOKEN')!
  );

export { bot };
export type { MyContext };
