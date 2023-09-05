import React from 'react'
import useSWR from 'swr'
import { fetcher } from '../constant'

export default function useUserData(username: string, type: string) {
    const { data, error, isLoading } = useSWR(`https://api.github.com/users/${username}/${type}`, fetcher)

    return { data, error, isLoading }

}
