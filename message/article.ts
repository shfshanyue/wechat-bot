import { getArticle } from '../service/article'
import { UrlLink } from 'wechaty'
import _ from 'lodash'

export const recentArticle = async () => {
  const article = await getArticle()
  const urls = [
    'https://lc-gold-cdn.xitu.io/85dd1ce8008458ac220c.png',
    'https://lc-gold-cdn.xitu.io/f655215074250f10f8d4.png',
    'https://lc-gold-cdn.xitu.io/7b5c3eb591b671749fee.png',
    'https://lc-gold-cdn.xitu.io/cde94583e8f0ca3f6127.png',
    'https://lc-gold-cdn.xitu.io/03f4a3a6b66a8a91627d.png'
  ]
  return new UrlLink({
    description: article.title,
    thumbnailUrl: _.sample(urls),
    title: article.title,
    url: article.url
  })
}