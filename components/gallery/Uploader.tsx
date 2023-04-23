import { Image } from 'antd';
import React, { useMemo, useEffect, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone';
import { UseFormSetValue } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';
import { Type } from '../../pages/gallery';
import truncate from '../../utils/truncate';
const Uploader = ({ setValue, resetUpload, type }: { setValue: UseFormSetValue<any>, resetUpload: boolean, type: Type }) => {
    const [files, setFiles] = useState<any[]>([]);
    const onDrop = (acceptedFiles: File[]) => {
        const mappedAcc = acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        if (type === Type.Album) {
            setFiles(() => mappedAcc);
        } else {

            setFiles((current) => [...mappedAcc, ...current.filter((cu) => cu !== null)])
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
        },
        multiple: type === Type.Album ? false : true,
        onDrop

    });
    function onDelete(file: FileWithPath) {
        setFiles(files.filter((fw) => fw !== file));
    }

    const fileslist = files.map((file: FileWithPath & { preview: string }, index) => (
        <div key={index} className='p-2'>
            <div className='flex justify-between  '>
                <div className='flex  items-end gap-5'>
                    <Image alt='preview' src={file?.preview} height={50} width={80} preview />
                    <p>{truncate(file.path as string, 50)}</p>
                </div>
                <div>
                    <p onClick={() => onDelete(file)} className='p-1 cursor-pointer hover:text-white hover:bg-black hover:opacity-50 rounded-full'><CgClose size={20} /></p>

                </div>
            </div>
        </div >
    ));

    useEffect(() => {
        if (resetUpload === true) {
            setFiles([]);
        }
    }, [resetUpload])


    useMemo(() => {
        setValue(`${type === Type.Album ? 'coverImage' : 'image'}`, type === Type.Album ? files[0] : files)
    }, [files, setFiles])

    return (
        <section className="pt-3">
            <div {...getRootProps({ className: ` dropzone ${type === Type.Album ? 'py-3' : 'py-7'} py-3  border-dashed border-2 border border-gray-300 mb-5 px-4 rounded-md flex justify-center` })}>
                <input {...getInputProps()} />
                <div className="text-center font-roboto ">
                    <strong className=" font-bold text-black text-sm">
                        Drop, Paste, Browse Your images Over Here{" "}
                    </strong>
                    <small className="block text-gray-400  text-sm">
                        upload jpg and png only
                    </small>
                    <strong className=" block  text-black">
                    </strong>
                </div>
            </div>
            {fileslist}
        </section>
    )
}
export default Uploader;