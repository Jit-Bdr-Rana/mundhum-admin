import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaUserPlus } from 'react-icons/fa';
import { RiCloseCircleLine } from 'react-icons/ri';
import { albumUrl } from '../../apis/list.api';
import { httpClient } from '../../apis/rest.api';
import Gallery from '../../components/gallery/Gallery';
import GalleryTable from '../../components/gallery/GalleryTable';
import TableHeader from '../../components/TableHeader';
import modeuleList from '../../datas/module.data';
import { Action } from '../../interface/common';
import { AlbumForm } from '../../interface/form';
import Container from '../../layouts/Container'
import { notification } from '../../utils/tost';
const index = () => {
    return (
        <Album />
    )
}

export default index
export enum Type {
    Album,
    Gallery
}

const Album = () => {
    const [albumList, setAlbumList] = useState<Array<any>>([]);
    const [filteredAlbumList, setFilteredAlbumList] = useState<Array<any>>([]);
    const [action, setAction] = useState<Action>(Action.index);
    const [title, setTitle] = useState<string>('Album Table');
    const [editData, setEditData] = useState<any>({});
    const [edit, setEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true)
    const { register, reset, setError, setValue, handleSubmit, formState: { errors } } = useForm<AlbumForm>();
    //pagination
    const saveForm = async (formData: AlbumForm) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const payload = new FormData();
        formData?.coverImage && payload.append('coverImage', formData.coverImage);
        payload.append('name', formData.name);
        payload.append('description', formData.description);
        if (formData?.id) {
            const { data, error } = await httpClient().post(albumUrl.update + formData.id, payload, config);
            setResponse(data, error, true)

        } else {
            const { data, error } = await httpClient().post(albumUrl.save, payload, config);
            setResponse(data, error, false)
        }

    }
    const setResponse = (data: any, error: any, edit: boolean) => {
        if (data && !error) {
            reset();
            fetchAlbum();
            setEdit(false)
            setAction(Action.index);
            notification.success(data?.message ? data?.message : edit ? 'Album has been  created successfully' : 'Album has been updated successfully')
        } else {
            error?.errors?.name && setError('name', { type: 'custom', message: error?.errors?.name[0] });
            notification.error('Fail to create/update Album try again')
        }
    }
    const deleteAlbum = (id: number) => {
        const promise = async () => {
            const { data, error } = await httpClient().delete(albumUrl.delete + id);
            if (data && !error) {
                notification.success(data?.message ?? 'record has been deleted successfully')
                setAlbumList((cur) => cur.filter((fil) => fil.id != id));
            } else {
                notification.error(error?.errors ?? 'error in deleting album')
            }
        }
        notification.prompt(promise)
    }
    const filterAlbum = (value: string) => {
        if (value) {
            setFilteredAlbumList(albumList.filter(f => f?.name?.toLowerCase()?.includes(value?.toLowerCase()) || f?.description?.toLowerCase()?.includes(value?.toLowerCase())))
        } else {
            setFilteredAlbumList(albumList)
        }
    }
    const fetchAlbum = async () => {
        const { data, error } = await httpClient().get(albumUrl.getAll);
        if (data && !error) {
            setAlbumList(data.data);
            setFilteredAlbumList(data.data)
        }
        setLoading(false)
    }
    const editForm = (data: any) => {
        setAction(Action.edit)
        setValue('name', data?.name);
        setValue('id', data?.id);
        setValue('description', data?.description)
        setEdit(true)
        setEditData(data)
    }
    const cancelEdit = () => {
        setEditData({});
        setAction(Action.index)
        setEdit(false)
        reset()
    }

    useEffect(() => {
        fetchAlbum();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
        switch (action) {
            case Action.add:
                setTitle('Album Table')
                break;
            case Action.edit:
                setTitle("Update Album")
                break;
            case Action.gallery:
                setTitle(editData?.name ?? "Gallery ")
                break;

            default:
                setTitle("Album Table")
        }

    }, [action, setAction])
    return (
        <Container title={title}>
            <div className={`${action !== Action.gallery ? 'flex gap-2' : ''}`}>
                <div className={`rounded-md  ${(action === Action.index || action === Action.edit) ? 'w-[65%] p-3' : 'w-full px-3 pt-3'} `}>
                    <TableHeader
                        showSearch={(action === Action.index || action === Action.edit)}
                        searchPlaceholder={'search album ...'}
                        showBackButton={action == Action.gallery}
                        onBackButton={() => setAction(Action.index)}
                        onSearch={(e: React.ChangeEvent<HTMLInputElement>) => filterAlbum(e.target.value)}
                    />

                    {
                        (action === Action.index || action === Action.edit) &&
                        <div className="relative overflow-x-auto shadow-custom p-3  ">
                            <GalleryTable loading={loading} setEditData={setEditData} editForm={editForm} data={filteredAlbumList} setAction={setAction} deleteAlbum={deleteAlbum} />
                        </div>
                    }

                </div>
                {
                    (action === Action.index || action === Action.edit) &&
                    <div className="w-[35%]  py-3">
                        <div className={`shadow-sm px-3 pb-3   w-[100%] `}>
                            <div className="flex justify-between  shadow-custom   px-3 py-3 mb-3  rounded-t-lg  ">
                                <span className="text-sm font-bold">
                                    {!edit ? 'Create' : 'Update'} album</span>
                                {edit && <RiCloseCircleLine className="cursor-pointer" size={20} onClick={() => cancelEdit()} />}
                            </div>
                            <div className="shadow-custom p-3">
                                <form onSubmit={handleSubmit(saveForm)}>
                                    <div className='col-span-2'>
                                        <label htmlFor=" first_name" className="block mb-2 text-sm  text-gray-900 ">Album Name</label>
                                        <input {...register("name", { required: { value: true, message: 'album name is required' } })} placeholder="Album name" className={` border  text-gray-900 text-sm rounded-sm focus:outline-none ${errors?.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-gray-500 focus:border-gray-500'}  block w-full p-1.5 `} />

                                        {errors?.name && <small className="text-xs text-red-500">{errors?.name.message}</small>}
                                    </div>
                                    <div className='col-span-2 mt-3'>
                                        <label htmlFor=" first_name" className="block mb-2 text-sm  text-gray-900 ">Description</label>
                                        <textarea  {...register("description", { required: false })} placeholder="description" className={` border h-32 w-full text-gray-900 text-sm rounded-sm focus:outline-none ${errors?.description ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-gray-500 focus:border-gray-500'}  block w-full p-1.5 `} />

                                        {errors?.description && <small className="text-xs text-red-500">{errors?.description.message}</small>}
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
                {
                    action === Action.gallery &&
                    <Gallery albumId={editData?.id} />
                }
            </div>
        </Container >
    );
};




export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            page: '/shipment',
            title: 'Mundhum | gallery ',
            moduleId: modeuleList?.galleryModule.id
        }
    }
}