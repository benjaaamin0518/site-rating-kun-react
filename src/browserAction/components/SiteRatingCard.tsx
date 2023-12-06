import React, { useEffect, useState } from 'react'
import { Card, Input, Rating } from 'semantic-ui-react'
import { rateSelectObj } from '../../common/constants'
import getRateName from '../../common/getRateName'
import { cardExtOptionType } from '../contexts/SiteRatingContext'
import SiteRatingCardButton from './SiteRatingCardButton'

const SiteRatingCard = ({
  title,
  date,
  isCurrentUrl,
  url,
  rate
}: cardExtOptionType) => {
  const [isEdit, setIsEdit] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const maxRate = Object.keys(rateSelectObj).sort((a, b) => (a < b ? 1 : -1))[0]
  useEffect(() => {
    if (isEdit) {
      setInputValue(title)
    }
  }, [isEdit])
  return (
    <Card
      {...(isCurrentUrl ? {} : { href: url, onClick: () => window.open(url) })}
      className={'ratingCard'}
    >
      <Card.Content>
        <Card.Header>
          {isEdit ? (
            <Input
              value={inputValue}
              size="mini"
              fluid
              onChange={(event, data) => setInputValue(data.value)}
            />
          ) : (
            title
          )}
        </Card.Header>
        <Card.Meta>{date}</Card.Meta>
        <Card.Description>
          <Rating
            rating={rate}
            defaultRating={rate}
            maxRating={maxRate}
            disabled
          />
          {getRateName(rate)}
        </Card.Description>
      </Card.Content>
      {isCurrentUrl && (
        <SiteRatingCardButton
          {...{
            title,
            date,
            isCurrentUrl,
            url,
            rate,
            isEdit,
            setIsEdit,
            inputValue
          }}
        />
      )}
    </Card>
  )
}
export default SiteRatingCard
