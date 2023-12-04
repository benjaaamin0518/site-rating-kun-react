import { selectTypeUnion } from 'browserAction/contexts/SiteRatingContext'
import chromeApi from '../common/chromeApi'
import getRateName from '../common/getRateName'
type createRateElementType = (rateName: string) => HTMLSpanElement
type ratePageType = { url: string; rate: selectTypeUnion }
const { getStorage, setStorage, sendMessage } = chromeApi()

const createRateElement: createRateElementType = (rateName) => {
  const span = document.createElement('span')
  span.setAttribute('class', 'siteRate')
  span.innerText = `評価:${rateName}`
  return span
}
const getRatePages = async () => {
  return await getStorage()
}
const showRateOnLinks = ({ url, rate }: ratePageType) => {
  const targetElements = document.querySelectorAll(`[href='${url}']`)
  for (const targetElement of targetElements) {
    console.log(url)
    const prependElement = createRateElement(getRateName(rate))
    targetElement.prepend(prependElement)
  }
}
const showRates = (ratePages: ratePageType[]) => {
  for (const ratePage of ratePages) {
    showRateOnLinks(ratePage)
  }
}
const init = async () => {
  const ratePages = await getRatePages()
  showRates(ratePages)
}
window.onload = () => {
  init()
}
