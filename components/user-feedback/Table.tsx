import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/InternalTable';
import React, { Dispatch, SetStateAction } from 'react'
import { Action } from '../../interface/common';
import truncate from '../../utils/truncate';
import ButtonGroup from '../ButtonGroup';
interface Props {
    data: any[],
    setAction: Dispatch<SetStateAction<Action>>
    setSelectedData: Dispatch<SetStateAction<any>>
    deleteFeed: (dltData: any) => void;
    loading: boolean;
    className?: string;
}
interface DataType {
    id: number;
    description: string;
    name: string;
}
const FeedBackTable = ({ setAction, loading, setSelectedData, data, deleteFeed }: Props) => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'S.N',
            dataIndex: 'key',
            key: 'name',
            render: (key, __, index) => key ? key + 1 : index + 1,
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            key: 'email',
            render: (email) => truncate(email ?? '', 20)
        },
        {
            title: 'PHONE',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => truncate(phone ?? '', 20)
        },
        {
            title: 'ADDRESS',
            dataIndex: 'address',
            key: 'address',
            render: (address) => truncate(address ?? '', 20)
        },
        {
            title: 'message',
            dataIndex: 'message',
            key: 'message',
            render: (message) => truncate(message, 25)
        },
        {
            title: 'ACTION',
            dataIndex: 'action',
            key: 'action',
            render: (_, data) => (
                <ButtonGroup
                    view={true}
                    onView={() => {
                        setAction(Action.show);
                        setSelectedData(data);
                    }}
                    dlt={true}
                    onDelete={() => deleteFeed(data.id)}
                />
            )
        }
    ]

    return (
        <Table
            dataSource={data.map((d, i) => { return { key: i, ...d } })}
            columns={columns}
            loading={loading}
        />
    )
}

export default FeedBackTable