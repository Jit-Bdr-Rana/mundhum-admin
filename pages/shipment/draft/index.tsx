import { GetServerSideProps } from 'next'
import React, { useEffect, ChangeEvent, useState } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import Form from '../../../components/shipment/Form';
import Container from '../../../layouts/Container';
import { Action } from '../../../interface/common';
import { httpClient } from '../../../apis/rest.api';
import { shipmentUrl } from '../../../apis/list.api';
import { ShipmentForm } from '../../../interface/form';
import { notification } from '../../../utils/tost';
import TableHeader from '../../../components/TableHeader';
import ShipmentTable from '../../../components/shipment/ShipmentTable';
import modeuleList from '../../../datas/module.data';
const index = () => {
    return (
        <Shipment />
    )
}
export default index

export const Shipment = () => {

    const [action, setAction] = useState<Action>(Action.index);
    const [shipmentList, setShipmentList] = useState<Array<any>>([]);
    const [editData, setEditData] = useState<any>();
    const [title, setTitle] = useState<string>('Shipment Table');
    const [filteredShipmentList, setFilteredShipmentList] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [carrierList, setCarrierList] = useState<any[]>([]);
    const [destinationList, setDestinationList] = useState<any[]>([]);
    const fetchAllShipment = async () => {
        setLoading(true)
        const { data, error } = await httpClient().get(shipmentUrl.getallUsingFilter + 1);
        if (data && !error) {
            setShipmentList(data?.data['shipments']);
            setFilteredShipmentList(data?.data['shipments']);
            setDestinationList(data?.data['desinationList'])
            setCarrierList(data?.data['carriers'])
        }
        setLoading(false);
    }
    const filterShipment = (value: string) => {
        if (value) {
            setFilteredShipmentList(shipmentList.filter(f => f?.billNo?.includes(value?.toLowerCase())))
        } else {
            setFilteredShipmentList(shipmentList)
        }

    }
    useEffect(() => {
        fetchAllShipment();
    }, [])

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
    useEffect(() => {
        window.scrollTo(0, 0)
        switch (action) {
            case Action.edit:
                setTitle("Edit Draft")
                break;
            default:
                setTitle("Draft Shipment Table")
        }

    }, [action, setAction])

    return (
        <Container title={title} icon={<FaShippingFast size={20} />}>

            <div className={`rounded-md p-3  `}>
                <TableHeader
                    showSearch={action === Action.index}
                    showBackButton={action === Action.edit}
                    onBackButton={() => setAction(Action.index)}
                    onSearch={(e: ChangeEvent<HTMLInputElement>) => filterShipment(e.target.value)}
                />
                <ShipmentTable destinationList={destinationList} carrierList={carrierList} isDraft={true} className={` ${!(action === Action.index) ? 'hidden' : ''} `} loading={loading} data={filteredShipmentList} deleteShipment={deleteShipment} setAction={setAction} setEditData={setEditData} />
                {
                    (action === Action.edit || action === Action.add) &&
                    <Form setShipmentList={setShipmentList} fetchAllShipment={fetchAllShipment} editData={editData} action={action} setAction={setAction} />

                }
            </div>
        </Container>

    )
};
export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            page: '/shipment',
            title: 'Ideal | Draft Shipment',
            moduleId: modeuleList.shipmentModule.id
        }
    }
}