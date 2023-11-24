import { getBucket } from '@extend-chrome/storage'
import { cardBaseOptionArrType } from 'browserAction/contexts/SiteRatingContext'
import { currentPageObjType, messageBGUnionType } from '../backgroundWorker'
// export type currentPageObjType = { url: string; title: string }
type chromeStorageType = { storage: cardBaseOptionArrType }
namespace chromeApiType {
  export type chromeApiType = () => {
    setStorage: setStorage
    getStorage: getStorage
    getCurrentPage: getCurrentPage
  }
  export type setStorage = (value: cardBaseOptionArrType) => void
  export type getStorage = () => Promise<cardBaseOptionArrType>
  export type getCurrentPage = () => Promise<currentPageObjType>
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
  const getCurrentPage: chromeApiType.getCurrentPage = () => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage<{ value: messageBGUnionType }>(
        {
          value: `getCurrentUrl`
        },
        (response: currentPageObjType) => {
          resolve(response)
        }
      )
    })
  }
  return { setStorage, getStorage, getCurrentPage }
}

export default chromeApi
