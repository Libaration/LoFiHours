import { useEffect } from 'react';
import { useRouter } from 'next/router';
export default function Search() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.push('/');
    }
  }, []);
  return <div>SEARCH</div>;
}
