import React from "react";
import LoginModal from "../../features/Auth/components/LoginModal";
import RegisterModal from "../../features/Auth/components/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import { logout } from "../../features/Auth/authReducer";
import { AppBar, Box, Toolbar } from "@mui/material";


const AppToolbar: React.FC = () => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        {isAuthenticated ? (
                            <>
                                <button onClick={handleLogout}>Log out</button>
                            </>
                        ) : (
                            <>
                                <LoginModal />
                                <RegisterModal />
                            </>

                        )}
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    );
};

export default AppToolbar;