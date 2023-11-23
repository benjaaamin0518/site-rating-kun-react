import React from 'react'
import { Message } from 'semantic-ui-react'
import CsvButtonConditionals from './CsvButtonConditionals'
const DetailMsg = () => {
  const msgList = [
    '表示がおかしい場合は再度ページの読み込みを行ってください。',
    '評価は実際のサイトに訪れないと変更できません'
  ]
  return (
    <Message>
      <Message.Header>CSVインポート・エクスポート</Message.Header>
      <CsvButtonConditionals />
      <Message.Header>他のサイトでの評価 </Message.Header>
      <Message.List>
        {msgList.map((msg) => (
          <Message.Item>{msg}</Message.Item>
        ))}
      </Message.List>
    </Message>
  )
}
export default DetailMsg
