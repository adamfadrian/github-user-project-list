
import { useCallback, useState } from 'react'
import axios from 'axios'
import router from 'next/router'
import { Users } from '@/lib/type/type'
import { useDispatch } from 'react-redux'
import { UserStorePayload, storeUser } from '@/store/user/userSlice'
import { BsGithub } from 'react-icons/bs'
import useWindowSize from '@/lib/hooks/use-window-size'
import CustomInput from '@/components/shared/CustomInput'
import CustomButton from '@/components/shared/CustomButton'
import { LuSearch } from 'react-icons/lu'
import UserList from '@/components/user/UserList'
import UserItem from '@/components/user/UserItem'
import Link from 'next/link'

export default function Home() {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<Users[]>([])
  const [notFound, setNotFound] = useState<number>(0)
  const [isLoading, setIsloading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { isDesktop } = useWindowSize()

  const handleOnSearchSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (search) {
        setIsloading(true)
        const res = await axios.get(`https://api.github.com/search/users?q=${search}&per_page=10`)
        setUsers(res.data.items)
        setNotFound(res.data.total_count)
      }
      setIsloading(false)
    } catch (error) {

    }
  }, [search])

  const onClickUsers = ({ login, avatar_url }: UserStorePayload) => {
    dispatch(storeUser({ login, avatar_url, }))
    router.push(`/repositories/${login}`);
  };

  return (
    <div className='flex flex-col  min-h-screen  md:py-10 items-center gap-20 p-4 bg-github text-white '>
      <div className='flex flex-col w-full items-center gap-10'>
        <div className='flex items-center gap-5' >
          <Link href="/">
            <BsGithub size={isDesktop ? 200 : 100} />
          </Link>
          <h1 className='md:text-3xl text-xl md:w-52'>Find users on <span className='font-bold'>Github</span></h1>
        </div>
        <form className='flex gap-4' onSubmit={handleOnSearchSubmit}>
          <CustomInput value={search} onChange={(e) => setSearch(e.target.value)} />
          <CustomButton isLoading={isLoading} icon={<LuSearch size={isDesktop ? 30 : 20} />} />
        </form>
      </div>
      <UserList search={search} total={users.length} >
        {search === '' ? (
          <div className='flex justify-center w-full mt-10 mx-auto col-span-2'>
            <h1 className='text-xl font-semibold'>Search Github Username</h1>
          </div>
        ) : (
          notFound === 0 ? (
            <div className='flex justify-center w-full mt-10 mx-auto col-span-2'>
              <h1 className='text-xl font-semibold'>User not found...</h1>
            </div>
          ) : (
            users.map(({ avatar_url, id, login }) => (
              <UserItem
                key={id}
                username={login}
                image={avatar_url}
                onClick={() => onClickUsers({ login, avatar_url })}
              />
            ))
          )
        )}
      </UserList>
    </div>
  )
}
