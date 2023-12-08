import { selectTypeUnion } from 'browserAction/contexts/SiteRatingContext'
import chromeApi from '../common/chromeApi'
import getRateName from '../common/getRateName'
import qiitaApi, { Qiita } from '../common/qiitaApi'
type createRateElementType = (rateName: string) => HTMLSpanElement
type ratePageType = { url: string; rate: selectTypeUnion }
const { getStorage, setStorage, sendMessage, addListener } = chromeApi()
let isShow = false
const classNameObj = {
  rate: 'siteRate'
}
type onMessageCSEventDefObjType = {
  [key: string]: { message: messageCSUnionType }
}
export type messageCSUnionType = 'changeCurrentRate'
const onMessageCSEventDefObj: onMessageCSEventDefObjType = {
  changeCurrentRate: { message: 'changeCurrentRate' }
}

const { getRelativePosts } = qiitaApi()
const createRateElement: createRateElementType = (rateName) => {
  const span = document.createElement('span')
  span.setAttribute('class', classNameObj.rate)
  span.innerText = `評価:${rateName}`
  return span
}
const createQiitaPostsElement = (posts: Qiita[]) => {
  const qiitaPostsElement = document.createElement('div')
  qiitaPostsElement.className = 'qiitaPosts'
  const header = document.createElement('h3')
  header.innerText = '関連記事(Qiita上にある記事より抜粋)'
  qiitaPostsElement.appendChild(header)
  posts.forEach(({ url, title }, index) => {
    const qiitaPostElement = document.createElement('p')
    qiitaPostElement.innerText = `${index + 1}.`
    const titleElement = document.createElement('b')
    titleElement.innerText = title
    const linkElement = document.createElement('a')
    linkElement.href = url
    linkElement.innerText = url
    const hrElement = document.createElement('hr')
    const appendElements = [titleElement, linkElement, hrElement]
    qiitaPostElement.append(...appendElements)
    qiitaPostElement.querySelector('a')?.insertAdjacentText('beforebegin', '(')
    qiitaPostElement.querySelector('a')?.insertAdjacentText('afterend', ')')
    qiitaPostsElement.append(qiitaPostElement)
  })
  document.body.appendChild(qiitaPostsElement)
}
const getRootRelative = (path: string) => {
  const rPath = path
    .replace(`${location.protocol + '//' + location.hostname}`, '')
    .replace(`/*${location.hash}`, '')
  return rPath
}
const getRatePages = async () => {
  return await (
    await getStorage()
  ).storage
}
const showRateOnLinks = async (
  { url, rate }: ratePageType,
  document: Document | Element
) => {
  const rootUrl = getRootRelative(url)
  const targetElements = document.querySelectorAll(
    `[href='${url}'],[href='${rootUrl}']`
  )
  for (const targetElement of targetElements) {
    targetElement.querySelector(`.${classNameObj.rate}`)?.remove()
    const prependElement = createRateElement(getRateName(rate))
    targetElement.prepend(prependElement)
  }
}
const showRates = (ratePages: ratePageType[], document: Document | Element) => {
  for (const ratePage of ratePages) {
    showRateOnLinks(ratePage, document)
  }
}
const init = async () => {
  const ratePages = await getRatePages()
  showRates(ratePages, document)
  observerInit(ratePages).observe(document, {
    childList: true,
    subtree: true
  })
}
const observerCallBack = (
  ratePages: ratePageType[],
  elements: MutationRecord[]
) => {
  for (const element of elements) {
    element.addedNodes.forEach((node) => {
      if (node instanceof Element) {
        const isExistElemant =
          node.querySelectorAll(`[class=${classNameObj.rate}]`).length > 0
        if (isExistElemant) return
        showRates(ratePages, node)
      }
    })
  }
}
addListener('onMessage', ({ value }, sender, sendResponse) => {
  if (value == onMessageCSEventDefObj.changeCurrentRate.message) {
    init()
  }
  return true
})
const observerInit = (ratePages: ratePageType[]) => {
  return new MutationObserver((mutirations) =>
    observerCallBack(ratePages, mutirations)
  )
}
const createQuery = (title: string) => {
  const reg =
    /(.+)\】+|[一-龠]+|[ぁ-ん]+|[ァ-ヴー]+|[a-zA-Z]+|[0-9]+|[ａ-ｚＡ-Ｚ]+|[０-９]+/g
  title = title.replace(' - Qiita', '')
  const matchArr = title.match(reg)
  return matchArr?.reduce((query, currentWord, index) => {
    const isNext = index !== matchArr.length - 1
    currentWord = currentWord.replace(/\【|\】/g, '')
    const currentReg = /[一-龠]+/g
    const isCurrentWordMatch =
      currentReg.test(currentWord) || currentWord.length > 1
    query = isCurrentWordMatch
      ? query + `tag:${encodeURIComponent(currentWord)}+stocks:>=100`
      : query
    query = isNext ? query + ' OR ' : query
    return query
  }, '')
}
window.onload = async () => {
  init()
}
window.addEventListener('scroll', async () => {
  const bodyHeight = document.body.clientHeight // bodyの高さを取得
  const windowHeight = window.innerHeight // windowの高さを取得
  const bottomPoint = bodyHeight - windowHeight // ページ最下部までスクロールしたかを判定するための位置を計算
  const currentPos = window.pageYOffset + 1 // スクロール量を取得
  console.log(bottomPoint, currentPos)
  if (bottomPoint <= currentPos && !isShow) {
    isShow = true
    const posts = await getRelativePosts(createQuery(document.title) || '')
    createQiitaPostsElement(posts)
  }
})
