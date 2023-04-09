import React, { ReactNode } from 'react';
import Toolbar from './Toolbar/Toolbar';

interface AppShell {
    children?: ReactNode
}

const AppShell: React.FC<AppShell> = ({children}) =>{
    return (
        <>
        <Toolbar/>
        <section className='view'>{children}</section>
        </>
    );
};

export default AppShell;