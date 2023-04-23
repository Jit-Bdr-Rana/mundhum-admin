import { useEffect } from "react";
import { IoSave } from 'react-icons/io5'
interface FormProps {
    edit: boolean;
    setEdit?: (set: boolean) => void,
    className?: string;
}

const Form = ({ edit, setEdit, className }: FormProps) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [edit, setEdit])
    return (

        <form className={`${className} `}>
            {/* add shipemnt  */}
            <div className={`shadow-sm px-3 pb-3 my-2 pt-3 w-[100%] `}>
                {/* <p className='px-2 py-1.5 text-sm font-bold border-l-4 border-l-gray-900 bg-gray-400 text-white rounded-l-sm'>Fill the user details</p> */}

                <div className="grid gap- mb-6 grid-cols-12 gap-2 mt-2 justify-center  mx-auto shadow-md bg-slate-50 rounded-md border p-4">
                    <div className="col-span-5">
                        <div className='col-span-2'>
                            <label htmlFor=" first_name" className="block mb-2 text-sm  text-gray-900 "> First Name</label>
                            <input type="text" id="" placeholder="first name" className=" border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 block w-full p-1.5 " />
                        </div>
                        <div className='col-span-2 '>
                            <label htmlFor="first_name" className="block mb-2 text-sm  text-gray-900 "> Middle Name</label>
                            <input type="text" id="" placeholder="middle name" className=" border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 block w-full p-1.5 " />
                        </div>
                        <div className='col-span-2 '>
                            <label htmlFor="first_name" className="block mb-2 text-sm  text-gray-900 "> Last Name</label>
                            <input type="text" id="" placeholder="last Name" className=" border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 block w-full p-1.5 " />
                        </div>
                        <div className='col-span-3'>
                            <label htmlFor="first_name" className="block mb-2 text-sm  text-gray-900 "> UserName</label>
                            <input type="text" id="" placeholder="usernmae" className=" border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 block w-full p-1.5 " />
                        </div>
                        <div className='col-span-3'>
                            <label htmlFor="first_name" className="block mb-2 text-sm  text-gray-900 "> Time</label>
                            <input type="time" id="" className=" border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 block w-full p-1.5 " placeholder="16:12 pm" />
                        </div>
                        <div className='col-span-3 '>
                            <label htmlFor="first_name" className="block mb-2 text-sm  text-gray-900 "> Location</label>
                            <input title="locaiton" type="text" id="" className=" border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 block w-full p-1.5 " />
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm  text-gray-900 ">Role</label>
                            <select title='type' id="" className="border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 block w-full p-1.5 ">
                                <option selected>Choose a role</option>
                                <option value="US">Admin</option>
                                <option value="CA">Data Entry</option>
                                <option value="FR">Front desk</option>
                                <option value="DE">super admin</option>
                            </select>
                        </div>
                        <div className="col-span-6 bg-gray-600 px-2 py-1 mt-4 text-white items-center gap-2 rounded-md flex mx-auto">
                            <p>create user</p>
                            <IoSave size={15} />
                        </div>

                    </div>
                    <div className="col-span-6">

                    </div>
                </div>
            </div>
        </form >
    )
}


export default Form;