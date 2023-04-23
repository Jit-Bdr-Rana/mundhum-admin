import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table/InternalTable'
import React, { Dispatch, SetStateAction } from 'react'
import { Action } from '../../interface/common'
import truncate from '../../utils/truncate'
import ButtonGroup from '../ButtonGroup'

interface Props {
    data: any[],
    setAction: Dispatch<SetStateAction<Action>>
    editForm: Dispatch<SetStateAction<any>>
    setEditData: Dispatch<SetStateAction<any>>
    deleteAlbum: (dltData: any) => void;
    loading: boolean;
    className?: string;
}
interface DataType {
    id: number;
    description: string;
    name: string;
}
const GalleryTable = ({ data, setAction, setEditData, deleteAlbum, editForm, loading }: Props) => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'S.N',
            dataIndex: 'key',
            key: 'name',
            render: (key, _, index) => key ? key + 1 : index + 1,
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description',
            render: (description) => truncate(description, 30)
        },
        {
            title: 'ACTION',
            dataIndex: 'action',
            key: 'action',
            render: (_, data) => (
                <ButtonGroup
                    edit={true}
                    view={true}
                    dlt={true}
                    onEdit={() => editForm(data)}
                    onView={() => {
                        setAction(Action.gallery)
                        setEditData(data)
                    }}
                    onDelete={() => deleteAlbum(data.id)}
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

export default GalleryTable