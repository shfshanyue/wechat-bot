import { Wechaty, UrlLink } from 'wechaty'
import { CronJob } from 'cron'
import { getArticle } from '../service/article'

// 找到前端面试，及前端进阶开头的群名，每天 9:45 定时推送
export default async (bot: Wechaty) => {
  return new CronJob('45 9 * * *', async () => {
    const rooms = await bot.Room.findAll()
    const article = await getArticle()
    new UrlLink ({
      description : article.title,
      thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=200&v=4',
      title       : article.title,
      url         : article.url
    }
  }, null, true, 'Asia/Shanghai')
}