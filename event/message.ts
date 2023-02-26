import _ from 'lodash'
import { Message } from 'wechaty'

import * as fund from '../message/fund'
import * as interview from '../message/interview'

const defaultRoute = { keyword: '', handle: fund.topFund }
const routes = [
  { keyword: '基金', handle: fund.topFund },
  { keyword: '面试', handle: interview.randomQuestion },
  defaultRoute
]

async function reply (msg: Message, _data) {
  const data = _.concat(_data)
  for (const text of data) {
    if (text) {
      await msg.say(text)
    }
  }
}

export async function handleMessage (msg: Message) {
  console.log(msg)
  if (msg.type() === 3) {
    if (!msg.room() || (await msg.mentionSelf() && msg.room()!.owner()!.name().includes('山月'))) {
      const self = msg.to()
      const text = msg.text().replace("@" + self?.name(), '') || ''
      const route = routes.find(route => {
        return text.includes(route.keyword)
      }) || defaultRoute
      const data = await route.handle()
      await reply(msg, data)
    }
  }
}
