import React, { useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Head from 'next/head'
import { useGlobalContext } from '../contexts/GlobalContext';
import Spinner from '../components/Spinner';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from '../contexts/ProtectedRoute';
const MainLayout = ({ title, children, moduleId }: { title: string, children: React.ReactNode, moduleId?: number }) => {
    const global = useGlobalContext();
    const [collapse, setCollapse] = useState<boolean>(false);
    return (
        <>
            <Toaster />
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{title ? title : 'Mundhum  | '}</title>
            </Head>
            {global.user.isLoggedIn() ?
                <div className="flex flex-wrap   w-full h-screen font-poppin ">
                    <Navbar collapse={collapse} setCollapse={setCollapse} />
                    <div className="flex print:hidden overflow-hidden pt-[3.8rem]">
                        <Sidebar collapse={collapse} />
                    </div>
                    <div className={`print:w-full  print:lg:ml-0 h-full transition-all duration-500 w-full animate-slow  relative px-1 py-1 ${collapse ? 'lg:ml-[5.3rem]' : 'lg:ml-[15rem]'}`}>
                        <div className=" rounded-sm px-1">
                            <ProtectedRoute moduleId={moduleId}>
                                {children}
                            </ProtectedRoute>
                        </div>
                    </div>
                </div>
                :
                <Spinner />
            }
        </>
    )
};

export default MainLayout;
