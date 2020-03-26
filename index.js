const { Wechaty, Message } = require('wechaty')
const { PuppetPadplus } = require('wechaty-puppet-padplus')
const Qrterminal = require('qrcode-terminal')

const message = require('./event/message')
const friendShip = require('./event/friend-ship')
const roomJoin = require('./event/room-join')

const bot = new Wechaty({
  puppet: new PuppetPadplus(),
  name: 'daxiange'
})

function handleScan (qrcode) {
  Qrterminal.generate(qrcode, { small: true })
}

bot
  .on("scan", handleScan)
  .on("room-join", roomJoin.handleRoomJoin)
  .on("friendship", friendShip.handleFriendShip)
  .on("message", message.handleMessage)
  .start()