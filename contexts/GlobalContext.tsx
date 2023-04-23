import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react';
import { CurrentUser } from '../modal/CurrentUser.modal';
import User from '../modal/User.modal';
import { useRouter } from 'next/router'
import { httpClient } from '../apis/rest.api';
import { clearToken, removeAll } from '../utils';
import { authUrl } from '../apis/list.api';

interface GloabalInterface {
    user: CurrentUser
    setUser: (user: CurrentUser) => void;
    logout: () => void;
}

const defaultValueForContext = {
    user: new CurrentUser(new User(), false),
    setUser: () => { },
    logout: () => { },
}

export const useGlobalContext = () => {
    return useContext(Context);
}
const Context = createContext<GloabalInterface | never>(defaultValueForContext);

const GlobalContextProvider = ({ children, loggedUser }: { children: React.ReactNode, loggedUser?: CurrentUser }) => {
    const router = useRouter();
    const [user, setUser] = useState<CurrentUser>(defaultValueForContext.user);

    useEffect(() => {
        console.log(router.pathname);
        router.pathname != '/' && getCurrentStatus().then((response) => {
            setUser(new CurrentUser(new User(response), true))
        }).catch(() => {
            if (!user.isLoggedIn()) router.push('/')
        });


        return () => {
        }
    }, [router.isReady])
    useEffect(() => {
        // if (!user.isLoggedIn()) router.push('/')
    }, [user])

    const logout = async (): Promise<any> => {
        const { data, errors } = await httpClient().get(authUrl.logout);
        if (data && !errors) {
            router.push('/')
            clearToken();
            removeAll();
            setUser(new CurrentUser(new User, false))
        }
    }

    const getCurrentStatus = async (): Promise<any> => {
        const { data, errors } = await httpClient().get(authUrl.current);
        if (data && !errors) {

            return Promise.resolve(data.data);
        } else {
            return Promise.reject();
        }
    }

    const contextValue = { user, setUser, logout }
    return (
        <Context.Provider value={contextValue} >
            {children}
        </Context.Provider>
    )
}

export default GlobalContextProvider