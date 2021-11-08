import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import * as Tone from 'tone';
import AudioPlayer from '../components/AudioPlayer.jsx';
export default function Search() {
  const [search, setSearch] = useState('');
  const [player, setPlayer] = useState();
  const [error, setError] = useState('');
  const backgroundDiv = useRef(null);
  const searchBox = useRef(null);
  const router = useRouter();
  const fetchSongPreview = async () => {
    const reqSongPreview = await fetch('/api/fetchStream', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({
        searchQuery: search,
      }),
    });
    return await reqSongPreview.json();
  };
  const reqSongFeatures = async (id) => {
    const reqSongFeatures = await fetch('/api/fetchFeatures', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({
        searchQuery: id,
      }),
    });
    return await reqSongFeatures.json();
  };
  const handleSearch = async (e) => {
    e.preventDefault();

    const songPreview = await fetchSongPreview();
    if (songPreview.error && songPreview.error.status === 401) {
      localStorage.removeItem('access_token');
      router.push('/');
    } else if (songPreview.tracks) {
      const filteredSongPreviews = songPreview.tracks.items.filter((song) => {
        return song.preview_url !== null;
      });

      /*
        Sorting songs by popularity. Which turns out does not give you
        a greater chance of getting the correct song.
        Who would of thought
      const songHash = {};
      filteredSongPreviews.map((song) => {
        songHash[filteredSongPreviews.indexOf(song)] = song.popularity;
      });
      const highestRated = Object.keys(songHash)
        .sort((a, b) => {
          return songHash[a] - songHash[b];
        })
        [0]
        */
      if (filteredSongPreviews.length > 0) {
        const songPreviewId = filteredSongPreviews[0].id;
        const songFeatures = await reqSongFeatures(songPreviewId);
        const songBPM = songFeatures.tempo;
        const songEnergy = songFeatures.energy;
        console.log(songEnergy);
        console.log(songBPM);
        setError('');
        await Tone.start();
        console.log(filteredSongPreviews[0].preview_url);
        setPlayer(
          <AudioPlayer
            preview_url={filteredSongPreviews[0].preview_url}
            song={filteredSongPreviews[0]}
            setPlayer={setPlayer}
            searchBox={searchBox}
            BPM={songBPM}
            energy={songEnergy}
          />
        );
      } else {
        setError(<div>Could not find preview url for that track</div>);
      }
    }
  };
  const randomSearch = async (e) => {
    const songsList = [
      'daylily movements',
      'james dean audrey hepburn',
      'cigarettes after sex apocalypse',
      'bol4',
      'elio irl',
      'barett marshall one hundred two',
      'scene five with ears to see',
    ];
    const randomSong = Math.floor(Math.random() * songsList.length);
    setSearch('');
    setSearch(songsList[randomSong]);
    handleSearch(e);
  };
  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.push('/');
    }

    player
      ? (backgroundDiv.current.style.opacity = 1)
      : (backgroundDiv.current.style.opacity = 0);
  }, [player]);
  return (
    <>
      <div
        ref={backgroundDiv}
        id="backgroundImage"
        className="transition-all transition duration-1000 ease-in"
        style={{
          backgroundImage: 'url("https://imgur.com/Mwfucup.jpg")',
          width: '100%',
          height: '100%',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          position: 'absolute',
          backgroundSize: 'cover',
          zIndex: -1,
          transform: 'scale(1.01)',
          opacity: 0,
        }}
      ></div>
      <div className="flex flex-wrap justify-center flex-col items-center w-full min-w-xs z-50 backdrop-filter backdrop-blur-sm h-screen">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xl  text-center"
          ref={searchBox}
        >
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

            {error ? error : ''}
            <button
              className="mt-8 mb-3 bg-yellow-300 shadow-md rounded px-5 py-2 leading-tight hover:bg-yellow-200 hover:scale-105 transition-all"
              onClick={handleSearch}
            >
              Search
            </button>
            <br />
            <button
              className="mt-8 mb-3 bg-yellow-300 shadow-md rounded px-5 py-2 leading-tight hover:bg-yellow-200 hover:scale-105 transition-all"
              onClick={randomSearch}
            >
              Can't think of anything?
            </button>
          </div>
        </form>
        {player ? player : ''}
      </div>
    </>
  );
}
