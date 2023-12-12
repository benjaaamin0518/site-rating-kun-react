import { selectTypeUnion } from 'browserAction/contexts/SiteRatingContext'
import { rateSelectObj } from './constants'
export type rateNameUnionType =
  (typeof rateSelectObj)[keyof typeof rateSelectObj][keyof (typeof rateSelectObj)[keyof typeof rateSelectObj]]

type getRateType = (rateName: rateNameUnionType) => selectTypeUnion | undefined
const getRate: getRateType = (rateName) => {
  const structEntriesObj = <T extends Record<string, any>>(
    obj: T
  ): [keyof T, T[keyof T]][] => {
    return Object.entries(obj)
  }
  return structEntriesObj(rateSelectObj).find(
    ([key, { name }]) => name == rateName
  )?.[0]
}
export default getRate
