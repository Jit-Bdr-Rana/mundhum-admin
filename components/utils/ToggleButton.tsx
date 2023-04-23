import { useState } from "react";

const ToggleButton = ({ data, toggle }: { data: any, toggle: (active: boolean, setActive: React.Dispatch<React.SetStateAction<boolean>>, id: number) => any }) => {
    const [active, setActive] = useState<boolean>(data.isActive == 1 ? true : false);
    return (
        <button onClick={() => toggle(active, setActive, data.id)} type='button' className={`${active ? 'bg-slate-800 px-2 text-white' : 'bg-red-500 text-white'} p-1 text-xs  rounded-md `}>{active ? 'active' : 'inactive'}</button>
    )
}

export default ToggleButton;