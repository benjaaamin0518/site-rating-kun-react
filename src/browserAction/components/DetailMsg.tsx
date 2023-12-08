import React, { useContext } from 'react'
import { Checkbox, Message } from 'semantic-ui-react'
import { SiteRatingContext } from '../../browserAction/contexts/SiteRatingContext'
import CsvButtonConditionals from './CsvButtonConditionals'
const DetailMsg = () => {
  const msgList = [
    '表示がおかしい場合は再度ページの読み込みを行ってください。',
    '評価は実際のサイトに訪れないと変更できません'
  ]
  const { isVisible, qiitaPostsVisibleSave } = useContext(SiteRatingContext)
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
      <div style={{ height: 10 }}></div>
      <Message.Header>Qiita関連記事表示 </Message.Header>
      <Checkbox
        toggle
        className="visibleToggle"
        onChange={() => {
          qiitaPostsVisibleSave(!isVisible)
        }}
        checked={isVisible}
      />
    </Message>
  )
}
export default DetailMsg
