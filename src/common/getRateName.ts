import { selectTypeUnion } from 'browserAction/contexts/SiteRatingContext'
import { rateSelectObj } from './constants'

type getRateNameType = (rate: selectTypeUnion) => string
const getRateName: getRateNameType = (rate) => {
  return rateSelectObj[rate].name
}
export default getRateName
