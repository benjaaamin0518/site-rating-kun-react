import { Input } from 'semantic-ui-react'
import React from 'react'
import { ratingSelectObj } from '../../common/constants'
const SiteRatingSearch = () => {
  return (
    <Input
      icon="search"
      placeholder={`例:${ratingSelectObj['3'].name}/キーワード`}
      className={'siteRatingSearch'}
    />
  )
}
export default SiteRatingSearch
