import React, { useContext, useState } from 'react'
import { Form } from 'semantic-ui-react'
import { ratingSelectObj } from '../../common/constants'
import {
  selectTypeUnion,
  SiteRatingContext
} from '../contexts/SiteRatingContext'
const SiteRatingForm = () => {
  const siteRatingContext = useContext(SiteRatingContext)
  const [selectValue, setSelectValue] = useState<selectTypeUnion>('0')
  const handleClick = (selectValue: selectTypeUnion) =>
    setSelectValue(selectValue)
  const structEntriesObj = <T extends Record<string, any>>(
    object: T
  ): [keyof T, T[keyof T]][] => {
    return Object.entries(object)
      .filter(([key, value]) => key !== '0')
      .sort(([key, value], [key2, value2]) => (key < key2 ? 1 : -1))
  }
  return (
    <Form>
      <Form.Group grouped>
        <label>このサイトの評価は？</label>
        {structEntriesObj(ratingSelectObj).map(([key, value]) => (
          <Form.Field
            label={value.name}
            control="input"
            type="radio"
            name="htmlRadios"
            value={key}
            onChange={() => handleClick(key)}
          />
        ))}
      </Form.Group>
      <Form.Button
        compact
        primary
        onClick={() => siteRatingContext.currentSiteRatingSave(selectValue)}
      >
        Save
      </Form.Button>
    </Form>
  )
}
export default SiteRatingForm
