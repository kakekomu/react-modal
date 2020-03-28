import * as React from "react"

interface Props {
  message: string
  onClose: () => void
}

const Modal: React.FunctionComponent<Props> = ({ message, onClose }) => (
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
    <h1>This is a Modal</h1>
    <p>{message}</p>
    <button onClick={onClose}>Close</button>
  </div>
)

export default Modal
