import { Wechaty } from 'wechaty'
import { CronJob } from 'cron'
import pFilter from 'p-filter'
import pMap from 'p-map'
import _ from 'lodash'
import { recentArticle } from '../message/article'
import config from '../config'

function sleep (n: number) {
  return new Promise(resolve => {
    setTimeout(resolve, n * 1000)
  })
}

// 找到前端面试，及前端进阶开头的群名，每天 12:13 定时推送
export default async (bot: Wechaty) => {
  return new CronJob('13 12 * * *', async () => {
    const rooms = await bot.Room.findAll()
    const targetRooms = await pFilter(rooms, async room => {
      const topic = await room.topic()
      return config.groupRooms.includes(topic)
    })
    const article = await recentArticle()
    const time = 60 * _.random(5, 20)
    await pMap(targetRooms, async room => {
      await sleep(time)
      await room.say(article)
    }, {
      concurrency: 6
    })
  }, null, true, 'Asia/Shanghai')
}
