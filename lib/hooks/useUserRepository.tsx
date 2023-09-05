import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import useSWR from 'swr'

export const fetcher = async (url: string) => await axios.get(url).then((res) => res.data)
export default function useUserRepository(username: string) {
    const { data, error, isLoading } = useSWR(`https://api.github.com/users/${username}/repos`, fetcher)

    if (error) toast.error("Failed to fetch Data");
    return { data, error, isLoading }
}

