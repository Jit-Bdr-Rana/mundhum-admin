import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/InternalTable';
import React, { Dispatch, SetStateAction } from 'react'
import { Action } from '../../interface/common';
import User from '../../modal/User.modal';
import ButtonGroup from '../ButtonGroup';
interface Props {
    data: any[],
    editForm: (data: any) => void
    setAction: Dispatch<SetStateAction<Action>>
    deleterole: (dltData: any) => void;
    setSelectedRole: Dispatch<SetStateAction<any>>
    cancelEdit: () => void
    loading: boolean;
    className?: string;
}

const RoleTable = ({ setAction, editForm, data, loading, deleterole, setSelectedRole, cancelEdit }: Props) => {
    const columns: ColumnsType<User> = [
        {
            title: 'S.N',
            dataIndex: 's.n',
            key: 'name',
            render: (text, data, index) => index + 1,
            width: '20%'
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
            width: '40%'
        },
        {
            title: 'ACTION',
            dataIndex: 'action',
            key: 'action',
            width: '40%',
            render: (_, data) => (
                <ButtonGroup
                    edit={true}
                    view={true}
                    dlt={true}
                    onDelete={() => deleterole(data?.id)}
                    onView={() => {
                        setAction(Action.roleaccess); setSelectedRole(data); cancelEdit()
                    }}
                    onEdit={() => {
                        editForm(data); setAction(Action.edit)
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

export default RoleTable