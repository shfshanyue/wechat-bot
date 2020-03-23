const _ = require('lodash')
const countries = require('../data/countries.json')
const stat = require('../data/stat.json')

function format ({ deadCount, curedCount, confirmedCount, currentConfirmedCount}) {
  return _.trim(`
现存确诊: ${currentConfirmedCount}
累计确诊: ${confirmedCount}
死亡: ${deadCount}
治愈: ${curedCount}
病死率: ${_.round(deadCount / confirmedCount * 100, 2)}%
治愈率: ${_.round(curedCount / confirmedCount * 100, 2)}%
  `)
}

// 根据关键字(国家名)，返回该国家疫情信息
exports.keyword = (keyword) => {
  const country = countries.find(c => keyword === c.provinceName)
  if (!country) {
    return
  }
  return format(country)
}

// 根据关键字疫情，返回所有疫情信息
exports.ncov = (keyword) => {
  return [
    '国家, 确诊, 死亡, 病死率',
    ..._.sortBy(countries, x => -x.currentConfirmedCount).slice(0, 30).map(country => {
      const { deadCount, confirmedCount, currentConfirmedCount } = country
      return `${country.provinceName}【${confirmedCount}】【${deadCount}】【${_.round(deadCount / confirmedCount * 100, 2)}%】`
    })
  ].join('\n')
}
