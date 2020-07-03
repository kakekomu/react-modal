import * as ReactDOM from "react-dom"
import * as React from "react"
import TimerModal from "./TimerModal"
import SimpleModal from "./SimpleModal"
import { useModal } from "../"

const App = () => {
  // Creating an object of all the possible modals. We can handle them later with the object keys.
  const [activeModal, modalHandlers] = useModal({
    simpleModal: SimpleModal,
    timerModal: TimerModal,
  })

  const [timer, setTimer] = React.useState(0)

  setTimeout(() => setTimer(timer + 1), 1000)

  React.useEffect(() => {
    // Passing a prop to an open modal. Has no effect on closed modals.
    modalHandlers.passProps("timerModal", {
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
          // Open the SimpleModal and pass props to it. Props are type checked.
          modalHandlers.openModal("simpleModal", {
            onClose: modalHandlers.closeModal,
          })
        }
      >
        Open SimpleModal
      </button>

      <button
        onClick={() =>
          // Open the TimerModal and pass props to it. Props are type checked.
          modalHandlers.openModal("timerModal", {
            message: "Default message",
            timer,
            onClose: modalHandlers.closeModal,
          })
        }
      >
        Open TimerModal
      </button>

      <button
        onClick={() =>
          modalHandlers.toggleModal("simpleModal", {
            onClose: modalHandlers.closeModal,
          })
        }
      >
        Toggle SimpleModal
      </button>

      <p>Timer: {timer} sec</p>
    </div>
  )
}

const domContainer = document.querySelector("#react")
ReactDOM.render(React.createElement(App), domContainer)
