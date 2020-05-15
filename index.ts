import { Wechaty } from 'wechaty'
import { PuppetPadplus } from 'wechaty-puppet-padplus'
import Qrterminal from 'qrcode-terminal'
import pMap from 'p-map'

import * as message from './event/message'
import * as friendShip from './event/friend-ship'
import * as roomJoin from './event/room-join'

import { schedule } from './schedule'

const bot = new Wechaty({
  puppet: new PuppetPadplus(),
  name: 'daxiange'
})

function handleScan (qrcode: string) {
  Qrterminal.generate(qrcode, { small: true })
}

bot
  .on('scan', handleScan)
  .on('room-join', roomJoin.handleRoomJoin)
  .on('friendship', friendShip.handleFriendShip)
  .on('message', message.handleMessage)
  .start()

// 需要保证 bot start 之后调用
// 然而 bot.start().then() 无法触达，只好使用这种笨办法
setTimeout(() => {
  schedule(bot)
}, 3000)

