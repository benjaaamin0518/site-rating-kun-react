import { selectTypeUnion } from 'browserAction/contexts/SiteRatingContext'
import chromeApi from '../common/chromeApi'
import getRateName from '../common/getRateName'
type createRateElementType = (rateName: string) => HTMLSpanElement
type ratePageType = { url: string; rate: selectTypeUnion }
const { getStorage, setStorage, sendMessage } = chromeApi()
const classNameObj = {
  rate: 'siteRate'
}
const createRateElement: createRateElementType = (rateName) => {
  const span = document.createElement('span')
  span.setAttribute('class', classNameObj.rate)
  span.innerText = `評価:${rateName}`
  return span
}
const getRootRelative = (path: string) => {
  const rPath = path
    .replace(`${location.protocol + '//' + location.hostname}`, '')
    .replace(`/*${location.hash}`, '')
  return rPath
}
const getRatePages = async () => {
  return await getStorage()
}
const showRateOnLinks = (
  { url, rate }: ratePageType,
  document: Document | Element
) => {
  console.log(getRootRelative(url))
  const targetElements = document.querySelectorAll(
    `[href='${url}'],[href='${getRootRelative(url)}']`
  )
  for (const targetElement of targetElements) {
    console.log(url)
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
        showRates(ratePages, node)
      }
    })
  }
}
const observerInit = (ratePages: ratePageType[]) => {
  return new MutationObserver((mutirations) =>
    observerCallBack(ratePages, mutirations)
  )
}
window.onload = () => {
  init()
}
