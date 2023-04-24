import Image from 'next/image'
import React from 'react'

const Logo = () => {
    return (
        <Image alt="logo" src={'/logo/logo.png'} className="w-100" height={80} width={210} />
    )
}

export default Logo