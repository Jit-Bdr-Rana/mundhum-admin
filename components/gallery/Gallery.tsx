import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { galleryUrl } from "../../apis/list.api";
import { httpClient } from "../../apis/rest.api";
import { GalleryForm } from "../../interface/form";
import { Type } from "../../pages/gallery";
import { notification } from "../../utils/tost";
import ThumbNail from "./Thumbnail";
import Uploader from "./Uploader";

const Gallery = ({ albumId }: { albumId: number }) => {
    const { setValue, register, handleSubmit, formState: { errors } } = useForm<GalleryForm>();
    const [resetUpload, setResetUpload] = useState<boolean>(false);
    const [galleries, setGalleries] = useState<Array<any>>([]);
    const saveGallery = async (formData: GalleryForm) => {
        if (formData.image.length === 0) {
            notification.error('Atleast one image is required')
        } else {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            const payload = new FormData();
            for (let i = 0; i < formData.image.length; i++) {
                payload.append(`image[]`, formData.image[i] as Blob)
            }
            payload.append('albumId', albumId.toString())
            const { data, error } = await httpClient().post(galleryUrl.save, payload, config);
            if (data && !error) {
                notification.success(data?.mesage ?? 'image has been saved successflly')
                getGalleriesByAlbumId();
                setResetUpload(true);
            } else {
                notification.error("error in uploading photo")
            }
        }
    }
    const getGalleriesByAlbumId = async () => {
        const { data, error } = await httpClient().get(galleryUrl.getbyAlbumid + albumId);
        if (data && !error) {
            setGalleries(data.data)
        }
    }




    useEffect(() => {
        getGalleriesByAlbumId();
    }, [])
    return (
        <div className='px-3'>
            <div className='p-3 shadow-custom'>
                <form onSubmit={handleSubmit(saveGallery)}>
                    <input type='hidden' {...register('albumId')} value={albumId} />
                    <Uploader type={Type.Gallery} setValue={setValue} resetUpload={resetUpload} />
                    {errors?.image && <small className='text-red-500 ml-3 -mt-5'>{errors?.image?.message}</small>}
                    <div className="  px-2 py-1 mt-4 text-white  justify-center items-center gap-2 rounded-md flex mx-auto">
                        <button type='submit' title='addnew' className="bg-slate-500 flex justify-between px-4 hover:bg-slate-800 py-1.5 text-xs rounded-md text-white  tracking-wide cursor-pointer mr-2">
                            <FaUserPlus size={16} />
                            <span className='ml-2'>save</span>
                        </button>
                    </div>
                </form>
            </div>
            <ThumbNail galleries={galleries} setGalleries={setGalleries} />
        </div>
    )
}

export default Gallery;