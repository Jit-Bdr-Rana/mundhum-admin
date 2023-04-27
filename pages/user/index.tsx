import React, { useEffect, useReducer, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Container from '../../layouts/Container'
import { Action } from '../../interface/common'
import { PasswordResetResponse } from '../../interface/form'
import { httpClient } from '../../apis/rest.api'
import { branchUrl, roleUrl, userUrl } from '../../apis/list.api'
import { notification } from '../../utils/tost'
import TableHeader from '../../components/TableHeader'
import modeuleList from '../../datas/module.data'
import ResetPasswordShow from '../../components/user/PasswordResetShow'
import Form from '../../components/user/RegisterForm'
import UserTable from '../../components/user/UserTable'
const index: NextPage = () => {
    return (
        <User />
    )
}

export default index
enum ActionKind {
    ROLE = 'role',
    BRANCH = 'branch',
    RESET = 'reset'
}

// An interface for our actions
interface ReducerAction {
    type: ActionKind;
    payload: object | Array<any>;
}

// An interface for our state
interface State {
    role: Array<any>;
    branch: Array<any>;
    // reset: PasswordResetResponse;
}
function counterReducer(state: State, action: ReducerAction) {
    const { type, payload } = action;
    switch (type) {
        case ActionKind.ROLE:
            return {
                ...state,
                role: payload as []
            };
        case ActionKind.BRANCH:
            return {
                ...state,
                branch: payload as [],
            };

        default:
            return state;
    }
}

const User = () => {
    const [action, setAction] = useState<Action>(Action.index);
    const [userList, setUserList] = useState<Array<any>>([]);
    const [filteredUserList, setFilteredUserList] = useState<Array<any>>([]);
    const [title, setTitle] = useState<string>("User Table");
    const [editData, setEditData] = useState<object>({});
    const [state, dispatch] = useReducer(counterReducer, { branch: [], role: [] });
    const [passwordResetResponse, setPasswordResetResponse] = useState<PasswordResetResponse>();
    const [loading, setLoading] = useState(true)
    const toggleButton = async (active: boolean, setActive: (set: boolean) => void, id: number) => {
        setActive(!active);
        const { data, error } = await httpClient().get(userUrl.changeStatus + id);
        if (data && !error) {
            notification.success(data?.message ?? 'status has been updated successfully')
        } else {
            setActive(!active);
            notification.error(error?.errors ?? 'error in updating status')
        }
    }


    const requestPasswordReset = async (id: number) => {
        const { data, error } = await httpClient().post(userUrl.resetPasswordRequest, { userId: id });

        if (data && !error) {
            setPasswordResetResponse({ password: data?.data?.password, user: data?.data?.user })
            notification.info('password has been reset')
        } else {
            notification.error('oops something went wrong');
        }
    }

    const fetchAllUser = async () => {
        const { data, error } = await httpClient().get(userUrl.getall);
        if (data && !error) {
            setUserList(data.data);
            setFilteredUserList(data.data)
        }
        setLoading(false)
    }
    const fetchRoleAndBranch = async () => {
        const roleResponse = await httpClient().get(roleUrl.getall);
        if (roleResponse.data && !roleResponse.error) {
            dispatch({ type: ActionKind.ROLE, payload: roleResponse.data.data })
        }
        const branchResponse = await httpClient().get(branchUrl.getall);
        if (branchResponse.data && !branchResponse.error) {
            dispatch({ type: ActionKind.BRANCH, payload: branchResponse.data.data })
        }
    }

    const promptPasswordReset = (data: any) => {
        const callback = async () => {
            await requestPasswordReset(data?.id).then(() => {
                setAction(Action.resetpassword)
            });
        }
        notification.prompt(callback, 'Are you sure you want to reset');
    }
    const filterUser = (value: string) => {
        if (value) {
            setFilteredUserList(userList.filter(f => (f?.firstName + ' ' + f?.middleName + ' ' + f.lastName)?.toLowerCase()?.includes(value?.toLowerCase()) || f?.firstName?.toLowerCase()?.includes(value?.toLowerCase()) || f?.middleName?.toLowerCase()?.includes(value?.toLowerCase()) || f?.lastName?.toLowerCase()?.includes(value?.toLowerCase()) || f?.email?.toLowerCase()?.includes(value?.toLowerCase())))
        } else {
            setFilteredUserList(userList)
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        switch (action) {
            case Action.add:
                setTitle('Add User')
                setEditData({});
                break;
            case Action.edit:
                setTitle("Edit User")
                break;
            default:
                setTitle("User Table")
                setEditData({})
        }
    }, [action, setAction])
    useEffect(() => {
        fetchAllUser();
        fetchRoleAndBranch();
    }, [])
    return (
        <Container title={title}>
            <div className={`rounded-md p-3  overflow-hidden`}>
                <TableHeader
                    showSearch={action === Action.index}
                    searchPlaceholder="search user"
                    showAddButton={action === Action.index}
                    addButtonText="Add User"
                    onAddButton={() => { setAction(Action.add) }}
                    showBackButton={action !== Action.index}
                    onBackButton={() => { setAction(Action.index) }}
                    onSearch={(e: React.ChangeEvent<HTMLInputElement>) => filterUser(e.target.value)}

                />
                {action === Action.index && <React.Fragment>
                    <div className="relative overflow-hidden shadow-custom p-3 animate-slow  ">
                        <UserTable
                            data={filteredUserList}
                            setAction={setAction}
                            toggleButton={toggleButton}
                            promptPasswordReset={promptPasswordReset}
                            setEditData={setEditData}
                            loading={loading}
                        />
                    </div>

                </React.Fragment>
                }
                {(action === Action.add || action === Action.edit) && <Form setPasswordResetResponse={setPasswordResetResponse} fetchAllUser={fetchAllUser} branchList={state.branch} roleList={state.role} editData={editData} action={action} setAction={setAction} />}
                {action === Action.resetpassword && <ResetPasswordShow passwordResetResponse={passwordResetResponse} />}
            </div>
        </Container>
    )
}



export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            page: '/user',
            title: 'Mundhum | User',
            moduleId: modeuleList?.userModule?.id
        }
    }
}
