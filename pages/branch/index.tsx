import { GetServerSideProps } from 'next'
import React, { useState, useEffect } from 'react'
import { branchUrl } from '../../apis/list.api'
import { httpClient } from '../../apis/rest.api'
import Form from '../../components/branch/Form'
import BranchTable from '../../components/branch/Table'
import TableHeader from '../../components/TableHeader'
import modeuleList from '../../datas/module.data'
import { Action } from '../../interface/common'
import { BranchForm } from '../../interface/form'
import Container from '../../layouts/Container'
import { notification } from '../../utils/tost'

const index = () => {
    return (
        <Branch />
    )
}
const Branch = () => {
    const [action, setAction] = useState<Action>(Action.index);
    const [editData, setEditData] = useState<any>();
    const [title, setTitle] = useState<string>('Branch Table')
    const [branchList, setBranchList] = useState<Array<any>>([]);
    const [filteredBranchList, setFilteredBranchList] = useState<Array<any>>([]);
    //pagination
    const fetchAllBranch = async () => {
        const { data, error } = await httpClient().get(branchUrl.getall);
        if (data && !error) {
            setBranchList(data.data);
            setFilteredBranchList(data.data);
        }
    }

    const toggleButton = async (active: boolean, setActive: React.Dispatch<React.SetStateAction<boolean>>, id: number) => {
        setActive(!active);
        const { data, error } = await httpClient().get(branchUrl.changeStatus + id);
        if (data && !error) {
            notification.success('status has been updated')
        } else {
            setActive(!active);
            notification.error('error in updating status')
        }
    }
    const deleteBranch = (dltData: BranchForm) => {

        const callback = async () => {
            const { data, error } = await httpClient().delete(branchUrl.delete + dltData.id);
            if (data && !error) {
                notification.success(data?.message ?? "data has been deleted successfully")
                fetchAllBranch();
            } else {
                notification.error(error?.errors ?? 'erorr in deleting records')
            }
        }
        notification.prompt(callback);
    }

    const setData = (data: any) => {
        setEditData(data)
    }
    const filterBranch = (value: string) => {
        if (value) {
            setFilteredBranchList(branchList.filter(f => f?.name?.toLowerCase()?.includes(value?.toLowerCase()) || f?.city?.toLowerCase()?.includes(value?.toLowerCase()) || f?.district?.toLowerCase()?.includes(value?.toLowerCase()) || f?.province?.toLowerCase()?.includes(value?.toLowerCase())))
        } else {
            setFilteredBranchList(branchList)
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        switch (action) {
            case Action.add:
                setTitle('Add Branch')
                setEditData({});
                break;
            case Action.edit:
                setTitle("Edit Branch")
                break;
            default:
                setTitle("Branch Table")
                setEditData({})
        }

    }, [action, setAction])
    useEffect(() => {
        fetchAllBranch();
    }, [])


    return (
        <Container title={title}>
            <div className={`rounded-md p-3  overflow-hidden`}>
                <TableHeader
                    showSearch={action === Action.index}
                    searchPlaceholder="search branch "
                    showAddButton={action === Action.index}
                    addButtonText="Add Branch"
                    onAddButton={() => { setAction(Action.add) }}
                    showBackButton={action !== Action.index}
                    onBackButton={() => { setAction(Action.index) }}
                    onSearch={(e: React.ChangeEvent<HTMLInputElement>) => filterBranch(e.target.value)}
                />
                {action === Action.index && <React.Fragment>
                    <div className="relative select-none overflow-hidden shadow-custom p-3 animate-slow  ">
                        <BranchTable data={filteredBranchList} setAction={setAction} setData={setData} deleteBranch={deleteBranch} toggleButton={toggleButton} />
                    </div>

                </React.Fragment>
                }
                {(action === Action.add || action === Action.edit) && <Form action={action} fetchAllBranch={fetchAllBranch} setAction={setAction} editData={editData} />}
            </div>
        </Container>
    )
}



export default index

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            page: '/shipment',
            title: 'ideal | branch  ',
            moduleId: modeuleList?.branchModule.id
        }
    }
}

