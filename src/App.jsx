import { useEffect, useState } from "react";
import { socket } from "./socket";
import ConnectionManager from "./components/ConnectionManager";
import Grid from "./components/Grid";
import Cooldown from "./components/Cooldown";
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {isConnected && <Grid />}
      {isConnected && <Cooldown />}
      <ConnectionManager isConnected={isConnected} />
    </div>
  );
}

export default App;
