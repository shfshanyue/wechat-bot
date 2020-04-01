const { Message } = require('wechaty')
const _ = require('lodash')

const covid = require('../message/covid')
const fund = require('../message/fund')
const interview = require('../message/interview')

const routes = [
  { keyword: '疫情', handle: covid.ncov },
  { keyword: '基金', handle: fund.topFund },
  { keyword: '面试', handle: interview.randomQuestion },
  { keyword: '',     handle: covid.keyword }
]

async function reply (msg, _data) {
  const data = _.concat(_data)
  for (const text of data) {
    if (text) {
      await msg.say(text)
    }
  }
}

async function handleMessage (msg) {
  if (msg.type() == Message.Type.Text) {
    if (!msg.room()) {
      console.log(msg)
      const route = routes.find(route => msg.text().includes(route.keyword))
      const data = await route.handle(msg.text())
      await reply(msg, data)
    }
  }
}

exports.handleMessage = handleMessage
