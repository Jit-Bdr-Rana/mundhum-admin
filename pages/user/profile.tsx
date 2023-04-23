import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaUserPlus } from 'react-icons/fa'
import { userUrl } from '../../apis/list.api'
import { httpClient } from '../../apis/rest.api'
import { useGlobalContext } from '../../contexts/GlobalContext'
import { PasswordChangeForm } from '../../interface/form'
import Container from '../../layouts/Container'
import { notification } from '../../utils/tost'
const profile = () => {
    return (
        <Profile />
    )
}

export default profile


export const Profile = () => {
    const global = useGlobalContext()
    const tab: string[] = ['profile', 'password change']
    const [currentTab, setCurrentTab] = useState<string>(tab[0])
    const { register, setError, handleSubmit, watch, formState: { errors } } = useForm<PasswordChangeForm>();

    const saveChange = async (formData: PasswordChangeForm) => {
        const { data, error } = await httpClient().post(userUrl.changePassword, formData);
        if (data && !error) {
            notification.success(data?.message ?? 'user password change successfully')
            setCurrentTab(tab[0]);
        } else {
            setError('oldPassword', { type: 'custom', message: error?.errors?.oldPassword });
        }
    }
    return (
        <Container title='User Profile'>
            <div className='container mx-auto px-5 pt-3 '>
                <div className='flex flex-col p-3'>
                    <div className='flex gap-[0.1rem] -mb-[0.05rem] z-10 text-sm cursor-pointer'>
                        <div onClick={() => setCurrentTab(tab[0])} className={` px-10 py-3  rounded-t-md  ${tab[0] === currentTab ? 'shadow-custom pb-2 border-x border-t-2 border-t-orange-600  text-gray-900' : 'text-gray-500'}`}>Own Profile</div>
                        <div onClick={() => setCurrentTab(tab[1])} className={` px-10 py-3  rounded-t-md  ${tab[1] === currentTab ? 'shadow-custom pb-2 border-x border-t-2 border-t-orange-600  text-gray-900' : 'text-gray-500'}`}>Change Password</div>
                    </div>
                    <div className={`${tab[0] != currentTab && 'hidden'}`}>
                        <div className='py-16 px-8  rounded-b-md shadow-custom '>
                            <div className='grid grid-cols-12 items-center'>
                                <div className='col-span-2'>
                                    <div className='w-2/4'>
                                        <img alt='profile' title='profile' src={'/profile.jpg'} height={100} width={100} className='border-gray-900   rounded-full w-full ' />
                                    </div>
                                </div>
                                <div className='col-span-10'>
                                    <h1 className='font-bold text-sm text-gray-800'>Personal Information</h1>
                                    <div className='grid grid-cols-3 gap-2 pt-2 text-gray-500'>
                                        <div>
                                            {global?.user?.getFullName()}
                                        </div>
                                        <div>
                                            {global?.user?.user?.address}
                                        </div>
                                        <div>
                                            Admin
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-12'>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`bg-slate-50 shadow-custom  border-y border-x  ${tab[1] != currentTab && 'hidden'}`}>
                        <div className='p-5'>
                            <div className='grid grid-cols-12 gap-x-4'>
                                <div className='col-span-4 text-sm text-gray-500'>
                                    <form className="" onSubmit={handleSubmit(saveChange)}>
                                        <div className='mb-2'>
                                            <label htmlFor="firstName" className="block mb-2 text-sm  text-gray-900 ">Old Password</label>
                                            <input {...register("oldPassword", { required: 'old password is required' })} type="password" placeholder="old password" className={` border ${!errors?.oldPassword ? 'border-gray-300 focus:ring-gray-500 focus:border-gray-500' : 'border-red-500 focus:ring-red-500 focus:border-red-500'}   text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                            {errors?.oldPassword && <small className='text-xs text-red-500'>{errors.oldPassword?.message}</small>}
                                        </div>
                                        <div className='mb-2'>
                                            <label htmlFor="newpassword" className="block mb-2 text-sm  text-gray-900 "> New Password</label>
                                            <input {...register("newPassword", { required: "new password is required" })} type="password" placeholder="new Password" className={` border ${!errors?.newPassword ? 'border-gray-300 focus:ring-gray-500 focus:border-gray-500' : 'border-red-500 focus:ring-red-500 focus:border-red-500'}    text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                            {errors?.newPassword && <small className='text-xs text-red-500'>{errors.newPassword?.message}</small>}
                                        </div>
                                        <div className='mb-2'>
                                            <label htmlFor="confirm Password" className="block mb-2 text-sm  text-gray-900 "> Confirm Password</label>
                                            <input {...register("confirmPassword", {
                                                required: 'confirm password is required',
                                                validate: (val: string) => {
                                                    if (watch('newPassword') !== val) {
                                                        return 'your confirm password did not match'
                                                    }
                                                }
                                            })} type="password" placeholder="confirm Password" className={` border ${!errors?.confirmPassword ? 'border-gray-300 focus:ring-gray-500 focus:border-gray-500' : 'border-red-500 focus:ring-red-500 focus:border-red-500'}    text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-1.5 `} />
                                            {errors?.confirmPassword && <small className='text-xs text-red-500'>{errors.confirmPassword?.message}</small>}
                                        </div>

                                        <div className="flex justify-center col-span-6">
                                            <button type='submit' title='addnew' className="bg-slate-500 flex justify-between px-4 py-1.5 text-xs rounded-md text-white  tracking-wide cursor-pointer mr-2">
                                                <FaUserPlus size={16} />
                                                <span className='ml-2'>save</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className='col-span-8'>
                                    <div className='py-2'>
                                        <h1 className='font-bold text-sm text-gray-500'>Password policy</h1>
                                        <ul className='text-gray-500 text-sm list-disc pl-5'>
                                            <li className='pb-2'>password must be greater than 6</li>
                                            <li className='pb-2'>password must be greater than 6</li>
                                            <li className='pb-2'>password must be greater than 6</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    )
}



export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            page: '/user-profile',
            title: 'User Profile'
        }
    }
}