import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/InternalTable';
import React, { Dispatch, SetStateAction } from 'react'
import { Action } from '../../interface/common';
import User from '../../modal/User.modal';
import truncate from '../../utils/truncate';
import ButtonGroup from '../ButtonGroup';
import ToggleButton from '../utils/ToggleButton';
interface Props {
    data: any[],
    setAction: Dispatch<SetStateAction<Action>>
    setEditData: Dispatch<SetStateAction<any>>
    deleteUser?: (dltData: any) => void;
    toggleButton: (active: boolean, setActive: React.Dispatch<React.SetStateAction<boolean>>, id: number) => void;
    promptPasswordReset: (data: any) => void;
    loading: boolean;
    className?: string;
}

const UserTable = ({ setAction, setEditData, data, loading, toggleButton, promptPasswordReset }: Props) => {
    const columns: ColumnsType<User> = [
        {
            title: 'S.N',
            dataIndex: 'key',
            key: 'name',
            render: (key, __, index) => key ? key + 1 : index + 1,
        },
        {
            title: 'USER FULL NAME',
            dataIndex: '',
            key: 'name',
            render: (_, data) => truncate(((data?.firstName ?? '') + ' ' + (data?.middleName ?? '') + ' ' + (data?.lastName ?? '')), 20)
        },
        {
            title: 'ROLE',
            dataIndex: 'role',
            key: 'role',
            render: (role) => role?.name
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            key: 'role',
            render: (_, data) => truncate(data?.email ?? '', 20)
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: (_, data) => <ToggleButton data={data} toggle={toggleButton} />
        },
        {
            title: 'RESET',
            dataIndex: 'reset',
            key: 'reset',
            render: (_, data) => <button onClick={() => { promptPasswordReset(data) }} type='button' className={` bg-success p-1 text-xs text-white px-3  rounded-md `}>reset</button>
        },
        {
            title: 'ACTION',
            dataIndex: 'action',
            key: 'action',
            render: (_, data) => (
                <ButtonGroup
                    dlt={true}
                    edit={true}
                    onEdit={() => {
                        setEditData(data);
                        setAction(Action.edit)
                    }}
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

export default UserTable