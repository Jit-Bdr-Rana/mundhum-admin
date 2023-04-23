import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { userUrl } from "../../apis/list.api";
import { httpClient } from "../../apis/rest.api";
import { Action } from "../../interface/common";
import { PasswordResetResponse, UserForm } from "../../interface/form";
import { notification } from "../../utils/tost";

interface FormProps {
    className?: string;
    action: Action;
    setAction: (act: Action) => void;
    editData: any;
    branchList: any[];
    roleList: any[];
    fetchAllUser: () => void;
    setPasswordResetResponse: (set: PasswordResetResponse) => void;
}
const Form = ({ className, action, setAction, editData, branchList, roleList, fetchAllUser, setPasswordResetResponse }: FormProps) => {
    const { register, handleSubmit, setValue, reset, setError, formState: { errors } } = useForm<UserForm>();
    const saveUser = async (formData: any) => {
        if (formData.id) {
            const { data, error } = await httpClient().put(userUrl.updateForAdmin + formData?.id, formData);
            formState(data, error, true);
        } else {
            const { data, error } = await httpClient().post(userUrl.save, formData);
            formState(data, error, false);
        }

    }

    const formState = (data: any, error: any, update: boolean) => {
        if (data && !error) {

            if (!update) {
                setPasswordResetResponse({ password: data?.data?.password, user: data?.data?.user })
                notification.info('user created successfully')
                setAction(Action.resetpassword)
            } else {
                notification.success(data?.message ?? 'user updated successfully')
                setAction(Action.index)
            }
            fetchAllUser();
        } else {
            notification.error(data?.errors ?? 'opps some error occurced!')
            error?.errors?.email && setError('email', { type: 'custom', message: error.errors.email[0] });
            error?.errors?.username && setError('username', { type: 'custom', message: error.errors.username[0] });
        }
    }

    useEffect(() => {
        if (editData && action === Action.edit) {
            setValue('id', editData?.id);
            setValue('address', editData?.address);
            setValue('firstName', editData?.firstName);
            setValue('middleName', editData?.middleName);
            setValue('lastName', editData?.lastName);
            setValue('username', editData?.username);
            setValue('email', editData?.email);
            setValue('branchId', editData?.branch?.id);
            setValue('roleId', editData?.role?.id);
        }
        return () => {
            reset();
        }
    }, [editData])

    return (
        <div className={className + '  animate-slow '}>
            <div className=''>
                <form onSubmit={handleSubmit(saveUser)}>
                    <div className="relative  shadow-custom px-4 py-3 w-[100%]">
                        <div>
                            <div className="gap-5 grid grid-cols-6">
                                <div className='col-span-2'>
                                    <label htmlFor="firstName" className="block mb-2 text-sm  text-gray-900 "> First Name</label>
                                    <input {...register("firstName", { required: 'first name is required' })} type="text" placeholder="first name" className={` border ${!errors?.firstName ? 'border-gray-300 focus:ring-gray-500 focus:border-gray-500' : 'border-red-500 focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    {errors?.firstName && <small className='text-xs text-red-500'>{errors.firstName?.message}</small>}
                                </div>
                                <div className='col-span-2'>
                                    <label htmlFor="middleName" className="block mb-2 text-sm  text-gray-900 "> Middle Name</label>
                                    <input {...register("middleName", { required: false })} type="text" placeholder="middle name" className={` border ${!errors?.middleName ? 'border-gray-300 focus:ring-gray-500 focus:border-gray-500' : 'border-red-500 focus:ring-red-500 focus:border-red-500'}    text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    {errors?.middleName && <small className='text-xs text-red-500'>{errors.middleName?.message}</small>}
                                </div>
                                <div className='col-span-2'>
                                    <label htmlFor="lastName" className="block mb-2 text-sm  text-gray-900 "> Last Name</label>
                                    <input {...register("lastName", { required: 'last name is required' })} type="text" placeholder="last name" className={` border ${!errors?.lastName ? 'border-gray-300 focus:ring-gray-500 focus:border-gray-500' : 'border-red-500 focus:ring-red-500 focus:border-red-500'}    text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    {errors?.lastName && <small className='text-xs text-red-500'>{errors.lastName?.message}</small>}
                                </div>
                                <div className='col-span-2'>
                                    <label htmlFor="username" className="block mb-2 text-sm  text-gray-900 ">Username</label>
                                    <input {...register("username", { required: 'user name is required' })} type="text" placeholder="username " className={` border ${!errors?.username ? 'border-gray-300 focus:ring-gray-500 focus:border-gray-500' : 'border-red-500 focus:ring-red-500 focus:border-red-500'}    text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    {errors?.username && <small className='text-xs text-red-500'>{errors.username?.message}</small>}
                                </div>
                                <div className='col-span-2'>
                                    <label htmlFor="email" className="block mb-2 text-sm  text-gray-900 ">Email</label>
                                    <input {...register("email", {
                                        disabled: (action === Action.edit) ? true : false,
                                        required: 'email is required', pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'invalid email address'
                                        }
                                    })} type="text" placeholder={(action === Action.edit) ? editData?.email : 'email'} className={` border ${!errors?.email ? 'border-gray-300 focus:ring-gray-500 focus:border-gray-500' : 'border-red-500 focus:ring-red-500 focus:border-red-500'} ${action === Action.edit && 'cursor-not-allowed'}    text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    {errors?.email && <small className='text-xs text-red-500'>{errors.email?.message}</small>}
                                </div>
                                <div className='col-span-2'>
                                    <label htmlFor=" address" className="block mb-2 text-sm  text-gray-900 ">Address</label>
                                    <input {...register("address", { required: "address is required" })} type="text" placeholder="address" className={` border ${!errors?.address ? 'border-gray-300 focus:ring-gray-500 focus:border-gray-500' : 'border-red-500 focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                    {errors?.address && <small className='text-xs text-red-500'>{errors.address?.message}</small>}
                                </div>
                                <div className='col-span-3'>
                                    <label className="block mb-2 text-sm  text-gray-900 " htmlFor="branch" >Branch</label>
                                    <select {...register("branchId", {
                                        disabled: (action === Action.edit) ? true : false,
                                        pattern: {
                                            value: /^(?!.*(null))/,
                                            message: 'type is required'
                                        }
                                    })} title='branch' className={` border ${!errors?.branchId ? 'border-gray-300' : 'border-red-500'} ${!errors?.branchId ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'} ${action === Action.edit && 'cursor-not-allowed'}  text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} >
                                        <option selected={true} disabled={true} value='null'>choose the branch</option>
                                        {
                                            branchList?.map((data, index) => {
                                                return (
                                                    <option key={index} value={data?.id}>{data?.name}</option>
                                                )
                                            })
                                        }

                                    </select>
                                    {errors?.branchId && <small className='text-xs text-red-500'>{errors.branchId?.message}</small>}
                                </div>
                                <div className='col-span-3'>
                                    <label className="block mb-2 text-sm  text-gray-900 " htmlFor="role" >Role</label>
                                    <select {...register("roleId", {
                                        pattern: {
                                            value: /^(?!.*(null))/,
                                            message: 'type is required'
                                        }
                                    })} title='role' className={` border ${!errors?.branchId ? 'border-gray-300' : 'border-red-500'} ${!errors?.branchId ? 'focus:ring-gray-500 focus:border-gray-500' : 'focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} >
                                        <option selected={true} disabled={true} value='null'>choose the role</option>
                                        {
                                            roleList?.length > 0 && roleList?.map((data, index) => {
                                                return (
                                                    <option key={index} value={data?.id}>{data?.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {errors?.branchId && <small className='text-xs text-red-500'>{errors.branchId?.message}</small>}
                                </div>
                                <div className="flex justify-center col-span-6">
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

