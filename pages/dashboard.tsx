import { GetServerSideProps } from 'next'
import React, { Fragment, useEffect, useState } from 'react'
import { useGlobalContext } from '../contexts/GlobalContext';
import { httpClient } from '../apis/rest.api';
import { dashboardUrl } from '../apis/list.api';
import { getIcon } from '../datas/dashboard.data';
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
        <div className='py-5 animate-slow '>
            <div className='grid-cols-4  grid justify-between gap-2'>
                {
                    stat?.map((data, index) => {
                        // let random = getRandomIndex();
                        return (
                            <div key={index} className={`${global.user.isModuleAllowed(data?.id) ? 'block' : 'hidden'}  shadow-custom  p-6 max-w-sm   rounded-md border  flex justify-between items-center`}>
                                <div className='w-full'>

                                    <h5 className="mb-3 text-xl font-bold tracking-tight ">{data?.name}</h5>
                                    <div className='flex justify-between items-center w-full'>
                                        <span className="font-normal ">{getIcon(data?.id)}</span>
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