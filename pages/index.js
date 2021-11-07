import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home(props) {
  const router = useRouter();
  if (router.query.access_token) {
    const access_token = router.query.access_token;
    localStorage.setItem('access_token', access_token);
    router.push('/search');
  }
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      router.push('/search');
    }
  }, []);
  return (
    <div className="flex items-center justify-center">
      <a href="/api/auth/login">Login</a>
    </div>
  );
}
