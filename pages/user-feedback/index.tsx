import { GetStaticProps } from 'next';
import React, { Dispatch, useEffect, useState } from 'react'
import { SetStateAction } from 'react';
import { userFeedbackUrl } from '../../apis/list.api';
import { httpClient } from '../../apis/rest.api';
import TableHeader from '../../components/TableHeader';
import FeedBackTable from '../../components/user-feedback/Table';
import modeuleList from '../../datas/module.data';
import { Action } from '../../interface/common';
import Container from '../../layouts/Container';
import { notification } from '../../utils/tost';

const index = () => {
    return (
        <UserFeedBack />
    )
}

const UserFeedBack = () => {
    const [userFeedBackList, setUserFeedBackList] = useState<Array<any>>([]);
    const [filteredUserFeedBackList, setFilteredUserFeedBackList] = useState<Array<any>>([]);
    const [action, setAction] = useState<Action>(Action.index);
    const [title, setTitle] = useState<string>("User Feedback Table");
    const [selectedData, setSelectedData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true)
    const fetchFeedBack = async () => {

        const { data, error } = await httpClient().get(userFeedbackUrl.getAll);
        if (data && !error) {
            setUserFeedBackList(data.data)
            setFilteredUserFeedBackList(data.data)
        }
        setLoading(false)
    }

    const deleteFeed = (id: number) => {
        const promise = async () => {
            const { data, error } = await httpClient().delete(userFeedbackUrl.delete + id);
            if (data && !error) {
                notification.success(data?.message ?? 'record has been deleted successfully')
                setUserFeedBackList((cur) => cur.filter((fil) => fil.id != id));
            } else {
                notification.error(error?.errors ?? 'error in deleting feed')
            }
        }
        notification.prompt(promise)
    }
    const filterFeed = (value: string) => {
        if (value) {
            setFilteredUserFeedBackList(userFeedBackList.filter(f => f?.name?.toLowerCase()?.includes(value?.toLowerCase()) || f?.email?.toLowerCase()?.includes(value?.toLowerCase()) || f?.phone?.toLowerCase()?.includes(value?.toLowerCase()) || f?.address?.toLowerCase()?.includes(value?.toLowerCase())))
        } else {
            setFilteredUserFeedBackList(userFeedBackList)
        }
    }
    useEffect(() => {
        fetchFeedBack();
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0)
        switch (action) {
            case Action.index:
                setTitle('User Feedback Table')
                break;
            case Action.show:
                setTitle("Show Feedback")
                break;
            default:
                setTitle("User Feedback Table")
        }

    }, [action, setAction])

    return (
        <Container title={title}>
            <div className={`rounded-md p-3  overflow-hidden`}>
                <TableHeader
                    showBackButton={action === Action.show}
                    onBackButton={() => {
                        setAction(Action.index)
                    }}
                    showSearch={action === Action.index}
                    onSearch={(e: React.ChangeEvent<HTMLInputElement>) => filterFeed(e.target.value)}
                />
                {
                    action === Action.index &&
                    <div className="relative overflow-hidden shadow-custom p-3 animate-slow  ">
                        <FeedBackTable
                            deleteFeed={deleteFeed}
                            loading={loading}
                            setAction={setAction}
                            setSelectedData={setSelectedData}
                            data={filteredUserFeedBackList}
                        />
                    </div>
                }
                {action === Action.show && <Show selectedData={selectedData} setSelectedData={setSelectedData} />}
            </div>

        </Container>
    )
}

const Show = ({ selectedData }: { selectedData: any, setSelectedData: Dispatch<SetStateAction<any>> }) => {


    return (
        <div className='p-3 shadow-custom animate-slow'>
            <div className=''>
                <div className='grid grid-cols-2 gap-y-4 p-'>
                    {selectedData?.name && <p><span className="font-bold mr-2">Name:</span><span>{selectedData?.name}</span> </p>}
                    {selectedData?.email && <p><span className="font-bold mr-2">Email:</span><span>{selectedData?.email}</span> </p>}
                    {selectedData?.phone && <p><span className="font-bold mr-2">Contact:</span><span>{selectedData?.phone}</span> </p>}
                    {selectedData?.address && <p><span className="font-bold mr-2">Address:</span><span>{selectedData?.address}</span> </p>}
                </div>
                {
                    selectedData?.message &&
                    <div className='mt-4 bg-slate-100 border p-1 rounded-md text-gray-500'>
                        {selectedData?.message}
                    </div>
                }
            </div>
        </div>
    )
}


export default index

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            page: '/user-feedback',
            title: 'Ideal | UserFeedback',
            moduleId: modeuleList?.feedbackModule.id
        }
    }
}