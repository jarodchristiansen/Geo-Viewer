import * as mm from "music-metadata-browser";
import freeBird from "public/music/freeBird.mp3";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons"; // for customazing the icons
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
import styled from "styled-components";
import useSound from "use-sound"; // for handling the sound

const MusicStreamer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    min: 0,
    sec: 0,
  });
  const [currTime, setCurrTime] = useState({
    min: 0,
    sec: 0,
  });

  const [seconds, setSeconds] = useState();

  const [play, { pause, duration, sound }] = useSound(freeBird);

  console.log({ freeBird });

  useEffect(() => {
    // fetchMetadata();

    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain,
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  const fetchMetadata = async () => {
    try {
      const response = await fetch(freeBird);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      console.log({ buffer });

      const metadata = await mm.parseBuffer(buffer, "audio/mpeg");

      console.log({ metadata });
      // You can set the metadata values in your component state or use them directly
      // For example, setTitle(metadata.common.title);
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  };

  return (
    <StreamerContainer>
      <div className="player">
        <h2>Playing Now</h2>
        <img className="musicCover" src="https://picsum.photos/200/200" />
        <div>
          <h3 className="title">Song Title</h3>
          <p className="subTitle">sub title</p>
        </div>

        <div>
          <div className="time">
            <p>
              {currTime.min}:{currTime.sec}
            </p>
            <p>
              {time.min}:{time.sec}
            </p>
          </div>
          <input
            type="range"
            min="0"
            max={duration / 1000}
            defaultValue="0"
            value={seconds}
            className="timeline"
            onChange={(e) => {
              sound.seek([e.target.value]);
            }}
          />
        </div>

        <div>
          <button>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <BiSkipPrevious />
            </IconContext.Provider>
          </button>

          {!isPlaying ? (
            <button onClick={playingButton}>
              <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </button>
          ) : (
            <button onClick={playingButton}>
              <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                <AiFillPauseCircle />
              </IconContext.Provider>
            </button>
          )}
          <button>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <BiSkipNext />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </StreamerContainer>
  );
};

const StreamerContainer = styled.div`
  .player {
    margin: auto;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    text-align: center;

    .musicCover {
      border-radius: 10%;
    }

    button {
      background: none;
      border: none;
      align-items: center;
      justify-content: center;
    }

    .subTitle {
      margin-top: -1em;
      color: #4f4f4f;
    }

    .time {
      margin: 0 auto;
      width: 80%;
      display: flex;
      justify-content: space-between;
      color: #828282;
      font-size: smaller;
    }

    .timeline {
      width: 100%;
      background-color: #27ae60;
    }

    input[type="range"] {
      background-color: #27ae60;
    }
  }
`;

export default MusicStreamer;
