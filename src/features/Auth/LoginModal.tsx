import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PasswordCredentials, getToken } from "./authReducer";
import Modal from 'react-modal';

const LoginModal: React.FC = () => {
    Modal.setAppElement(document.getElementById("root")as HTMLElement);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    //TODO: dunno, dony use any
    const dispatch = useDispatch();
    //TODO: errors in modal
    const error = useSelector(()=>"yo");

    const handleSubmit = async (event:FormEvent) => {
        event.preventDefault();
        const {username, password } = formData;
        const passwordCredentials: PasswordCredentials = {username, password }; 

        // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
        await dispatch(getToken(passwordCredentials));
    };

    return (
        <>
            <button onClick={() => setModalIsOpen(true)}>Login</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="Username"
                    />
                    <input
                        type="text"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Password"
                    />
                    <button type="submit">Login</button>
                    {error && <div>{error}</div>}
                </form>
            </Modal>
        </>
    );
};

export default LoginModal;