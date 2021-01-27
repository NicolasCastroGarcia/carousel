import { useState, useEffect, useRef } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { useWindowSize } from "../../hooks/useWindowsSize";

//importo cosas de fontAwesome, los hooks de react, y un custom hook para determinar el tamaño de la pantalla

function Carousel({ images, scrollBy, width }) {
  const [offset, setOffset] = useState(0);
  //declaro una variable offset que arranca en 0
  //el offset es la distancia que hay en el scroll horizontal que fuerzo en este componente
  // si el offset vale -200 significa que el scroll horizontal se movió 200px a la derecha

  const [slide, setSlide] = useState(scrollBy);
  // el slide sobre el cuál estoy parado, o mejor dicho mi vista de los slides.

  const [size, setSize] = useState(width + 10);
  //el tamaño de cada elemento (imagen), le agrego 10px que es el margen entre cada una

  const [windowWidth, windowHeight] = useWindowSize();
  //busco el width y el height de la ventana con el custom hook, el height no lo necesito, pero why not
  const myRef = useRef(0);
  //creo una referencia con el elemento que tiene el scroll, para después poder leer el scroll en sí

  useEffect(() => {
    function configure() {
      let number = scrollBy;
      //number es la cantidad de elementos que se va a mover el scroll ej: 4

      let newSize = width + 10;
      //declaro un newSize que por default es el size por defecto
      if (windowWidth <= 768) {
        //si es menor a 768 el ancho de la pantalla necesito que el ancho de los elementos sea menor
        //esto en realidad se podría hacer variable de acuerdo al ancho de la pantalla, pero le clave la mitad
        // ¿por qué la mitad? la pregunta es ¿porqué no?
        newSize = width / 2;
      } else {
        //esto está acá porque estoy midiendo de dos maneras el scroll horizontal
        // de una manera cuando no es mobile, y de otra cuando si lo es
        // entonces si cambia el width de la pantalla se vuelve a ejecutar el useEffect
        // y defaultea a 0 si no es mobile
        myRef.current.scrollLeft = -0;
      }
      //y acá también reinicio mi medición del offset porque con el responsiveness se puede romper todo
      setOffset(0);

      if (
        (windowWidth && !scrollBy) ||
        (images && scrollBy && scrollBy > images.length - 1)
      ) {
        // calculo la cantidad de scrolls que se pueden hacer por ves
        // onda para que no scrolleen 25 veces si solamente hay 3 imágenes
        number = Math.floor(windowWidth / newSize);
      }

      setSlide(number);
      setSize(newSize);
    }
    configure();
  }, [windowWidth, windowHeight, images, scrollBy]);

  function handlePrevious() {
    //esto es si clickean para ir a la izquierda
    let tmpOffset = offset + (size + 10) * slide;
    // posición actual +  1 elemento (con margin) * cantidad de slides que se va a desplazar

    if (tmpOffset > 0) {
      //para que no scrolleen infinito sin contenido
      tmpOffset = 0;
    }

    setOffset(tmpOffset);
  }

  function handleNext() {
    let tmpOffset = offset - (size + 10) * slide;
    //posición actual - 1 elemento (con margin) * cantidad de slides que se va a desplazar
    let lengthUnits = images.length - 1;
    //cantidad máxima de slides que puede moverse

    if (tmpOffset < -lengthUnits * (size + 10)) {
      //si se trata de desplazar más de lo que hay, vuelve al principio
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
