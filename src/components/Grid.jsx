import { useEffect, useState } from "react";
import { socket } from "../socket";
import "../style.css"

const tileSize = 30;

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
    console.log(pos);
    socket.emit("send-grid", pos);
  }

  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "row", gap: 10, margin: 10 }}
      >
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={() => setSelectedColor(index)}
            style={{
              backgroundColor: color,
              height: 20,
              width: 20,
              outline: selectedColor === index ? "3px solid black" : "1px solid black",
            }}
          ></div>
        ))}
      </div>
      {grid.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${grid.length}, ${tileSize}px)`,
            gridTemplateRows: `repeat(${grid[0].length}, ${tileSize}px)`,
						border: "2px black solid",
          }}
        >
          {grid.map((line, indexLine) => {
            return line.map((tile, indexTile) => (
              <div
                key={`${indexLine}-${indexTile}`}
                onClick={() =>
                  handleClickGrid({
                    x: indexTile,
                    y: indexLine,
                    color: selectedColor,
                  })
                }
								className="tile"
                style={{
                  width: tileSize,
                  height: tileSize,
                  backgroundColor: colors[grid[indexTile][indexLine]],
                }}
              ></div>
            ));
          })}
        </div>
      )}
    </div>
  );
}
