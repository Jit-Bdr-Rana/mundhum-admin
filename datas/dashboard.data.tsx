import React from "react";
import { AiFillDingtalkCircle } from "react-icons/ai";
import { BsCardImage, BsStopwatch } from "react-icons/bs";
import { FaShippingFast, FaUserClock } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { MdOutlineFeedback, MdPayment } from "react-icons/md";
import { ImOffice } from "react-icons/im";
interface DashbordIcon {
    id: number;
    icon: React.ReactNode
}

const dashboardIcon: DashbordIcon[] = [
    {
        id: 1,
        icon: <FaShippingFast size={20} />
    }, {
        id: 2,
        icon: <AiFillDingtalkCircle size={20} />,
    },
    {
        id: 3,
        icon: <MdPayment size={20} />,
    },
    {
        id: 4,
        icon: <ImOffice />
    },
    {
        id: 5,
        icon: <BsCardImage size={20} />,
    },
    {
        id: 6,
        icon: <BsStopwatch size={20} />,
    },
    {
        id: 7,
        icon: <HiUsers size={20} />
    },
    {
        id: 8,
        icon: <FaUserClock size={20} />,
    },
    {
        id: 9,
        icon: <MdOutlineFeedback size={20} />,
    }
]

export const getIcon = (id: number): React.ReactNode => {
    return dashboardIcon.find((curr: DashbordIcon) => curr.id === id)?.icon
}

export const ModifiyIcon = (Icon: any, size=25) => {
    return function Modify({ ...props }) {
        return <Icon size={size} {...props} />
    }
}