import React, { useContext, useRef } from 'react'
import { Button } from 'semantic-ui-react'
import {
  cardBaseOptionType,
  SiteRatingContext
} from '../../browserAction/contexts/SiteRatingContext'
import chromeApi from '../../common/chromeApi'
import { rateSelectObj } from '../../common/constants'
import getRate, { rateNameUnionType } from '../../common/getRate'
import getRateName from '../../common/getRateName'

const CsvButtonConditionals = () => {
  const { setStorage } = chromeApi()
  const { currentCardExtOption, currentOtherCardExtOptionArr, isVisible } =
    useContext(SiteRatingContext)
  const inputfileRef = useRef<HTMLInputElement>(null)
  const exportCsv = () => {
    const cardExtOptionArr =
      currentCardExtOption.rate == '0'
        ? [...currentOtherCardExtOptionArr]
        : [currentCardExtOption, ...currentOtherCardExtOptionArr]
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
  const fetchAsCsv: (file: File) => Promise<[boolean, cardBaseOptionType[]]> = (
    file
  ) => {
    return new Promise((resolve, reject) => {
      try {
        let isValid = true
        const fr = new FileReader()
        fr.readAsText(file)
        fr.onload = (e) => {
          const result = e.target?.result
          if (result == '\r\n' || result == '' || typeof result !== 'string') {
            isValid = false
            resolve([isValid, []])
            return
          }
          const parseCsvLine: (columnItems: string[]) => cardBaseOptionType = (
            columnItems: string[]
          ) =>
            columnItems.reduce(
              (obj, columnItem, index, test) => {
                const item = columnItem
                let newObj = {}
                switch (index) {
                  case 0:
                    const isValidRate = (
                      item: any
                    ): item is rateNameUnionType => {
                      return Object.values(rateSelectObj).some(
                        (obj) => obj.name == item
                      )
                    }
                    if (!isValidRate(item)) {
                      isValid = false
                      resolve([isValid, []])
                      break
                    }
                    if (!getRate(item) || getRate(item) == '0') {
                      isValid = false
                      resolve([isValid, []])
                      break
                    }
                    newObj = { rate: getRate(item) }
                    break
                  case 1:
                    newObj = {
                      title: item.replace(/\"+/g, (m) =>
                        '"'.repeat(m.length / 2)
                      )
                    }
                    break
                  case 2:
                    newObj = { url: item }
                    break
                  case 3:
                    newObj = { date: item }
                    break
                }
                obj = { ...obj, ...newObj }
                return obj
              },
              { url: '', title: '', date: '', rate: '0' }
            )
          const lines = result.split(/\n/).filter((res) => res !== '')
          console.log(lines)
          const parseCsvLines = lines
            .map((line) => {
              const columnItems = line.split(',')
              if (columnItems.length > 4) {
                isValid = false
                return null
              }
              return parseCsvLine(columnItems)
            })
            .filter((e): e is cardBaseOptionType => e !== null)
          resolve([isValid, parseCsvLines])
        }
      } catch {
        resolve([false, []])
      }
    })
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
          onChange={async (event) => {
            const file = event.currentTarget.files![0]
            if (!file) return
            const [isValid, parseCsvLines] = await fetchAsCsv(file)
            if (!isValid) {
              alert('インポートに失敗しました。')
              event.currentTarget.files = null
              return
            }
            if (!alert('インポートに成功しました。')) {
              setStorage({ isVisible, storage: parseCsvLines })
              location.reload()
            }
          }}
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
