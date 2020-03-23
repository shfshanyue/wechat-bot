const { Message } = require('wechaty')
const covid = require('../message/covid')

const routes = [
  { keyword: '疫情', handle: covid.ncov },
  { keyword: '',     handle: covid.keyword }
]

async function reply (msg, data) {
  for (const text of data) {
    await msg.say(text)
  }
}

async function handleMessage (msg) {
  if (msg.type() == Message.Type.Text) {
    if (!msg.room()) {
      console.log(msg)
      const route = routes.find(route => msg.text().includes(route.keyword))
      const data = route.handle(msg.text())
      await reply(msg, data)
    }
  }
}

exports.handleMessage = handleMessage
