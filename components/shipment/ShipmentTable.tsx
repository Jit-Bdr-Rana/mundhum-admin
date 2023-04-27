import React, { Dispatch, useEffect, useCallback, SetStateAction, useState, Key } from 'react'
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DateFormat } from '../../utils/date';
import { Action } from '../../interface/common';
import truncate from '../../utils/truncate';
import { FilterValue, TableRowSelection } from 'antd/lib/table/interface';
import { TableProps } from 'antd/lib/table/InternalTable';
import ButtonGroup from '../ButtonGroup';
interface DataType {
    key: string;
    id: number;
    carrierId: { id: number, name: string };
    packages: string;
    destination: string;

}
interface Props {
    data: any[],
    setAction: Dispatch<SetStateAction<Action>>
    setEditData: Dispatch<SetStateAction<any>>
    deleteShipment: (dltData: any) => void;
    loading: boolean;
    className?: string;
    isDraft: boolean;
    setSelectedKeys?: Dispatch<SetStateAction<Key[]>>
    setSelectedRow?: Dispatch<SetStateAction<number[]>>
    setMassSelection?: Dispatch<SetStateAction<boolean>>
    massSelection?: boolean,
    selectedKeys?: Key[]
    selectedRow?: number[],
    carrierList: any[],
    destinationList: any[]
}
const ShipmentTable = ({ carrierList, destinationList, data, setSelectedKeys, selectedKeys, setAction, setEditData, deleteShipment, loading, className, selectedRow, isDraft, massSelection, setMassSelection, setSelectedRow }: Props) => {
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});

    const handleChange: TableProps<DataType>['onChange'] = (_, filters) => {
        setFilteredInfo(filters);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys: selectedKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setMassSelection ? setMassSelection(selectedRowKeys?.length > 0 ? true : false) : ''
            setSelectedRow ? setSelectedRow(selectedRows?.map(m => m?.id)) : ''
            setSelectedKeys ? setSelectedKeys(selectedRowKeys) : ''
        },
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'S.N',
            dataIndex: 's.n',
            key: 'sn',
            width: '5%',
            render: (_, record, index) => (
                <div className={`flex items-center gap-0.5 `}>
                    <span className={`w-full text-base`}>{record?.key + 1 ?? index + 1}</span>
                </div>


            ),
        },
        {
            title: 'AWB NO',
            dataIndex: 'billNo',
            key: 'billNo',
            width: '10%',
            render: (bill) => (
                <Tooltip title={bill?.toString().length > 15 ? bill : null} color="gray">
                    {truncate(bill, 15)}
                </Tooltip>
            )
        },
        {
            title: 'SHIPPER NAME',
            dataIndex: 'shipperName',
            key: 'shipperName',
            width: '12%',
            render: (name) => (
                <Tooltip title={name?.toString().length > 10 ? name : null} color="gray">
                    {truncate(name, 10)}
                </Tooltip>
            )
        },
        {
            title: 'RECEIVER NAME',
            dataIndex: 'receiverName',
            key: 'receiverName',
            render: (receiverName) => (
                <Tooltip title={receiverName?.toString().length > 10 ? receiverName : null} color="gray">
                    {truncate(receiverName, 10)}
                </Tooltip>
            ),
            width: '12%'
        }, {
            title: 'CARRIER',
            dataIndex: 'carrierId',
            key: 'carrierId',
            render: (carrier) => (
                <Tooltip title={carrier?.name?.toString().length > 10 ? carrier?.name : null} color="gray">
                    {truncate(carrier?.name, 10)}
                </Tooltip>
            ),
            filters: carrierList?.map((data) => {
                return {
                    text: data?.name,
                    value: data?.name
                }
            }),
            onFilter: (value: string | boolean | number, record) => {
                return record?.carrierId?.name?.includes(value as string)
            },
            filteredValue: filteredInfo?.carrierId || null,
            width: '8%',
        },
        {
            title: 'DESTINATION',
            dataIndex: 'destination',
            key: 'destination',
            width: '8%',
            filters: destinationList?.map((data) => {
                return {
                    text: data?.destination,
                    value: data?.destination
                }
            }),
            onFilter: (value: string | boolean | number, record) => {
                return record?.destination?.includes(value as string)
            },
            filteredValue: filteredInfo?.destination || null,
            filterSearch: true,
            render: (destination) => (
                <Tooltip title={destination?.toString().length > 10 ? destination : null} color="gray">
                    {truncate(destination, 10)}
                </Tooltip>
            )
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tooltip title={status?.name?.name?.toString().length > 10 ? status?.name?.name : null} color="gray">
                    {truncate(status?.name?.name, 9)}
                </Tooltip>
            ),
            width: '10%'
        },
        {
            title: 'CREATED AT',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => new DateFormat(createdAt).getFullDate(),
            width: '10%'
        },

        {
            title: 'ACTION',
            key: 'action',
            render: (_, record) => (
                <ButtonGroup
                    disableAll={massSelection}
                    edit={true}
                    edit2={!isDraft}
                    print={!isDraft}
                    edit3={!isDraft && record?.packages == 'parcel'}
                    dlt={true}

                    copy={!isDraft}
                    onCopy={() => {
                        setAction(Action.copy);
                        setEditData(record)
                    }}

                    onEdit={() => {
                        setAction(Action.edit);
                        setEditData(record)
                    }}
                    onEdit2={() => {
                        setAction(Action.quickedit);
                        setEditData(record)
                    }}
                    onEdit3={() => {
                        setAction(Action.parcelDetails);
                        setEditData(record)
                    }}
                    onPrint={() => {
                        setAction(Action.printModel);
                        setEditData(record)
                    }}
                    onDelete={() => {
                        deleteShipment(record)
                    }}

                />

            ),
            width: '8%'
        },
    ];
    return (
        <div className={`relative select-none overflow-x-auto shadow-custom p-3 animate-slow  ${className} `}>
            <Table columns={columns} dataSource={data?.map((m, i) => { return { ...m, key: i } })}
                onChange={handleChange}
                loading={loading}
                rowSelection={!isDraft ? { ...rowSelection } : undefined}
                pagination={
                    {
                        className: "!text-black ",
                        selectPrefixCls: "text-black bg-black",
                    }
                } />
        </div>
    )
}

export default ShipmentTable