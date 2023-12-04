import React from 'react'
import { Input } from 'semantic-ui-react'
import { rateSelectObj } from '../../common/constants'
const SiteRatingSearch = () => {
  return (
    <Input
      icon="search"
      placeholder={`例:${rateSelectObj['3'].name}/キーワード`}
      className={'siteRatingSearch'}
    />
  )
}
export default SiteRatingSearch
