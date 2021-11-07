import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
export default function Search() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const handleSearch = () => {
    alert('test');
  };
  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.push('/');
    }
  }, []);
  return (
    <div className="flex flex-wrap justify-center flex-col items-center w-full min-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xl mt-52 text-center">
        <div className=" overflow-x-hidden">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="song"
            type="text"
            autocomplete="off"
            placeholder="Search Song - Artist"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="mt-5 mb-5 bg-yellow-300 shadow-md rounded px-5 py-2 leading-tight hover:bg-yellow-200 hover:scale-105 transition-all"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
