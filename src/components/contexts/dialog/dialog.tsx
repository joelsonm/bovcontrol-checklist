import { Backdrop, DialogWrapper } from "./style"

interface IDialog {
  open: boolean
  closeOnClickBackdrop?: boolean
  onClose?(any: any): void | Promise<void>
}

const Dialog: React.FC<IDialog> = ({ open, closeOnClickBackdrop = true, onClose, children }) => {
  return (
    <>
      <Backdrop open={open} visible onClick={() => {
        if(!!closeOnClickBackdrop && !!onClose) onClose(null)
      }}>
      </Backdrop>
      <DialogWrapper open={open}>
        { children }
      </DialogWrapper>
    </>
  )
}

export default Dialog