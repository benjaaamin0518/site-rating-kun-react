import React, { useContext } from 'react'
import { Input } from 'semantic-ui-react'
import { SiteRatingContext } from '../../browserAction/contexts/SiteRatingContext'
import { rateSelectObj } from '../../common/constants'
const SiteRatingSearch = () => {
  const { setSearchInputValue } = useContext(SiteRatingContext)
  const onChange: (value: string) => void = (value) => {
    setSearchInputValue(value)
  }
  return (
    <Input
      icon="search"
      placeholder={`例:${rateSelectObj['3'].name}/キーワード`}
      className={'siteRatingSearch'}
      onChange={(event, data) => onChange(data.value)}
    />
  )
}
export default SiteRatingSearch
