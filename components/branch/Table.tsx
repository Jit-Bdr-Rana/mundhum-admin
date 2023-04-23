import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table/InternalTable'
import React, { Dispatch, SetStateAction } from 'react'
import { BranchForm } from '../../interface/form';
import truncate from '../../utils/truncate';
import ToggleButton from '../../components/utils/ToggleButton'
import { Action } from '../../interface/common';
import ButtonGroup from '../ButtonGroup';
interface Props {
    data: any[];
    toggleButton: (active: boolean, setActive: React.Dispatch<React.SetStateAction<boolean>>, id: number) => void;
    setAction: Dispatch<SetStateAction<Action>>
    setData: Dispatch<SetStateAction<any>>
    deleteBranch: (dltData: any) => void
}


const BranchTable = ({ data, toggleButton, setAction, setData, deleteBranch }: Props) => {

    const columns: ColumnsType<BranchForm> = [
        {
            title: 'S.N',
            dataIndex: 'key',
            key: 'sn',
            render: (key, __, index) => key ? key + 1 : index + 1,
            width: '5%'
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'address',
            render: (name) => truncate(name, 25),
            width: '20%'
        },
        {
            title: 'ADDRESS',
            dataIndex: 'province',
            key: 'address',
            render: (_, data, __) => truncate((data?.province + '-' + data?.district + '-' + data?.tole + ',' + data?.city + ' city'), 35),
            width: '28%'
        },
        {
            title: 'PRIMARY EMAIL',
            dataIndex: 'primaryEmail',
            key: 'primaryEmail',
            render: (primaryEmail) => truncate(primaryEmail, 25),
            width: '20%'
        },
        {
            title: 'TYPE',
            dataIndex: 'type',
            key: 'type',
            width: '10%'
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: (_, data) => <ToggleButton data={data} toggle={toggleButton} />,
            width: '8%'
        },
        {
            title: 'ACTION',
            dataIndex: 'status',
            key: 'status',
            render: (_, data) => (
                <ButtonGroup
                    edit={true}
                    onEdit={() => {
                        setData(data); setAction(Action.edit)
                    }}
                    dlt={true}
                    onDelete={() => {
                        deleteBranch(data)
                    }}
                />
            ),
            width: '10%'
        },


    ]

    return (
        <Table
            columns={columns}
            dataSource={data?.map((m, i) => { return { ...m, key: i } })}
        />
    )
}

export default BranchTable