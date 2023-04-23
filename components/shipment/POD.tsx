import React, { useEffect, useState } from 'react'
import { shipmentStatusUrl } from '../../apis/list.api';
import { httpClient } from '../../apis/rest.api';
import Logo from '../Logo';
interface Props {
    className?: string;
    data?: any;
}
const POD = ({ className, data }: Props) => {
    const [shipmentStatusList, setShipmentStatus] = useState<any[]>([]);
    const { id } = data;
    const fetchShipmentStatusList = async () => {

        const { data, error } = await httpClient().get(shipmentStatusUrl.getallByshipmentid + id);
        if (data && !error) {
            setShipmentStatus(data.data);
        }
    }
    useEffect(() => {
        fetchShipmentStatusList();
    }, [])
    return (
        <div className={` print:mx-0 mb-3 page-break-inside-avoid ${className}`}>
            <div className="page-break-inside-avoid">
                <div className="border p-6 print:border-none  print:shadow-none shadow-custom rounded-b-md " >
                    <div className='flex justify-between items-center'>
                        <Logo />
                        <h1 className='text-3xl font-bold'>Proof of Delivery </h1>
                    </div>
                    <div className='my-8 grid grid-cols-3 gap-2'>
                        <span>
                            <span className='text-base font-bold mr-2'>AWB No:</span>
                            <span>{data?.billNo}</span>
                        </span>
                        <span>
                            <span className='text-base font-bold mr-2'>Invoice Date:</span>
                            <span>{new Date().toJSON().slice(0, 10)}</span>
                        </span>
                        <span>
                            <span className='text-base font-bold mr-2'>Reference No:</span>
                            <span>{data?.carrierReferenceNo}</span>
                        </span>
                        <span>
                            <span className='text-base font-bold mr-2'>Carrier:</span>
                            <span>{data?.carrierId?.name}</span>
                        </span>
                        <span>
                            <span className='text-base font-bold mr-2'>Weight:</span>
                            <span>{data?.weight}</span>
                        </span>
                        <span>
                            <span className='text-base font-bold mr-2'>NoOf Pieces:</span>
                            <span>{data?.quantity}</span>
                        </span>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div className='border border-black p-1'>
                            <p className='text-base mb-1 font-bold'>SHIP FROM</p>
                            <span className='block'>{data?.shipperName}</span>
                            <span className='block'>{data?.shipperAddress}</span>
                            <span className='block'>{data?.shipperMail}</span>
                            <span className='block'>{data?.shipperContact}</span>
                            <span className='block'>{data?.origin}</span>
                        </div>
                        <div className='border border-black p-1'>
                            <p className='text-base mb-1 font-bold'>SHIP TO</p>
                            <span className='block '>{data?.receiverName}</span>
                            <span className='block text-justify break-words'>{data?.receiverPrimaryAddress}{','}{data?.receiverSecondaryAddress}</span>
                        </div>
                    </div>
                    <table width={'100%'} className="text-center text-[11px] border rounded-md border-black mt-10" cellPadding={5}>
                        <thead>
                            <tr className=''>
                                <th className='border font-bold border-black'>SN</th>
                                <th className='border border-black'>Status</th>
                                <th className='border border-black'>Location</th>
                                <th className='border border-black'>Date</th>
                                <th className='border border-black'>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                shipmentStatusList?.length > 0 ? shipmentStatusList.map((data, index) => {
                                    return (
                                        <tr key={index} className="border-b  ">
                                            <th scope="row" className="border border-black ">
                                                {index + 1}
                                            </th>
                                            <th scope="row" className="border border-black ">
                                                {data?.name?.name}
                                            </th>
                                            <td className="border border-black">
                                                {data?.location}
                                            </td>
                                            <td className="border border-black">
                                                {data?.date}
                                            </td>
                                            <td className="border border-black">
                                                {data?.remarks}
                                            </td>
                                        </tr>
                                    )
                                }) :
                                    <tr>
                                        <td className='border border-black' colSpan={7}>No Details</td>
                                    </tr>

                            }

                        </tbody>
                    </table>
                    {/* <div className='text-sm font-bold  mt-16'>
                        <span className='block uppercase'>value for customs purpose only no commerical value</span>
                        <div className='flex gap-2'>
                            <span className='block uppercase'>Reason For Export:</span>
                            <span className='font-normal uppercase'>{data?.comment}</span>
                        </div>
                    </div> */}
                    {/* <div className=' mt-5  gap-y-2 bottom-3 flex gap-0 flex-wrap justify-between text-sm'>
                        <div className='flex gap-3 w-[33%]'>
                            <span className='font-bold'>Name:</span>
                            <span>Ideal Courier</span>
                        </div>
                        <div className='w-[33%]'>
                            <span className='font-bold w-full'>Signature:</span>
                        </div>
                        <div className='w-[33%]'>
                            <span className='font-bold'>Company Stamp:</span>
                        </div>
                        <div className='w-full'>
                            <span className='font-bold'>Position:</span>
                        </div>
                        <div>
                            <span className='font-bold'>Date of Signature:</span>
                            <span className='border-b border-black px-16'></span>
                        </div>

                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default POD