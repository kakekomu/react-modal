import * as ReactDOM from "react-dom"
import * as React from "react"
import Modal from "./Modal"
import { useModal } from "../"

const App = () => {
  const [activeModal, modalHandlers] = useModal({
    myModal: Modal,
  })

  const [timer, setTimer] = React.useState(0)

  setTimeout(() => setTimer(timer + 1), 1000)

  React.useEffect(() => {
    modalHandlers.passProps("myModal", {
      message: "This custom message is passed as a prop.",
      timer,
      onClose: modalHandlers.closeModal,
    })
  }, [timer])

  return (
    <div>
      {activeModal}
      <h1>React Modal example</h1>
      <a href="index.tsx">Source code</a>

      <button
        onClick={() =>
          modalHandlers.toggleModal("myModal", {
            message: "This custom message is passed as a prop.",
            timer,
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
            timer,
            onClose: modalHandlers.closeModal,
          })
        }
      >
        Open Modal
      </button>
      <p>Timer: {timer} sec</p>
    </div>
  )
}

const domContainer = document.querySelector("#react")
ReactDOM.render(React.createElement(App), domContainer)
