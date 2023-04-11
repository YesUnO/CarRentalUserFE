import {  ReactNode, useState } from "react";
import Modal from 'react-modal';


export interface ModalWithBtnProps {
    name: string,
    content: ReactNode
};

const ModalWithBtn: React.FC<ModalWithBtnProps> = ({name, content}) => {
    Modal.setAppElement(document.getElementById("root")as HTMLElement);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
        <>
        <button onClick={() => setModalIsOpen(true)}>{name}</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <section>{content}</section>
            </Modal>
        </>
    );
};

export default ModalWithBtn;