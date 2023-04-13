import S from './modal.module.css'

export default function Modal({isOpen, children}) {
  return (
    <div className={`${S.modalContainer} ${isOpen && S.visible}`}>
      <div className={S.modal}>
        {children}
      </div>
    </div>
  )
}
