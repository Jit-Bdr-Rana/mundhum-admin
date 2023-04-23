import { Image } from 'antd';
import { useState, useEffect, Fragment } from 'react'
import { useForm } from 'react-hook-form';
import { FaUserPlus } from 'react-icons/fa';
import { VscReplace } from 'react-icons/vsc';
import { branchUrl } from '../../apis/list.api';
import { httpClient } from '../../apis/rest.api';
import { countryList, provinceList, provincewiseDistrict } from '../../datas/common.data';
import { Action } from '../../interface/common';
import { BranchForm } from '../../interface/form';
import { notification } from '../../utils/tost';

const Form = ({ className, setAction, editData, fetchAllBranch, action }: { className?: string, setAction: (act: Action) => void, editData?: any, fetchAllBranch: () => void, action: Action }) => {
    const [districtByProvince, setDistrictByProvince] = useState<string[] | undefined>([]);
    const { register, handleSubmit, setValue, reset, setError, watch, formState: { errors } } = useForm<BranchForm>();
    const [replace, setReplace] = useState(editData?.image ? true : false);
    const type = watch('type');
    const onSubmit = async (formData: BranchForm) => {
        const payload = new FormData();

        formData?.image?.length && payload.append('image', formData?.image[0] as Blob)
        payload.append('country', formData.country)
        payload.append('type', formData.type)
        payload.append('city', formData.city)
        payload.append('district', formData.district ? formData.district : '')
        payload.append('province', formData.province ? formData.province : '')
        payload.append('tole', formData.tole)
        payload.append('name', formData.name)
        payload.append('primaryContact', formData.primaryContact)
        payload.append('secondaryContact', formData.secondaryContact)
        payload.append('primaryEmail', formData.primaryEmail)
        payload.append('secondaryEmail', formData.secondaryEmail)
        payload.append('id', formData?.id?.toString())
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        if (formData.id) {
            const { data, error } = await httpClient().post(branchUrl.save + `/${formData.id}`, payload, config);
            setFormstate(data, error)
        } else {
            const { data, error } = await httpClient().post(branchUrl.save, payload, config);
            setFormstate(data, error)
        }

    }
    const setFormstate = (data: any, error: any) => {
        if (data && !error) {
            notification.success(data?.message)
            reset();
            setAction(Action.index)
            fetchAllBranch();

        } else {
            notification.error(data?.error)
            if (error?.errors) {
                error.errors?.name && setError('name', { type: 'custom', message: error.errors.name[0] })
                error.errors?.primaryEmail && setError('primaryEmail', { type: 'custom', message: error.errors.primaryEmail[0] })
                error.errors?.image && setError('image', { type: 'custome', message: error.errors.image[0] })
                error.errors?.secondaryEmail && setError('secondaryEmail', { type: 'custom', message: error.errors.secondaryEmail[0] })
                error.errors?.primaryContact && setError('primaryContact', { type: 'custom', message: error.errors.primaryContact[0] })
                error.errors?.secondaryContact && setError('secondaryContact', { type: 'custom', message: error.errors.secondaryContact[0] })
                error.errors?.province && setError('province', { type: 'custom', message: error.errors.province[0] })
                error.errors?.type && setError('type', { type: 'custom', message: error.errors.type[0] })
                error.errors?.district && setError('district', { type: 'custom', message: error.errors.district[0] })
            }
        }
    }
    const filterDistrict = (e: any) => {
        setDistrictByProvince(provincewiseDistrict.get(e.target.value))
    }

    useEffect(() => {
        setValue('province', editData?.province ? editData?.province : type === 'national' ? 'null' : '')
        setValue('district', editData?.province ? editData?.district : type === 'national' ? 'null' : '')
    }, [type])

    useEffect(() => {
        setValue('type', editData?.type);
        editData?.type === 'national' && setDistrictByProvince(provincewiseDistrict.get(editData?.province));
        setValue('id', editData?.id);
        setValue('name', editData?.name);
        setValue('country', editData?.country);
        setValue('district', editData?.district);
        setValue('province', editData?.province);
        setValue('primaryContact', editData?.primaryContact);
        setValue('secondaryContact', editData?.secondaryContact);
        setValue('primaryEmail', editData?.primaryEmail);
        setValue('secondaryEmail', editData?.secondaryEmail);
        setValue('city', editData?.city);
        setValue('tole', editData?.tole);
        return () => {
            reset();
        }
    }, [editData])

    return (
        <div className={className + '  animate-slow '}>
            <div className=''>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative  shadow-custom px-4 py-3 w-[100%]">
                        <div>
                            <div className="gap-5 grid grid-cols-3">
                                <div className=''>
                                    <label htmlFor="name" className="block mb-2 text-sm  text-gray-900 "> Branch Name</label>
                                    <input {...register("name", { required: 'name is required' })} type="text" id="" placeholder="branch name" className={` border ${!errors?.name ? 'border-gray-300' : 'border-red-500'} ${!errors?.name ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    {errors?.name && <small className='text-xs text-red-500'>{errors.name?.message}</small>}
                                </div>
                                <div className=''>
                                    <label htmlFor="primary_email" className="block mb-2 text-sm  text-gray-900 ">Primary Email</label>
                                    <input {...register("primaryEmail", { required: 'At lest one email is required' })} type="text" id="" placeholder="primary email " className={` border ${!errors?.primaryEmail ? 'border-gray-300' : 'border-red-500'} ${!errors?.primaryEmail ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    {errors?.primaryEmail && <small className='text-xs text-red-500'>{errors.primaryEmail?.message}</small>}
                                </div>
                                <div className=''>
                                    <label htmlFor=" secondary_email" className="block mb-2 text-sm  text-gray-900 "> Secondary Email</label>
                                    <input {...register("secondaryEmail", { required: false })} type="text" id="" placeholder="secondary email" className={` border ${!errors?.secondaryEmail ? 'border-gray-300' : 'border-red-500'} ${!errors?.secondaryEmail ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    {errors?.secondaryEmail && <small className='text-xs text-red-500'>{errors.secondaryEmail?.message}</small>}
                                </div>
                                <div className=''>
                                    <label htmlFor=" primary_contact" className="block mb-2 text-sm  text-gray-900 ">Primary Contact</label>
                                    <input {...register("primaryContact", { required: 'Atleast one contact is required' })} type="text" id="" placeholder="primary contact" className={` border ${!errors?.primaryContact ? 'border-gray-300' : 'border-red-500'} ${!errors?.primaryContact ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    {errors?.primaryContact && <small className='text-xs text-red-500'>{errors.primaryContact?.message}</small>}
                                </div>
                                <div className=''>
                                    <label htmlFor="secondary_contact" className="block mb-2 text-sm  text-gray-900 "> Secondary Contact</label>
                                    <input {...register("secondaryContact", { required: false })} type="text" id="" placeholder="secondary contact" className={` border ${!errors?.secondaryContact ? 'border-gray-300' : 'border-red-500'} ${!errors?.secondaryContact ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    {errors?.secondaryContact && <small className='text-xs text-red-500'>{errors.secondaryContact?.message}</small>}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm  text-gray-900 " htmlFor="type" >Type</label>
                                    <select {...register("type", {
                                        pattern: {
                                            value: /^(?!.*(null))/,
                                            message: 'type is required'
                                        }
                                    })} title='type' className={` border ${!errors?.type ? 'border-gray-300' : 'border-red-500'} ${!errors?.type ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} >
                                        <option selected={true} disabled={true} value='null'>choose the type</option>
                                        <option value="national">national</option>
                                        <option value="international">International</option>
                                    </select>
                                    {errors?.type && <small className='text-xs text-red-500'>{errors.type?.message}</small>}
                                </div>
                                {
                                    (type === 'international') &&
                                    <div>
                                        <label className="block mb-2 text-sm  text-gray-900 " htmlFor="country" >Country</label>
                                        <select {...register("country", {
                                            pattern: {
                                                value: /^(?!.*(null))/,
                                                message: 'country is required'
                                            }
                                        })} title='country' className={` border ${!errors?.country ? 'border-gray-300' : 'border-red-500'} ${!errors?.country ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} >
                                            <option selected={true} disabled={true} value='null'>choose the country</option>
                                            {
                                                countryList.map((data: string, index: number) => {
                                                    return (<option key={index} value={data}>{data}</option>)
                                                })
                                            }
                                        </select>
                                        {errors?.country && <small className='text-xs text-red-500'>{errors.country?.message}</small>}
                                    </div>
                                }
                                <div>
                                    <label className="block mb-2 text-sm  text-gray-900 " htmlFor="province" >Province</label>
                                    {
                                        type !== 'international' ?
                                            <select {...register("province", {
                                                pattern: {
                                                    value: /^(?!.*(null))/,
                                                    message: 'province is required' // JS only: <p>error message</p> TS only support string
                                                }
                                            })} onChange={filterDistrict} title='province' className={` border ${!errors?.province ? 'border-gray-300' : 'border-red-500'} ${!errors?.province ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} >
                                                <option selected={true} value={type !== 'international' ? 'null' : ''}>choose the province</option>
                                                {
                                                    provinceList.map((data: string, index: number) => {
                                                        return (<option key={index} value={data}>{data}</option>)
                                                    })
                                                }
                                            </select> :
                                            <input {...register("province", { required: false })} type="text" id="" placeholder="Province" className={` border ${!errors?.province ? 'border-gray-300' : 'border-red-500'} ${!errors?.province ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    }
                                    {errors?.province && <small className='text-xs text-red-500'>{errors.province?.message}</small>}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm  text-gray-900 " htmlFor="district" >District</label>
                                    {
                                        type !== 'international' ?
                                            <select {...register("district", {
                                                pattern: {
                                                    value: /^(?!.*(null))/,
                                                    message: 'district is required' // JS only: <p>error message</p> TS only support string
                                                }
                                            })} title='district' className={` border ${!errors?.district ? 'border-gray-300' : 'border-red-500'} ${!errors?.district ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} >
                                                <option selected={true} value='null'>choose the District</option>
                                                {
                                                    districtByProvince?.map((data: string, index: number) => {
                                                        return (<option selected={watch('district') === data ? true : false} key={index} value={data}>{data}</option>)
                                                    })
                                                }
                                            </select> :
                                            <input {...register("district", { required: false })} type="text" id="" placeholder="District" className={` border ${!errors?.district ? 'border-gray-300' : 'border-red-500'} ${!errors?.province ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    }
                                    {errors?.district && <small className='text-xs text-red-500'>{errors.district?.message}</small>}
                                </div>
                                <div className=''>
                                    <label htmlFor="city" className="block mb-2 text-sm  text-gray-900 ">Tole</label>
                                    <input {...register("tole", { required: false })} type="text" id="" placeholder="Tole" className={` border ${!errors?.tole ? 'border-gray-300' : 'border-red-500'} ${!errors?.tole ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    {errors?.tole && <small className='text-xs text-red-500'>{errors.tole?.message}</small>}
                                </div>
                                <div className=''>
                                    <label htmlFor="tole" className="block mb-2 text-sm  text-gray-900 ">City</label>
                                    <input {...register("city", { required: false })} type="text" id="" placeholder="City" className={` border ${!errors?.city ? 'border-gray-300' : 'border-red-500'} ${!errors?.city ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    {errors?.city && <small className='text-xs text-red-500'>{errors.city?.message ?? 'error in city'}</small>}
                                </div>
                                <div className=''>
                                    {replace ?
                                        <Image alt='branch image' src={`${editData?.image}`} className="relative" height={100} width={100} />
                                        :
                                        <Fragment>
                                            <label htmlFor="tole" className="block mb-2 text-sm  text-gray-900 ">Cover Photo</label>
                                            <input {...register("image", { required: false })} type="file" id="" placeholder="cover image" className={` border ${!errors?.image ? 'border-gray-300' : 'border-red-500'} ${!errors?.image ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                            {errors?.image && <small className='text-xs text-red-500'>{errors.image?.message ?? 'error in image field'}</small>}
                                        </Fragment>
                                    }
                                </div>
                                <div className="flex justify-center col-span-3">
                                    {action === Action.add &&
                                        <button type='button' onClick={() => reset()} title='addnew' className="bg-slate-500 flex justify-between px-4 py-1.5 text-xs rounded-md text-white  tracking-wide cursor-pointer mr-2">
                                            <FaUserPlus size={16} />
                                            <span className='ml-2'>reset</span>
                                        </button>
                                    }
                                    <button type='submit' title='addnew' className="bg-slate-500 flex justify-between px-4 py-1.5 text-xs rounded-md text-white  tracking-wide cursor-pointer mr-2">
                                        <FaUserPlus size={16} />
                                        <span className='ml-2'>save</span>
                                    </button>
                                    {
                                        replace &&
                                        <button type='button' onClick={() => setReplace(false)} title='addnew' className="bg-slate-500 flex justify-between px-4 py-1.5 text-xs rounded-md text-white  tracking-wide cursor-pointer mr-2">
                                            <VscReplace size={16} />
                                            <span className='ml-2'>replace image</span>
                                        </button>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </form >
            </div>
        </div>
    )
}

export default Form;