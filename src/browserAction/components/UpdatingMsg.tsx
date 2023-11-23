import React, { useContext, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import { Message } from 'semantic-ui-react'
import { defaultMsgStyle } from '../../common/constants'
import { SiteRatingContext } from '../contexts/SiteRatingContext'
const UpdatingMsg = () => {
  const siteRatingContext = useContext(SiteRatingContext)
  const { isUpdating, setIsUpdating } = siteRatingContext
  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
    unmounted: { opacity: 0 }
  }
  useEffect(() => {
    if (isUpdating) {
      setTimeout(() => {
        setIsUpdating(false)
      }, 100)
    }
  }, [])
  return (
    <>
      <Transition timeout={500} in={isUpdating} mountOnEnter unmountOnExit>
        {(state) => (
          <div style={{ ...defaultMsgStyle, ...transitionStyles[state] }}>
            <Message header="変更中です " content="しばらくお待ちください。" />
          </div>
        )}
      </Transition>
    </>
  )
}
export default UpdatingMsg
