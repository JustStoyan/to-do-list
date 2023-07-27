const Modal = (props:any) => {
    return <div className="h-[80%] w-screen min-h-[80%] overflow-y-auto overflow-x-hidden">
        {props.children}
    </div>
}

export default Modal;