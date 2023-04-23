import React from 'react'
import Logo from '../Logo';
interface Props {
    className?: string;
    data?: any;
}
const ParcelInvoice = ({ className, data }: Props) => {
    return (
        <div className={` print:mx-0 mb-3 page-break-inside-avoid ${className}`}>
            <div className="page-break-inside-avoid">
                <div className="border p-6 print:border-none  print:shadow-none shadow-custom rounded-b-md " >
                    <div className='flex justify-between items-center '>
                        <Logo />
                        <h1 className='text-3xl font-bold'>Parcel Invoice</h1>
                    </div>
                    <div className='my-5 flex gap-20'>
                        <span>
                            <span className='text-base font-bold mr-2'>AWB No:</span>
                            <span>{data?.billNo}</span>
                        </span>
                        <span>
                            <span className='text-base font-bold mr-2'>Invoice Date:</span>
                            <span>{new Date().toJSON().slice(0, 10)}</span>
                        </span>
                        <span>
                            <span className='text-base font-bold mr-2'>Invoice No:</span>
                            <span></span>
                        </span>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div>
                            <p className='text-base mb-1 font-bold'>SHIP FROM</p>
                            <span className='block'>{data?.shipperName}</span>
                            <span className='block'>{data?.shipperAddress}</span>
                            <span className='block'>{data?.shipperMail}</span>
                            <span className='block'>{data?.shipperContact}</span>
                            <span className='block'>{data?.origin}</span>
                        </div>
                        <div>
                            <p className='text-base mb-1 font-bold'>SHIP TO</p>
                            <span className='block'>{data?.receiverName}</span>
                            <span className='block'>{data?.receiverPrimaryAddress}{','}{data?.receiverSecondaryAddress}</span>
                            <span className='block'>{data?.receiverMail}</span>
                            <span className='block'>{data?.destination}</span>
                        </div>
                    </div>
                    <table width={'100%'} className="text-center text-[11px] border rounded-md border-black mt-16" cellPadding={5}>
                        <thead>
                            <tr className=''>
                                <th className='border font-bold border-black'>Item</th>
                                <th className='border border-black'>Description</th>
                                <th className='border border-black'>Code</th>
                                <th className='border border-black'>COD</th>
                                <th className='border border-black'>Qty</th>
                                <th className='border border-black'>Unit</th>
                                <th className='border border-black'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                (data?.parcel && data?.parcel?.length > 0) ? data?.parcel?.map((parcel: any, index: number) => {
                                    return (<tr key={index}>
                                        <td className='border border-black'>{index + 1}</td>
                                        <td className='border border-black'>{parcel.description} </td>
                                        <td className='border border-black'>{parcel?.code}</td>
                                        <td className='border border-black'>{parcel?.cod}</td>
                                        <td className='border border-black'>{parcel?.qty}</td>
                                        <td className='border border-black'>{parcel?.unit}</td>
                                        <td className='border border-black'>{parcel?.qty * parcel?.unit}</td>
                                    </tr>)
                                }) :
                                    <tr>
                                        <td className='border border-black' colSpan={7}>No Details</td>
                                    </tr>
                            }

                        </tbody>
                    </table>
                    <div className='text-sm font-bold  mt-16'>
                        <span className='block uppercase'>value for customs purpose only no commerical value</span>
                        <div className='flex gap-2'>
                            <span className='block uppercase'>Reason For Export:</span>
                            <span className='font-normal uppercase'>{data?.comment}</span>
                        </div>
                    </div>
                    <div className=' mt-5  gap-y-2 bottom-3 flex gap-0 flex-wrap justify-between text-sm'>
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

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParcelInvoice