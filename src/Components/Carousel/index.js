import React, { useState, useEffect } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";

function Carousel(props) {
  const { array, width } = props;
  const [offset, setOffset] = useState(0);
  const [slide, setSlide] = useState(4);
  const [size, setSize] = useState(width + 10);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    let number = 4;
    let newSize = width + 10;

    if (windowWidth <= 768) {
      newSize = 220;
    }

    if (windowWidth) {
      number = Math.floor(windowWidth / newSize);
    }
    setSlide(number);
    setSize(newSize);
  }, []);

  function handlePrevious() {
    let tmpOffset = offset + size * slide;

    if (tmpOffset > 0) {
      tmpOffset = 55;
    }

    setOffset(tmpOffset);
  }

  function handleNext() {
    let tmpOffset = offset - size * slide;
    let lengthUnits = array.length - 1;

    if (tmpOffset < -lengthUnits * size) {
      tmpOffset = offset;
    }

    setOffset(tmpOffset);
  }

  return (
    <div className="carrousel">
      {!isMobile && array.length > 4 && (
        <div className="previous" onClick={() => handlePrevious()}>
          <FontAwesomeIcon icon={faChevronLeft} color="white" />
        </div>
      )}
      <div
        className="chaptersContainer"
        style={{ width: `calc(100vw / ${size}px)` }}
      >
        {array.length > 0 &&
          array.map((e, key) => {
            return (
              <div
                className="chapterContainer"
                style={
                  slide < 4
                    ? {
                        transform: `translate3d(${offset}px, 0px, 0px) `,
                        width: `calc(100vh / ${width}px) `
                      }
                    : {
                        transform: `translate3d(${offset}px, 0px, 0px) `,
                        width: `calc(100vh) `
                      }
                }
                key={key}
              >
                {}
                <img
                  style={
                    slide == 4
                      ? {
                          width: `calc(${width}px) `
                        }
                      : { width: `200px` }
                  }
                  src={e}
                  className="img"
                />
              </div>
            );
          })}
      </div>
      {!isMobile && array.length > 4 && (
        <div className="next" onClick={() => handleNext()}>
          <FontAwesomeIcon icon={faChevronRight} color="white" />
        </div>
      )}
    </div>
  );
}

export default Carousel;
