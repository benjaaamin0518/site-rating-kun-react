import React, { useContext } from 'react'
import CurrentOtherSiteRatingCardList from './components/CurrentOtherSiteRatingCardList'
import DetailMsg from './components/DetailMsg'
import SiteRatingCard from './components/SiteRatingCard'
import SiteRatingForm from './components/SiteRatingForm'
import SiteRatingSearch from './components/SiteRatingSearch'
import SucceedMsg from './components/SucceedMsg'
import UpdatingMsg from './components/UpdatingMsg'
import { SiteRatingContext } from './contexts/SiteRatingContext'
const App = () => {
  const { currentCardExtOption } = useContext(SiteRatingContext)
  return (
    <>
      <UpdatingMsg />
      <SucceedMsg />
      <SiteRatingCard {...currentCardExtOption} />
      <SiteRatingForm />
      <DetailMsg />
      <SiteRatingSearch />
      <CurrentOtherSiteRatingCardList />
    </>
  )
}
export default App
