import { Message } from 'wechaty'
import * as PUPPET from 'wechaty-puppet'
import { routes } from '../message'

export async function handleMessage (msg: Message) {
  if (msg.type() === PUPPET.types.Message.Text) {
    if (!msg.room() || (await msg.mentionSelf() && msg.room()?.owner()?.name()?.includes('山月'))) {
      const self = msg.listener()
      const text = msg.text().replace("@" + self?.name(), '') || ''
      const route = routes.find(route => {
        const keyword = route.keyword
        if (typeof keyword === 'string') {
          return text.includes(keyword)
        }
        return keyword.test(text)
      })
      const data = await route.handle(text)
      await msg.say(data)
    }
  }
}
