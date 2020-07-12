import { Friendship } from 'wechaty'

const frienddShipRe = /疫情|我是|面试|领课/

// 添加好友
export const handleFriendShip = async (friendship) => {
  if (friendship.type() === Friendship.Type.Receive) {
    if (frienddShipRe.test(friendship.hello())) {
      await friendship.accept()
    }
  }
}
