import { Wechaty } from 'wechaty'
import * as Sentry from '@sentry/node'
import { CronJob } from 'cron'
import pFilter from 'p-filter'
import { map as pMap, sleep } from '@shanyue/promise-utils'
import _ from 'lodash'
import { recentArticle } from '../message/article'
import config from '../config'

// 找到前端面试，及前端进阶开头的群名，每天 12:13 定时推送
export default async (bot: Wechaty) => {
  return new CronJob('30 18 * * *', async () => {
    const rooms = await bot.Room.findAll()
    const targetRooms = await pFilter(rooms, async room => {
      const id = room.id
      return config.groupRooms.join('').includes(id)
    })
    const article = await recentArticle()
    // const time = 10
    await pMap(targetRooms, async (room, i) => {
      let success = true
      const time = 60 * _.random(15, 25) * 1000
      try {
        await room.say(article)
      } catch (e) {
        success = false
        console.error(e)
        Sentry.captureException(e)
      } finally {
        const name = await room.topic()
        const now = new Date()
        console.log(i, name, success, now.toJSON())
      }
      await sleep(time)
    }, {
      concurrency: 5
    })
  }, null, true, 'Asia/Shanghai')
}
