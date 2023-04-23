import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { CgProfile } from 'react-icons/cg';
import { useGlobalContext } from '../contexts/GlobalContext';
import Link from 'next/link';
const Navbar = ({ collapse, setCollapse }: { collapse: boolean, setCollapse: (set: boolean) => void }) => {
    const [time, setTime] = useState<Date>(new Date())
    const global = useGlobalContext();

    useEffect(() => {
        setInterval(() => setTime(new Date()))
    }, [])
    return (
        <nav className="shadow print:hidden border-b fixed z-30 bg-white w-full text-sm ">
            <div className="px-3 py-4">
                <div className="flex  items-center justify-between">
                    <div className={`${collapse ? 'w-[19%]' : 'w-[21%]'} flex items-center justify-end`}>

                        <div className='text-xl cursor-pointer animate-slow'>
                            {collapse ? <AiOutlineMenu onClick={() => setCollapse(!collapse)} className='text-xl animate-slow ' /> : <MdClear onClick={() => setCollapse(!collapse)} className='text-xl animate-slow' />}

                        </div>
                    </div>

                    <div className="w-auto flex justify-end text-sm">
                        <div className='flex justify-between gap-4 cursor-pointer items-center'>
                            <span className='font-bold'>  {time.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                            <span className='font-bold'>  {time.toLocaleString('en-US', { hour: 'numeric', second: '2-digit', minute: 'numeric', hour12: true })}</span>
                            <IoMdLogOut onClick={() => global.logout()} title='logout' size={20} />
                            <IoSettings title='settings' className='animate-spin hover:animate-none  ' size={20} />
                            <CgProfile className='' title='profile' size={20} />
                            <span className='leading-4 text-center text-gray-600 text-xs'>
                                <Link href={'/user/profile'}>
                                    {global?.user?.getFullName() ?? ''}
                                </Link>

                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;
