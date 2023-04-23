import Image from 'next/image'
import React from 'react'

const Logo = () => {
    return (
        <div >
            <Image alt="logo" src={'/logo/invoice-logo.png'} className="w-100" height={90} width={200} />
        </div>
    )
}

export default Logo