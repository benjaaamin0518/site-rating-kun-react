import { cardExtOptionType } from 'browserAction/contexts/SiteRatingContext'
import { Card, Rating } from 'semantic-ui-react'
import React from 'react'
import SiteRatingCardButton from './SiteRatingCardButton'
import getRatingName from '../../common/getRatingName'
import { ratingSelectObj } from '../../common/constants'

const SiteRatingCard = ({
  option: { title, date, isCurrentUrl, url, rating }
}: cardExtOptionType) => {
  const maxRating = Object.keys(ratingSelectObj).sort((a, b) =>
    a < b ? 1 : -1
  )[0]
  return (
    <Card href={(!isCurrentUrl || ``) && url} className={'ratingCard'}>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{date.toLocaleDateString()}</Card.Meta>
        <Card.Description>
          <Rating defaultRating={rating} maxRating={maxRating} disabled />
          {getRatingName(rating)}
        </Card.Description>
      </Card.Content>
      <SiteRatingCardButton
        option={{ title, date, isCurrentUrl, url, rating }}
      />
    </Card>
  )
}
export default SiteRatingCard
