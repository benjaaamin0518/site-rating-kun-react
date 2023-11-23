import React from 'react'
import { Button, Card } from 'semantic-ui-react'
import { cardExtOptionType } from '../contexts/SiteRatingContext'
const SiteRatingCardButton = ({ url }: cardExtOptionType) => {
  console.log(url)
  return (
    <Card.Content extra>
      <div className="ui two buttons">
        <Button
          basic
          color="green"
          onClick={(event) => {
            event.preventDefault()
            alert()
          }}
        >
          編集
        </Button>
        <Button basic color="red">
          削除
        </Button>
      </div>
    </Card.Content>
  )
}
export default SiteRatingCardButton
