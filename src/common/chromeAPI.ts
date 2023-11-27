import { getBucket } from '@extend-chrome/storage'
import { cardBaseOptionArrType } from 'browserAction/contexts/SiteRatingContext'
import { currentPageObjType, messageBGUnionType } from '../backgroundWorker'
// export type currentPageObjType = { url: string; title: string }
type chromeStorageType = { storage: cardBaseOptionArrType }
type messageUnionType = messageBGUnionType
type sendMessageResUnionType = currentPageObjType
type categoryUnionType = 'onMessage'
namespace chromeApiType {
  export type chromeApiType = () => {
    setStorage: setStorage
    getStorage: getStorage
    sendMessage: sendMessage
    addListener: addListener
    query: query
  }
  export type setStorage = (value: cardBaseOptionArrType) => void
  export type getStorage = () => Promise<cardBaseOptionArrType>
  export type getCurrentPage = () => Promise<currentPageObjType>
  export type sendMessage = <
    T extends sendMessageResUnionType,
    K extends messageUnionType
  >(
    value: K
  ) => Promise<T>
  export type addListener = <T extends messageUnionType>(
    category: categoryUnionType,
    callback: (
      message: { value: T },
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => boolean
  ) => void
  export type query = (
    queryInfo: chrome.tabs.QueryInfo,
    callback: (tabs: chrome.tabs.Tab[]) => void
  ) => void
}
const chromeApi: chromeApiType.chromeApiType = () => {
  const bucket = getBucket<chromeStorageType>('site-rating-bucket')
  const setStorage: chromeApiType.setStorage = (value) => {
    bucket.set({ storage: value })
  }
  const getStorage: chromeApiType.getStorage = async () => {
    const value = await bucket.get()
    return value.storage || []
  }
  const sendMessage: chromeApiType.sendMessage = (value) => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          value: value
        },
        (response) => {
          resolve(response)
        }
      )
    })
  }
  const addListener: chromeApiType.addListener = (category, callback) => {
    switch (category) {
      case 'onMessage':
        chrome.runtime.onMessage.addListener(
          (message, sender, sendResponse) => {
            return callback(message, sender, sendResponse)
          }
        )
    }
  }
  const query: chromeApiType.query = (queryInfo, callback) => {
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs)
    })
  }
  return { setStorage, getStorage, sendMessage, addListener, query }
}

export default chromeApi
