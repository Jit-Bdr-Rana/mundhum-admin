import React from 'react'
import { FiCopy, FiEdit, FiEdit2, FiEdit3, FiEye, FiPrinter, FiTrash2 } from 'react-icons/fi';
interface Props {
    edit?: boolean,
    onEdit?: (e: React.MouseEvent<HTMLButtonElement>) => void
    dlt?: boolean;
    onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void
    view?: boolean,
    onView?: (e: React.MouseEvent<HTMLButtonElement>) => void
    edit3?: boolean,
    onEdit3?: (e: React.MouseEvent<HTMLButtonElement>) => void
    print?: boolean,
    onPrint?: (e: React.MouseEvent<HTMLButtonElement>) => void
    edit2?: boolean,
    onEdit2?: (e: React.MouseEvent<HTMLButtonElement>) => void
    copy?: boolean;
    onCopy?: (e: React.MouseEvent<HTMLButtonElement>) => void
    disableAll?: boolean
}


const ButtonGroup = ({ edit, onDelete, onEdit, dlt, edit2, edit3, print, disableAll, onEdit2, onPrint, onEdit3, onView, view, copy, onCopy }: Props) => {
    return (
        <div className='flex  '>
            {
                edit &&
                <button disabled={disableAll} title='edit' onClick={onEdit} className={`${disableAll ? 'cursor-not-allowed' : 'hover:bg-black hover:bg-opacity-20 cursor-pointer '}   rounded-full p-1.5 `}>
                    <FiEdit size={22} className={`${disableAll ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'} `} />
                </button>
            }

            {
                edit2 &&
                <button disabled={disableAll} title='edit status' onClick={onEdit2} className={`${disableAll ? 'cursor-not-allowed' : 'hover:bg-black hover:bg-opacity-20 cursor-pointer '}   rounded-full p-1.5 `}>
                    <FiEdit2 size={22} className={`${disableAll ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'} `} />
                </button>
            }
            {
                copy &&
                <button disabled={disableAll} title='copy' onClick={onCopy} className={`${disableAll ? 'cursor-not-allowed' : 'hover:bg-black hover:bg-opacity-20 cursor-pointer '}   rounded-full p-1.5 `}>
                    <FiCopy size={22} className={`${disableAll ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'} `} />
                </button>
            }
            {
                view &&
                <button disabled={disableAll} title='view' onClick={onView} className={`${disableAll ? 'cursor-not-allowed' : 'hover:bg-black hover:bg-opacity-20 cursor-pointer '}   rounded-full p-1.5 `}>
                    <FiEye size={22} className={`${disableAll ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'} `} />
                </button>
            }
            {
                edit3 &&
                <button disabled={disableAll} title='edit parcel details' onClick={onEdit3} className={`${disableAll ? 'cursor-not-allowed' : 'hover:bg-black hover:bg-opacity-20 cursor-pointer '}   rounded-full p-1.5 `}>
                    <FiEdit3 size={25} className={`${disableAll ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'} `} />
                </button>
            }
            {
                print &&
                <button disabled={disableAll} title='print' onClick={onPrint} className={`${disableAll ? 'cursor-not-allowed' : 'hover:bg-black hover:bg-opacity-20 cursor-pointer '}   rounded-full p-1.5 `}>
                    <FiPrinter size={22} className={`${disableAll ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'} `} />
                </button>
            }
            {
                dlt &&
                <button disabled={disableAll} title='dlt' onClick={onDelete} className={`${disableAll ? 'cursor-not-allowed' : 'hover:bg-black hover:bg-opacity-20 cursor-pointer '}   rounded-full p-1.5 `}>
                    <FiTrash2 size={22} className={`${disableAll ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'} `} />
                </button>
            }

        </div>
    )
}

export default ButtonGroup