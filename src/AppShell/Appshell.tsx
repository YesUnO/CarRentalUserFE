import React, { ReactNode } from 'react';
import AppToolbar from './AppToolbar/AppToolbar';

interface AppShell {
    children?: ReactNode
}

const AppShell: React.FC<AppShell> = ({children}) =>{
    return (
        <>
        <AppToolbar/>
        <section className='view'>{children}</section>
        </>
    );
};

export default AppShell;