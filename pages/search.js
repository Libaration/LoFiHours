import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import * as Tone from 'tone';
export default function Search() {
  const [search, setSearch] = useState('');
  const backgroundDiv = useRef(null);
  const router = useRouter();
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearch('');
    const song = await fetch('/api/fetchStream');
    const songPath = await song.json();
    console.log(songPath.url);
    await Tone.start();
    const player = new Tone.Player({
      url: await songPath.url.replace('public', ''),
      autostart: true,
      fadeIn: 7,
    });
    const rain = new Tone.Player({
      url: '/upload/rain.mp3',
    }).toDestination();
    player.onstop = () => {
      rain.stop();
    };
    rain.autostart = true;
    rain.loop = true;
    rain.volume.value = 0;

    player.playbackRate = 0.8;
    player.volume.value = -22;
    const filter = new Tone.Filter(500, 'lowpass');
    const shift = new Tone.PitchShift({
      pitch: -2,
      windowSize: 0.2,
      delayTime: 0,
      feedback: 0,
    });
    const reverb = new Tone.Freeverb({
      roomSize: 0.9,
      dampening: 200,
    });
    const reverb2 = new Tone.JCReverb(0.7).toDestination();
    rain.chain(reverb);
    player.chain(reverb2, filter, Tone.Destination);

    backgroundDiv.current.style.opacity = 1;
  };

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.push('/');
    }
  }, []);
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
