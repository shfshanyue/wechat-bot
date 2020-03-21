const axios = require('axios')
const fs = require('fs')

// 获取 type 类型的数据，并保存文件
const fetchData = (data, { type, filename }) => {
  const re = new RegExp(`window.get${type} = (.*?)}catch`)
  const result = data.match(re)[1]
  if (filename) {
    fs.writeFileSync(`./data/${filename}.json`, JSON.stringify(JSON.parse(result), null, 2))
  }
  return result
}

async function request () {
  const { data: html }  = await axios.request('https://3g.dxy.cn/newh5/view/pneumonia')
  await fetchData(html, { type: 'ListByCountryTypeService2true', filename: 'countries' })
  await fetchData(html, { type: 'StatisticsService', filename: 'stat' })
}

request().then(() => console.log('OK')).catch(e => {
  console.error(e)
  process.exit(1)
})
