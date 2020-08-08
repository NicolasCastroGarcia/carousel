import React from "react";
import "./App.scss";
import Carousel from "./Components/Carousel";

const data = [
  "https://picsum.photos/id/1/400/200",
  "https://picsum.photos/id/1005/400/200",
  "https://picsum.photos/id/1033/400/200",
  "https://picsum.photos/id/106/400/200",
  "https://picsum.photos/id/1062/400/200",
  "https://picsum.photos/id/169/400/200"
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Carousel array={data} width={400} />
      </header>
    </div>
  );
}

export default App;
