import { isFunction } from 'lodash'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

import Dialog from './dialog'

interface DialogItem {
  element: ReactNode | ((drawer: DialogItemWithIdentity) => ReactNode)
  onClose?(any: any): void | Promise<void>
}

interface DialogContextProperties {
  open(drawer: DialogItem): void
  closeAll(params?: DialogItemClose['params']): void
}

interface DialogItemContextProperties {
  id: number
  close(params?: DialogItemClose['params']): void
}

interface DialogItemWithIdentity extends DialogItem {
  id: number
}

interface DialogItemClose {
  id: DialogItemWithIdentity['id']
  onClose?: DialogItemWithIdentity['onClose']
  params?: any
}

const DialogContext = createContext<DialogContextProperties | undefined>(
  undefined
)

const DialogItemContext = createContext<
  DialogItemContextProperties | undefined
>(undefined)

export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) throw new Error('dialog provider required')
  return context
}

export const useDialogItem = () => {
  const context = useContext(DialogItemContext)
  if (!context) throw new Error('item dialog provider required')
  return context
}

const DialogProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const dialogRef = useRef(0)
  const [dialogs, setDialogs] = useState<DialogItemWithIdentity[]>([])
  const [current, setCurrent] = useState<number[]>([])

  const addDialog = useCallback((item: DialogItem) => {
    const currentIdentity = dialogRef.current
    setDialogs((old) => {
      old.push({
        ...item,
        id: currentIdentity,
      })
      return [...old]
    })

    setTimeout(() => {
      setCurrent((old) => {
        return [...old, currentIdentity]
      })
    }, 0)

    dialogRef.current += 1
  }, [])

  const openDialog = useCallback(
    (item: DialogItem) => {
      addDialog(item)
    },
    [addDialog]
  )

  const closeDrawer = useCallback((dialogItem: DialogItemClose) => {
    setCurrent((old) => {
      return [...old].filter((index) => index !== dialogItem.id)
    })

    setTimeout(() => {
      if (dialogItem.onClose) dialogItem.onClose(dialogItem.params ?? undefined)
      setDialogs((old) => {
        return [...old].filter((d) => d.id !== dialogItem.id)
      })
    }, 500)
  }, [])

  const closeAll = useCallback(
    (params?: DialogItemClose['params']) => {
      dialogs.forEach((drawer) => {
        closeDrawer({
          id: drawer.id,
          onClose: drawer.onClose,
          params,
        })
      })
    },
    [dialogs, closeDrawer]
  )

  const props = useMemo(
    () => ({
      open: openDialog,
      closeAll,
    }),
    [openDialog, closeAll]
  )

  const propsItem = useCallback(
    (dialogItem: Omit<DialogItemWithIdentity, 'element'>) => ({
      id: dialogItem.id,
      close(params?: any) {
        closeDrawer({
          id: dialogItem.id,
          onClose: dialogItem.onClose,
          params,
        })
      },
    }),
    [closeDrawer]
  )

  return (
    <DialogContext.Provider value={props}>
      {dialogs.map((dialog: DialogItemWithIdentity, index) => (
        <Dialog
          key={index}
          open={current.includes(dialog.id)}
          closeOnClickBackdrop={true}
          onClose={() => {
            closeDrawer({
              id: dialog.id,
              onClose: dialog.onClose,
            })
          }}
        >
          <DialogItemContext.Provider
            value={propsItem({
              id: dialog.id,
              onClose: dialog.onClose,
            })}
          >
            {isFunction(dialog.element)
              ? dialog.element(dialog)
              : dialog.element}
          </DialogItemContext.Provider>
        </Dialog>
      ))}
      {children}
    </DialogContext.Provider>
  )
}

export default DialogProvider
