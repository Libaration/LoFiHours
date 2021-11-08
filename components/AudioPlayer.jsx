import { useEffect } from 'react';
import * as Tone from 'tone';
export default function AudioPlayer(props) {
  useEffect(() => {
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
    };
    rain.autostart = true;
    rain.loop = true;
    rain.volume.value = 2;

    player.playbackRate = 0.8;
    player.volume.value = -28;
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
  }, [props]);
  return <div>player component</div>;
}
