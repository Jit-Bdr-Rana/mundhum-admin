import React from 'react'
import { BillType } from '../../interface/common'
import Awbbill from './Awbbill'
import Invoice from './Invoice'
import ParcelInvoice from './ParcelInvoice'
import POD from './POD'
import { PrintProps } from './PrintModel'
interface Props {
    printInfo: PrintProps | undefined,
    data?: any
}
const Print = ({ printInfo, data }: Props) => {
    return (
        <div className=''>

            {/* awb bill */}
            {
                printInfo && printInfo?.awbBil?.print &&
                Array(parseInt(printInfo?.awbBil?.number?.toString() || '0')).fill(0).map((d, index) => {
                    return (
                        <Awbbill data={data} key={index} />
                    )
                })
            }
            {/* client copy */}
            {
                printInfo && printInfo?.clientBill?.print &&
                Array(parseInt(printInfo?.clientBill?.number?.toString() || '0')).fill(0).map((d, index) => {
                    return (
                        <Invoice billType={BillType.client} data={data} key={index} showTermsAndCondition={true} />
                    )
                })
            }
            {/* accounts copy */}
            {
                printInfo && printInfo?.accountsCopy?.print &&
                Array(parseInt(printInfo?.accountsCopy?.number?.toString() || '0')).fill(0).map((d, index) => {
                    return (
                        <Invoice billType={BillType.accountcopy} data={data} title={`ACCOUNTS COPY`} key={index} showTermsAndCondition={false} />
                    )
                })
            }
            {/* pod copy */}
            {
                printInfo && printInfo?.pod?.print &&
                Array(parseInt(printInfo?.pod?.number?.toString() || '0')).fill(0).map((d, index) => {
                    return (
                        <POD key={index} data={data} />
                    )
                })
            }
            {/* parcel details invoice */}
            {
                printInfo && printInfo?.parcelInvoice?.print &&
                Array(parseInt(printInfo?.parcelInvoice?.number?.toString() || '0')).fill(0).map((d, index) => {
                    return (
                        <ParcelInvoice data={data} key={index} />
                    )
                })
            }

        </div>
    )
}

export default Print