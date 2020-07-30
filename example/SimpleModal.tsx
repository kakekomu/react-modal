import * as React from "react"

interface Props {
  onClose: () => void
}

const Modal: React.FunctionComponent<Props> = ({ onClose }) => (
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
    <h1>This is a Simple Modal</h1>
    <button onClick={onClose}>Close</button>
  </div>
)

export default Modal
