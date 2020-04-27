import {
  ComponentProps,
  FunctionComponent,
  ReactNode,
  useReducer,
  createElement,
} from "react"

export type Modals = { [K in string]: FunctionComponent<any> }

export interface ModalHandlers<T extends Modals, K extends keyof T> {
  toggleModal: (name: K, props: ComponentProps<T[K]>) => void
  openModal: (modalName: K, props: ComponentProps<T[K]>) => void
  passProps: (name: K, props: ComponentProps<T[K]>) => void
  closeModal: () => void
}

interface ModalState<T extends Modals> {
  name?: keyof T
  component: ReactNode
}

type Action<T extends Modals, K extends keyof T> =
  | OpenModalAction<T, K>
  | PassPropsAction<T, K>
  | ToggleModalAction<T, K>
  | CloseModal

interface OpenModalAction<T extends Modals, K extends keyof T> {
  type: "openModal"
  name: K
  props: ComponentProps<T[K]>
}

interface PassPropsAction<T extends Modals, K extends keyof T> {
  type: "passProps"
  name: K
  props: ComponentProps<T[K]>
}

interface ToggleModalAction<T extends Modals, K extends keyof T> {
  type: "toggleModal"
  name: K
  props: ComponentProps<T[K]>
}

interface CloseModal {
  type: "closeModal"
}

export const useModal = <T extends Modals>(
  modals: T
): [ReactNode, ModalHandlers<T, keyof T>] => {
  const init: ModalState<T> = {
    name: undefined,
    component: undefined,
  }

  const reducer = (
    state: ModalState<T>,
    action: Action<T, keyof T>
  ): ModalState<T> => {
    switch (action.type) {
      case "openModal": {
        return {
          name: action.name,
          component: createElement(modals[action.name], action.props),
        }
      }
      case "passProps": {
        return state.name === action.name
          ? {
              name: action.name,
              component: createElement(modals[action.name], action.props),
            }
          : state
      }
      case "closeModal": {
        return { name: undefined, component: undefined }
      }
      case "toggleModal": {
        return state.name === action.name
          ? { name: undefined, component: undefined }
          : {
              name: action.name,
              component: createElement(modals[action.name], action.props),
            }
      }
      default:
        return state
    }
  }

  const [modalState, dispatch] = useReducer(reducer, init)

  const openModal = <K extends keyof T>(name: K, props: ComponentProps<T[K]>) =>
    dispatch({ type: "openModal", name, props })

  const passProps = <K extends keyof T>(name: K, props: ComponentProps<T[K]>) =>
    dispatch({ type: "passProps", name, props })

  const closeModal = () => dispatch({ type: "closeModal" })

  const toggleModal = <K extends keyof T>(
    name: K,
    props: ComponentProps<T[K]>
  ) => dispatch({ type: "toggleModal", name, props })

  const modalHandlers = {
    openModal,
    passProps,
    closeModal,
    toggleModal,
  }

  return [modalState.component, modalHandlers]
}
