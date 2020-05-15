import { Wechaty } from 'wechaty'

import inteviewBot from './interview'
import articleBot from './article'

export async function schedule (bot: Wechaty) {
  await articleBot(bot)
  await inteviewBot(bot)
}