import * as ReactDOM from "react-dom"
import * as React from "react"
import Modal from "./Modal"
import { useModal } from "../"

const App = () => {
  const [activeModal, modalHandlers] = useModal({
    myModal: Modal,
  })
  return (
    <div>
      {activeModal}
      <h1>React Modal example</h1>
      <a href="index.tsx">Source code</a>

      <button
        onClick={() =>
          modalHandlers.toggleModal("myModal", {
            message: "This custom message is passed as a prop.",
            onClose: modalHandlers.closeModal,
          })
        }
      >
        Toggle Modal
      </button>

      <button
        onClick={() =>
          modalHandlers.openModal("myModal", {
            message: "The message can be different.",
            onClose: modalHandlers.closeModal,
          })
        }
      >
        Open Modal
      </button>
    </div>
  )
}

const domContainer = document.querySelector("#react")
ReactDOM.render(React.createElement(App), domContainer)
