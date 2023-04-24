import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import Link from 'next/link';
import { sidebarData } from '../datas/sidebar.data';
import { useGlobalContext } from '../contexts/GlobalContext';
import { Menu } from 'antd';
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons'
import Logo from '../components/Logo';
import { useRouter } from 'next/router';
const Sidebar = ({ collapse }: { collapse: boolean }) => {
  const [activeNav, setActiveNav] = useState<number>(0);
  const global = useGlobalContext();
  const handleNav = (index: number) => {
    sessionStorage.setItem('admin-nav', `${index}`);
    setActiveNav(index)
  }


  const [selectedKeys, setSelectedKeys] = useState<string>('Dashboard')

  const router = useRouter()
  const onSelect = ({ key }: { key: string }) => {
    console.log(key)
    const menu: any = sidebarData.flatMap(f => f.children).find((c: any) => c?.key == key)
    router.push(menu.url)
  }

  useEffect(() => {
    const menu: any = sidebarData.find((item: any) => (item.url === router.pathname))
    if (menu) {
      setSelectedKeys(menu?.key as string)
    } else {
      setSelectedKeys('')
    }
  }, [router])

  return (
    <aside className={`fixed print:static bg-[#001528] print:border-none print:w-0 print:hidden  hidden border-r shadow-custom border-gray-200  z-40 h-full top-0 left-0  lg:flex flex-shrink-0 flex-col ${collapse ? 'w-[5.3rem]  pt-[m] ' : ' w-[15rem] '} transition-all duration-500  `}>
      <div className="relative mt-2 print:hidden flex-1 flex flex-col  overflow-y-auto">
        <div className={`text-xl   font-bold flex items-center py-[1rem] px-1  `}>
          {!collapse && <Logo />}
          <div className={`font-bold text-orange-500 ${collapse && 'hidden'}`}>
          </div>
        </div>
        <Menu
          activeKey={selectedKeys}
          selectedKeys={[selectedKeys]}
          mode="inline"
          className='overflow-hidden'
          theme="dark"
          inlineCollapsed={collapse}
          items={sidebarData}
          onSelect={onSelect}

        />

      </div>
      {
        collapse ||
        <div className='mt-2 mb-1 w-full  bottom-2'>
          <div className=' text-center w-full '>
            <a target={'_blank'} href='http://www.jitbahadurrana.com.np' className='font-bold block text-gray-600 cursor-pointer text-xs hover:text-gray-900 '>Developed by jit rana magar</a>
            <span className='font-bold  text-orange-500 text-xs'>@Ideal Courier Admin {new Date().getFullYear()}</span>
          </div>
        </div>
      }
    </aside>
  )
};
export default Sidebar;
const Drawer = ({ content, collapse, activeNav, setActiveNav, parentNav }: { content: any, collapse: boolean, activeNav: number, setActiveNav: (set: number) => void, parentNav: number }) => {
  const [show, setShow] = useState<boolean>(false);
  const [currentNav, setCurrentNav] = useState<number | never>();
  const global = useGlobalContext();

  const handleShow = () => {
    show ? setShow(false) : setShow(true)
  }
  const handleNav = (index: number) => {
    setCurrentNav(index)
    sessionStorage.setItem('admin-child-nav', `${index}`);
  }
  useEffect(() => {
    const current_nav: string | never | null = sessionStorage.getItem("admin-child-nav")
    if (current_nav != null || current_nav != '') {
      setCurrentNav(parseInt(current_nav!))
    }
  }, [])
  return (
    <>
      <button title='button' onClick={handleShow} type="button" className={` ${!show && activeNav === parentNav && 'active-nav'} ${collapse && activeNav === parentNav && 'active-nav'} ${!collapse ? activeNav !== parentNav ? 'border-white' : show && 'border-white' : activeNav !== parentNav && 'border-white'}   font-bold w-full text-gray-900 hover:border-l-4 border-l-4  rounded-l-sm  flex items-center py-1.5 px-4 group `} >
        {content.icon}
        <span className={`${collapse && 'hidden'}   flex-1 ml-3 text-left whitespace-nowrap`} >{content.title}</span>
        {show ? <MdKeyboardArrowDown size={25} className={`animate-slow ${collapse && 'hidden'}`} /> : <MdKeyboardArrowRight size={25} className={`animate-slow ${collapse && 'hidden'}`} />}
      </button>
      <ul className={` animate-dropdown transition duration-700 ${show ? "block" : "hidden"}  ${collapse && 'hidden'} `}>
        <li>
          {
            content.subTitle.map((data: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  {
                    global.user.isModuleAllowed(data.id) &&
                    <Link key={index} href={data.url}>
                      <a onClick={() => { setActiveNav(parentNav); handleNav(index) }} className={` ${show && !collapse && activeNav === parentNav && currentNav === index ? 'active-nav' : 'border-white'} my-1 pl-11 border-l-4 hover:border-l-4 text-gray-900  font-normal rounded-l-sm hover:border-gray-700 hover:bg-gray-200 flex items-center bg py-1.5 group `}>
                        {data.icon}
                        <span className=' ml-3 font-bold'>{data.title}</span>
                      </a>
                    </Link>
                  }
                </React.Fragment>
              )
            })
          }
        </li>
      </ul>
    </>
  )
}
