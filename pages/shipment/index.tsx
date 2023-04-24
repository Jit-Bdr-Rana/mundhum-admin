import { GetServerSideProps } from 'next'
import React, { ChangeEvent, Key, useEffect, useState } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import Form from '../../components/shipment/Form';
import Container from '../../layouts/Container';
import { Action } from '../../interface/common';
import { httpClient } from '../../apis/rest.api';
import { shipmentUrl, statusUrl } from '../../apis/list.api';
import { Parcel, ShipmentForm, StatusForm } from '../../interface/form';
import { notification } from '../../utils/tost';
import ShipmentTable from '../../components/shipment/ShipmentTable';
import TableHeader from '../../components/TableHeader';
import modeuleList from '../../datas/module.data';
import PrintModel, { PrintProps } from '../../components/shipment/PrintModel';
import Print from '../../components/shipment/Print';
import ShipmentStatus from '../../components/shipment/ShipmentStatus';
import ParcelDetail from '../../components/shipment/ParcelDetails';
const index = () => {
    return (
        <Shipment />
    )
}
export default index

export const Shipment = () => {
    const [action, setAction] = useState<Action>(Action.index);
    const [shipmentList, setShipmentList] = useState<Array<any>>([]);
    const [filteredShipmentList, setFilteredShipmentList] = useState<Array<any>>([]);
    const [editData, setEditData] = useState<ShipmentForm>();
    const [title, setTitle] = useState<string>('Shipment Table');
    const [loading, setLoading] = useState<boolean>(true);
    const [printInfo, setPrintInfo] = useState<PrintProps>();
    const [massSelection, setMassSelection] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<number[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
    const [carrierList, setCarrierList] = useState<any[]>([]);
    const [destinationList, setDestinationList] = useState<any[]>([]);
    const fetchAllShipment = async () => {
        const { data, error } = await httpClient().get(shipmentUrl.getallUsingFilter + 0);
        if (data && !error) {

            setShipmentList(data.data['shipments']);
            setFilteredShipmentList(data.data['shipments']);
            setDestinationList(data.data['desinationList'])
            setCarrierList(data.data['carriers'])
        }
        setLoading(false)
    }



    const deleteShipment = (dltData: ShipmentForm) => {

        const callback = async () => {
            const { data, error } = await httpClient().delete(shipmentUrl.delete + dltData.id);
            if (data && !error) {
                notification.success(data?.message ?? "data has been deleted successfully")
                fetchAllShipment();
            } else {
                notification.error(error?.errors ?? 'erorr in deleting records')
            }
        }
        notification.prompt(callback);
    }

    const filterShipment = (value: string) => {
        if (value) {
            setFilteredShipmentList(shipmentList.filter(f => f?.billNo?.toString()?.toLowerCase()?.includes(value?.toLowerCase()) || f?.shipperName?.toString()?.toLowerCase()?.includes(value?.toLowerCase()) || f?.receiverName?.toString()?.toLowerCase()?.includes(value?.toLowerCase())))
        } else {
            setFilteredShipmentList(shipmentList)
        }
    }

    const clearSelect = () => {
        setAction(Action.index)
        setSelectedRow([]);
        setSelectedKeys([]);
        setMassSelection(false)
    }



    useEffect(() => {
        fetchAllShipment();
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0)
        switch (action) {
            case Action.add:
                setTitle('Add Shipment')
                break;
            case Action.edit:
                setTitle("Edit Shipment")
                break;
            case Action.parcelDetails:
                setTitle("Parcel Details")
                break;
            case Action.print:
                setTitle("Print Invoice")
                break;
            case Action.quickedit:
                setTitle(massSelection ? 'Bulk Update' : "Update Shipment Status");
                break;
            default:
                setTitle("Shipment Table")
        }

    }, [action, setAction])

    const refilterShipment = (id: number, parcelList: Parcel[]) => {
        setShipmentList(s => s.map((d) => {
            if (d?.id == id) {
                return {
                    ...d,
                    parcel: parcelList
                }
            } else {
                return d
            }
        }))
        setFilteredShipmentList(s => s.map((d) => {
            if (d?.id == id) {
                return {
                    ...d,
                    parcel: parcelList
                }
            } else {
                return d
            }
        }))
    }

    return (
        <Container title={title} icon={<FaShippingFast size={20} />}>
            <div className={`rounded-md p-3 `}>
                <TableHeader
                    showSearch={action === Action.index}
                    onSearch={(e: ChangeEvent<HTMLInputElement>) => filterShipment(e.target.value)}
                    showBackButton={action !== Action.index}
                    onBackButton={() => setAction(Action.index)}
                    showAddButton={action === Action.index}
                    onAddButton={() => {
                        if (massSelection) {
                            setAction(Action.quickedit);
                        } else {
                            setAction(Action.add)
                        }
                    }}
                    addButtonText={`${massSelection ? 'Bulk Update' : 'Add Shipment'}`}
                    onPrintButton={() => window.print()}
                    showPrintButton={action === Action.print}
                />
                <ShipmentTable
                    selectedRow={selectedRow}
                    massSelection={massSelection}
                    setMassSelection={setMassSelection}
                    setSelectedRow={setSelectedRow}
                    className={(action === Action.index || action === Action.printModel) ? '' : 'hidden'}
                    isDraft={false}
                    loading={loading}
                    data={filteredShipmentList}
                    deleteShipment={deleteShipment}
                    setAction={setAction}
                    setEditData={setEditData}
                    selectedKeys={selectedKeys}
                    setSelectedKeys={setSelectedKeys}
                    carrierList={carrierList}
                    destinationList={destinationList}
                />
                {
                    action === Action.printModel &&
                    <PrintModel showParcelIn={editData?.packages === 'parcel'} setPrintInfo={setPrintInfo} setAction={setAction} action={action} />
                }
                {
                    action === Action.print &&
                    <Print printInfo={printInfo} data={editData} />
                }
                {
                    action === Action.parcelDetails && editData?.parcel != undefined &&
                    <ParcelDetail refilterShipment={refilterShipment} setAction={setAction} editData={editData} />
                }

                {(action === Action.edit || action === Action.add || action === Action.copy) && <Form setShipmentList={setFilteredShipmentList} fetchAllShipment={fetchAllShipment} editData={editData} action={action} setAction={setAction} />}

                {action === Action.quickedit && <ShipmentStatus clearSelect={clearSelect} massSelection={massSelection} selectedRow={selectedRow} editData={editData} />}
            </div>
        </Container>

    )
};



export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            page: '/shipment',
            title: 'Ideal | Shipment ',
            moduleId: modeuleList.shipmentModule.id
        }
    }
}