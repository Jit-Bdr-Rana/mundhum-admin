import { MdRemoveRedEye, MdOutlineFeedback, MdPayment } from "react-icons/md";
import { BsStopwatch, BsCardImage } from "react-icons/bs";
import { FaUsersCog, FaUserClock, FaShippingFast } from "react-icons/fa";
import { GrTest } from "react-icons/gr";
import { AiFillDingtalkCircle, AiFillDashboard } from "react-icons/ai";
import { ImOffice } from "react-icons/im";
import { RiDraftLine } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
export interface Sidebar {
  id?: number | Array<number> | undefined;
  title: string;
  url?: string;
  icon: React.ReactNode;
  isSubtitle: boolean;
  subTitle?: {
    id?: number;
    title: string;
    url: string;
    icon: React.ReactNode;
  }[];
}
export const sidebarData: Sidebar[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <AiFillDashboard size={20} />,
    isSubtitle: false,
  },
  {
    id: [1, 2, 3,6],
    title: "Shipment",
    url: "/shipment",
    icon: <FaShippingFast size={20} />,
    isSubtitle: true,
    subTitle: [
      {
        id: 1,
        title: "View",
        url: "/shipment",
        icon: <MdRemoveRedEye size={20} />,
      },
      {
        id: 1,
        title: "Draft",
        url: "/shipment/draft",
        icon: <RiDraftLine size={20} />,
      },
      {
        id: 2,
        title: "Carrier",
        url: "/shipment/carrier",
        icon: <AiFillDingtalkCircle size={20} />,
      },
      {
        id: 3,
        title: "Payment",
        url: "/shipment/payment",
        icon: <MdPayment size={20} />,
      },
      {
        id: 6,
        title: "Shipment Status",
        url: "/shipment/status",
        icon: <BsStopwatch size={20} />,
      },
    ],
  },
  {
    id: 4,
    title: "Branch",
    url: "/branch",
    icon: <ImOffice size={20} />,
    isSubtitle: false,
  },
  {
    id: 5,
    title: "Gallery",
    url: "/gallery",
    icon: <BsCardImage size={20} />,
    isSubtitle: false,
  },

  {
    id: [7, 8],
    title: "User Management",
    icon: <FaUsersCog size={23} />,
    isSubtitle: true,
    subTitle: [
      {
        id: 7,
        title: "User",
        url: "/user",
        icon: <HiUsers size={20} />,
      },
      {
        id: 8,
        title: "Role",
        url: "/user/role",
        icon: <FaUserClock size={20} />,
      },

    ],
  },
  {
    id: 9,
    title: "Customer Feedback",
    url: "/user-feedback",
    icon: <MdOutlineFeedback size={20} />,
    isSubtitle: false,
  },
  {
    id: 15,
    title: "Test Page",
    url: "/test",
    icon: <GrTest size={20} />,
    isSubtitle: false,
  },
];
