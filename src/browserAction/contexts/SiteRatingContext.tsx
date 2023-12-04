import { currentPageObjType, messageBGUnionType } from 'backgroundWorker'
import React, { createContext, useEffect, useState } from 'react'
import chromeApi from '../../common/chromeApi'
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
}
type currentSiteRateSaveType = (selectValue: selectTypeUnion) => void
type currentSiteTitleSaveType = (valie: string) => void
export type selectTypeUnion = keyof typeof rateSelectObj
export type cardBaseOptionType = {
  date: string
  url: string
  title: string
  rate: selectTypeUnion
}
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
  currentSiteTitleSave: () => {}
}
export const SiteRatingContext = createContext<contextValueType>(contextValue)
const SiteRatingContextProvider = ({ children }: Props) => {
  const [isUpdating, setIsUpdating] = useState(contextValue.isUpdating)
  const [isSucceed, setIsSucceed] = useState(contextValue.isSucceed)
  const [currentCardExtOption, setCurrentCardExtOption] =
    useState<cardExtOptionType>(contextValue.currentCardExtOption)
  const [currentOtherCardExtOptionArr, setCurrentOtherCardExtOptionArr] =
    useState<cardExtOptionArrType>(contextValue.currentOtherCardExtOptionArr)
  const { getStorage, setStorage, sendMessage } = chromeApi()
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
  useEffect(() => {
    if (isUpdating) {
      setStorage([currentCardExtOption, ...currentOtherCardExtOptionArr])
    }
  }, [currentCardExtOption])
  useEffect(() => {
    const getCurrentPageobj = async () => {
      const currentObj = await sendMessage<
        currentPageObjType,
        messageBGUnionType
      >('getCurrentUrl')
      return currentObj
    }
    const getCardExtOptionArr = async (currentObj: currentPageObjType) => {
      const storageValue = await getStorage()
      console.log(storageValue)
      const defaultCurrentobj: cardBaseOptionType = {
        ...contextValue.currentCardExtOption,
        url: currentObj.url,
        title: currentObj.title
      }
      const currentCardBaseOption =
        storageValue.find((value) => value.url === currentObj.url) ||
        defaultCurrentobj
      const currentOtherCardBaseOption = storageValue.filter(
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
      setCurrentCardExtOption(currentCardExtOption)
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
        currentSiteTitleSave: currentSiteTitleSave
      }}
    >
      {children}
    </SiteRatingContext.Provider>
  )
}
export default SiteRatingContextProvider
