const { Wechaty, Message } = require("wechaty")
const { PuppetPadplus } = require("wechaty-puppet-padplus")

const Qrterminal = require("qrcode-terminal")

const bot = new Wechaty({
  puppet: new PuppetPadplus(),
  name: 'daxiange'
})

function handleScan (qrcode) {
  Qrterminal.generate(qrcode, { small: true })
}

async function handleMessage (msg) {
  if (msg.type() == Message.Type.Text) {
    if (!msg.room()) {
      await msg.say('hello, world')
    }
  }
}

bot
  .on("scan", handleScan)
  // .on("room-join", onRoomJoin)
  // .on("friendship", onFriendShip)
  .on("message", handleMessage)
  .start()
