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
  const global = useGlobalContext()
  const [selectedKeys, setSelectedKeys] = useState<string>('Dashboard')

  const router = useRouter()
  const onSelect = ({ key }: { key: string }) => {
    console.log(key)
    const menu: any = sidebarData?.flatMap((f: any) => f?.children ? f.children : f).find((c: any) => c?.key == key)
    router.push(menu.url)
  }

  useEffect(() => {
    const menu: any = sidebarData?.flatMap((f: any) => f?.children ? f.children : f)?.find((item: any) => (item.url === router.pathname))
    if (menu) {
      setSelectedKeys(menu?.key as string)
    } else {
      setSelectedKeys('')
    }
  }, [router])

  return (
    <aside className={`fixed print:static bg-[#001528] print:border-none print:w-0 print:hidden  hidden border-r shadow-custom border-gray-200  z-40 h-full top-0 left-0  lg:flex flex-shrink-0 flex-col ${collapse ? 'w-[5.3rem]  pt-[m] ' : ' w-[15rem] '} transition-all duration-500  `}>
      <div className="relative mt-2 print:hidden flex-1 flex flex-col overflow-auto">
        <div className={`text-xl   font-bold flex items-center py-[1rem] px-1  `}>
          {!collapse && <Logo />}
          <div className={`font-bold text-orange-500 ${collapse && 'hidden'}`}>
          </div>
        </div>
        <div className='min-h-[70vh] sidebar overflow-auto'>
          <Menu
            activeKey={selectedKeys}
            selectedKeys={[selectedKeys]}
            mode="inline"
            className='overflow-hidden !mx-0'
            theme="dark"
            inlineCollapsed={collapse}
            items={sidebarData?.filter((f: any) => {
              if (f?.key == 'dashboard') return true;
              if (f?.children && f?.children?.length > 0) {
                return f?.children?.filter((fc: any) => {
                  return global.user.isModuleAllowed(fc?.id)
                })
              } else {
                return global.user.isModuleAllowed(f?.id)
              }
            })}
            onSelect={onSelect}

          />
        </div>

      </div>
      {
        collapse ||
        <div className='mt-2 mb-1 w-full  bottom-2'>
          <div className=' text-center w-full '>
            <a target={'_blank'} href='http://www.techup.com.np' className='font-bold block text-gray-400 cursor-pointer text-xs hover:text-gray-200 '>Developed by Techup pvt ltd</a>
            <span className='font-bold  text-mundhum text-xs'>@Mundhum {new Date().getFullYear()}</span>
          </div>
        </div>
      }
    </aside>
  )
};
export default Sidebar;

