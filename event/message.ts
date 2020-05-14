import { Message } from 'wechaty'
import _ from 'lodash'

import * as covid from '../message/covid'
import * as fund from '../message/fund'
import * as interview from '../message/interview'
import { recentArticle } from '../message/article'

const routes = [
  { keyword: '疫情', handle: covid.ncov },
  { keyword: '基金', handle: fund.topFund },
  { keyword: '面试', handle: interview.randomQuestion },
  { keyword: '文章', handle: recentArticle },
  { keyword: '',     handle: covid.keyword }
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
  if (msg.type() == Message.Type.Text) {
    if (!msg.room() || (await msg.mentionSelf() && msg.room().owner().name() === '山月')) {
      const self = msg.to()
      const text = msg.text().replace("@" + self.name(), '')
      const route = routes.find(route => {
        return text.includes(route.keyword)
      })
      const data = await route.handle(text)
      await reply(msg, data)
    }
  }
}
