import React, { useContext } from 'react'
import DetailMsg from './components/DetailMsg'
import SiteRatingCard from './components/SiteRatingCard'
import SiteRatingForm from './components/SiteRatingForm'
import SiteRatingSearch from './components/SiteRatingSearch'
import SucceedMsg from './components/SucceedMsg'
import UpdatingMsg from './components/UpdatingMsg'
import { SiteRatingContext } from './contexts/SiteRatingContext'
const App = () => {
  const siteRatingContext = useContext(SiteRatingContext)
  console.log(siteRatingContext.currentCardExtOption)
  return (
    <>
      <UpdatingMsg />
      <SucceedMsg />
      <SiteRatingCard {...siteRatingContext.currentCardExtOption} />
      <SiteRatingForm />
      <DetailMsg />
      <SiteRatingSearch />
    </>
  )
}
export default App
