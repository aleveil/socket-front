import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Cooldown() {
  const [nextClickTime, setNextClickTime] = useState(0);
  const [nowTime, setNowTime] = useState(Date.now());
  useEffect(() => {
    function storeNextClickTime(serverNextClickTime) {
      setNextClickTime(serverNextClickTime);
    }

    socket.on("receive-nextclicktime", storeNextClickTime);

    const timer = setInterval(() => {
      setNowTime(new Date());
    }, 1000);
    return () => {
      socket.off("receive-nextclicktime", storeNextClickTime);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (nowTime >= Date.parse(nextClickTime))
      socket.emit("request-nextclicktime");
  }, [nowTime, nextClickTime]);

  function parseTime(time) {
    if (time < 0) return "You can click !";
    time /= 1000;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);

    let text = "";
    text += minutes < 10 ? `0${minutes}` : minutes;
    text += " : ";
    text += seconds < 10 ? `0${seconds}` : seconds;
    return "Waiting time before next click : " + text;
  }

  return (
    <div>
      <p>{parseTime(Date.parse(nextClickTime) - nowTime)}</p>
    </div>
  );
}
