import { Spin } from "antd";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { At, Key } from "react-bootstrap-icons"
import { useForm } from "react-hook-form";
import { authUrl, userUrl } from "../../apis/list.api";
import { httpClient } from "../../apis/rest.api";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { CurrentUser } from "../../modal/CurrentUser.modal";
import User from "../../modal/User.modal";
import { closeSpinner, setToken } from "../../utils";
import { notification } from "../../utils/tost";
import { LoadingOutlined } from '@ant-design/icons';
import { Statistic } from 'antd'
const { Countdown } = Statistic
enum Action {
  login,
  resetpassword
}
interface ResetResponse {
  token: string;
  email: string;
}
interface ResetPayload {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}
type InputInterface = {
  email: string,
  password: string,
};
const Login = () => {
  const [resetDetail, setResetDetail] = useState<ResetResponse>({ token: '', email: '' });
  const [action, setAction] = useState<Action>(Action.login);
  const [loading, setLoading] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const router = useRouter();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<InputInterface>();
  const global = useGlobalContext();
  const onSubmit = async (formData: InputInterface) => {
    if (loading) return;
    setLoading(true)
    try {
      const { data, error } = await httpClient().post(authUrl.login, { email: formData?.email, password: formData?.password });
      if (data && !error) {
        if (!data?.reset) {
          const { accessToken, user } = data.data;
          setToken(accessToken);
          global.setUser(new CurrentUser(new User(user), true));
          notification.success('login successful')
          router.push('/dashboard').then(() => {
            setLoading(false)
          })
        } else {
          setResetDetail({ token: data?.data?.token, email: data?.data?.email });
          setAction(Action.resetpassword);
          notification.info(data?.message ?? 'you need to reset your password')
          setLoading(false)
          setDisable(false)

        }
      } else {
        if (error?.errors) {
          if (error.errors?.message) {
            notification.error(error.errors.message);
          } else {
            setError("password", { type: "focus", message: error?.errors }, { shouldFocus: true });
            notification.error(error?.errors ?? 'credential didnot match !!')
            setLoading(false)
            setDisable(false)

          }

        } else {
          if (error?.statusCode == 429) {
            setDisable(true)
          }
          notification.error('oops there is problem in server ')
          closeSpinner();
          setLoading(false)
        }
      }
    } catch (e: any) {
      notification.error('oops there is problem in server ')
      closeSpinner()
      setLoading(false)
      setDisable(false)
    }
  };

  return (
    <div className='h-screen flex justify-center  bg-login'>
      <div className="flex  w-[28%] justify-center items-center">
        <div className="w-full bg-white py-10 px-8 rounded-md shadow-custom border">
          {
            action == Action.login &&
            <form onSubmit={handleSubmit(onSubmit)} className="animate-slow" >
              <h1 className="text-gray-800 text-center font-bold text-2xl mb-1">Admin Login!</h1>
              <p className="text-sm font-normal text-center text-gray-600 mb-7">ideal courier</p>
              <div className="mb-4">
                <div className="items-center border-2 z-0 relative  mb-6 py-2 px-3 rounded-md ">
                  <div className="flex  z-0 ">
                    <At className='h-5 w-5 text-gray-400' size={16} />
                    <input
                      className="pl-2 border-none outline-none w-full"
                      type="text"
                      id=""
                      placeholder="Email Address"
                      {...register("email", { required: { value: true, message: 'email is required' } })}
                    />
                    {errors?.email && <small className='pl-2 absolute -bottom-5 left-0 text-red-600'>{errors.email.message}</small>}
                  </div>
                </div>
              </div>

              <div className=" mb-8 relative border-2 py-2 px-3 rounded-md">
                <div className="flex items-center">
                  <Key className='h-5 w-5 text-gray-400' />
                  <input
                    className="pl-2 outline-none border-none w-full"
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: { value: true, message: 'password is required' } })}
                  />
                  {errors?.password && <small className='ml-2 -bottom-5 left-0 absolute  text-red-600'>{errors.password.message}</small>}

                </div>
                {
                  disable &&
                  <ToManyAttempt setDisable={setDisable} />
                }
              </div>

              <button
                type="submit"
                disabled={disable || loading}
                className={`block w-full ${(disable || loading) ? 'bg-[#b19e94] cursor-not-allowed' : 'bg-[#b54a0b] cursor-pointer'}  mt-4 py-2 rounded-md text-white font-semibold mb-2`}>
                {!loading ?
                  <span className="py-5">Login</span>
                  :
                  <Spin indicator={<LoadingOutlined style={{ color: 'white', fontSize: 15 }} spin />} />
                }

              </button>


            </form>
          }{
            action === Action.resetpassword && <ResetPassowrdForm setAction={setAction} resetDetail={resetDetail} />
          }
        </div>
      </div>
    </div>
  )
}

const ResetPassowrdForm = ({ resetDetail, setAction }: { resetDetail: ResetResponse, setAction: (set: Action) => void }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { handleSubmit, register, watch, formState: { errors } } = useForm<ResetPayload>();
  const requestReset = async (formData: ResetPayload) => {
    if (loading) return;
    setLoading(true)
    formData.email = resetDetail.email,
      formData.token = resetDetail.token

    const { data, error } = await httpClient().post(userUrl.resetPassword, formData);
    if (data && !error) {
      notification.success(data?.message ?? 'password reset successful try to log in ');
      setAction(Action.login);
      setLoading(false)
    } else {
      notification.error("reset time expired please contact admin")
      setAction(Action.login);
      setLoading(false)
    }
  }
  return (
    <div className="animate-slow">
      <h1 className="text-gray-800  text-center font-bold text-2xl mb-1">Password Form</h1>
      <p className="text-sm font-normal text-center text-gray-600 mb-6">reset your password here</p>
      <form action="" onSubmit={handleSubmit(requestReset)}>
        <div className="mb-4">
          <div className="flex items-center border-2 py-2 px-3 rounded-md ">
            <Key className='h-5 w-5 text-gray-400' />
            <input
              className="pl-2 outline-none w-full border-none"
              type="password"
              placeholder="New Password"
              {...register('password', { required: 'password is requried' })}
            />
          </div>
          {errors?.password && <small className="text-xs pl-2 text-red-500">{errors?.password?.message}</small>}
        </div>
        <div className="mb-4">
          <div className="flex items-center border-2 py-2 px-3 rounded-md ">
            <Key className='h-5 w-5 text-gray-400' />
            <input
              className="pl-2 outline-none w-full border-none"
              type="password"
              placeholder="Confirm password"
              {...register('password_confirmation', {
                required: 'confirm password is requried',
                validate: (val: string) => {
                  if (watch('password') !== val) {
                    return 'your password did not match'
                  }
                }
              })}
            />
          </div>
          {errors?.password_confirmation && <small className="text-xs pl-2 text-red-500">{errors?.password_confirmation?.message}</small>}
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="  w-full bg-[#b54a0b]  mt-4 py-2 rounded-md text-white font-semibold mb-2">
            {
              !loading ?
                <span className="py-5">Reset</span>
                :
                <Spin indicator={<LoadingOutlined style={{ color: 'white', fontSize: 15 }} spin />} />
            }
          </button>
        </div>
        <div>
          <button
            onClick={() => setAction(Action.login)}
            type="button"
            className="block w-full bg-[#b54a0b]  mt-4 py-2 rounded-md text-white font-semibold mb-2">
            Back
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login;

const ToManyAttempt = ({ setDisable }: { setDisable: React.Dispatch<SetStateAction<boolean>> }) => {
  const deadline = (Date.now() + 1000 * 60); // Dayjs is also OK
  return (
    <span className=" ml-2 text-red-600 -bottom-6 left-0 absolute  flex items-center gap-1">
      <small>too many attempt please request after</small>
      <Countdown onFinish={() => setDisable(false)} className="text-xs" valueStyle={{ fontSize: '14px', color: 'red' }} value={deadline} format="s" />
    </span>
  )
}