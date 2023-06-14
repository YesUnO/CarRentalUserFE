import React, { ReactNode } from 'react';
import AppToolbar from './AppToolbar/AppToolbar';
import { CookiesProvider } from 'react-cookie';

interface AppShell {
    children?: ReactNode
}

const AppShell: React.FC<AppShell> = ({ children }) => {
    return (
        <>
            <CookiesProvider>
                <AppToolbar />
            </CookiesProvider>
            <section className='view'>{children}</section>
        </>
    );
};

export default AppShell;