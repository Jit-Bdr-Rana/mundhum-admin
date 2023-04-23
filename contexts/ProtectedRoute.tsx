import { useRouter } from 'next/router'
import { useGlobalContext } from './GlobalContext'

const ProtectedRoute = ({ moduleId, children }: { moduleId?: number, children: any }) => {
  const global = useGlobalContext()
  const router = useRouter();
  if (moduleId && !global?.user?.isModuleAllowed(moduleId)) {
    router?.push('/401')
  }
  return children;
}

export default ProtectedRoute