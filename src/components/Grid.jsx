import { useEffect, useState } from "react";
import { socket } from "../socket";
import "../style.css";

const colors = [
  "#ffffff", // white
  "#000000", // black
  "#af0000", // red
  "#ce5e13", // orange
  "#326910", // green
  "#0081dd", // blue
  "#000293", // marine
  "#e9258b", // pink
  "#b1b1b1", // grey
  "#595959", // dark grey
  "#ff9d00", // yellow
  "#ffdf52", // light yellow
  "#8ad118", // lime
  "#53e4f7", // cyan
  "#981ce0", // purple
  "#ff74c5", // light pink
];

export default function Grid() {
  const [grid, setGrid] = useState([]);
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(() => {
    socket.emit("request-grid");

    function onReceiveGrid(serverGrid) {
      setGrid(serverGrid);
    }

    socket.on("receive-grid", onReceiveGrid);

    return () => {
      socket.off("receive-grid", onReceiveGrid);
    };
  }, []);

  function handleClickGrid(pos) {
    socket.emit("send-grid", pos);
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          margin: "10px 0",
          flexWrap: "wrap",
        }}
      >
        {colors.map((color, index) => (
          <div
            className={
              index === selectedColor ? "colorTile selectedColorTile" : "colorTile"
            }
            key={index}
            onClick={() => setSelectedColor(index)}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
      {grid.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${grid.length}, 1fr)`,
            aspectRatio: "1/1",
            gap: 0,
            margin: 0,
          }}
        >
          {grid.map((line, indexLine) => {
            return line.map((tile, indexTile) => (
              <div
                key={`${indexLine}-${indexTile}`}
                onClick={() =>
                  handleClickGrid({
                    x: indexLine,
                    y: indexTile,
                    color: selectedColor,
                  })
                }
                className="tile"
                style={{
                  backgroundColor: colors[grid[indexLine][indexTile]],
                }}
              ></div>
            ));
          })}
        </div>
      )}
    </div>
  );
}
