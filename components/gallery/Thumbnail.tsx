
import React from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { galleryUrl } from '../../apis/list.api';
import { httpClient } from '../../apis/rest.api';
import { notification } from '../../utils/tost';


const ThumbNail = ({ galleries, setGalleries }: { galleries: Array<any>, setGalleries: (set: Array<any>) => void }) => {

    const deletegallery = (id: number) => {
        const promise = async () => {
            const { data, error } = await httpClient().delete(galleryUrl.delete + id);
            if (data && !error) {
                notification.success(data?.message)
                setGalleries(galleries.filter((fil) => fil.id != id));
            } else {
                notification.error('error in deleting photo')
            }
        }
        notification.prompt(promise)
    }


    return (
        <div className='p-3  shadow-custom my-3'>
            <h2 className='text-center font-bold font-lg mb-2'>
                {galleries?.length > 0 ? 'Old Photo on Album' : 'No Photo on Album'}             </h2>
            <div className='grid grid-cols-4 gap-2'>

                {
                    galleries?.length > 0 && galleries.map((data, index) => {
                        return (
                            <div key={index} className='w-60 relative h-48 group'>
                                <div className='hidden group-hover:block group-hover:inset-0 group-hover:absolute cursor-pointer group-hover:bg-black z-10 group-hover:bg-opacity-80'>
                                    <div className='inset-0 absolute   items-center flex justify-center'>
                                        <button onClick={() => deletegallery(data?.id)} type='button' title='delete' className=''>
                                            <AiFillDelete size={30} className='text-red-700' />
                                        </button>
                                    </div>
                                </div>
                                <img alt="gallery" className='absolute inset-0 w-60 h-48' src={data.image} />
                            </div>

                        )
                    })
                }

            </div>

        </div>
    )
}

export default ThumbNail;