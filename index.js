const { Wechaty, Message } = require('wechaty')
const { PuppetPadplus } = require('wechaty-puppet-padplus')
const Qrterminal = require('qrcode-terminal')

const message = require('./message')

const bot = new Wechaty({
  puppet: new PuppetPadplus(),
  name: 'daxiange'
})

function handleScan (qrcode) {
  Qrterminal.generate(qrcode, { small: true })
}

bot
  .on("scan", handleScan)
  // .on("room-join", onRoomJoin)
  // .on("friendship", onFriendShip)
  .on("message", message.handleMessage)
  .start()
