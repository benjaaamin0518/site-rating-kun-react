import { selectTypeUnion } from 'browserAction/contexts/SiteRatingContext'
import { ratingSelectObj } from './constants'

type getRatingNameType = (rating: selectTypeUnion) => string
const getRatingName: getRatingNameType = (rating) => {
  return ratingSelectObj[rating].name
}
export default getRatingName
