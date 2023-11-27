import chromeApi from '../common/chromeAPI'
import getRatingName from '../common/getRatingName'

export type currentPageObjType = { url: string; title: string }
type onMessageBGEventDefObjType = {
  [key: string]: { message: messageBGUnionType }
}
export type messageBGUnionType = 'getCurrentUrl'
const onMessageBGEventDefObj: onMessageBGEventDefObjType = {
  getCurrentPage: { message: 'getCurrentUrl' }
}
const { addListener, query } = chromeApi()
addListener('onMessage', (message, sender, sendResponse) => {
  if (message.value == onMessageBGEventDefObj.getCurrentPage.message) {
    let queryinfo = {
      active: true,
      currentWindow: true
    }
    console.log(getRatingName('0'))
    query(queryinfo, (tabs) => {
      const { url, title } = tabs[0]
      const response: currentPageObjType = {
        url: url || '',
        title: title || ''
      }
      console.log(response)
      sendResponse(response)
    })
  }
  return true
})
