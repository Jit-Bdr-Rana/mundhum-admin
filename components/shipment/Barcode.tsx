import React from 'react';
import { useBarcode } from 'react-barcodes';

function Barcode({ billNo }: { billNo?: string }) {
    const { inputRef } = useBarcode({
        value: billNo ?? '0',
        options: {
            background: '#FFFFFF',
            height: 80,

        }
    });

    return <svg className='w-[95%]' ref={inputRef} />;
};

export default Barcode;