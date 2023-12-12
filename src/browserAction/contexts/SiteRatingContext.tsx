import { currentPageObjType } from 'backgroundWorker'
import React, { createContext, useEffect, useRef, useState } from 'react'
import chromeApi, { chromeStorageType } from '../../common/chromeApi'
import { rateSelectObj } from '../../common/constants'
type contextValueType = {
  isUpdating: boolean
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>
  isSucceed: boolean
  setIsSucceed: React.Dispatch<React.SetStateAction<boolean>>
  currentCardExtOption: cardExtOptionType
  currentOtherCardExtOptionArr: cardExtOptionArrType
  currentSiteRateSave: currentSiteRateSaveType
  currentSiteTitleSave: currentSiteTitleSaveType
  searchInputValue: string
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>
  currentSiteRateDelete: currentSiteRateDeleteType
  isVisible: boolean
  qiitaPostsVisibleSave: qiitaPostsVisibleSaveType
}
type sendMessageType = 'runtime' | 'tabs'
type currentSiteRateSaveType = (selectValue: selectTypeUnion) => void
type currentSiteTitleSaveType = (valie: string) => void
type currentSiteRateDeleteType = () => void
export type selectTypeUnion = keyof typeof rateSelectObj
export type cardBaseOptionType = {
  date: string
  url: string
  title: string
  rate: selectTypeUnion
}
type qiitaPostsVisibleSaveType = (isVisible: boolean) => void
export type cardBaseOptionArrType = Array<cardBaseOptionType>
export type cardExtOptionType = cardBaseOptionType & {
  isCurrentUrl: boolean
}
export type cardExtOptionArrType = cardExtOptionType[]
type Props = { children: React.ReactNode }
const contextValue: contextValueType = {
  isUpdating: false,
  setIsUpdating: () => {},
  isSucceed: false,
  setIsSucceed: () => {},
  currentCardExtOption: {
    date: new Date().toLocaleDateString(),
    url: '',
    title: '',
    rate: `0`,
    isCurrentUrl: true
  },
  currentOtherCardExtOptionArr: [],
  currentSiteRateSave: () => {},
  currentSiteTitleSave: () => {},
  searchInputValue: '',
  setSearchInputValue: () => {},
  currentSiteRateDelete: () => {},
  isVisible: true,
  qiitaPostsVisibleSave: () => {}
}
export const SiteRatingContext = createContext<contextValueType>(contextValue)
const SiteRatingContextProvider = ({ children }: Props) => {
  const [isUpdating, setIsUpdating] = useState(contextValue.isUpdating)
  const [isSucceed, setIsSucceed] = useState(contextValue.isSucceed)
  const [isVisible, setIsVisible] = useState(contextValue.isVisible)
  const [currentCardExtOption, setCurrentCardExtOption] =
    useState<cardExtOptionType>(contextValue.currentCardExtOption)
  const [currentOtherCardExtOptionArr, setCurrentOtherCardExtOptionArr] =
    useState<cardExtOptionArrType>(contextValue.currentOtherCardExtOptionArr)
  const [searchInputValue, setSearchInputValue] = useState(
    contextValue.searchInputValue
  )
  const storageValueRef = useRef<chromeStorageType>({
    storage: [],
    isVisible: isVisible
  })
  const { getStorage, setStorage, sendMessage, query } = chromeApi()
  const currentSiteRateSave: currentSiteRateSaveType = (selectValue) => {
    setCurrentCardExtOption((currentCardExtOption) => {
      return { ...currentCardExtOption, rate: selectValue }
    })
    setIsUpdating(true)
  }
  const currentSiteTitleSave: currentSiteTitleSaveType = (value) => {
    setCurrentCardExtOption((currentCardExtOption) => {
      return { ...currentCardExtOption, title: value }
    })
    setIsUpdating(true)
  }
  const currentSiteRateDelete: currentSiteRateDeleteType = () => {
    setCurrentCardExtOption((currentCardExtOption) => {
      return { ...currentCardExtOption, rate: '0' }
    })
    setIsUpdating(true)
  }
  const qiitaPostsVisibleSave: qiitaPostsVisibleSaveType = async (
    isVisible
  ) => {
    storageValueRef.current = { ...storageValueRef.current, isVisible }
    setIsVisible(isVisible)
    setStorage(storageValueRef.current)
    await sendMessage<sendMessageType, 'tabs'>('tabs', 'changeQiitaVisible')
  }
  useEffect(() => {
    const isDelete = currentCardExtOption.rate === '0'
    const setStorageValue = isDelete
      ? [...currentOtherCardExtOptionArr]
      : [currentCardExtOption, ...currentOtherCardExtOptionArr]
    storageValueRef.current = { storage: setStorageValue, isVisible: isVisible }
    if (isUpdating) {
      setStorage(storageValueRef.current)
      const updateRateElement = async () => {
        await sendMessage<sendMessageType, 'tabs'>('tabs', 'changeCurrentRate')
      }
      updateRateElement()
    }
  }, [currentCardExtOption])
  useEffect(() => {
    const getCurrentPageobj = async () => {
      const currentObj = await sendMessage<sendMessageType, 'runtime'>(
        'runtime',
        'getCurrentUrl'
      )
      return currentObj
    }
    const getCardExtOptionArr = async (currentObj: currentPageObjType) => {
      const storageValue = await getStorage()
      const defaultCurrentobj: cardBaseOptionType = {
        ...contextValue.currentCardExtOption,
        url: currentObj.url,
        title: currentObj.title
      }
      const currentCardBaseOption =
        storageValue.storage.find((value) => value.url === currentObj.url) ||
        defaultCurrentobj
      const currentOtherCardBaseOption = storageValue.storage.filter(
        (value) => value.url !== currentObj.url
      )
      const currentCardExtOption: cardExtOptionType = {
        ...currentCardBaseOption,
        isCurrentUrl: true
      }
      const currentOtherCardExtOption: cardExtOptionArrType =
        currentOtherCardBaseOption.map((value) => {
          return { ...value, isCurrentUrl: false }
        })
      const setStorageValue =
        currentCardExtOption.rate == '0'
          ? [...currentOtherCardExtOption]
          : [currentCardExtOption, ...currentOtherCardExtOption]
      storageValueRef.current = {
        storage: setStorageValue,
        isVisible: storageValue.isVisible
      }
      setCurrentCardExtOption(currentCardExtOption)
      setIsVisible(storageValue.isVisible)
      setCurrentOtherCardExtOptionArr(currentOtherCardExtOption)
    }
    getCurrentPageobj().then((currentObj) => getCardExtOptionArr(currentObj))
  }, [])
  return (
    <SiteRatingContext.Provider
      value={{
        isUpdating: isUpdating,
        setIsUpdating: setIsUpdating,
        isSucceed: isSucceed,
        setIsSucceed: setIsSucceed,
        currentCardExtOption: currentCardExtOption,
        currentOtherCardExtOptionArr: currentOtherCardExtOptionArr,
        currentSiteRateSave: currentSiteRateSave,
        currentSiteTitleSave: currentSiteTitleSave,
        searchInputValue: searchInputValue,
        setSearchInputValue: setSearchInputValue,
        currentSiteRateDelete: currentSiteRateDelete,
        isVisible: isVisible,
        qiitaPostsVisibleSave: qiitaPostsVisibleSave
      }}
    >
      {children}
    </SiteRatingContext.Provider>
  )
}
export default SiteRatingContextProvider
