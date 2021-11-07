import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
export default function Search() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch('');
    // https://i.pinimg.com/originals/28/e3/27/28e327cc7aeeeca5f4ef5146511e6767.gif
    alert(search);
  };
  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.push('/');
    }
  }, []);
  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://jamietalksanime.files.wordpress.com/2015/03/ir48s2daeyfro.gif")',
          width: '100%',
          height: '100%',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          position: 'absolute',
          backgroundSize: 'cover',
          zIndex: -1,
          transform: 'scale(1.01)',
        }}
      ></div>
      <div className="flex flex-wrap justify-center flex-col items-center w-full min-w-xs z-50 backdrop-filter backdrop-blur-md h-screen">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xl  text-center">
          <div className=" overflow-x-hidden">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="song"
              type="text"
              autoComplete="off"
              placeholder="Search Song - Artist"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="mt-8 mb-3 bg-yellow-300 shadow-md rounded px-5 py-2 leading-tight hover:bg-yellow-200 hover:scale-105 transition-all"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
