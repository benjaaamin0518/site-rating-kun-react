import React, { useContext, useEffect, useState } from 'react'
import { rateSelectObj } from '../../common/constants'
import {
  cardExtOptionArrType,
  SiteRatingContext
} from '../contexts/SiteRatingContext'
import SiteRatingCard from './SiteRatingCard'

const CurrentOtherSiteRatingCardList = () => {
  const { currentOtherCardExtOptionArr, searchInputValue } =
    useContext(SiteRatingContext)
  const [currentOtherCardArr, setCurrentOtherCardArr] =
    useState<cardExtOptionArrType>(currentOtherCardExtOptionArr)
  useEffect(() => {
    const searchRate = Object.entries(rateSelectObj).find(([key, { name }]) =>
      new RegExp(`^${name}\/`).test(searchInputValue)
    )
    console.log(searchRate)
    if (!searchRate) {
      setCurrentOtherCardArr(() => {
        return currentOtherCardExtOptionArr.filter((currentOtherCard) =>
          new RegExp(searchInputValue, 'gi').test(currentOtherCard.title)
        )
      })
      return
    }
    const [rate, { name }] = searchRate
    const searchWord = searchInputValue.replace(new RegExp(`^${name}\/`), '')
    setCurrentOtherCardArr(() => {
      return currentOtherCardExtOptionArr.filter(
        (currentOtherCard) =>
          currentOtherCard.rate === rate &&
          new RegExp(searchWord, 'gi').test(currentOtherCard.title)
      )
    })
    console.log(currentOtherCardArr)
  }, [searchInputValue])
  useEffect(() => {
    setCurrentOtherCardArr(currentOtherCardExtOptionArr)
  }, [currentOtherCardExtOptionArr])
  return (
    <>
      {currentOtherCardArr.map((currentOtherCard) => (
        <SiteRatingCard {...currentOtherCard} />
      ))}
    </>
  )
}
export default CurrentOtherSiteRatingCardList
