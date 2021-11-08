import { useEffect } from 'react';
import * as Tone from 'tone';
import Image from 'next/image';
export default function AudioPlayer(props) {
  useEffect(() => {
    props.searchButton.current.style.opacity = 0;
    props.searchBox.current.style.opacity = 0;
    const player = new Tone.Player({
      url: `${props.preview_url}`,
      autostart: true,
      fadeIn: 7,
    });
    const rain = new Tone.Player({
      url: '/upload/rain.mp3',
    }).toDestination();
    player.onstop = () => {
      rain.stop();
      props.setPlayer('');
      props.searchButton.current.style.opacity = 1;
      props.searchBox.current.style.opacity = 1;
    };
    rain.autostart = true;
    rain.loop = true;
    rain.volume.value = 2;

    player.playbackRate = 0.8;
    player.volume.value = -28;
    const filter = new Tone.Filter(500, 'lowpass');
    const delay = new Tone.Delay(0.2).toDestination();
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
    player.chain(reverb2, filter, delay, Tone.Destination);
  }, []);
  return (
    <div className="flex justify-center align-center text-center">
      <div
        className="absolute min-w-md min-h-300px max-w-md max-h-300px"
        style={{
          zIndex: 2,
        }}
      >
        <img
          src="https://www.nicepng.com/png/full/8-85740_transparent-frame-vintage-old-polaroid-frame-png.png"
          height="300"
          width="300"
        />
      </div>
      <div className="relative mt-6 pl-5 h-72 w-72 bg-red-900">
        <Image
          className="pt-10"
          src={props.song.album.images[0].url}
          //   width="517"
          //   height="528"
          layout="fill"
        />
      </div>
    </div>
  );
}
