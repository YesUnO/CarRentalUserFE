import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import { Button, Modal } from "antd";
import { useState } from "react";
import { deleteUser } from "../../adminReducer";

const DeleteUserBtn: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.isAuthenticated);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        handleDeleteUser();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleDeleteUser = () => {
        // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
        dispatch(deleteUser());

    }

    return (
        <>
            <Button onClick={showModal}>Delete</Button>
            <Modal>
            </Modal>
        </>
    );
};

export default DeleteUserBtn; 