import { AutoComplete, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiHistory } from "react-icons/bi";
import { BsHourglassSplit } from "react-icons/bs";
import { IoClose, IoSave } from "react-icons/io5";
import { shipmentStatusUrl, statusUrl } from "../../apis/list.api";
import { httpClient } from "../../apis/rest.api";
import { domesticCity } from "../../datas/shipment.data";
import { ShipmentForm, ShipmentStatusForm, StatusForm } from "../../interface/form";
import { notification } from "../../utils/tost";
import ButtonGroup from "../ButtonGroup";
interface Props {
    editData?: ShipmentForm;
    className?: string;
    massSelection: boolean;
    selectedRow: number[];
    clearSelect: () => void
}


const ShipmentStatus = ({ editData, massSelection, selectedRow, clearSelect }: Props) => {
    const { register, handleSubmit, setValue, reset, watch, control, formState: { errors } } = useForm<ShipmentStatusForm>({
        defaultValues: { shipmentId: editData?.id }
    });
    const [shipmentStatusList, setShipmentStatus] = useState<any[]>([]);
    const [statusEdit, setStatusEdit] = useState<boolean>(false);
    const [statusList, setStatusList] = useState<StatusForm[]>([]);
    const saveForm = async (formData: ShipmentStatusForm) => {
        if (formData.id) {
            const { data, error } = await httpClient().put(shipmentStatusUrl.update + formData.id, formData);
            setFormState(data, error, true);
        } else {
            if (massSelection && selectedRow && selectedRow?.length > 0) {
                const payload = {
                    ...formData,
                    shipmentId: selectedRow
                }
                const { data, error } = await httpClient().post(shipmentStatusUrl?.massUpdate, payload);
                setFormState(data, error, false);
                clearSelect();

            } else {
                const { data, error } = await httpClient().post(shipmentStatusUrl.save, formData);
                setFormState(data, error, false);
            }

        }
    }
    const fetchAllStatus = async () => {
        const { data, error } = await httpClient().get(statusUrl.getall);
        if (data && !error) {
            setStatusList(data.data as StatusForm[]);
        }
    }
    const setFormState = (data: any, error: any, edit: boolean) => {
        if (data && !error) {
            notification.success(data?.message ?? edit ? 'data has been updated successfully' : 'data has been created successfully')
            reset();
            setStatusEdit(false);
            fetchShipmentStatusList();
        } else {
            notification.error(data?.errors ?? edit ? 'fail to update record' : 'fail to create data');
            // setError('statusId',{type:'custom',message:data?.errors})
        }
    }
    const fetchShipmentStatusList = async () => {
        const { data, error } = await httpClient().get(shipmentStatusUrl.getallByshipmentid + editData?.id);
        if (data && !error) {
            setShipmentStatus(data.data);
        }
    }
    const deleteShipmentStatus = (status: any) => {

        const deleteStatus = async () => {
            const { data, error } = await httpClient().delete(shipmentStatusUrl.delete + status?.id);
            if (data && !error) {
                notification.success(data?.message ?? 'data has been deleted successfully');
                fetchShipmentStatusList();
            } else {
                notification.error((data?.errors || data?.error) ?? 'fail to delete record')
            }
        }

        notification.prompt(deleteStatus)
    }
    const editStatusform = (data: any) => {
        setStatusEdit(true);
        setValue('id', data?.id);
        setValue('date', data?.date);
        setValue('time', data?.time);
        setValue('location', data?.location);
        setValue('shipmentId', data?.shipmentId);
        setValue('statusId', parseInt(data?.name?.id), { shouldValidate: true });
        setValue('remarks', data?.remarks);
    }
    useEffect(() => {
        if (editData?.id) {
            fetchShipmentStatusList();
            setValue('shipmentId', editData?.id)
        }
    }, [editData])
    useEffect(() => {
        fetchAllStatus()
    }, [])
    const { Option } = Select

    return (
        <React.Fragment>
            <div className='shadow-custom px-3 pt-3  animate-slow'>
                <div className='text-center flex flex-row-reverse bg-slate-600 text-white py-1.5 text-xl font-bold font-poppin'>
                    <div className='pr-2 w-full flex items-center justify-center'>
                        <span className='p-1.5'>{
                            massSelection ?
                                <span>Total Selected Row:{selectedRow?.length || 0}</span>
                                :
                                <span>Bill No:{editData?.billNo}</span>
                        }</span>
                        {statusEdit && <span onClick={() => { setStatusEdit(false); reset() }} className='hover:bg-black hover:bg-opacity-20  rounded-full p-1.5 cursor-pointer '><IoClose size={19} /></span>}
                    </div>
                </div>
                <form onSubmit={handleSubmit(saveForm)}>
                    <p className='flex gap-3 mt-3 text-gray-900 text-base font-bold underline'><span>{massSelection && 'Bulk'} Update Shipment Status</span> <BsHourglassSplit size={18} /></p>
                    <div className="grid gap-4 mb-6 lg:grid-cols-4 mt-2 ">
                        <div className=''>
                            <label htmlFor="" className="block mb-2 text-sm  text-gray-900 "> Date</label>
                            <input {...register('date')} type="date" className={` border ${errors.date ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="2022-05-30" />
                            {errors?.date && <small className="text-red-500 text-xs">{errors.date?.message}</small>}
                        </div>
                        <div className=''>
                            <label htmlFor="" className="block mb-2 text-sm  text-gray-900 "> Time</label>
                            <input {...register('time')} type="time" className={` border ${errors.time ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="16:12 pm" />
                            {errors?.time && <small className="text-red-500 text-xs">{errors.time?.message}</small>}
                        </div>
                        <div className=''>
                            <label htmlFor="" className="block mb-2 text-sm  text-gray-900 "> Location</label>
                            <Controller
                                control={control}
                                name={'location'}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <AutoComplete
                                        placeholder="enter the location"
                                        showSearch
                                        className="w-full"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        options={
                                            domesticCity.map((data: string) => {
                                                return {
                                                    text: data,
                                                    value: data
                                                }
                                            })
                                        }
                                        filterOption={(inputValue, option) =>
                                            option?.value?.toUpperCase()?.indexOf(inputValue?.toUpperCase()) !== -1
                                        }
                                    />
                                )}
                            />
                            {/* <input {...register('location')} type="text" className={` border ${errors.location ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="location" /> */}
                            {errors?.location && <small className="text-red-500 text-xs">{errors.location?.message}</small>}
                        </div>
                        <div>
                            <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Status</label>
                            <Controller
                                control={control}
                                name={'statusId'}
                                rules={{
                                    pattern: {
                                        value: /^(?!.*(null))/,
                                        message: 'status is required'
                                    },
                                    required: true
                                }}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Select
                                        placeholder="select the status"
                                        showSearch
                                        ref={ref}
                                        className={`${errors?.statusId ? 'error' : 'custom'} w-full `}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        optionFilterProp="value"
                                        value={value}
                                        filterOption={(inputValue, option) =>
                                            option?.label?.toUpperCase()?.indexOf(inputValue?.toUpperCase()) !== -1
                                        }
                                    >
                                        {
                                            statusList.map((dat: any, index: number) => {
                                                return (
                                                    <Option key={index} selected={watch('statusId') == dat?.id} value={dat?.id}>{dat?.name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                )}
                            />
                            {errors?.statusId && <small className="text-red-500 text-xs">status is required</small>}
                        </div>
                        <div className='col-span-3'>
                            <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Remarks</label>
                            <textarea {...register('remarks')} title='comments' className={` border ${errors.remarks ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `}   ></textarea>
                            {errors?.remarks && <small className="text-red-500 text-xs">{errors.remarks?.message}</small>}
                        </div>
                        <div className=" col-span-4  pb-3 text-white items-end gap-2 rounded-md flex mx-auto justify-center">
                            <button type='submit' title='addnew' className="bg-slate-500 flex justify-between px-2 py-1.5 text-xs rounded-md text-white  tracking-wide cursor-pointer mr-2">
                                <IoSave size={16} />
                                <span className='ml-2'>Save</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {
                !massSelection &&
                <div className="relative overflow-x-auto shadow-custom p-3 animate-slow  ">
                    <p className='flex gap-3  items-center text-gray-900 text-base font-bold underline mb-3'><span>History</span> <BiHistory size={20} /></p>
                    <table className="w-full text-sm text-left text-white bg-slate-50 dark:text-gray-400">
                        <thead className="text-xs text-white font-bold uppercase bg-slate-600">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Sn
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    location
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                shipmentStatusList?.length > 0 ? shipmentStatusList.map((data, index) => {
                                    return (
                                        <tr key={index} className="border-b text-gray-500 odd:bg-white even:bg-gray-50 ">
                                            <th scope="row" className="px-6 py-2 ">
                                                {index + 1}
                                            </th>
                                            <th scope="row" className="px-6 py-2 text-gray-800 whitespace-nowrap">
                                                {data?.name?.name}
                                            </th>
                                            <td className="px-6 py-2">
                                                {data?.location}
                                            </td>
                                            <td className="px-6 py-2">
                                                {data?.date}
                                            </td>
                                            <td className="px-6 py-2">
                                                {data?.time}
                                            </td>

                                            <td className="px-6 py-2 flex ">
                                                <ButtonGroup
                                                    edit={true}
                                                    onEdit={() => {
                                                        editStatusform(data)
                                                    }}
                                                    dlt={true}
                                                    onDelete={() => {
                                                        deleteShipmentStatus(data)
                                                    }}

                                                />
                                            </td>
                                        </tr>
                                    )
                                }) :
                                    <tr className="border-b text-gray-500 odd:bg-white even:bg-gray-50 ">
                                        <td colSpan={6} className='text-center py-2'>No record found</td>
                                    </tr>

                            }

                        </tbody>
                    </table>
                </div>
            }
        </React.Fragment>
    )
}

export default ShipmentStatus