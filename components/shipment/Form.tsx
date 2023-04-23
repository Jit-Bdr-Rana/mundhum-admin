import { BsFillKeyFill } from "react-icons/bs"
import { IoPerson } from "react-icons/io5"
import { SetStateAction, useEffect, useState } from "react";
import { TiArrowBack } from 'react-icons/ti'
import { IoSave } from 'react-icons/io5'
import { VscSaveAs } from 'react-icons/vsc'
import { ShipmentForm } from "../../interface/form";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Action } from "../../interface/common";
import { httpClient } from "../../apis/rest.api";
import { carrierUrl, paymentUrl, shipmentUrl, statusUrl } from "../../apis/list.api";
import { notification } from "../../utils/tost";
import { BiReset } from "react-icons/bi";
import { AutoComplete, Button, Select } from "antd";
import { destinationCountry, domesticCity, modesConstraints, packagesConstraints, shpmentTypeConstraints, sourceCountry, varientsConstraints } from "../../datas/shipment.data";
import { AiOutlineMinusCircle, AiOutlinePlus } from "react-icons/ai";
interface FormProps {
    action: Action;
    setAction: (set: Action) => void,
    className?: string | undefined;
    editData?: object;
    fetchAllShipment: () => void;
    setShipmentList: React.Dispatch<SetStateAction<any>>;

}
const Form = ({ action, setAction, className, editData, fetchAllShipment, setShipmentList }: FormProps) => {
    const { register, reset, control, setError, handleSubmit, watch, setValue, formState: { errors } } = useForm<ShipmentForm>({
        defaultValues: {
            isDraft: 1,
            billNo: '97700'
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "parcel"
    });

    const [carrierList, setCarrierList] = useState<Array<any>>([]);
    const [paymentList, setPaymentList] = useState<Array<any>>([]);
    const [statusList, setStatusList] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const isDraft = watch('isDraft');
    const saveForm = async (formData: ShipmentForm) => {
        if (loading) return
        setLoading(true);
        if (formData.id) {
            const { data, error } = await httpClient().put(shipmentUrl.update + formData.id, formData);
            setFormState(data, error, true, formData.isDraft ? true : false)
        } else {
            const { data, error } = await httpClient().post(shipmentUrl.save, formData);
            setFormState(data, error, false, formData.isDraft ? true : false)

        }
        setLoading(false);
    }

    const sendMail = async (id: number) => {
        await httpClient().get(shipmentUrl?.mail + id);
    }

    const setFormState = async (data: any, error: any, edit: boolean, isDraft: boolean) => {
        if (data && !error) {
            notification.success(data?.message)
            reset();
            setAction(Action.index);
            edit ? fetchAllShipment() : !isDraft && setShipmentList((s: any) => [data?.data, ...s]);
            !edit ? !isDraft ? await sendMail(data?.data?.id) : '' : ''
        } else {
            notification.error('fail to save shipment data')
            error?.errors?.mode && setError("mode", { type: "custom", message: error.errors.mode[0] }, { shouldFocus: true });
            error?.errors?.paymentId && setError("paymentId", { type: "custom", message: error?.errors.paymentId[0] }, { shouldFocus: true });
            error?.errors?.statusId && setError("statusId", { type: "custom", message: error?.errors.statusId[0] }, { shouldFocus: true });
            error?.errors?.carrierId && setError("carrierId", { type: "custom", message: error?.errors.carrierId[0] }, { shouldFocus: true });
            error?.errors?.billNo && setError("billNo", { type: "custom", message: error?.errors.billNo[0] }, { shouldFocus: true });

        }
    }
    const setDraft = (set: boolean) => {
        setValue('isDraft', set ? 1 : 0);
    }
    const fetchData = async () => {
        const carrierResponse = await httpClient().get(carrierUrl.getall);
        if (carrierResponse.data && !carrierResponse.error) {
            setCarrierList(carrierResponse.data.data);
        }
        const paymentResponse = await httpClient().get(paymentUrl.getall);
        if (paymentResponse.data && !paymentResponse.error) {
            setPaymentList(paymentResponse.data.data);
        }

        const statusResponse = await httpClient().get(statusUrl.getall);
        if (statusResponse.data && !statusResponse.error) {
            setStatusList(statusResponse.data.data);
        }

    }
    const setFormValue = (data?: any) => {
        action != Action.copy && setValue('id', data?.id)
        action != Action.copy && setValue("billNo", data?.billNo)
        setValue("carrierId", parseInt(data?.carrierId?.id))
        setValue("carrierReferenceNo", data?.carrierReferenceNo)
        setValue("shipperName", data?.shipperName)
        setValue("shipperAddress", data?.shipperAddress)
        setValue("shipperContact", data?.shipperContact)
        setValue("shipperMail", data?.shipperMail)
        setValue("receiverName", data?.receiverName)
        setValue("receiverMail", data?.receiverMail)
        setValue("receiverPrimaryAddress", data?.receiverPrimaryAddress)
        setValue("receiverSecondaryAddress", data?.receiverSecondaryAddress)
        setValue("receiverPrimaryContact", data?.receiverPrimaryContact)
        setValue("receiverSecondaryContact", data?.receiverSecondaryContact)
        setValue("paymentId", parseInt(data?.paymentId?.id))
        setValue("comment", data?.comment)
        setValue("courier", data?.courier)
        setValue("mode", data?.mode)
        setValue("origin", data?.origin)
        setValue("destination", data?.destination)
        setValue("deliveryDate", data?.deliveryDate)
        setValue("pickupDate", data?.pickupDate)
        setValue("pickupTime", data?.pickupTime)
        setValue("shipmentType", data?.shipmentType)
        setValue("weight", data?.weight)
        setValue("varient", data?.varient)
        setValue("packages", data?.packages)
        setValue("price", data?.price)
        setValue("quantity", data?.quantity)
        setValue("totalFreight", data?.totalFreight)
        setValue("departureTime", data?.departureTime)
        action != Action.copy && setValue('date', data?.status?.date);
        action != Action.copy && setValue('location', data?.status?.location);
        action != Action.copy && setValue('time', data?.status?.time);
        action != Action.copy && setValue('statusId', data?.status?.name?.id);
        action != Action.copy && setValue('remarks', data?.status?.remarks)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [action, setAction])

    useEffect(() => {
        if ((action === Action.edit || action === Action.copy) && editData) {
            // alert(1)
            setFormValue(editData);
        } else if (action === Action.add) {
            reset();
        }
    }, [editData, action])
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className={`${className} animate-slow select-none`}>
            <form className='' onSubmit={handleSubmit(saveForm)}>
                {/* <div className=' shadow-custom p-2 mb-4 flex justify-between  gap-2'>
                    <button onClick={() => setAction!(Action.index)} type="button" className='bg-gray-600 hover:bg-gray-800 text-white text-xs rounded-md py-0.5 px-2  flex items-center gap-2'><span>Back</span> <TiArrowBack size={25} /></button>
                    {action === Action.add && <button type="button" className='bg-gray-600 hover:bg-gray-800 text-white rounded-md py-1 px-3 text-sm flex items-center gap-2'><span>Save As Draft</span> <VscSaveAs size={19} /></button>}
                </div> */}
                {/* add shipemnt  */}
                <div className={`shadow-custom px-3 py-3`}>
                    <p className='px-2 py-1.5 text-sm font-bold border-l-4 border-l-gray-900 bg-gray-400 text-white rounded-l-sm'>Create Shipment Id</p>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className=''>
                            <p className='flex gap-3 mb-3 text-gray-900 text-base font-bold underline'><span>Shipment Bill No</span> <BsFillKeyFill size={18} /></p>
                            <input {...register('billNo', { required: 'billno is required', validate: (v) => { if (v == '97700') return 'billno is required' } })} type="number" className={` border ${errors.billNo ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full  p-1.5 `} placeholder="9777078953" />
                            {errors?.billNo && <small className="text-red-500 text-xs">{errors.billNo?.message}</small>}
                        </div>
                        <div>
                            <p className='flex gap-3 mb-3 text-gray-900 text-base font-bold underline'><span>Carrier Name</span> <BsFillKeyFill size={18} /></p>
                            <Controller
                                name="carrierId"
                                rules={{
                                    required: { message: 'carrier is required', value: true },
                                    pattern: {
                                        value: !isDraft ? /^(?!.*(null))/ : /^/,
                                        message: 'carrier is required'
                                    }
                                }}
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Select
                                        placeholder="select the Carrier"
                                        showSearch
                                        className={`${errors?.carrierId ? 'error' : 'custom'} w-full `}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        options={
                                            carrierList?.map((data) => {
                                                return {
                                                    label: data?.name,
                                                    value: data?.id,
                                                }
                                            })}
                                        filterOption={(inputValue, option) =>
                                            option?.label?.toUpperCase()?.indexOf(inputValue?.toUpperCase()) !== -1
                                        }

                                    />
                                )}

                            />
                            {errors?.carrierId && <small className="text-red-500 text-xs">{errors.carrierId?.message}</small>}
                        </div>
                        <div>
                            <p className='flex gap-3 mb-3 text-gray-900 text-base font-bold underline'><span>Carrier Reference No</span> <BsFillKeyFill size={18} /></p>
                            <input {...register('carrierReferenceNo')} type="text" className={` border ${errors.carrierReferenceNo ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="carrier reference" />
                            {errors?.carrierReferenceNo && <small className="text-red-500 text-xs">{errors.carrierReferenceNo?.message}</small>}
                        </div>
                    </div>
                </div>
                <div className={`shadow-custom px-3 py-3 mt-4`}>
                    <p className='px-2 py-1.5 text-sm font-bold border-l-4 border-l-gray-900 bg-gray-400 text-white rounded-l-sm'>Shipment Variant</p>
                    <div className="grid gap-2 mb-6 lg:grid-cols-12 mt-2 ">
                        <div className="col-span-3">
                            <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">
                                Type of Shipment</label>
                            <Controller
                                name="shipmentType"
                                rules={{
                                    required: { message: 'shipment type is required', value: true },
                                    pattern: {
                                        value: !isDraft ? /^(?!.*(null))/ : /^/,
                                        message: 'shipment type is required'
                                    }
                                }}
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Select
                                        placeholder="select the Shipment type"
                                        showSearch
                                        className={`${errors?.shipmentType ? 'error' : 'custom'} w-full `}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        options={
                                            shpmentTypeConstraints?.map((data) => {
                                                return {
                                                    label: data,
                                                    value: data?.toLocaleLowerCase(),
                                                }
                                            })}
                                        filterOption={(inputValue, option) =>
                                            option?.label?.toUpperCase()?.indexOf(inputValue?.toUpperCase()) !== -1
                                        }

                                    />
                                )}

                            />
                            {errors?.shipmentType && <small className="text-red-500 text-xs">{errors.shipmentType?.message}</small>}
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="pacakages" className="block mb-2 text-sm  text-gray-900 ">Packages</label>
                            <Controller
                                name="packages"
                                rules={{ required: { message: 'packages is required', value: true } }}
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Select
                                        placeholder="select the Packages"
                                        showSearch
                                        className={`${errors?.packages ? 'error' : 'custom'} w-full `}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        options={
                                            packagesConstraints?.map((data) => {
                                                return {
                                                    label: data,
                                                    value: data.toLocaleLowerCase(),
                                                }
                                            })}
                                        filterOption={(inputValue, option) =>
                                            option?.label?.toUpperCase()?.indexOf(inputValue?.toUpperCase()) !== -1
                                        }

                                    />
                                )}

                            />
                            {errors?.packages && <small className="text-red-500 text-xs">{errors.packages?.message}</small>}
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="mode" className="block mb-2 text-sm  text-gray-900 ">
                                Mode</label>
                            <Controller
                                name="mode"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Select
                                        placeholder="Select the Mode"
                                        showSearch
                                        className={`${errors?.mode ? 'error' : 'custom'} w-full `}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        filterOption={(inputValue, option) =>
                                            option?.label?.toUpperCase()?.indexOf(inputValue?.toUpperCase()) !== -1
                                        }
                                        options={
                                            modesConstraints?.map((d, i) => {
                                                return {
                                                    label: d,
                                                    value: d?.toLocaleLowerCase()
                                                }
                                            })
                                        }

                                    />
                                )}

                            />
                            {errors?.mode && <small className="text-red-500 text-xs">{errors.mode?.message}</small>}
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="mode" className="block mb-2 text-sm  text-gray-900 ">
                                Varient</label>
                            <Controller
                                name="varient"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Select
                                        placeholder="select the Varient"
                                        showSearch
                                        className={`${errors?.varient ? 'error' : 'custom'} w-full `}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        options={
                                            varientsConstraints?.map((data) => {
                                                return {
                                                    label: data,
                                                    value: data,
                                                }
                                            })}
                                        filterOption={(inputValue, option) =>
                                            option?.label?.toUpperCase()?.indexOf(inputValue?.toUpperCase()) !== -1
                                        }

                                    />
                                )}

                            />
                            {errors?.varient && <small className="text-red-500 text-xs">{errors.mode?.message}</small>}
                        </div>
                    </div>
                </div>
                {/* shippmet details  */}
                <div className="p-3 shadow-custom mt-4">
                    <p className='px-2 py-1.5 text-sm font-bold border-l-4 border-l-gray-900 bg-gray-400 text-white rounded-l-sm'>Shipper and Receiver Details</p>
                    <div className="mt-3">
                        <p className='flex gap-3  text-gray-900 text-base font-bold underline'><span>Shipper Details</span> <IoPerson size={18} /></p>
                        <div className="grid gap-2 mb-6 lg:grid-cols-12 mt-2 ">
                            <div className="col-span-3">
                                <label htmlFor="name" className="block mb-2 text-sm  text-gray-900 ">Name</label>
                                <input {...register('shipperName', { required: !isDraft && 'shipper name is required' })} type="text" className={` border ${errors.shipperName ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="shipper name" />
                                {errors?.shipperName && <small className="text-red-500 text-xs">{errors.shipperName?.message}</small>}
                            </div>
                            <div className="col-span-3">
                                <label htmlFor="email" className="block mb-2 text-sm  text-gray-900 ">Email</label>
                                <input {...register('shipperMail', {
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Invalid email address"
                                    }
                                })} type="text" className={` border ${errors.shipperMail ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="shipper email" />
                                {errors?.shipperMail && <small className="text-red-500 text-xs">{errors.shipperMail?.message}</small>}
                            </div>
                            <div className="col-span-3">
                                <label htmlFor="address" className="block mb-2 text-sm  text-gray-900 ">Address</label>
                                <input {...register('shipperAddress', { required: !isDraft && 'shipper address is required' })} type="text" className={` border ${errors.shipperAddress ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="shipper address" />
                                {errors?.shipperAddress && <small className="text-red-500 text-xs">{errors.shipperAddress?.message}</small>}
                            </div>
                            <div className="col-span-3">
                                <label htmlFor="contact" className="block mb-2 text-sm  text-gray-900 ">Contact</label>
                                <input {...register('shipperContact', {
                                    required: !isDraft && 'shipper contact is required', pattern: {
                                        value: /^[1-9]{1}[0-9]{9}/,
                                        message: 'invalid contact '
                                    }
                                })} type="number" min={0} className={` border ${errors.shipperContact ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="shipper contact" />
                                {errors?.shipperContact && <small className="text-red-500 text-xs">{errors.shipperContact?.message}</small>}
                            </div>

                        </div>
                    </div>
                    <div >
                        <p className='flex gap-3  text-gray-900 text-base font-bold underline'><span>Receiver Details</span> <IoPerson size={18} /></p>
                        <div className="grid gap-2 mb-6 lg:grid-cols-12 mt-2 ">
                            <div className="col-span-3">
                                <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Name</label>
                                <input {...register('receiverName', { required: !isDraft && 'name is required' })} type="text" className={` border ${errors.receiverName ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="name" />
                                {errors?.receiverName && <small className="text-red-500 text-xs">{errors.receiverName?.message}</small>}
                            </div>
                            <div className="col-span-3">
                                <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Email</label>
                                <input {...register('receiverMail', {
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Invalid email address"
                                    }
                                })} type="text" className={` border ${errors.receiverMail ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="email" />
                                {errors?.receiverMail && <small className="text-red-500 text-xs">{errors.receiverMail?.message}</small>}
                            </div>
                            <div className="col-span-3">
                                <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Primary Address</label>
                                <input {...register('receiverPrimaryAddress', { required: !isDraft && 'address is requied' })} type="text" className={` border ${errors.receiverPrimaryAddress ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="primary contact" />
                                {errors?.receiverPrimaryAddress && <small className="text-red-500 text-xs">{errors.receiverPrimaryAddress?.message}</small>}
                            </div>
                            <div className="col-span-3">
                                <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Secondary Address</label>
                                <input {...register('receiverSecondaryAddress')} type="text" className={` border ${errors.receiverSecondaryAddress ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="secondary address" />
                                {errors?.receiverSecondaryAddress && <small className="text-red-500 text-xs">{errors.receiverSecondaryAddress?.message}</small>}
                            </div>
                            <div className="col-span-3">
                                <label htmlFor="primary_contact" className="block mb-2 text-sm  text-gray-900 ">Primary Contact </label>
                                <input {...register('receiverPrimaryContact', {
                                    required: !isDraft && 'contact is required', pattern: {
                                        value: /^[1-9]{1}[0-9]{9}/,
                                        message: 'invalid contact '
                                    }
                                })} type="number" min={0} className={` border ${errors.receiverPrimaryContact ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="primary contact" />
                                {errors?.receiverPrimaryContact && <small className="text-red-500 text-xs">{errors.receiverPrimaryContact?.message}</small>}
                            </div>
                            <div className="col-span-3">
                                <label htmlFor="secondary_contact" className="block mb-2 text-sm  text-gray-900 ">Secondary Contact</label>
                                <input {...register('receiverSecondaryContact', {
                                    pattern: {
                                        value: /^[1-9]{1}[0-9]{9}/,
                                        message: 'invalid contact'
                                    }
                                })} type="number" min={0} className={` border ${errors.receiverSecondaryContact ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="secondary contact" />
                                {errors?.receiverSecondaryContact && <small className="text-red-500 text-xs">{errors.receiverSecondaryContact?.message}</small>}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    watch('packages') == 'parcel' && (action === Action.add || action === Action.copy) &&
                    <div className="shadow-custom p-3  mt-4">
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
                                        <input {...register(`parcel.${index}.cod` as const, { required: true })} type="text" defaultValue={'nepal'} min={0} className={` border ${errors?.parcel?.[index]?.cod ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="cod" />
                                        {errors?.parcel?.[index]?.cod && <small className="text-red-500 text-xs">required</small>}
                                    </div>
                                    <div className="w-[6%]">
                                        <label htmlFor="weight" className="block mb-2 text-sm  text-gray-900 ">Weight</label>
                                        <input {...register(`parcel.${index}.weight` as const, { required: true, valueAsNumber: true })} step={'.01'} type="number" min={0} className={` border ${errors?.parcel?.[index]?.weight ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="0" />
                                        {errors?.parcel?.[index]?.weight && <small className="text-red-500 text-xs">required</small>}
                                    </div>
                                    <div className="w-[6%]">
                                        <label htmlFor="qty" className="block mb-2 text-sm  text-gray-900 ">Qty</label>
                                        <input {...register(`parcel.${index}.qty` as const, { required: true, valueAsNumber: true })} step={'.01'} type="number" min={0} className={` border ${errors?.parcel?.[index]?.qty ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="0" />
                                        {errors?.parcel?.[index]?.qty && <small className="text-red-500 text-xs">requried</small>}
                                    </div>
                                    <div className="w-[10%]">
                                        <label htmlFor="unit" className="block mb-2 text-sm  text-gray-900 ">Unit Price</label>
                                        <input {...register(`parcel.${index}.unit` as const, { required: true, valueAsNumber: true })} step={'.01'} type="number" min={0} className={` border ${errors?.parcel?.[index]?.unit ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="0" />
                                        {errors?.parcel?.[index]?.unit && <small className="text-red-500 text-xs">requied</small>}
                                    </div>
                                    <div className="w-[10%]">
                                        <label htmlFor="totalht" className="block mb-2 text-sm  text-gray-900 ">Total Price</label>
                                        <input value={watch(`parcel.${index}.qty`) * watch(`parcel.${index}.unit`)} step={'.01'} {...register(`parcel.${index}.total` as const, { required: true, valueAsNumber: true, value: watch(`parcel.${index}.qty`) * watch(`parcel.${index}.unit`) })} type="number" min={0} className={` border ${errors?.parcel?.[index]?.total ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="0" />
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
                }
                <div className='shadow-custom p-3  mt-4'>
                    <div>
                        <p className='px-2 py-1.5 text-sm font-bold border-l-4 border-l-gray-900 bg-gray-400 text-white rounded-l-sm'>Shipment Details</p>
                        <div>
                            <p className='flex gap-3 mt-3 text-gray-900 text-base font-bold underline'><span>Shipment Details</span> <IoPerson size={18} /></p>
                            <div className="grid gap-6 mb-6 lg:grid-cols-4 mt-2 ">

                                <div>
                                    <label htmlFor="weight" className="block mb-2 text-sm  text-gray-900 ">Weight</label>
                                    <input {...register('weight', { valueAsNumber: true })} step={'.01'} type="number" min={0} className={` border ${errors.weight ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="weight" />
                                    {errors?.weight && <small className="text-red-500 text-xs">{errors.weight?.message}</small>}
                                </div>
                                <div>
                                    <label htmlFor="courier" className="block mb-2 text-sm  text-gray-900 ">Courier</label>
                                    <input {...register('courier')} type="text" className={` border ${errors.courier ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="courier" />
                                    {errors?.courier && <small className="text-red-500 text-xs">{errors.courier?.message}</small>}
                                </div>


                                <div>
                                    <label htmlFor="quantity" className="block mb-2 text-sm  text-gray-900 ">Quantity</label>
                                    <input {...register('quantity')} type="number" min={0} className={` border ${errors.quantity ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="quantity" />
                                    {errors?.quantity && <small className="text-red-500 text-xs">{errors.quantity?.message}</small>}
                                </div>
                                <div>
                                    <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Payment Mode</label>
                                    <Controller
                                        name="paymentId"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'payment method is required'
                                            },
                                            pattern: {
                                                value: !isDraft ? /^(?!.*(null))/ : /^/,
                                                message: 'payment mode is required'
                                            }
                                        }}
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Select
                                                placeholder="select the payment"
                                                showSearch
                                                status={`${errors?.paymentId ? 'error' : ''}`}
                                                onChange={onChange}
                                                className="w-full"
                                                onBlur={onBlur}
                                                value={value}
                                                options={
                                                    paymentList?.map((data) => {
                                                        return {
                                                            label: data?.name,
                                                            value: data?.id,
                                                        }
                                                    })}
                                                filterOption={(inputValue, option) =>
                                                    option?.label?.toUpperCase()?.indexOf(inputValue?.toUpperCase()) !== -1
                                                }

                                            />
                                        )}

                                    />
                                    {errors?.paymentId && <small className="text-red-500 text-xs">{errors.paymentId?.message}</small>}
                                </div>
                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm  text-gray-900 ">Price</label>
                                    <input {...register('price')} type="number" step={'0.01'} min={0} className={` border ${errors.price ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="price in rs" />
                                    {errors?.price && <small className="text-red-500 text-xs">{errors.price?.message}</small>}
                                </div>
                                <div>
                                    <label htmlFor="total freight" className="block mb-2 text-sm  text-gray-900 ">Total Freight</label>
                                    <input {...register('totalFreight')} type="text" className={` border ${errors.totalFreight ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="total freight" />
                                    {errors?.totalFreight && <small className="text-red-500 text-xs">{errors.totalFreight?.message}</small>}
                                </div>


                                <div>
                                    <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Origin</label>
                                    <Controller
                                        control={control}
                                        name={'origin'}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <AutoComplete
                                                defaultValue={watch('shipmentType') == 'domestic' ? 'Kathmandu' : 'Nepal'}
                                                placeholder="select the origin"
                                                showSearch
                                                className="w-full focus:ring-gray-500 focus:border-gray-500 border-gray-300"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                options={
                                                    watch('shipmentType') == 'domestic' ?
                                                        domesticCity.map((data: string) => {
                                                            return {
                                                                label: data,
                                                                value: data
                                                            }
                                                        })
                                                        :
                                                        sourceCountry?.map((data) => {
                                                            return {
                                                                label: data,
                                                                value: data,
                                                            }
                                                        })}
                                                filterOption={(inputValue, option) =>
                                                    option?.label?.toUpperCase()?.indexOf(inputValue?.toUpperCase()) !== -1
                                                }
                                            />
                                        )}
                                    />
                                    {errors?.origin && <small className="text-red-500 text-xs">{errors.origin?.message}</small>}
                                </div>
                                <div>
                                    <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Destination</label>
                                    <Controller
                                        control={control}
                                        name={'destination'}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <AutoComplete
                                                placeholder="select the destination"
                                                showSearch
                                                className="w-full"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                options={
                                                    watch('shipmentType') == 'domestic' ?
                                                        domesticCity.map((data: string) => {
                                                            return {
                                                                label: data,
                                                                value: data
                                                            }
                                                        })
                                                        :
                                                        destinationCountry?.map((data) => {
                                                            return {
                                                                label: data,
                                                                value: data,
                                                            }
                                                        })}
                                                filterOption={(inputValue, option) =>
                                                    option?.label?.toUpperCase()?.indexOf(inputValue?.toUpperCase()) !== -1
                                                }
                                            />
                                        )}
                                    />
                                    {errors?.destination && <small className="text-red-500 text-xs">{errors.destination?.message}</small>}
                                </div>
                                <div>
                                    <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Departure Time</label>
                                    <input {...register('departureTime')} type="time" className={` border ${errors.departureTime ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="departure time" />
                                    {errors?.departureTime && <small className="text-red-500 text-xs">{errors.departureTime?.message}</small>}
                                </div>
                                <div>
                                    <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Pickup Date</label>
                                    <input {...register('pickupDate')} type="date" className={` border ${errors.pickupDate ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="pickup date" />
                                    {errors?.pickupDate && <small className="text-red-500 text-xs">{errors.pickupDate?.message}</small>}
                                </div>
                                <div>
                                    <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Pickup Time</label>
                                    <input {...register('pickupTime')} type="time" className={` border ${errors.pickupTime ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="pickup time" />
                                    {errors?.pickupTime && <small className="text-red-500 text-xs">{errors.pickupTime?.message}</small>}
                                </div>
                                <div>
                                    <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Expected Delivery Date</label>
                                    <input {...register('deliveryDate')} type="date" className={` border ${errors.deliveryDate ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="expected delivery date" />
                                    {errors?.deliveryDate && <small className="text-red-500 text-xs">{errors.deliveryDate?.message}</small>}
                                </div>
                                <div className='col-span-4'>
                                    <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Comment</label>
                                    <textarea {...register('comment')} title='comments' className={` border ${errors.comment ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `} placeholder="comment here..." ></textarea>
                                    {errors?.comment && <small className="text-red-500 text-xs">{errors.comment?.message}</small>}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {
                    (action === Action.add || action === Action.copy) &&
                    <div className='shadow-custom p-3 my-4'>
                        <p className='px-2 py-1.5 text-sm font-bold border-l-4 border-l-gray-900 bg-gray-400 text-white rounded-l-sm'>Publish</p>
                        <div>
                            <p className='flex gap-3 mt-3 text-gray-900 text-base font-bold underline'><span>Shipment Status</span> <IoPerson size={18} /></p>
                            <div className="grid gap-6 mb-6 lg:grid-cols-4 mt-2 ">
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
                                                            label: data,
                                                            value: data
                                                        }
                                                    })
                                                }
                                                filterOption={(inputValue, option) =>
                                                    option?.label?.toUpperCase()?.indexOf(inputValue?.toUpperCase()) !== -1
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
                                            required: {
                                                value: true,
                                                message: "select the status"
                                            },
                                            pattern: {
                                                value: !isDraft ? /^(?!.*(null))/ : /^/,
                                                message: 'select the status'
                                            }
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Select
                                                status={errors?.statusId ? 'error' : ''}
                                                placeholder="select the status"
                                                showSearch
                                                className="w-full"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                options={
                                                    statusList.map((data: any) => {
                                                        return {
                                                            label: data?.name,
                                                            value: data?.id
                                                        }
                                                    })
                                                }
                                                filterOption={(inputValue, option) =>
                                                    option?.label?.toUpperCase()?.indexOf(inputValue?.toUpperCase()) !== -1
                                                }
                                            />
                                        )}
                                    />
                                    {errors?.statusId && <small className="text-red-500 text-xs">{errors.statusId?.message}</small>}
                                </div>
                                <div className='col-span-3'>
                                    <label htmlFor="" className="block mb-2 text-sm  text-gray-900 ">Remarks</label>
                                    <textarea placeholder="remarks here.." {...register('remarks')} title='comments' className={` border ${errors.remarks ? 'focus:ring-red-500 focus:border-red-500 border-red-500' : 'focus:ring-gray-500 focus:border-gray-500 border-gray-300'}  text-gray-900 text-sm rounded-sm focus:outline-none  w-full p-1.5 `}   ></textarea>
                                    {errors?.remarks && <small className="text-red-500 text-xs">{errors.remarks?.message}</small>}
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className='shadow-custom p-2 my-4 flex flex-row-reverse gap-2'>
                    <Button loading={loading} type="default" htmlType="submit" onClick={() => setDraft(false)} className='bg-gray-600 hover:bg-gray-800 text-white rounded-md py-0.5 px-3 text-sm flex items-center gap-2'><span>Save</span> <IoSave size={15} /></Button>
                    {action === Action.add && <button onClick={() => reset()} type="button" className='bg-gray-600 hover:bg-gray-800 text-white rounded-md py-0.5 px-3 text-sm flex items-center gap-2'><span>Reset</span> <BiReset size={20} /></button>}
                    {(action === Action.add) && <Button loading={loading} type="default" htmlType="submit" onClick={() => setDraft(true)} className='bg-gray-600 hover:bg-gray-800 text-white rounded-md py-0.5 px-3 text-sm flex items-center gap-2'><span>Save As Draft</span> <VscSaveAs size={19} /></Button>}
                    <Button onClick={() => setAction(Action.index)} type="default" htmlType="submit" className='bg-gray-600 hover:bg-gray-800 text-white rounded-md py-0.5 px-3 text-sm flex items-center gap-2'><span>Back</span> <TiArrowBack size={25} /></Button>
                </div>
            </form >
        </div>
    )
}


export default Form;