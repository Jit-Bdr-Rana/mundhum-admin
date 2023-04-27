import { GetServerSideProps } from "next";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { paymentUrl } from "../../../apis/list.api";
import { httpClient } from "../../../apis/rest.api";
import PaymentTable from "../../../components/shipment/payment/Table";
import TableHeader from "../../../components/TableHeader";
import modeuleList from "../../../datas/module.data";
import { PaymentForm } from "../../../interface/form";
import Container from "../../../layouts/Container";
import { notification } from "../../../utils/tost";

const index = () => {
  return <Payment />;
};


const Payment = () => {
  const [paymentList, setPaymentList] = useState<Array<any>>([]);
  const [filteredPaymentList, setFilteredPaymentList] = useState<Array<any>>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const { register, reset, setError, setValue, handleSubmit, formState: { errors } } = useForm<PaymentForm>();
  const [loading, setLoading] = useState(true);
  const saveForm = async (formData: PaymentForm) => {
    if (formData.id) {
      const { data, error } = await httpClient().put(paymentUrl.save + `/${formData.id}`, formData);
      setResponse(data, error, true);
    } else {
      const { data, error } = await httpClient().post(paymentUrl.save, formData);
      setResponse(data, error, false);
    }
  }
  const setResponse = (data: any, error: any, edit: boolean) => {
    if (data && !error) {
      reset();
      fetchPayment();
      setEdit(false)
      notification.success(data?.message ? data?.message : edit ? 'payment has been  created successfully' : 'payment has been updated successfully')
    } else {
      error?.errors?.name && setError('name', { type: 'custom', message: error?.errors?.name[0] });
      notification.error('Fail to create/update Payment try again')
    }
  }

  const fetchPayment = async () => {
    const { data, error } = await httpClient().get(paymentUrl.getall);
    if (data && !error) {
      setPaymentList(data.data);
      setFilteredPaymentList(data.data);
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
  const filterPayment = (value: string) => {
    if (value) {
      setFilteredPaymentList(paymentList.filter(f => f?.name?.toString()?.toLowerCase()?.includes(value?.toLowerCase())))
    } else {
      setFilteredPaymentList(paymentList)
    }
  }
  const deletePayment = (id: number) => {
    const promiseResponse = async () => {
      const { data, error } = await httpClient().delete(paymentUrl.delete + `${id}`);
      if (data && !error) {
        notification.success(data?.message ? data.message : 'payment deleted')
        fetchPayment();
      } else {
        notification.error(error?.errors ? error.errors : 'Fail to delete data')
      }
    }
    notification.prompt(promiseResponse);

  }
  useEffect(() => {
    fetchPayment();
  }, []);

  return (
    <Container title="Payment Table ">
      <div className="flex gap-2 ">
        <div className='rounded-md p-3 w-[65%] '>
          <TableHeader
            showSearch={true}
            searchPlaceholder="search payment ..."
            onSearch={(e: ChangeEvent<HTMLInputElement>) => filterPayment(e.target.value)}
          />
          <PaymentTable
            dataSource={filteredPaymentList}
            deletePayment={deletePayment}
            editForm={editForm}
            loading={loading}

          />

        </div>
        <div className="w-[35%]  py-2">
          <div className={`shadow-sm px-3 pb-3   w-[100%] `}>
            <div className="flex justify-between  shadow-custom   px-3 py-3 mb-3  rounded-t-lg  ">
              <span className="text-sm font-bold pb-0 mb-0">{!edit ? 'Create' : 'Update'} payment mode</span>
              {edit && <RiCloseCircleLine className="cursor-pointer" size={20} onClick={() => cancelEdit()} />}
            </div>
            <div className="shadow-custom p-3">
              <form onSubmit={handleSubmit(saveForm)}>
                <div className='col-span-2'>
                  <label htmlFor=" first_name" className="block mb-2 text-sm  text-gray-900 "> payment Name</label>
                  <input {...register("name", { required: { value: true, message: 'payment name is required' } })} type="text" id="" placeholder="payment name" className={` border  text-gray-900 text-sm rounded-sm focus:outline-none ${errors?.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-gray-500 focus:border-gray-500'}  block w-full p-1.5 `} />

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
      page: '/user',
      title: 'Mundhum | Payment',
      moduleId: modeuleList?.paymentModule.id
    }
  }
}
