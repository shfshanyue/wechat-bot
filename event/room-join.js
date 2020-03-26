const _ = require('lodash')

const me = ['wxid_fw1ohd5c982222', 'wxid_1qizr97llbta22']

const hello = contact => _.trim(`
欢迎新人入群, 请注意修改昵称并且可以简单地做个自我介绍

---
由山月自制小机器人发送，源码 shfshanyue/wechat-ncov
`)

exports.handleRoomJoin = (room, inviteeList) => {
  if (me.includes(room.owner().id)) {
    inviteeList.map(c => {
      room.say(hello(c), c)
    })
  }
}
