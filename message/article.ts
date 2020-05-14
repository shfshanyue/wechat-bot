import { getArticle } from '../service/article'
import { UrlLink } from 'wechaty'

export const recentArticle = async () => {
  const article = await getArticle()
  return new UrlLink({
    description: article.title,
    thumbnailUrl: 'https://lc-gold-cdn.xitu.io/f655215074250f10f8d4.png',
    title: article.title,
    url: article.url
  })
}