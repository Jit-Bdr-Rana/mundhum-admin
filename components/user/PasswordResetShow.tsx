import { FaRegCopy } from "react-icons/fa"
import { PasswordResetResponse } from "../../interface/form"
import copyToClipBoard from "../../utils/clipboardcopy"

const ResetPasswordShow = ({ passwordResetResponse }: { passwordResetResponse?: PasswordResetResponse }) => {

    return (
        <div className='shadow-custom p-5'>
            <div className='p-5 flex justify-between items-center bg-slate-500 text-white rounded-md'>
                <div className='' >
                    <p className='font-bold '><span className='text-lg mr-2'>Email:</span>{passwordResetResponse?.user?.email} </p>
                    <p className='font-bold'><span className='text-lg mr-2'>password:</span><span className=''>{passwordResetResponse?.password}</span></p>
                </div>
                <div>
                    <input type="hidden" id='resetpassword' value={'username: ' + passwordResetResponse?.user?.email + '  ' + 'password: ' + passwordResetResponse?.password} />
                    <FaRegCopy onClick={() => copyToClipBoard('resetpassword')} className="cursor-pointer" size={30} />
                </div>
            </div>
        </div>
    )
}
export default ResetPasswordShow;