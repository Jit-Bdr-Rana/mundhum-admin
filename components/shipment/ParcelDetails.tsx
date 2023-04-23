import { Button } from "antd";
import React, { SetStateAction, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlineMinusCircle, AiOutlinePlus } from "react-icons/ai";
import { BsHourglassSplit } from "react-icons/bs";
import { IoSave } from "react-icons/io5";
import { parcelDetailUrl } from "../../apis/list.api";
import { httpClient } from "../../apis/rest.api";
import { Action } from "../../interface/common";
import { Parcel, ShipmentForm } from "../../interface/form";
import { notification } from "../../utils/tost";

const ParcelDetail = ({ editData, setAction, refilterShipment }: { refilterShipment: (id: number, parcelList: Parcel[]) => void, editData?: ShipmentForm, className?: string, setAction: React.Dispatch<SetStateAction<Action>> }) => {
    const { register, handleSubmit, setValue, reset, watch, control, formState: { errors } } = useForm<Parcel>({
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "parcel"
    });
    const saveForm = async (formData: Parcel) => {
        const payload = formData?.parcel?.map((d) => {
            return {
                ...d,
                id: d?.id ? parseInt(d?.id.toString() || '0') : null,
                weight: parseFloat(d?.weight?.toString() || '0'),
                qty: parseFloat(d?.qty?.toString() || '0'),
                unit: parseFloat(d?.unit?.toString() || '0'),
                total: parseFloat(d?.total?.toString() || '0')
            }
        })
        const { data, error } = await httpClient().put(parcelDetailUrl.update + editData?.id, { parcel: payload });
        if (data && !error) {
            notification.success("Parcel details updated successfully");
            reset();
            setAction(Action.index);
            refilterShipment(editData?.id as number, data?.data as Parcel[])
        } else {
            notification.error(error?.message ?? 'Oops something went wrong')
        }

    }

    useEffect(() => {
        if (editData?.parcel && editData?.parcel?.length > 0) {

            setValue('parcel', editData?.parcel?.map((p) => { return { ...p, total: (p.qty || 0) * (p.unit || 0) } }))
        }
    }, [])
    return (
        <React.Fragment>
            <div className='   animate-slow'>
                <form onSubmit={handleSubmit(saveForm)}>
                    <div className="shadow-custom  p-3">
                        <div className='text-center flex flex-row-reverse bg-slate-600 text-white py-1.5 text-xl font-bold font-poppin'>
                            <div className='w-[55%] pr-2 flex items-center justify-between'>
                                <span className='p-1.5'>Bill No:{editData?.billNo}</span>
                            </div>
                        </div>
                        <p className='flex gap-3 my-4 text-gray-900 text-base font-bold underline'><span>Update Parcel</span> <BsHourglassSplit size={18} /></p>
                        <div className="">
                            <p className='px-2 py-1.5 text-sm font-bold border-l-4 border-l-gray-900 bg-gray-400 text-white rounded-l-sm'>Parcel Details</p>
                            {fields.map((field, index) => {
                                return (
                                    <div className="flex flex-wrap  justify-between mb-3" key={field.id}>
                                        <div className="w-[1%] self-center">
                                            <label htmlFor="weight" className="block mb-2 text-sm  text-gray-900 ">#{index + 1}</label>
                                            <span onClick={() => remove(index)} className="cursor-pointer"><AiOutlineMinusCircle /></span>
                                        </div>
                                        <div className="w-[25%]">
                                            <label htmlFor="descripton" className="block mb-2 text-sm  text-gray-900 ">Description</label>
                                            <textarea {...register(`parcel.${index}.description` as const, { required: true })} className={` border ${errors?.parcel?.[index]?.description ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="description" />
                                            {errors?.parcel?.[index]?.description && <small className="text-red-500 text-xs">required</small>}
                                        </div>
                                        <div className="w-[10%]">
                                            <label htmlFor="code" className="block mb-2 text-sm  text-gray-900 ">Code</label>
                                            <input {...register(`parcel.${index}.code` as const, { required: false })} type="text" min={0} className={` border ${errors?.parcel?.[index]?.code ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="code" />
                                            {errors?.parcel?.[index]?.code && <small className="text-red-500 text-xs">required</small>}
                                        </div>
                                        <div className="w-[15%]">
                                            <label htmlFor="cod" className="block mb-2 text-sm  text-gray-900 ">COD</label>
                                            <input {...register(`parcel.${index}.cod` as const, { required: true })} type="text" defaultValue={'nepal'} className={` border ${errors?.parcel?.[index]?.cod ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="cod" />
                                            {errors?.parcel?.[index]?.cod && <small className="text-red-500 text-xs">required</small>}
                                        </div>
                                        <div className="w-[6%]">
                                            <label htmlFor="weight" className="block mb-2 text-sm  text-gray-900 ">Weight</label>
                                            <input {...register(`parcel.${index}.weight` as const, { required: true })} type="number" min={0} step={.01} className={` border ${errors?.parcel?.[index]?.weight ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="0" />
                                            {errors?.parcel?.[index]?.weight && <small className="text-red-500 text-xs">required</small>}
                                        </div>
                                        <div className="w-[6%]">
                                            <label htmlFor="qty" className="block mb-2 text-sm  text-gray-900 ">Qty</label>
                                            <input  {...register(`parcel.${index}.qty` as const, { required: true })} type="number" min={0} step={.01} className={` border ${errors?.parcel?.[index]?.qty ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="0" />
                                            {errors?.parcel?.[index]?.qty && <small className="text-red-500 text-xs">requried</small>}
                                        </div>
                                        <div className="w-[10%]">
                                            <label htmlFor="unit" className="block mb-2 text-sm  text-gray-900 ">Unit Price</label>
                                            <input {...register(`parcel.${index}.unit` as const, { required: true })} type="number" min={0} step={.01} className={` border ${errors?.parcel?.[index]?.unit ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="0" />
                                            {errors?.parcel?.[index]?.unit && <small className="text-red-500 text-xs">requied</small>}
                                        </div>
                                        <div className="w-[10%]">
                                            <label htmlFor="totalht" className="block mb-2 text-sm  text-gray-900 ">Total Price</label>
                                            <input value={watch(`parcel.${index}.qty`) * watch(`parcel.${index}.unit`)} step={'any'}  {...register(`parcel.${index}.total` as const, { required: true, value: parseFloat(watch(`parcel.${index}.qty`)?.toString() || '0') * parseFloat(watch(`parcel.${index}.unit`)?.toString() || '0') })} type="number" min={0} className={` border ${errors?.parcel?.[index]?.total ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="0" />
                                            {errors?.parcel?.[index]?.total && <small className="text-red-500 text-xs">required</small>}
                                        </div>


                                    </div>
                                )
                            })}
                            <div className="w-full mt-3">
                                <button className="w-full border-2 border-dotted rounded-md hover:bg-gray-400 border-gray-400 hover:text-white p-2 flex justify-center items-center gap-2 " onClick={() => append({} as any)} type="button">
                                    <span>Add More</span>
                                    <span><AiOutlinePlus /></span>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className='shadow-custom p-2 my-4 flex flex-row-reverse gap-2'>
                        <Button type="default" htmlType="submit" className='bg-gray-600 hover:bg-gray-800 text-white rounded-md py-0.5 px-3 text-sm flex items-center gap-2'><span>Save</span> <IoSave size={15} /></Button>
                    </div>
                </form>
            </div>

        </React.Fragment>
    )
}

export default ParcelDetail