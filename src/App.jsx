import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import "./index.css";

const Slider = () => {
    const slideRef = useRef(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [carousel, setCarousel] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const handleClickNext = () => {
        let items = slideRef.current.querySelectorAll(".item");
        slideRef.current.appendChild(items[0]);
    };

    function handleClickProj(id) {
        console.log("---------");
        let items = slideRef.current.querySelectorAll(".item");
        let index = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].querySelector('div[hidden]').innerText === String(id)) {
                index = i;
                break;
            }
        }
        for (let i = 0; i < index - 1; i++) {
            setTimeout(() => {
                handleClickNext();
            }, (i + 1) * 450);

        }
    };

    const handleClickPrev = () => {
        let items = slideRef.current.querySelectorAll(".item");
        slideRef.current.prepend(items[items.length - 1]);
    };
    const handClickUrl = (url) => {
        window.location.href = url;
    };

    function getData() {

        axios.get("http://localhost:8081/carousel/get-all-carousel")
            .then(
                (result) => {
                    setCarousel(result.data.carousel);
                }
            )
    }

    return (
        <div className="container">
            <div className="loadbar" style={{width: `${loadingProgress}%`}}></div>
            <div id="slide" ref={slideRef}>
                {carousel.map((item) => (
                    <div
                        key={item.id}
                        className="item"
                        style={{backgroundImage: `url(${item.imgUrl})`}}
                        onClick={() => handleClickProj(item.id)}
                    >
                        <div className="content">
                            <div hidden={true}>{item.id}</div>
                            <div className="name">{item.projectName}</div>
                            <div className="des">{item.description}</div>
                            <div className="des">{item.login}</div>
                            <div className="des">{item.password}</div>
                            <button role={"button"} onClick={() => handClickUrl(item.projectUrl)}>See more</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="buttons">
                <button id="prev" onClick={handleClickPrev}>
                    <FontAwesomeIcon icon={faAngleLeft}/>
                </button>
                <button id="next" onClick={handleClickNext}>
                    <FontAwesomeIcon icon={faAngleRight}/>
                </button>
            </div>
        </div>
    );
};

export default Slider;
