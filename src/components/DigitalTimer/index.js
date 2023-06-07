import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timerMinutes: 25, timerSeconds: 0}

  componentWillUnmount = () => {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => {
    clearInterval(this.timerId)
  }

  decrementBtn = () => {
    const {timerMinutes, isTimerRunning} = this.state
    if (!isTimerRunning) {
      if (timerMinutes > 1) {
        this.setState(prevState => ({timerMinutes: prevState.timerMinutes - 1}))
      }
    }
  }

  incrementBtn = () => {
    this.setState(prevState => ({timerMinutes: prevState.timerMinutes + 1}))
  }

  resetBtn = () => {
    this.setState({isTimerRunning: false, timerMinutes: 25, timerSeconds: 0})
    this.clearTimeInterval()
  }

  incrementTimerSeconds = () => {
    const {timerMinutes, timerSeconds} = this.state
    const isTimerCompleted = timerSeconds === timerMinutes * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({timerSeconds: prevState.timerSeconds + 1}))
    }
  }

  onClickStartOrPauseBtn = () => {
    const {timerMinutes, timerSeconds, isTimerRunning} = this.state
    const isTimerCompleted = timerSeconds === timerMinutes * 60

    if (isTimerCompleted) {
      this.setState({timerSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.timerId = setInterval(this.incrementTimerSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getTimeMinutesAndSecondsFormat = () => {
    const {timerMinutes, timerSeconds} = this.state
    const remainingSeconds = timerMinutes * 60 - timerSeconds
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning, timerMinutes} = this.state

    const iconUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const isStartText = isTimerRunning ? 'Pause' : 'Start'
    const isPausedOrRunning = isTimerRunning ? 'Running' : 'Paused'
    const altText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="bg-container">
        <h1 className="timer-heading">Digital Timer</h1>
        <div className="app-container">
          <div className="image-container">
            <div className="time-card-container">
              <h1 className="minutes-count">
                {this.getTimeMinutesAndSecondsFormat()}
              </h1>
              <p className="time-status">{isPausedOrRunning}</p>
            </div>
          </div>
          <div className="set-timer-container">
            <div className="start-reset-container">
              <button
                type="button"
                onClick={this.onClickStartOrPauseBtn}
                className="icon-button"
              >
                <img src={iconUrl} alt={altText} className="icons" />
                <p className="status-text">{isStartText}</p>
              </button>

              <button
                type="button"
                className="icon-button"
                onClick={this.resetBtn}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icons"
                />
                <p className="status-text">Reset</p>
              </button>
            </div>
            <div className="set-timer-limit-container">
              <p className="timer-limit-text">Set Timer Limit</p>
              <div className="plus-minus-container">
                <button
                  type="button"
                  className="symbol-text icon-button"
                  onClick={this.decrementBtn}
                >
                  -
                </button>
                <div className="minute-count-container">
                  <p className="minute-count-text">{timerMinutes}</p>
                </div>
                <button
                  type="button"
                  className="symbol-text icon-button"
                  onClick={this.incrementBtn}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
