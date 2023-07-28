import React, {useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import  axios from "axios"
import "./index.css";
import $ from "jquery";

const Slider = () => {
    const slideRef = useRef(null);
    const [loadingProgress, setLoadingProgress] = useState(0);

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
        getData();
    };

    const handleClickPrev = () => {
        let items = slideRef.current.querySelectorAll(".item");
        slideRef.current.prepend(items[items.length - 1]);
    };
    const handClickUrl = (url) => {
        window.location.href = url;
    };

    function getAllUsers() {
        const response = $.ajax({
            method: "GET",
            url: "http://localhost:8080/carousel/get-all-carousel",
            dataType: 'json',
            contentType: 'application/json',
        });
        console.log(response);
    }
    function getData(){
        axios.get("http://localhost:8080/carousel/get-all-carousel")
            .then(
                (result) => {
                    console.log(result)
                }
            )
    }

    const data1 =  getData();
    const data = [
        {
            id: 1,
            imgUrl: "http://localhost:5173/img.png",
            desc: "PETR IVANOV",
            login: "Login: admin@gmail.com",
            pass: "Password: 1234",
            name: "Kino-CMS",
            url: "http://localhost:8080/Vilki_Palki_Admin/login",
        },
        {
            id: 2,
            imgUrl:
                "https://i.postimg.cc/bw6KxhLf/pexels-eberhard-grossgasteiger-1062249.jpg",
            desc: "PETR IVANOV",
            login: "Login: admin@gmail.com",
            pass: "Password: 1234",
            name: "Kino-CMS",
            url: "http://localhost:8080/Vilki_Palki_Admin/login",
        }, {
            id: 3,
            imgUrl:
                "https://i.postimg.cc/bw6KxhLf/pexels-eberhard-grossgasteiger-1062249.jpg",
            desc: "PETR IVANOV",
            login: "Login: admin@gmail.com",
            pass: "Password: 1234",
            name: "Kino-CMS",
            url: "http://localhost:8080/Vilki_Palki_Admin/login",
        },
        {
            id: 4,
            imgUrl:
                "https://i.postimg.cc/CMkTW9Mb/pexels-eberhard-grossgasteiger-572897.jpg",
            desc: "PETR IVANOV",
            login: "Login: admin@gmail.com",
            pass: "Password: 1234",
            name: "Kino-CMS",
            url: "http://localhost:8080/Vilki_Palki_Admin/login",
        },
        {
            id: 5,
            imgUrl: "https://i.postimg.cc/6qdkn4bM/pexels-joyston-judah-933054.jpg",
            desc: "PETR IVANOV",
            login: "Login: admin@gmail.com",
            pass: "Password: 1234",
            name: "Kino-CMS",
            url: "http://localhost:8080/Vilki_Palki_Admin/login",
        },
        {
            id: 6,
            imgUrl:
                "http://localhost:5173/img2.png",
            desc: "PETR IVANOV",
            login: "Login: admin@gmail.com",
            pass: "Password: 1234",
            name: "Kino-CMS",
            url: "https://www.baeldung.com/spring-boot-internationalization",
        },
    ];

    return (
        <div className="container">
            <div className="loadbar" style={{width: `${loadingProgress}%`}}></div>
            <div id="slide" ref={slideRef}>
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="item"
                        style={{backgroundImage: `url(${item.imgUrl})`}}
                        onClick={() => handleClickProj(item.id)}
                    >
                        <div className="content">
                            <div hidden={true}>{item.id}</div>
                            <div className="name">{item.name}</div>
                            <div className="des">{item.desc}</div>
                            <div className="des">{item.login}</div>
                            <div className="des">{item.pass}</div>
                            <button role={"button"} onClick={() => handClickUrl(item.url)}>See more</button>
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
