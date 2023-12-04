import React, { useContext } from 'react'
import { SiteRatingContext } from '../contexts/SiteRatingContext'
import SiteRatingCard from './SiteRatingCard'

const CurrentOtherSiteRatingCardList = () => {
  const { currentOtherCardExtOptionArr } = useContext(SiteRatingContext)
  return (
    <>
      {currentOtherCardExtOptionArr.map((currentOtherCardExtOption) => (
        <SiteRatingCard {...currentOtherCardExtOption} />
      ))}
    </>
  )
}
export default CurrentOtherSiteRatingCardList
