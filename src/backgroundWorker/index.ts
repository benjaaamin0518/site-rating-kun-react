export type currentPageObjType = { url: string; title: string }
type onMessageBGEventDefObjType = {
  [key: string]: { message: messageBGUnionType }
}
type messageBGUnionType = 'getCurrentUrl'
const onMessageBGEventDefObj: onMessageBGEventDefObjType = {
  getCurrentPage: { message: 'getCurrentUrl' }
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.value == onMessageBGEventDefObj.getCurrentPage.message) {
    let queryinfo = {
      active: true,
      currentWindow: true
    }
    chrome.tabs.query(queryinfo, function (tabs) {
      const response: currentPageObjType = {
        url: tabs[0].url || '',
        title: tabs[0].title || ''
      }
      sendResponse(response)
    })
    return true
  }
})
