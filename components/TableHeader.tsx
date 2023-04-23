import React from 'react'
import { Printer } from 'react-bootstrap-icons';
import { MdAddToPhotos } from 'react-icons/md';
import { TiArrowBack } from 'react-icons/ti';

interface TableHeaderProps {
    showSearch?: boolean;
    showAddButton?: boolean;
    searchPlaceholder?: string;
    onAddButton?: (e: React.MouseEvent<HTMLButtonElement>) => void
    addButtonText?: string;
    showPrintButton?: boolean;
    onPrintButton?: (e: React.MouseEvent<HTMLButtonElement>) => void
    onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showBackButton?: boolean;
    onBackButton?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const TableHeader = ({ showSearch, onSearch, showBackButton, showAddButton, showPrintButton, onAddButton, onBackButton, onPrintButton, addButtonText, searchPlaceholder }: TableHeaderProps) => {
    return (
        <div className="flex  print:!hidden justify-between  shadow-custom   px-3 py-2 mb-3  rounded-t-lg  ">
            <div className={`${showSearch ? '' : 'hidden'} mr-3 w-1/5  py-0.5 px-3`}>
                <input
                    className={` focus:border focus:border-gray-300  border border-transparent  bg-white   py-1 px-3 pr-2 rounded-sm text-xs focus:outline-none`}
                    type="search"
                    name="search"
                    placeholder={searchPlaceholder ?? 'search .....'}
                    onChange={onSearch}
                />
            </div>

            <button onClick={onBackButton} type="button" className={`${showBackButton ? '' : 'hidden'} bg-gray-600 hover:bg-gray-800 text-white rounded-md py-0.5 px-3 text-sm flex items-center gap-2`} ><span>Back</span> <TiArrowBack size={25} /></button>

            {
                showAddButton &&
                <button onClick={onAddButton} type='button' title='addnew' className="bg-gray-600 hover:bg-gray-800 text-white rounded-md py-1.5 px-3 text-sm flex items-center gap-2">
                    <span className='ml-2' >{addButtonText ?? 'Add'}</span>
                    < MdAddToPhotos size={16} />
                </button>
            }
            {
                showPrintButton &&
                <div className="justify-self-end">
                    <button onClick={onPrintButton} type="button" className='bg-gray-600 hover:bg-gray-800 text-white rounded-md py-1.5 px-3 text-sm flex items-center gap-2'><span className='mr-2'>Print</span> <Printer size={18} /></button>
                </div>
            }
        </div>
    )
}

export default TableHeader