import React from "react";
import "./App.scss";
import Carousel from "./Components/Carousel";

const data = [
  "https://picsum.photos/id/1/400/200",
  "https://picsum.photos/id/1005/400/200",
  "https://picsum.photos/id/1033/400/200",
  "https://picsum.photos/id/106/400/200",
  "https://picsum.photos/id/1062/400/200",
  "https://picsum.photos/id/169/400/200",
  "https://picsum.photos/id/170/400/200",
  "https://picsum.photos/id/171/400/200",
  "https://picsum.photos/id/172/400/200",
  "https://picsum.photos/id/173/400/200",
  "https://picsum.photos/id/174/400/200",
  "https://picsum.photos/id/175/400/200",
  "https://picsum.photos/id/177/400/200"
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Carousel images={data} scrollBy={27} />
        {/* si no enviamos scrollBy, va a scrollear la cantidad que haya en pantalla que en el ejemplo es 4 */}
      </header>
    </div>
  );
}

export default App;
