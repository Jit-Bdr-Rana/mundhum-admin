import { useRouter } from 'next/router'
import { notification } from '../utils/tost';
const useRedirect = () => {
    const router = useRouter();
    notification.info("Session Expired")
    return [router]
}

export default useRedirect