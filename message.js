const { Message } = require('wechaty')
const covid = require('./covid')

const routes = [
  { keyword: '疫情', handle: covid.ncov },
  { keyword: '',     handle: covid.keyword }
]

async function handleMessage (msg) {
  if (msg.type() == Message.Type.Text) {
    if (!msg.room()) {
      const route = routes.find(route => msg.text().includes(route.keyword))
      const reply = route.handle(msg.text())
      if (reply) {
        await msg.say(reply)
      }
    }
  }
}

exports.handleMessage = handleMessage
