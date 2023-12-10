import React, { useContext, useEffect, useState } from 'react'
import { Form, Radio } from 'semantic-ui-react'
import { rateSelectObj } from '../../common/constants'
import {
  selectTypeUnion,
  SiteRatingContext
} from '../contexts/SiteRatingContext'
const SiteRatingForm = () => {
  const { currentSiteRateSave, currentCardExtOption } =
    useContext(SiteRatingContext)
  const [selectValue, setSelectValue] = useState<selectTypeUnion | null>(null)
  const handleClick = (selectValue: selectTypeUnion | null) =>
    setSelectValue(selectValue)
  const structEntriesObj = <T extends Record<string, any>>(
    object: T
  ): [keyof T, T[keyof T]][] => {
    return Object.entries(object)
      .filter(([key, value]) => key !== '0')
      .sort(([key, value], [key2, value2]) => (key < key2 ? 1 : -1))
  }
  useEffect(() => {
      setSelectValue(currentCardExtOption.rate)
  }, [currentCardExtOption.rate])
  return (
    <Form>
      <Form.Group grouped>
        <label>このサイトの評価は？</label>
        {structEntriesObj(rateSelectObj).map(([key, value]) => {
          const isChecked = key == selectValue
          console.log(isChecked)
          return (
            <Form.Field>
              <Radio
                label={value.name}
                control="input"
                type="radio"
                name="htmlRadios"
                value={key}
                checked={isChecked}
                onChange={() => handleClick(key)}
              />
            </Form.Field>
          )
        })}
      </Form.Group>
      <Form.Button
        compact
        primary
        onClick={() => currentSiteRateSave(selectValue || '0')}
      >
        評価を保存する
      </Form.Button>
    </Form>
  )
}
export default SiteRatingForm
