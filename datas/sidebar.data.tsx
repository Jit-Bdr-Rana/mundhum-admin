import { MdRemoveRedEye, MdOutlineFeedback, MdPayment } from "react-icons/md";
import { BsStopwatch, BsCardImage, BsChatRightQuoteFill } from "react-icons/bs";
import { FaUsersCog, FaUserClock, FaShippingFast } from "react-icons/fa";
import { GrTest } from "react-icons/gr";
import { AiFillDingtalkCircle, AiFillDashboard } from "react-icons/ai";
import { ImOffice } from "react-icons/im";
import { RiDraftLine } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";

export const sidebarData: any = [
  {
    id: [0, 0],
    key: 'dashboard',
    label: "Dashboard",
    url: "/dashboard",
    icon: <AiFillDashboard size={20} />,
  },
  {
    id: [1, 2, 3, 6],
    key: 'shipment',
    label: "Shipment",
    url: "/shipment",
    icon: <FaShippingFast size={20} />,
    isSublabel: true,
    children: [
      {
        id: 1,
        key: 'shipment-view',
        label: "View",
        url: "/shipment",
        icon: <MdRemoveRedEye size={20} />,
      },
      {
        id: 1,
        key: 'shipment-draft',
        label: "Draft",
        url: "/shipment/draft",
        icon: <RiDraftLine size={20} />,
      },
      {
        id: 2,
        key: 'shipment-carrier',
        label: "Carrier",
        url: "/shipment/carrier",
        icon: <AiFillDingtalkCircle size={20} />,
      },
      {
        id: 3,
        key: 'shipment-paymnet',
        label: "Payment",
        url: "/shipment/payment",
        icon: <MdPayment size={20} />,
      },
      {
        id: 6,
        key: 'shipment-status',
        label: "Shipment Status",
        url: "/shipment/status",
        icon: <BsStopwatch size={20} />,
      },
    ],
  },
  {
    id: 4,
    key: 'branch',
    label: "Branch",
    url: "/branch",
    icon: <ImOffice size={20} />,
    isSublabel: false,
  },
  {
    id: 5,
    key: 'gallery',
    label: "Gallery",
    url: "/gallery",
    icon: <BsCardImage size={20} />,
    isSublabel: false,
  },

  {
    id: [7, 8],
    key: 'user-managemnt',
    label: "User Management",
    icon: <FaUsersCog size={23} />,
    isSublabel: true,
    children: [
      {
        id: 7,
        key: 'user',
        label: "User",
        url: "/user",
        icon: <HiUsers size={20} />,
      },
      {
        id: 8,
        key: 'role',
        label: "Role",
        url: "/user/role",
        icon: <FaUserClock size={20} />,
      },

    ],
  },
  {
    id: 9,
    key: 'customer-feedback',
    label: "Customer Feedback",
    url: "/user-feedback",
    icon: <MdOutlineFeedback size={20} />,
    isSublabel: false,
  },
  {
    id: 15,
    key: 'test',
    label: "Test Page",
    url: "/test",
    icon: <GrTest size={20} />,
    isSublabel: false,
  },
  {
    id: 10,
    key: 'quote',
    label: "Customer Quote",
    url: "/quote",
    icon: <BsChatRightQuoteFill size={20} />,
    isSublabel: false,
  },
];
