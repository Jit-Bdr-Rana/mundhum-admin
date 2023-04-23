import { GetServerSideProps } from 'next'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { FaUserPlus } from 'react-icons/fa'
import { carrierUrl } from '../../../apis/list.api'
import { httpClient } from '../../../apis/rest.api'
import CarrierTable from '../../../components/shipment/carrier/Table'
import TableHeader from '../../../components/TableHeader'
import modeuleList from '../../../datas/module.data'
import { Action } from '../../../interface/common'
import { CarrierForm } from '../../../interface/form'
import Container from '../../../layouts/Container'
import { notification } from '../../../utils/tost'

const index = () => {
    return (
        <Carrier />
    )
}


const Carrier = () => {
    const [carrierList, setCarierList] = useState<Array<any>>([])
    const [filterCarrierList, setfilterCarrierList] = useState<Array<any>>([])
    const [action, setAction] = useState<Action>(Action.index);
    const [title, setTitle] = useState<string>('Carrier Table')
    const [editData, setEditData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const datafetch = async () => {
        const { data, error } = await httpClient().get(carrierUrl.getall)
        if (data && !error) {
            setCarierList(data?.data)
            setfilterCarrierList(data?.data)
        }
        else {
            alert('error in show')
        }
        setLoading(false)
    }
    const deleteCarrier = (carrier: any) => {
        const promise = async () => {
            const { data, error } = await httpClient().delete(carrierUrl.delete + carrier.id);
            if (data && !error) {
                notification.success(data?.message ?? 'carrier deleted successfully');
                datafetch();
            } else {
                notification.error(error?.errors ?? 'error in deleting carrier')
            }

        }
        notification.prompt(promise);
    }
    const setData = (data: any) => {
        setEditData(data)
        setTitle('Edit Carrier');
    }
    const filterShipment = (value: string) => {
        if (value) {
            setfilterCarrierList(carrierList.filter(f => f?.name?.toLowerCase()?.includes(value?.toLowerCase())))
        } else {
            setfilterCarrierList(carrierList)
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        switch (action) {
            case Action.add:
                setTitle('Add Carrier')
                setEditData({});
                break;
            case Action.edit:
                setTitle("Edit Carrier")
                break;
            default:
                setTitle("Carrier Table")
                setEditData({})
        }

    }, [action, setAction])
    useEffect(() => {
        datafetch()
    }, [])
    return (
        <Container title={title}>
            <div className=' rounded-md p-3'>
                <TableHeader
                    showSearch={action === Action.index}
                    searchPlaceholder="Search Carrier"
                    showAddButton={action === Action.index}
                    addButtonText='Add Carrier'
                    onAddButton={() => { setAction(Action.add) }}
                    showBackButton={action !== Action.index}
                    onBackButton={() => setAction(Action.index)}
                    onSearch={(e: ChangeEvent<HTMLInputElement>) => filterShipment(e.target.value)}
                />
                {action === Action.index &&
                    <CarrierTable
                        dataSource={filterCarrierList}
                        setAction={setAction}
                        deleteCarrier={deleteCarrier}
                        setData={setData}
                        loading={loading}
                    />
                }

                {action != Action.index && <Form action={action} setAction={setAction} editData={editData} datafetch={datafetch} />}
            </div>
        </Container>
    )
}

const Form = ({ datafetch, editData }: { editData?: any, datafetch: () => void, action: Action, setAction: (act: Action) => void }) => {
    const { register, handleSubmit, setValue, setError, reset, formState: { errors } } = useForm<CarrierForm>();


    const saveform = async (formdata: CarrierForm) => {
        if (formdata.id) {
            const { data, error } = await httpClient().put(carrierUrl.save + `/${formdata.id}`, formdata)
            setFormstate(data, error, true)
        } else {
            const { data, error } = await httpClient().post(carrierUrl.save, formdata)
            setFormstate(data, error, false)
        }
    };

    const setFormstate = (data: any, error: any, edit: boolean) => {
        if (data && !error) {
            reset()
            datafetch()
            notification.success(data?.message ?? edit ? 'data has been updated successfully' : 'data has been created successfully');
        }
        else {
            notification.error(edit ? 'fail to edit data' : 'fail to create data');
            error?.errors?.name && setError('name', { type: 'custom', message: error?.errors?.name[0] });
        }
    }


    useEffect(() => {
        setValue('name', editData?.name ?? '');
        setValue('email', editData?.email ?? '');
        setValue('website', editData?.website ?? '');
        setValue('contact', editData?.contact ?? '');
        setValue('id', editData?.id ?? '');
    }, [editData])

    return (
        <div>
            <form className='' onSubmit={handleSubmit(saveform)}>
                {/* add shipemnt  */}
                <div className={`w-[100%] animate-slow `}>
                    <div className=" p-3  gap-2  justify-center  mx-auto  shadow-custom rounded-md border ">
                        <div className=" gap-3 flex flex-wrap ">
                            <div className='w-[31%]'>
                                <label htmlFor=" name" className="block mb-2 text-sm  text-gray-900 "> Carrier Name</label>
                                <input {...register("name", { required: 'this field is required' })} type="text" id="" placeholder="carrier name" className={` border ${!errors?.name ? 'border-gray-300' : 'border-red-500'} ${!errors?.name ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                {errors?.name && <small className='text-red-500'>{errors.name?.message ? errors.name?.message : 'This field is required'}</small>}
                            </div>

                            <div className='w-[31%]'>
                                <label htmlFor=" website" className="block mb-2 text-sm  text-gray-900 "> Website</label>
                                <input {...register("website", { required: 'website is required' })} type="text" id="" placeholder="website" className={` border ${!errors?.website ? 'border-gray-300' : 'border-red-500'} ${!errors?.website ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                {errors?.website && <small className='text-red-500'>{errors?.website?.message}</small>}
                            </div>
                            <div className='w-[31%]'>
                                <label htmlFor=" email" className="block mb-2 text-sm  text-gray-900 "> email</label>
                                <input {...register("email", {
                                    required: 'email is required', pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Invalid email address"
                                    }
                                })} type="text" id="" placeholder="E-Mail" className={` border ${!errors?.email ? 'border-gray-300' : 'border-red-500'} ${!errors?.email ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />

                                {errors?.email && <small className='text-red-500'>{errors?.email?.message}</small>}
                            </div>
                            <div className='w-[31%]'>
                                <label htmlFor=" contact" className="block mb-2 text-sm  text-gray-900 "> contact</label>
                                <input {...register("contact", {
                                    required: "contact is required", pattern: {
                                        value: /^[1-9]{1}[0-9]{9}/,
                                        message: 'invalid contact '
                                    }
                                })} type="text" id="" placeholder="Contact" className={` border ${!errors?.contact ? 'border-gray-300' : 'border-red-500'} ${!errors?.contact ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                {errors?.contact && <small className='text-red-500'>{errors?.contact?.message}</small>}
                            </div>



                        </div>
                        <div className=" py-1 mt-4 text-white items-end gap-2 rounded-md flex mx-auto justify-center">
                            <button type='submit' title='addnew' className="bg-slate-500 flex justify-between px-2 py-1.5 text-xs rounded-md text-white  tracking-wide cursor-pointer mr-2">
                                <FaUserPlus size={16} />
                                <span className='ml-2'>save</span>
                            </button>
                        </div>

                    </div>
                </div>
            </form >
        </div>
    )
}


export default index

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            page: '/user',
            title: 'Ideal | Carrier',
            moduleId: modeuleList?.carrierModule.id
        }
    }
}