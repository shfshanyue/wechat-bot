const CronJob = require('cron').CronJob
const interview = require('../message/interview')

module.exports = async bot => {
  const job = new CronJob('45 9 * * *', async () => {
    const rooms = await bot.Room.findAll({ topic: /前端面试|前端进阶/ })
    const q = await interview.randomQuestion()
    for (const room of rooms) {
      await room.say(q)
    }
  }, null, true, 'Asia/Shanghai');
  job.start();
}
