import React, { Dispatch, SetStateAction } from 'react'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ButtonGroup from '../../ButtonGroup';
interface DataType {
    id: number;
    key: string;
    name: string;
}
interface Props {
    dataSource: any[],
    editForm: Dispatch<SetStateAction<any>>
    deletePayment: (dltData: any) => void;
    loading: boolean;
    className?: string;
}
const PaymentTable = ({ dataSource, deletePayment, editForm, loading, className }: Props) => {


    const columns: ColumnsType<DataType> = [
        {
            title: 'S.N',
            dataIndex: 's.n',
            key: 'name',
            render: (_, __, index) => __?.key + 1 ?? index + 1,
            width: '15%'
        },
        {
            title: 'NANE',
            dataIndex: 'name',
            key: 'name',
            width: '50%'
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (_, data) => (
                <ButtonGroup
                    edit={true}
                    onEdit={() => {
                        editForm(data)
                    }}
                    dlt={true}
                    onDelete={() => {
                        deletePayment(data.id)
                    }}
                />

            ),
            width: '25%'
        },
    ];

    return (
        <div className={`relative overflow-x-auto shadow-custom p-3 animate-slow  ${className} `}>
            <Table
                columns={columns}
                dataSource={dataSource?.map((m, i) => { return { ...m, key: i } })}
                loading={loading}
                rowClassName="p-1"
            />
        </div>
    )
}

export default PaymentTable