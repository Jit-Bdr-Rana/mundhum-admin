import Modal from 'antd/lib/modal/Modal'
import React, { SetStateAction } from 'react'
import { useForm } from 'react-hook-form';
import { FiFileText } from 'react-icons/fi';
import { Action } from '../../interface/common';
interface Props {
    showParcelIn?: boolean
    action: Action;
    setAction: React.Dispatch<SetStateAction<Action>>;
    setPrintInfo: React.Dispatch<SetStateAction<PrintProps | undefined>>
}
export type PrintProps = Record<"awbBil" | 'clientBill' | 'accountsCopy' | 'pod' | 'parcelInvoice', { print: boolean, number: number }>

const PrintModel = ({ action, setAction, setPrintInfo, showParcelIn }: Props) => {
    const { handleSubmit, register, watch } = useForm<PrintProps>();
    const submit = (value: PrintProps) => {
        setPrintInfo(value);
        setAction(Action.print);
    }
    const cancel = () => {
        setAction(Action.index)
    }
    return (
        <Modal footer width={"70%"} maskClosable={false} title="Invoice Print" open={action == Action.printModel} onCancel={() => cancel()} destroyOnClose>
            <form onSubmit={handleSubmit(submit)}>
                <div className='flex select-none my-10 justify-between'>
                    <div className='w-[20%] flex items-center flex-col gap-y-2'>
                        <span className='text-lg font-bold'>Awb bill</span>
                        <FiFileText size={100} />
                        <input title='checkbox' {...register('awbBil.print')} type="checkbox" className='border accent-gray-500 w-[20%] h-5 mb-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300 text-gray-900 text-sm  focus:outline-none   ' />

                        {watch('awbBil.print') && <input title='awb' type="number" {...register('awbBil.number')} defaultValue={1} max={99} className='border w-[20%] px-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none   ' />}
                    </div>
                    <div className=' w-[20%] flex items-center flex-col gap-y-2'>
                        <span className='text-lg font-bold'>Client bill</span>
                        <FiFileText size={100} />
                        <input  {...register('clientBill.print')} type="checkbox" className='border accent-gray-500 w-[20%] h-5 mb-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300 text-gray-900 text-sm  focus:outline-none   ' />
                        {watch('clientBill.print') && <input title='awb' type="number" {...register('clientBill.number')} defaultValue={1} max={99} className='border w-[20%] px-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none   ' />}
                    </div>
                    <div className='w-[20%] flex items-center flex-col gap-y-2'>
                        <span className='text-lg font-bold'>Accounts Copy</span>
                        <FiFileText size={100} />
                        <input  {...register('accountsCopy.print')} type="checkbox" className='border accent-gray-500 w-[20%] h-5 mb-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300 text-gray-900 text-sm  focus:outline-none   ' />
                        {watch('accountsCopy.print') && <input title='awb' type="number" {...register('accountsCopy.number')} defaultValue={1} max={99} className='border w-[20%] px-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none   ' />}
                    </div>
                    <div className='w-[20%] flex items-center flex-col gap-y-2'>
                        <span className='text-lg font-bold'>POD</span>
                        <FiFileText size={100} />
                        <input {...register('pod.print')} type="checkbox" className='border w-[20%] h-5 accent-gray-500 mb-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300 text-gray-900 text-sm  focus:outline-none   ' />
                        {watch('pod.print') && <input title='awb' type="number" {...register('pod.number')} defaultValue={1} max={99} className='border w-[20%] px-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none   ' />}
                    </div>
                    {
                        showParcelIn &&
                        <div className='w-[20%] flex items-center flex-col gap-y-2 '>
                            <span className='text-lg font-bold'>Parcel Invoice</span>
                            <FiFileText size={100} />
                            <input {...register('parcelInvoice.print')} type="checkbox" className='border accent-gray-500 w-[20%] h-5 mb-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300 text-gray-900 text-sm  focus:outline-none   ' />
                            {watch('parcelInvoice.print') && <input title='awb' type="number" {...register('parcelInvoice.number')} defaultValue={1} max={99} className='border w-[20%] px-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none   ' />}
                        </div>
                    }

                </div>
                <Footer cancel={cancel} disable={!watch('accountsCopy.print') && !watch('awbBil.print') && !watch('clientBill.print') && !watch('parcelInvoice.print') && !watch('pod.print')} />
            </form>
        </Modal>
    )
}

export default PrintModel

const Footer = ({ cancel, disable }: { cancel: () => void, disable: boolean }) => (
    <div className='flex gap-2 justify-end'>
        <button onClick={() => cancel()} className='p-1.5 px-4 border rounded-md'>Cancel</button>
        <button disabled={disable} type='submit' className='p-1.5 px-5 text-white border hover:bg-gray-600 rounded-md bg-gray-500'>Print</button>
    </div>
)