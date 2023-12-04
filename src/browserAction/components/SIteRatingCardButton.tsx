import React, { useContext } from 'react'
import { Button, Card } from 'semantic-ui-react'
import {
  cardExtOptionType,
  SiteRatingContext
} from '../contexts/SiteRatingContext'
const SiteRatingCardButton = ({
  title,
  url,
  isEdit,
  setIsEdit,
  inputValue
}: cardExtOptionType & {
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  inputValue: string
}) => {
  const { currentSiteTitleSave } = useContext(SiteRatingContext)
  console.log(url)
  return (
    <Card.Content extra>
      <div className="ui two buttons">
        <Button
          {...(isEdit ? { positive: true } : { basic: true, color: 'green' })}
          onClick={(event) => {
            event.preventDefault()
            if (isEdit) {
              currentSiteTitleSave(inputValue)
              setIsEdit(false)
              return
            }
            setIsEdit(true)
          }}
        >
          {isEdit ? '変更する' : '編集'}
        </Button>
        <Button
          {...(isEdit ? {} : { basic: true, color: 'red' })}
          onClick={(event) => {
            event.preventDefault()
            if (isEdit) {
              setIsEdit(false)
              return
            }
          }}
        >
          {isEdit ? 'キャンセル' : '削除'}
        </Button>
      </div>
    </Card.Content>
  )
}
export default SiteRatingCardButton
