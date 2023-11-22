import React from 'react'
import { Button } from 'semantic-ui-react'

const CsvButtonConditionals = () => (
  <div style={{ margin: '20px' }}>
    <Button.Group>
      <Button primary compact>
        Import
      </Button>
      <Button.Or />
      <Button compact>Export</Button>
    </Button.Group>
  </div>
)

export default CsvButtonConditionals
