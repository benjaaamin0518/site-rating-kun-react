import React, { useContext, useRef } from 'react'
import { Button } from 'semantic-ui-react'
import { SiteRatingContext } from '../../browserAction/contexts/SiteRatingContext'
import getRateName from '../../common/getRateName'

const CsvButtonConditionals = () => {
  const { currentCardExtOption, currentOtherCardExtOptionArr } =
    useContext(SiteRatingContext)
  const inputfileRef = useRef<HTMLInputElement>(null)
  const exportCsv = () => {
    const cardExtOptionArr = [
      currentCardExtOption,
      ...currentOtherCardExtOptionArr
    ]
    const exportCsvValue = cardExtOptionArr.reduce(
      (csvValue, { url, title, date, rate }) => {
        csvValue +=
          `${getRateName(rate)},` +
          '"' +
          title.replace(/\"\,/g, '""') +
          '"' +
          `,${url},${date}\n`
        return csvValue
      },
      ''
    )
    console.log(exportCsvValue)
    const downloadLink = document.createElement('a')
    const bom = new Uint8Array([0xef, 0xbb, 0xbf])
    let blob
    blob = new Blob([bom, exportCsvValue], {
      type: 'text/csv'
    })
    downloadLink.setAttribute('download', 'Export.csv')
    downloadLink.setAttribute('href', window.webkitURL.createObjectURL(blob))
    downloadLink.click()
  }
  return (
    <div style={{ margin: '20px' }}>
      <Button.Group>
        <input
          ref={inputfileRef}
          type="file"
          className="inputfile"
          style={{ display: 'none' }}
          id="embedpollfileinput"
        />
        <Button
          primary
          compact
          onClick={() => {
            inputfileRef.current!.click()
          }}
        >
          インポート
        </Button>
        <Button.Or />
        <Button
          compact
          onClick={() => {
            exportCsv()
          }}
        >
          エクスポート
        </Button>
      </Button.Group>
    </div>
  )
}

export default CsvButtonConditionals
