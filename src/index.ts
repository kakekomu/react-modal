import {
  ComponentProps,
  FunctionComponent,
  ReactNode,
  useReducer,
  createElement,
} from "react"

export type Modals = { [K in string]: FunctionComponent<any> }

export interface ModalHandlers<T extends Modals> {
  toggleModal: <K extends keyof T>(name: K, props: ComponentProps<T[K]>) => void
  openModal: <K extends keyof T>(
    modalName: K,
    props: ComponentProps<T[K]>
  ) => void
  passProps: <K extends keyof T>(name: K, props: ComponentProps<T[K]>) => void
  closeModal: () => void
}

// This is a strange hack to allow passing a ModalHandlers with multiple modals to
// functions, with only the needed modals declared
type Identity<T> = {
  [P in keyof T]: T[P]
}
export type PartialModalHandlers<T extends Modals> = Identity<ModalHandlers<T>>

interface ModalState<T extends Modals> {
  name?: keyof T
  component: ReactNode
}

type Action<T extends Modals> =
  | OpenModalAction<T>
  | PassPropsAction<T>
  | ToggleModalAction<T>
  | CloseModal

interface OpenModalAction<T extends Modals> {
  type: "openModal"
  name: keyof T
  props: ComponentProps<T[keyof T]>
}

interface PassPropsAction<T extends Modals> {
  type: "passProps"
  name: keyof T
  props: ComponentProps<T[keyof T]>
}

interface ToggleModalAction<T extends Modals> {
  type: "toggleModal"
  name: keyof T
  props: ComponentProps<T[keyof T]>
}

interface CloseModal {
  type: "closeModal"
}

export const useModal = <T extends Modals>(
  modals: T
): [ReactNode, ModalHandlers<T>] => {
  const init: ModalState<T> = {
    name: undefined,
    component: undefined,
  }

  const reducer = (state: ModalState<T>, action: Action<T>): ModalState<T> => {
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
