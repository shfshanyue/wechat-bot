import { Wechaty } from 'wechaty'

import inteviewBot from './interview'

export async function schedule(bot: Wechaty) {
  await inteviewBot(bot)
}