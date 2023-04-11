import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PasswordCredentials, getToken } from "./authReducer";
import ModalWithBtn from "../../components/ModalWithBtn";
import { RootState } from "../../infrastructure/store";

const LoginModal: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    //TODO: dunno
    const dispatch = useDispatch();
    //TODO: errors in form
    const error = useSelector(() => "yo");

    const token = useSelector((state:RootState)=> state.auth.token);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
        await dispatch(getToken(formData));
    };

    return (
        <>
            <ModalWithBtn name={"Login"} content=
                {
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
                }
            />
        </>
    );
};

export default LoginModal;