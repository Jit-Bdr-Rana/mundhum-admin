import { GetServerSideProps } from "next";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { statusUrl } from "../../../apis/list.api";
import { httpClient } from "../../../apis/rest.api";
import PaymentTable from "../../../components/shipment/payment/Table";
import TableHeader from "../../../components/TableHeader";
import modeuleList from "../../../datas/module.data";
import { StatusForm } from "../../../interface/form";
import Container from "../../../layouts/Container";
import { notification } from "../../../utils/tost";

const index = () => {
  return <Status />;
};


const Status = () => {
  const [statusList, setStatusList] = useState<Array<any>>([]);
  const [filterdStatusList, setFilteredStatusList] = useState<Array<any>>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const { register, reset, setError, setValue, handleSubmit, formState: { errors } } = useForm<StatusForm>();
  const [loading, setLoading] = useState(true)
  const saveForm = async (formData: StatusForm) => {

    if (formData.id) {
      const { data, error } = await httpClient().put(statusUrl.update + `${formData.id}`, formData);
      setResponse(data, error, true);
    } else {
      const { data, error } = await httpClient().post(statusUrl.save, formData);
      setResponse(data, error, false);
    }
  }
  const setResponse = (data: any, error: any, edit: boolean) => {
    if (data && !error) {
      reset();
      fetchStatus();
      setEdit(false)
      notification.success(data?.message ? data?.message : edit ? 'status has been  created successfully' : 'status has been updated successfully')
    } else {
      error?.errors?.name && setError('name', { type: 'custom', message: error?.errors?.name[0] });
      notification.error('Fail to create/update status try again')
    }
  }

  const fetchStatus = async () => {
    const { data, error } = await httpClient().get(statusUrl.getall);
    if (data && !error) {
      setStatusList(data.data);
      setFilteredStatusList(data.data)
    }
    setLoading(false)
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
  const deleteStatus = (id: number) => {
    const promiseResponse = async () => {
      const { data, error } = await httpClient().delete(statusUrl.delete + `${id}`);
      if (data && !error) {
        notification.success(data?.message ? data.message : 'status deleted')
        fetchStatus();
      } else {
        notification.error(error?.errors ? error.errors : 'Fail to delete data')
      }
    }
    notification.prompt(promiseResponse);

  }
  const filterStatus = (value: string) => {
    if (value) {
      setFilteredStatusList(statusList.filter(f => f?.name?.toString()?.toLowerCase()?.includes(value?.toLowerCase())))
    } else {
      setFilteredStatusList(statusList)
    }
  }
  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <Container title="Status Table ">
      <div className="flex gap-2 ">
        <div className='rounded-md p-3 w-[65%] '>
          <TableHeader
            showSearch={true}
            onSearch={(e: ChangeEvent<HTMLInputElement>) => filterStatus(e.target.value)}
          />
          <PaymentTable
            dataSource={filterdStatusList}
            deletePayment={deleteStatus}
            editForm={editForm}
            loading={loading}
          />
        </div>
        <div className="w-[35%]  py-3">
          <div className={` px-3 pb-3   w-[100%] `}>
            <div className="flex justify-between  shadow-custom   px-3 py-3 mb-3  rounded-t-lg  ">
              <span className="text-sm font-bold">{!edit ? 'Create' : 'Update'} Status Mode</span>
              {edit && <RiCloseCircleLine className="cursor-pointer" size={20} onClick={() => cancelEdit()} />}
            </div>
            <div className="shadow-custom p-3">
              <form onSubmit={handleSubmit(saveForm)}>
                <div className='col-span-2'>
                  <label htmlFor=" first_name" className="block mb-2 text-sm  text-gray-900 "> Status Name</label>
                  <input {...register("name", { required: { value: true, message: 'payment name is required' } })} type="text" id="" placeholder="Status Name" className={` border  text-gray-900 text-sm rounded-sm focus:outline-none ${errors?.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-gray-500 focus:border-gray-500'}  block w-full p-1.5 `} />

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
      </div>
    </Container>
  );
};


export default index
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      page: '/shipment',
      title: 'Ideal | Status ',
      moduleId: modeuleList.statusModule.id
    }
  }
}