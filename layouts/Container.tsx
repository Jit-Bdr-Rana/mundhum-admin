import React from 'react'
interface Container {
  children: React.ReactNode,
  icon?: React.ReactNode,
  title?: string

}
const Container = ({ children, title, icon }: Container) => {
  return (
    <div className='block w-full overflow-hidden  animate-slow  '>
      {title !== '' &&
        <div className='flex justify-between mt-2  px-2  print:!hidden'>
          <span className='  text-xl font-bold'>{title}</span>
          {icon}
        </div>
      }
      {children}
    </div>
  )
}

export default Container