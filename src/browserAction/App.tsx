import UpdatingMsg from './components/UpdatingMsg'
import React from 'react'
import SiteRatingContextProvider from './contexts/SiteRatingContext'
import SucceedMsg from './components/SucceedMsg'
import SiteRatingCard from './components/SiteRatingCard'
import SiteRatingForm from './components/SiteRatingForm'
import DetailMsg from './components/DetailMsg'
import SiteRatingSearch from './components/SiteRatingSearch'
const App = () => {
  return (
    <SiteRatingContextProvider>
      <UpdatingMsg />
      <SucceedMsg />
      <SiteRatingCard
        option={{
          title: 'test',
          url: 'test',
          date: new Date(),
          rating: '4',
          isCurrentUrl: true
        }}
      />
      <SiteRatingForm />
      <DetailMsg />
      <SiteRatingSearch />
    </SiteRatingContextProvider>
  )
}
export default App
