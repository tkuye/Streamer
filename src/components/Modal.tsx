import React from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
    title: string
    content():JSX.Element
    actions:JSX.Element
    onDismiss: () => void
}

const Modal:React.FC<ModalProps> = ({title, content, actions, onDismiss}) => {
        return ReactDOM.createPortal(
            <div onClick={onDismiss} className="ui dimmer modals visible active"> 
            <div onClick={(e) => e.stopPropagation()  }className="ui standard modal visible active">
                    <div className="header">
                        {title}
                        </div>
                        <div className="content">
                            {content()}
                    </div>
                    <div className="actions">
                       {actions}
                    </div>
            </div>
            </div>, (document.getElementById("modal") as HTMLElement)

        )
}
export default Modal