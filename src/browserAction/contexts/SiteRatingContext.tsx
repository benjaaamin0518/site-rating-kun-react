import { createContext, useState } from 'react'
import React from 'react'
import { ratingSelectObj } from 'common/constants'
type contextValueType = {
  isUpdating: boolean
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>
  isSucceed: boolean
  setIsSucceed: React.Dispatch<React.SetStateAction<boolean>>
}
export type selectTypeUnion = keyof typeof ratingSelectObj
export type cardBaseOptionType = {
  date: Date
  url: string
  title: string
  rating: selectTypeUnion
}
export type cardExtOptionType = {
  option: cardBaseOptionType & {
    isCurrentUrl: boolean
  }
}
type Props = { children: React.ReactNode }
const contextValue: contextValueType = {
  isUpdating: false,
  setIsUpdating: () => {},
  isSucceed: false,
  setIsSucceed: () => {}
}
export const SiteRatingContext = createContext<contextValueType>(contextValue)
const SiteRatingContextProvider = ({ children }: Props) => {
  const [isUpdating, setIsUpdating] = useState(true)
  const [isSucceed, setIsSucceed] = useState(true)

  return (
    <SiteRatingContext.Provider
      value={{
        isUpdating: isUpdating,
        setIsUpdating: setIsUpdating,
        isSucceed: isSucceed,
        setIsSucceed: setIsSucceed
      }}
    >
      {children}
    </SiteRatingContext.Provider>
  )
}
export default SiteRatingContextProvider
