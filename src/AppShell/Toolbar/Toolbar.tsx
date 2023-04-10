import React, { FormEvent, useState } from "react";
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux";
import { getToken, PasswordCredentials } from "../../features/auth/auth";
import { useAppDispatch } from '../../features/store';



const Toolbar: React.FC = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    //TODO: dunno, dony use any
    const dispatch = useDispatch();
    const error = useSelector(()=>"yo");

    const handleSubmit = async (event:FormEvent) => {
        event.preventDefault();
        const {username, password } = formData;
        const passwordCredentials: PasswordCredentials = {username, password }; 

        // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
        await dispatch(getToken(passwordCredentials));
    };

    return (
        <div>
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
        </div>
    );
};

export default Toolbar;