import { GetServerSideProps } from 'next'
import React, { Fragment, useEffect, useState } from 'react'
import { useGlobalContext } from '../contexts/GlobalContext';
import { httpClient } from '../apis/rest.api';
import { dashboardUrl } from '../apis/list.api';
import { ModifiyIcon, getIcon } from '../datas/dashboard.data';
import { Avatar, Image } from 'antd';
import { BiUser } from 'react-icons/bi';
import { greet } from '../utils/greet';
import { FaShippingFast } from 'react-icons/fa';
const dashboard = () => {
    return (
        <Fragment>
            <Dashboard />
        </Fragment>
    )
}

export default dashboard

const Dashboard = () => {
    const global = useGlobalContext();
    const [stat, setStat] = useState<Array<any>>([]);
    // function getRandomIndex() {
    //     return Math.floor(Math.random() * 10);
    // }
    // const bg: string[] = [
    //     'bg-gray-500',
    //     'bg-green-500',
    //     'bg-purple-500',
    //     'bg-orange-500',
    //     'bg-lime-500',
    //     'bg-red-500',
    //     'bg-pink-500',
    //     'bg-fuchsia-500',
    //     'bg-rose-500',
    //     'bg-amber-500'
    // ]
    // const bgHover: string[] = [
    //     'hover:bg-gray-800',
    //     'hover:bg-green-800',
    //     'hover:bg-purple-800',
    //     'hover:bg-orange-800',
    //     'hover:bg-lime-800',
    //     'hover:bg-red-800',
    //     'hover:bg-pink-800',
    //     'hover:bg-fuchsia-800',
    //     'hover:bg-rose-800',
    //     'hover:bg-amber-800'
    // ]
    const fetchStat = async () => {
        const { data, error } = await httpClient().get(dashboardUrl.stat);
        if (data && !error) {
            setStat(data.data)
        }
    }
    useEffect(() => {
        fetchStat();
    }, [])
    return (
        <div className='py-5 mx-3 animate-slow '>
            <div className=' mb-4 shadow-custom bg-main  text-white rounded-md p-2 px-5 flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <Avatar size={50} className='bg-white' icon={<BiUser className='text-main ' title='profile' size={50} />} />
                    <span className='text-2xl font-bold tracking-tight '>
                        {greet(global?.user?.getFullName())}
                    </span>
                </div>
                <div>
                    <Image preview={false} src='/icon/pie-chart.png' height={100} width={100} />
                </div>
            </div>

            <div className='grid-cols-4  grid justify-between gap-2'>
                {
                    stat?.map((data, index) => {
                        // let random = getRandomIndex();
                        let Icon = ModifiyIcon(FaShippingFast, 30)
                        return (
                            <div key={index} className={`bg-main bg-opacity-90 text-white ${global.user.isModuleAllowed(data?.id) ? 'block' : 'hidden'}  shadow-custom  p-6 max-w-sm   rounded-md border  flex justify-between items-center`}>
                                <div className='w-full '>

                                    <h5 className="mb-3 text-xl font-bold tracking-tight ">{data?.name}</h5>
                                    <div className='flex justify-between items-center w-full'>
                                        <span className="font-normal text-xl ">{<Icon />}</span>
                                        <span className=" text-xl ">{data?.count}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            page: 'dashboard',
            title: 'Ideal | Dashboard',
        }
    }
}