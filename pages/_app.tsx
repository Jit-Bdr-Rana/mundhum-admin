import '../styles/global.css'
import 'antd/dist/reset.css';
import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout'
import GlobalContextProvider from '../contexts/GlobalContext'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <GlobalContextProvider >
      {
        pageProps.page && pageProps.page === '/' || pageProps.page === " " || Component.getLayout ?
          (getLayout(<Component {...pageProps} />))
          :
          <MainLayout {...pageProps} >
            <Component {...pageProps} />
          </MainLayout>
      }

    </GlobalContextProvider>
  )
}

export default MyApp
