# React Modal hook

A simple React hook for modals.

### About this package

It is common practice, to use boolean flags like `isOpen` to decide whether the modal is displayed or not.
Also, the data of the modal might come from a global state. However, when juggling with many modals, this can be a confusing, and can cause errors, like displaying multiple modals at the same time.

This package uses a key for every modal to switch between them. With a `openModal` function, you can open a modal, and pass it props.

I recommend to hook it up only once, in your root level component, so there is one source of truth for the realm of modals.

### Example

```ts
import { useModal } from "@kakekomu/react-modal"

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
```
