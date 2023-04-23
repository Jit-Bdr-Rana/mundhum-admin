import React from 'react'
import Container from '../layouts/Container'

const pageNotFound = () => {
    return (
        <Container>
            <div className='flex overflow-hidden min-h-[80vh] justify-center items-center'>
                Page Not Found
            </div>
        </Container>
    )
}

export default pageNotFound