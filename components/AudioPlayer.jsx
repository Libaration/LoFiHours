import { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import Image from 'next/image';
export default function AudioPlayer(props) {
  const polaroid = useRef();
  useEffect(() => {
    polaroid.current.style.opacity = 1;
    props.searchBox.current.style.opacity = 0;
    const player = new Tone.Player({
      url: `${props.preview_url}`,
      autostart: true,
      fadeIn: 7,
    });
    const rain = new Tone.Player({
      url: '/upload/rain.mp3',
    }).toDestination();
    const vinyl = new Tone.Player({
      url: '/upload/vinyl.mp3',
      fadeIn: 5,
    }).toDestination();
    player.onstop = () => {
      polaroid.current.style.opacity = 0;
      rain.stop();
      vinyl.stop();
      props.setPlayer('');

      props.searchBox.current.style.opacity = 1;
    };
    rain.autostart = true;
    rain.loop = true;
    rain.volume.value = 2;
    vinyl.autostart = true;
    vinyl.loop = true;
    vinyl.volume.value = -10;
    //oh god the if then statements are about to be a mess in the code below
    const { BPM } = props;
    let newPlaybackRate = 0.9;
    if (props.energy > 0.603) {
      // let shiftAmount = 0;
      if (BPM > 80) {
        newPlaybackRate = 0.9;
        //   shiftAmount = 1;
      }
      if (BPM > 90) {
        newPlaybackRate = 0.9;
      }
      if (BPM > 105) {
        newPlaybackRate = 0.8;
      }
      if (BPM > 120) {
        newPlaybackRate = 0.8;
      }
      if (BPM > 150) {
        newPlaybackRate = 0.8;
        //   shiftAmount = 3;
      }
      if (BPM > 180) {
        newPlaybackRate = 0.7;
      }
    }
    console.log(newPlaybackRate);
    player.playbackRate = newPlaybackRate;
    player.volume.value = -28;
    const filter = new Tone.Filter(600, 'lowpass');
    const delay = new Tone.Delay(0.1).toDestination();
    // const shift = new Tone.PitchShift({
    //   pitch: shiftAmount,
    //   windowSize: 0.1,
    //   delayTime: 0,
    //   feedback: 0,
    // });
    const reverb = new Tone.Freeverb({
      roomSize: 0.1,
      dampening: 200,
    });
    const reverb2 = new Tone.JCReverb(0.7).toDestination();
    rain.chain(reverb);
    player.chain(reverb2, filter, Tone.Destination);
  }, []);
  return (
    <div
      className="flex justify-center align-center text-center opacity-0"
      ref={polaroid}
    >
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
