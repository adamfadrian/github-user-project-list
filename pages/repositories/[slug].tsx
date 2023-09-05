/* eslint-disable react-hooks/rules-of-hooks */
import useUserData from '@/lib/hooks/useUserData';
import useUserRepository from '@/lib/hooks/useUserRepository';
import { RootState } from '@/store/RootReducer';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Languages, UserRepo } from '@/lib/type/type';
import axios from 'axios';
import { languageColors } from '@/lib/constant';
import UserRepoList from '@/components/user/UserRepoList';
import UserRepoProfile from '@/components/user/UserRepoProfile';
import { Button } from '@mui/material';
import router from 'next/router';
import { useDispatch } from 'react-redux'
import { resetUser } from '@/store/user/userSlice';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import placeholderImage from '@/public/komeng.jpg'

export default function index() {
  const [languageData, setLanguageData] = useState<Languages>({})
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.selectedUser)
  const placeholder = 'adamfadrian'
  const username = user ? user.login : placeholder;
  const { data: userGithub, error, isLoading } = useUserRepository(username)
  const followers = useUserData(username, 'followers')
  const following = useUserData(username, 'following')

  useEffect(() => {
    const languages: Languages = {};
    if (!user) {
      router.push('/')
    };
    const getLanguagesForRepo = async (repo: UserRepo) => {
      try {
        const res = await axios.get(`${repo.languages_url}`);
        languages[repo.name] = res.data;
        setLanguageData({ ...languages });
      } catch (error) {
      }
    };
    if (userGithub) {
      userGithub.forEach((repo: UserRepo) => {
        if (repo.languages_url) {
          getLanguagesForRepo(repo);
        }
      });
    };
  }, [userGithub, user]);

  const handleNavigateRepo = (link: string) => {
    window.open(link, '_blank');
  };

  const navigateUserGithub = (username: string) => {
    router.push(`https://github.com/${username}`)
  };

  const handleBackToHome = () => {
    router.push('/')
    dispatch(resetUser())
  };

  return (
    <div className='flex flex-col md:py-32 py-10 gap-20  w-full min-h-screen bg-github px-4'>
      <UserRepoProfile
        onClick={() => navigateUserGithub(username)}
        image={user ? user?.avatar_url : placeholderImage}
        username={username}
        alt={username}
        following={following.data?.length}
        follower={followers.data?.length}
      />

      <div className='w-full mx-auto flex justify-center'>
        <Button
          onClick={handleBackToHome}
          variant='outlined'
          size='large'
          sx={{
            color: 'white',
            borderColor: 'white',
            "&:hover": {
              borderColor: 'white',
            },
            "&.Mui-focusVisible": {
              borderColor: 'white',
            }
          }}>
          <span className='mr-3'><AiOutlineArrowLeft /></span> Back to Search
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 lg:px-32 '>
        {userGithub?.map(({ id, name, visibility, html_url }: UserRepo) => (
          <UserRepoList name={name} visibility={visibility} key={id} onClick={() => handleNavigateRepo(html_url)}>
            {languageData && languageData[name] && (
              <>
                {Object.keys(languageData[name]).map((lang) => (
                  <h1
                    key={lang}
                    className="mr-2 text-white px-4 py-1 rounded-md flex flex-wrap"
                    style={{
                      backgroundColor: languageColors[lang] || '#ccc',
                    }}
                  >
                    {lang}
                  </h1>
                ))}
              </>
            )}
          </UserRepoList>
        ))}
      </div>
    </div>
  )
}
