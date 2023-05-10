import PropTypes from "prop-types";
import { socket } from "../socket";

export default function ConnectionManager({ isConnected }) {
  return (
    <>
      <p>State : {isConnected ? "Connected" : "Disconnected"}</p>
      {isConnected ? (
        <button onClick={() => socket.disconnect()}>Disconnect</button>
      ) : (
        <button onClick={() => socket.connect()}>Connect</button>
      )}
    </>
  );
}

ConnectionManager.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};
