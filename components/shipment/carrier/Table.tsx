import React, { Dispatch, SetStateAction } from 'react'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Action } from '../../../interface/common';
import ButtonGroup from '../../ButtonGroup';
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
    carrierId: { id: number, name: string };
}
interface Props {
    dataSource: any[],
    setAction: Dispatch<SetStateAction<Action>>
    setData: Dispatch<SetStateAction<any>>
    deleteCarrier: (dltData: any) => void;
    loading: boolean;
    className?: string;
}
const CarrierTable = ({ dataSource, setAction, deleteCarrier, setData, loading, className }: Props) => {


    const columns: ColumnsType<DataType> = [
        {
            title: 'S.N',
            dataIndex: 's.n',
            key: 'name',
            render: (_, __, index) => __?.key + 1 ?? index + 1,
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'website',
            dataIndex: 'website',
            key: 'website',
        },

        {
            title: 'CONTACT',
            dataIndex: 'contact',
            key: 'contact',
        },

        {
            title: 'ACTION',
            key: 'action',
            render: (_, data) => (
                <ButtonGroup
                    edit={true}
                    onEdit={() => {
                        setData(data);
                        setAction(Action.edit)
                    }}
                    dlt={true}
                    onDelete={() => {
                        deleteCarrier(data)
                    }}
                />

            ),
        },
    ];

    return (
        <div className={`relative overflow-x-auto shadow-custom p-3 animate-slow  ${className} `}>
            <Table
                columns={columns}
                dataSource={dataSource?.map((m, i) => { return { ...m, key: i } })}
                loading={loading}
            />
        </div>
    )
}

export default CarrierTable