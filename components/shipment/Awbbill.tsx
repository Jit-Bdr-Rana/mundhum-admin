import { Action } from "../../interface/common";
import Logo from "../Logo";
import Barcode from "./Barcode";
const Awbbill = ({ data, className }: { data?: any, className?: string, setAction?: (set: Action) => void }) => {
    interface Invoice {
        title: string;
        name: string;
        mail: string;
        contact: string;
        address: string
    }


    const list = new Array<Invoice>({ title: 'SHIPPER DETAILS', name: data?.shipperName, mail: data?.shipperMail, contact: data?.shipperContact, address: data?.shipperAddress }, { title: 'RECEIVER DETAILS', name: data?.receiverName, mail: data?.receiverMail, contact: data?.receiverPrimaryContact, address: data?.receiverPrimaryAddress + ',' + data?.receiverSecondaryAddress })
    return (
        <div className={` print:mx-0 mb-3 page-break-inside-avoid   ${className}`}>
            <div className="print:page-break-inside">
                <div className="border pb-5 page-break-inside-avoid page-break-inside print:shadow-none shadow-custom rounded-b-md " id="invoice-bill">
                    <div className="flex print:px-5 px-5 items-center select-none justify-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Logo />
                        <div >
                            <Barcode billNo={data?.billNo} />
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div className="flex px-5  justify-between gap-2">
                        {
                            list.map((currentData, index) => {
                                return (
                                    <div key={index} >
                                        <h1 className="font-bold text-base underline mb-2" >{currentData.title}</h1>
                                        <div className="flex gap-1 mb-1" >
                                            <span className="font-bold text-xs " >Shipper Name: </span>
                                            <span className="text-xs " >{currentData?.name}</span>
                                        </div>
                                        <div className="flex gap-1 mb-1 " >
                                            <span className="font-bold text-xs" >Phon number:</span>
                                            <span className="text-xs " > {currentData?.contact}</span>
                                        </div>
                                        <div className="flex gap-1 mb-1" >
                                            <span className="font-bold text-xs " >Email:</span>
                                            <span className="text-xs " >{currentData?.mail}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-xs " >Address:</span>
                                            <span className="text-xs "> {currentData?.address}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr className="my-3" />
                    <div className="px-5">
                        <h1 className="font-bold text-base underline mb-2" >Payment</h1>
                        <div className="flex gap-1 mb-1">
                            <span className="font-bold text-xs " >Type:</span>
                            <span className="text-xs " >{data?.paymentId?.name}</span>
                        </div>
                        <div className="flex gap-1 ">
                            <span className="font-bold text-xs " >Amount:</span>
                            <span className="text-xs " >Rs.{data?.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
};


export default Awbbill;