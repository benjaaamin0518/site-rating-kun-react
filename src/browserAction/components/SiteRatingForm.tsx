import { Button, Form } from 'semantic-ui-react'
import React from 'react'
import { ratingSelectObj } from '../../common/constants'
const SiteRatingForm = () => {
  return (
    <Form>
      <Form.Group grouped>
        <label>このサイトの評価は？</label>
        {Object.entries(ratingSelectObj).map(([key, value]) => (
          <Form.Field
            label={value.name}
            control="input"
            type="radio"
            name="htmlRadios"
            value={key}
          />
        ))}
      </Form.Group>
      <Button primary compact>
        Save
      </Button>
    </Form>
  )
}
export default SiteRatingForm
