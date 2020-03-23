const { Friendship } = require("wechaty")

const frienddShipRe = /疫情/

// 添加好友
exports.handleFriendShip = async (friendship) => {
  console.log(friendship)
  if (friendship.type() === Friendship.Type.Receive) {
    if (frienddShipRe.test(friendship.hello())) {
      await friendship.accept()
    }
  }
}
