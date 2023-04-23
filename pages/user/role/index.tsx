import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { IoSave } from "react-icons/io5";
import { RiCloseCircleLine } from "react-icons/ri";
import { moduleUrl, roleAccessUrl, roleUrl } from "../../../apis/list.api";
import { httpClient } from "../../../apis/rest.api";
import TableHeader from "../../../components/TableHeader";
import RoleTable from "../../../components/user/RoleTable";
import modeuleList from "../../../datas/module.data";
import { Action } from "../../../interface/common";
import { RoleAccessForm, RoleForm } from "../../../interface/form";
import Container from "../../../layouts/Container";
import { notification } from "../../../utils/tost";
const index = () => {
  return <Role />;
};


const Role = () => {
  const [roleList, setroleList] = useState<Array<any>>([]);
  const [filteredRoleList, setFilteredRoleList] = useState<Array<any>>([]);
  const [moduleList, setModuleList] = useState<Array<any>>([]);
  const [selectedRole, setSelectedRole] = useState<any>({});
  const [action, setAction] = useState<Action>(Action.index);
  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('')
  const { register, reset, setError, setValue, handleSubmit, formState: { errors } } = useForm<RoleForm>();
  const saveForm = async (formData: RoleForm) => {
    if (formData.id) {
      const { data, error } = await httpClient().put(roleUrl.update + `${formData.id}`, formData);
      setResponse(data, error, true);
    } else {
      const { data, error } = await httpClient().post(roleUrl.save, formData);
      setResponse(data, error, false);
    }
  }
  const setResponse = (data: any, error: any, edit: boolean) => {
    if (data && !error) {
      reset();
      fetchrole();
      setEdit(false)
      notification.success(data?.message ? data?.message : edit ? 'role has been  created successfully' : 'role has been updated successfully')
    } else {
      error?.errors?.name && setError('name', { type: 'custom', message: error?.errors?.name[0] });
      notification.error('Fail to create/update role try again')
    }
  }

  const fetchrole = async () => {
    const { data, error } = await httpClient().get(roleUrl.getall);
    if (data && !error) {
      setroleList(data.data);
      setFilteredRoleList(data.data)
    }
    setLoading(false)
  }
  const fetchmodele = async () => {
    const { data, error } = await httpClient().get(moduleUrl.getall);
    if (data && !error) {
      setModuleList(data.data);
    }
  }
  const editForm = (data: any) => {
    setEdit(true)
    setValue('name', data?.name);
    setValue('id', data?.id);
  }
  const cancelEdit = () => {
    setEdit(false)
    reset()
  }
  const deleterole = (id: number) => {
    const promiseResponse = async () => {
      const { data, error } = await httpClient().delete(roleUrl.delete + `${id}`);
      if (data && !error) {
        notification.success(data?.message ? data.message : 'role deleted')
        fetchrole();
      } else {
        notification.error(error?.errors ? error.errors : 'Fail to delete data')
      }
    }
    notification.prompt(promiseResponse);

  }
  const filterRole = (value: string) => {
    if (value) {
      setFilteredRoleList(roleList.filter(f => f?.name?.toLowerCase()?.includes(value?.toLowerCase())))
    } else {
      setFilteredRoleList(roleList)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    switch (action) {


      case Action.index:
        setTitle("Role Table")
        break;
      case Action.edit:
        setTitle("Update Role");
        break;
      case Action.roleaccess:
        setTitle("RoleAccess Update");
        break;
      default:
        setTitle("Role Table")
    }

  }, [action, setAction])
  useEffect(() => {
    fetchrole();
    fetchmodele();
  }, []);

  return (
    <Container title={title}>
      <div className="flex gap-2 ">
        <div className='rounded-md p-3 w-[65%] '>
          <TableHeader

            showSearch={(action === Action.index || action === Action.edit)}
            searchPlaceholder="search role"
            showBackButton={action == Action.roleaccess}
            onBackButton={() => setAction(Action.index)}
            onSearch={(e: React.ChangeEvent<HTMLInputElement>) => filterRole(e.target.value)}
          />
          {
            (action === Action.index || action === Action.edit) &&
            <div className="relative animate-slow overflow-x-auto shadow-custom p-3  ">
              <RoleTable
                cancelEdit={cancelEdit}
                data={filteredRoleList}
                deleterole={deleterole}
                editForm={editForm}
                loading={loading}
                setAction={setAction}
                setSelectedRole={setSelectedRole}
              />
            </div>
          }
          {action === Action.roleaccess && <RoleAccess setAction={setAction} selectedRole={selectedRole} moduleList={moduleList} />}

        </div>
        {
          (action === Action.index || action === Action.edit) &&
          <div className="w-[35%] animate-slow py-3">
            <div className={`shadow-sm px-3 pb-3   w-[100%] `}>
              <div className="flex justify-between  shadow-custom   px-3 py-3 mb-3  rounded-t-lg  ">
                <span className="text-sm font-bold">{!edit ? 'Create' : 'Update'} Role </span>
                {edit && <span><RiCloseCircleLine className="cursor-pointer" size={20} onClick={() => { cancelEdit(); setAction(Action.index) }} /></span>}
              </div>
              <div className="shadow-custom p-3">
                <form onSubmit={handleSubmit(saveForm)}>
                  <div className='col-span-2'>
                    <label htmlFor=" first_name" className="block mb-2 text-sm  text-gray-900 "> Role Name</label>
                    <input {...register("name", { required: { value: true, message: 'role name is required' } })} type="text" id="" placeholder="role name" className={` border  text-gray-900 text-sm rounded-sm focus:outline-none ${errors?.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-gray-500 focus:border-gray-500'}  block w-full p-1.5 `} />

                    {errors?.name && <small className="text-xs text-red-500">{errors?.name.message}</small>}
                  </div>
                  <div className="  px-2 py-1 mt-4 text-white  justify-center items-center gap-2 rounded-md flex mx-auto">
                    <button type='submit' title='addnew' className="bg-slate-500 flex justify-between px-4 hover:bg-slate-800 py-1.5 text-xs rounded-md text-white  tracking-wide cursor-pointer mr-2">
                      <FaUserPlus size={16} />
                      <span className='ml-2'>save</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        }
      </div>
    </Container>
  );
};
const RoleAccess = ({ moduleList, selectedRole, setAction }: { moduleList: any[], selectedRole: any, setAction: (act: Action) => void }) => {
  const { setValue, watch, register, handleSubmit } = useForm<RoleAccessForm>();

  const onSubmit = async (formData: RoleAccessForm) => {
    const { data, error } = await httpClient().post(roleAccessUrl.save, formData);
    if (data && !error) {
      notification.success(data?.message ?? 'role access updated successfully')
      setAction(Action.index)
    } else {
      notification.error('fail to update role access')
    }
  }

  const getRoleAccessbyRoleId = async () => {
    const { data, error } = await httpClient().get(roleAccessUrl.getByRoleId + selectedRole?.id)
    if (data && !error) {
      if (data?.data?.length > 0) {
        setValue('roleAccess', data.data);
      }
    }
  }
  useEffect(() => {
    if (selectedRole?.id) {
      getRoleAccessbyRoleId();
    }
  }, [])
  return (
    <div className="animate-slow">
      <div className="relative overflow-x-auto shadow-custom p-3  ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="w-full text-sm text-left text-white bg-slate-50 dark:text-gray-400">
            <thead className="text-xs text-white font-bold uppercase bg-slate-500">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sn
                </th>
                <th scope="col" className="px-6 py-3">
                  role
                </th>
                <th scope="col" className="px-6 py-3">
                  module
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="">access</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                moduleList?.length > 0 && moduleList?.map((data, index) => {
                  return (
                    <tr key={index} className="border-b text-gray-500 odd:bg-white even:bg-gray-50 ">
                      <th scope="row" className="px-6 py-2 ">
                        {index + 1}
                      </th>
                      <td className="px-6 py-2">
                        {selectedRole?.name}
                        <input type='hidden' value={selectedRole?.id} {...register(`roleAccess.${index}.roleId` as const)} />
                      </td>
                      <td>
                        {data?.name}
                        <input type='hidden' value={data?.id} {...register(`roleAccess.${index}.moduleId` as const)} />
                      </td>
                      <td className="px-6 py-2 flex flex-wrap gap-x-4">
                        <input checked={watch(`roleAccess.${index}.access`)} title="checkbox" type="checkbox" className="ant-checkbox-checked cursor-pointer w-5 h-5"  {...register(`roleAccess.${index}.access` as const)} />
                      </td>
                    </tr>
                  )
                })
              }
              <tr>
                <td colSpan={4}>
                  <div className="mt-4 px-2 py-1 text-white  justify-end items-center gap-2 rounded-md flex mx-auto">
                    <button type='submit' title='addnew' className="bg-slate-500 flex justify-between px-4 hover:bg-slate-800 py-1.5 text-xs rounded-md text-white  tracking-wide cursor-pointer mr-2">
                      <IoSave size={16} />
                      <span className='ml-2'>save change</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      page: '/user',
      title: 'ideal | User Role',
      moduleId: modeuleList?.roleModule.id
    }
  }
}
