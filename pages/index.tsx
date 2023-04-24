import type { GetStaticProps, NextPage } from 'next'
import { Toaster } from 'react-hot-toast';
import Spinner from '../components/Spinner';
import Login from '../components/user/Login';
const Home: NextPage = () => {
  return (
    <>
      <Spinner />
      <Toaster />
      <Login />
      <br className='ant-menu-item-selected ant-menu-item ant-checkbox-wrapper ant-checkbox-inner ant-table-selection-column ant-table-row-selected ant-checkbox ant-checkbox-input ant-dropdown-menu-item-selected ant-input-affix-wrapper ant-table-filter-dropdown-search-input ant-table-cell ant-pagination-item ant-select-dropdown ant-select-item rc-virtual-list-holder-inner  ant-checkbox-inner  ant-checkbox-checked  ant-btn-primary ant-btn-link ant-checkbox-input ant-dropdown-trigger ant-table-filter-trigger ant-pagination-item-active ant-select-selector ant-input ant-table-thead ant-table-cell swal-button swal-button--text swal-button--mode hidden swal-modal swal-footer swal-title swal-text swal-wide' />
    </>
  )
}

export default Home
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      page: '/',
      title: 'ideal | login'
    }
  }
}
