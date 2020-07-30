import * as React from "react"

interface Props {
  message: string
  timer: number
  onClose: () => void
}

const Modal: React.FunctionComponent<Props> = ({ message, timer, onClose }) => (
  <div
    style={{
      position: "fixed",
      left: "50%",
      padding: "10px",
      border: "1px solid gray",
      width: "300px",
      height: "200px",
    }}
  >
    <h1>This is a Modal with a Timer</h1>
    <p>{message}</p>
    <p>This is a timer, with passed props: {timer} sec</p>
    <button onClick={onClose}>Close</button>
  </div>
)

export default Modal
