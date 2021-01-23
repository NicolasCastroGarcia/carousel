import { useState, useEffect, useRef } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { useWindowSize } from "../../hooks/useWindowsSize";

function Carousel({ images, scrollBy }) {
  const [offset, setOffset] = useState(0);
  const [slide, setSlide] = useState(scrollBy);
  const [size, setSize] = useState(410);
  const [windowWidth, windowHeight] = useWindowSize();
  const myRef = useRef(0);

  useEffect(() => {
    function configure() {
      let number = scrollBy;
      let newSize = 410;
      if (windowWidth <= 768) {
        newSize = 200;
      } else {
        myRef.current.scrollLeft = -0;
      }
      setOffset(0);

      if (
        (windowWidth && !scrollBy) ||
        (images && scrollBy && scrollBy > images.length - 1)
      ) {
        number = Math.floor(windowWidth / newSize);
      }

      setSlide(number);
      setSize(newSize);
    }
    configure();
  }, [windowWidth, windowHeight, images, scrollBy]);

  function handlePrevious() {
    let tmpOffset = offset + (size + 10) * slide;
    if (tmpOffset > 0) {
      tmpOffset = 0;
    }

    setOffset(tmpOffset);
  }

  function handleNext() {
    let tmpOffset = offset - (size + 10) * slide;
    let lengthUnits = images.length - 1;

    if (tmpOffset < -lengthUnits * (size + 10)) {
      tmpOffset = 0;
    }

    setOffset(tmpOffset);
  }

  return (
    <div className="carrousel">
      {windowWidth > 768 && images.length > 4 && (
        <div className="previous" onClick={handlePrevious}>
          <FontAwesomeIcon icon={faChevronLeft} color="white" size="xs" />
        </div>
      )}
      <div
        className="chaptersContainer"
        style={{ width: `${size}px)` }}
        ref={myRef}
      >
        {images.length > 0 &&
          images.map((e, key) => {
            return (
              <div
                className="chapterContainer"
                style={{
                  transform: `translate3d(${offset}px, 0px, 0px) `,
                  width: `${size}`
                }}
                key={key}
              >
                <img
                  style={{ width: `${size}px` }}
                  src={e}
                  className="img"
                  alt={`${key}`}
                />
              </div>
            );
          })}
      </div>
      {windowWidth > 768 && images.length > 4 && (
        <div className="next" onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} color="white" size="xs" />
        </div>
      )}
    </div>
  );
}

export default Carousel;
