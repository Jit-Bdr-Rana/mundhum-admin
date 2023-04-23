import React from 'react'
import billnotes from '../../datas/billnotes.data';
import { BillType } from '../../interface/common';
import Barcode from './Barcode';
interface InvoiceProps {
    showTermsAndCondition?: boolean;
    className?: string;
    title?: string;
    data?: any;
    billType?: BillType
}
const Invoice = ({ showTermsAndCondition = true, className, title, data, billType }: InvoiceProps) => {
    return (
        <div className={`print:p-0 invoice p-5 mb-4 page-break-inside-avoid   print:!shadow-none shadow-custom ${className}`}>
            <span className='block text-right font-bold text-[11px] print:ml-0 !mr-8'>{title ?? 'CONSIGNOR COPY'}</span>
            <div className='flex justify-center'>
                <table width={'100%'} cellPadding={4} className="border-2  border-black text-[11px]">
                    <tbody className='border-2 border-black '>
                        <tr className='border-2 border-black '>
                            <td colSpan={11} className='border-2 border-black pl-2'>
                                <div className='grid grid-cols-12 items-center print:gap-[3rem] justify-end '>
                                    <div className='col-span-7 font-bold  whitespace-nowrap'>
                                        <span className='print:text-lg text-xl'>Ideal Courier and Cargo Pvt Ltd</span>
                                        <div className='flex gap-2 mt-3'>
                                            <span className='flex items-center gap-2 uppercase'> <input name='type' title='che' disabled={data?.varient?.toString().toLowerCase() != 'courier'} checked={data?.varient?.toString().toLowerCase() == 'courier'} type="radio" />Courier</span>
                                            <span className='flex items-center gap-2 uppercase'> <input name='type' title='che' disabled={data?.varient?.toString().toLowerCase() != 'cargo'} checked={data?.varient?.toString().toLowerCase() == 'cargo'} type="radio" />Cargo</span>
                                        </div>
                                    </div>
                                    <div className='col-span-5 text-[11px] whitespace-nowrap text-right leading-4'>
                                        <span className='block'>Gaushala,Battispuatali Road</span>
                                        <span className='block'>Near Dwarika Hotel, Kathmandu, Nepal</span>
                                        <span className='block'>Tel:977-1-4578809, 4578678</span>
                                        <span className='block'>Email: idealcouriernpl@gmail.com</span>
                                        <span className='block'>Website: www.idealcourier.com.np</span>
                                    </div>
                                </div>
                            </td>
                            <td colSpan={1} className='border-2 border-black   '>
                                <div className='flex items-center '>
                                    <span className=''>Ref:</span><span className='text-sm  ml-1 font-bold'>{data?.carrierReferenceNo}</span>
                                </div>
                                <div className='flex items-center mt-3 '>
                                    <span className=''>Mode:</span><span className='  ml-1 '>{data?.mode}</span>

                                </div>
                            </td>
                            <td colSpan={4} className='border-2  border-black  text-center'>
                                <div  >
                                    {
                                        data?.billNo &&
                                        <Barcode billNo={data?.billNo} />
                                    }

                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={1} className="border-2 border-black py-3 capitalize">Shipper{"'"}s Address</td>
                            <td colSpan={5} className="border-2 border-black ">
                                <div className='flex justify-start gap-2 '>
                                    <div className=' w-[60%] '>
                                        <span className='flex'><span className='font-bold mr-1'>From:</span> {data?.origin}</span>
                                    </div>
                                    <div className=' w-[40%]'>
                                        <span className='pr-28'>Dt:</span>

                                    </div>
                                </div>
                            </td>
                            <td colSpan={1} className="border-2 border-black capitalize">Receiver{"'"}s Address</td>
                            <td colSpan={5} className="border-2 border-black ">
                                <div className='flex justify-start gap-2'>
                                    <div className=' w-[60%] '>
                                        <span className='flex'><span className='font-bold mr-1'>To: </span>{data?.destination}</span>
                                    </div>
                                    <div className=' w-[40%]'>
                                        <span className='pr-28'>Dt:</span>

                                    </div>
                                </div>
                            </td>
                            <td colSpan={1} className="border-2 border-black">No of pcs</td>
                            <td colSpan={3} className="border-2 border-black px-2">{data?.quantity}</td>
                        </tr>
                        <tr>
                            <td rowSpan={5} colSpan={6} className='border-2  border-black text-left relative'>
                                <div className='flex items-start justify-start absolute top-0'>
                                    <div>
                                        <p className='mt-1'>M/S</p>
                                        <p className='bolck text-base'>{data?.shipperName} {' '} {data?.shipperAddress ? '(' + data?.shipperAddress + ')' : ''}</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-2 justify-start absolute bottom-0'>
                                    <p>Tel / Mobile</p>
                                    <p>{data?.shipperContact}</p>
                                </div>
                            </td>
                            <td rowSpan={5} colSpan={6} className='border-2 border-black text-left relative'>
                                <div className='flex items-start justify-start absolute top-0'>
                                    <div>
                                        <p className='mt-1'>M/S</p>
                                        <p className='bolck text-base'>{data?.receiverName} {data?.receiverPrimaryAddress ? '( ' + data?.receiverPrimaryAddress + ' )' : ''} {data?.secondaryPrimaryAddress ? '( ' + data?.secondaryPrimaryAddress + ' )' : ''}</p>
                                    </div>
                                </div>
                                <div className='flex items-start justify-start absolute bottom-0 gap-2'>
                                    <p>Tel / Mobile</p>
                                    <p>{data?.receiverPrimaryContact ?? data?.receiverSecondaryContact}</p>
                                </div>
                            </td>
                            <td colSpan={1} className="border-2 border-black py-2">
                                weight
                            </td>
                            <td colSpan={3} className="border-2 border-black px-2" >
                                {data?.weight}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="border-2 border-black text-center">
                                Contents
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="border-2 border-black py-5"></td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="border-2 border-black p-2">
                                <div className='flex gap-2 items-center'>
                                    <span className='flex items-center  gap-1'> <span className=''><input disabled={true} title='documented' className='select-none' checked={data?.packages == 'document'} type="checkbox" /></span> Document </span>
                                    <span className='flex items-center  gap-1'><span className=''><input className='select-none' disabled title='parcel' checked={data?.packages == 'parcel'} type="checkbox" /></span> parcel </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={1} rowSpan={1} className='border-x-2  border-black'>

                            </td>
                            <td colSpan={2} rowSpan={1} className='border-2 border-black px-4'>
                                Rs
                            </td>
                            <td colSpan={1} rowSpan={1} className='border-2 border-black px-4 '>
                                Ps
                            </td>
                        </tr>


                        <tr>
                            <td colSpan={6} rowSpan={3} className='border-2 relative border-black '>
                                <div className='absolute top-0'>
                                    <span>Sender{"'"}s Signature {'&'}Date</span>
                                    <span className='ml-3'>{new Date().toJSON().slice(0, 10)}</span>
                                </div>
                            </td>
                            <td colSpan={6} rowSpan={6} className='border-2 py-10 relative border-black '>
                                <div className='mx-1  leading-5 absolute top-0 inset-x-0'>
                                    <div className=''>
                                        <span className=''>Received in good condition</span>
                                    </div>
                                    <div className='flex justify-start  '>
                                        <span className='block w-1/2'>Receved by</span>
                                        <span className='block w-1/2'>Date: {billType === BillType.client ? '' : new Date().toJSON().slice(0, 10)}</span>
                                    </div>
                                    <div className='flex justify-start  '>
                                        <span className='block w-1/2'>Name</span>
                                        <span className='block w-1/2'>Time: {billType === BillType.client ? '' : new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                                    </div>
                                    <div>
                                        <span className=''>Signature  {'&'} Stamp</span>
                                    </div>
                                </div>

                            </td>
                            <td colSpan={1} className='border-x-2 py-2 border-black text-right'>
                                Charge
                            </td>
                            <td colSpan={2} className='border-x-2 border-black'>
                                {data?.price ? data?.price + '/-' : ''}
                            </td>
                            <td colSpan={1} className='border-x-2 border-black'>

                            </td>
                        </tr>
                        <tr>
                            <td colSpan={1} className='border-x-2 border-black text-right'>
                                Discount
                            </td>
                            <td colSpan={2} className='border-x-2 border-black'>

                            </td>
                            <td colSpan={1} className='border-x-2 border-black'>

                            </td>
                        </tr>
                        <tr>
                            <td colSpan={1} rowSpan={4} className='border-x-2 border-b-2 border-black text-right'>
                                Total
                            </td>
                            <td colSpan={2} rowSpan={4} className='border-2 border-black'>
                                {data?.price ? data?.price + '/-' : ''}
                            </td>
                            <td colSpan={1} rowSpan={4} className='border-2 border-black'>

                            </td>
                        </tr>
                        <tr>
                            <td colSpan={6} rowSpan={3} className="border-2 relative py-5 border-black">
                                <span className='top-0 absolute'> For Ideal Express</span>
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>
            {
                showTermsAndCondition &&
                <div className='py-2 print:px-0 print:py-0'>
                    <ul className='list-item text-[11px] mt-3 '>
                        {
                            billnotes.map((data, index) => {
                                return (
                                    <li key={index} className="mb-1 flex gap-2">
                                        <span className='w-[1%]'>{index + 1}</span>
                                        <span className='w-[99%] text-justify'>{data}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default Invoice