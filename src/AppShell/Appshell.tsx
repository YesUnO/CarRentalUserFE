import React, { ReactNode } from 'react';

interface AppShell {
    children?: ReactNode
}

const AppShell: React.FC<AppShell> = ({children}) =>{
    return (
        <>
        <section className='view'>{children}</section>
        </>
    );
};

export default AppShell;