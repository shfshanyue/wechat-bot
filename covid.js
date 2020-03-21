const _ = require('lodash')
const countries = require('./data/countries.json')
const stat = require('./data/stat.json')

function format ({ deadCount, curedCount, confirmedCount, currentConfirmedCount}) {
  return _.trim(`
确诊: ${currentConfirmedCount}
死亡: ${deadCount}
病死率: ${_.round(deadCount / confirmedCount * 100, 2)}%
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
    ..._.sortBy(countries, x => -x.currentConfirmedCount).slice(0, 20).map(country => {
      const { deadCount, curedCount, confirmedCount, currentConfirmedCount } = country
      return `${country.provinceName}【${currentConfirmedCount}】【${deadCount}】【${_.round(deadCount / confirmedCount * 100, 2)}%】`
    })
  ].join('\n')
}
