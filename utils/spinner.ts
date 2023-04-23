

const openSpinner=()=>{
    const spinner=document.getElementById('spinner')
    spinner?.classList.remove('hidden')
    spinner?.classList.add('flex')
}
const closeSpinner=()=>{
    const spinner=document.getElementById('spinner')
    spinner?.classList.remove('flex')
    spinner?.classList.add('hidden')
}

export {openSpinner,closeSpinner}