import { getBucket } from '@extend-chrome/storage'
import { cardBaseOptionArrType } from 'browserAction/contexts/SiteRatingContext'
import { messageCSUnionType } from 'contentScript'
import { currentPageObjType, messageBGUnionType } from '../backgroundWorker'
export type chromeStorageType = {
  storage: cardBaseOptionArrType
  isVisible: boolean
}
type messageUnionType = {
  runtime: messageBGUnionType
  tabs: messageCSUnionType
}
type sendMessageResUnionType = {
  runtime: currentPageObjType
  tabs: currentPageObjType
}
type categoryUnionType = 'onMessage'
type sendMessageType = 'runtime' | 'tabs'
namespace chromeApiType {
  export type chromeApiType = () => {
    setStorage: setStorage
    getStorage: getStorage
    sendMessage: sendMessage
    addListener: addListener
    query: query
  }
  export type setStorage = (value: chromeStorageType) => void
  export type getStorage = () => Promise<chromeStorageType>
  export type getCurrentPage = () => Promise<currentPageObjType>
  export type sendMessage = <T extends sendMessageType, P extends T>(
    type: Exclude<sendMessageType, P> extends never
      ? 'どちらかを指定してください'
      : P,
    value: messageUnionType[P]
  ) => Promise<sendMessageResUnionType[P]>
  export type addListener = <
    T extends messageUnionType[keyof messageUnionType]
  >(
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
    bucket.set(value)
  }
  const getStorage: chromeApiType.getStorage = async () => {
    const value = await bucket.get()
    return value || { storage: [], isVisible: true }
  }
  const query: chromeApiType.query = (queryInfo, callback) => {
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs)
    })
  }
  const sendMessage: chromeApiType.sendMessage = (type, value) => {
    return new Promise((resolve) => {
      switch (type) {
        case 'runtime':
          chrome.runtime.sendMessage(
            {
              value: value
            },
            (response) => {
              resolve(response)
            }
          )
          break
        case 'tabs':
          query(
            {
              active: true,
              currentWindow: true
            },
            (tabs) => {
              chrome.tabs.sendMessage(
                tabs[0].id!,
                {
                  value: value
                },
                (response) => {
                  resolve(response)
                }
              )
            }
          )
          break
      }
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
        break
    }
  }
  return { setStorage, getStorage, sendMessage, addListener, query }
}

export default chromeApi
