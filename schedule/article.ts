import { Wechaty } from 'wechaty'
import { CronJob } from 'cron'
import pFilter from 'p-filter'
import { recentArticle } from '../message/article'
import config from '../config'

// 找到前端面试，及前端进阶开头的群名，每天 12:13 定时推送
export default async (bot: Wechaty) => {
  return new CronJob('13 12 * * *', async () => {
    const rooms = await bot.Room.findAll()
    const targetRooms = await pFilter(rooms, async room => {
      const topic = await room.topic()
      return config.groupRooms.includes(topic)
    })
    const article = await recentArticle()
    for (const room of targetRooms) {
      // const alias = await room.
      await room.say(article)
    }
  }, null, true, 'Asia/Shanghai')
}