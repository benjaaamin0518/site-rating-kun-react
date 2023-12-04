import React, { useContext, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import { Message } from 'semantic-ui-react'
import { defaultMsgStyle } from '../../common/constants'
import { SiteRatingContext } from '../contexts/SiteRatingContext'
const SucceedMsg = () => {
  const siteRatingContext = useContext(SiteRatingContext)
  const { isSucceed, setIsSucceed } = siteRatingContext
  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
    unmounted: { opacity: 0 }
  }
  useEffect(() => {
    if (isSucceed) {
      setTimeout(() => {
        setIsSucceed(false)
      }, 500)
    }
  }, [isSucceed])
  return (
    <>
      <Transition timeout={500} in={isSucceed} mountOnEnter unmountOnExit>
        {(state) => (
          <div style={{ ...defaultMsgStyle, ...transitionStyles[state] }}>
            <Message
              success
              header="変更が無事完了しました "
              content="評価が変更されました"
            />
          </div>
        )}
      </Transition>
    </>
  )
}
export default SucceedMsg
