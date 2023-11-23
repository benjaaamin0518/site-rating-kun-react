import React from 'react'
import { Card, Rating } from 'semantic-ui-react'
import { ratingSelectObj } from '../../common/constants'
import getRatingName from '../../common/getRatingName'
import { cardExtOptionType } from '../contexts/SiteRatingContext'
import SiteRatingCardButton from './SiteRatingCardButton'

const SiteRatingCard = ({
  title,
  date,
  isCurrentUrl,
  url,
  rating
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
          <Rating
            rating={rating}
            defaultRating={rating}
            maxRating={maxRating}
            disabled
          />
          {getRatingName(rating)}
        </Card.Description>
      </Card.Content>
      <SiteRatingCardButton {...{ title, date, isCurrentUrl, url, rating }} />
    </Card>
  )
}
export default SiteRatingCard
