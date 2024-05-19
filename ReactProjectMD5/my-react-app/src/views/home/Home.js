import React, { useEffect, useState } from "react";
import Image1 from "../../assets/logo/about/anh1.png";
import Image2 from "../../assets/logo/about/anh2.png";
import Image3 from "../../assets/logo/about/anh3.png";
import Image4 from "../../assets/logo/about/anh11.jpg";
import Video from "../../assets/logo/about/background-video.mp4";
import "./Home.scss";
function Home() {
    const [userLogin, setUserLogin] = useState(null);
    useEffect(() => {
        const userLoginData = JSON.parse(localStorage.getItem('userLogin'));
        if (userLoginData) {
            setUserLogin(userLoginData);
        }
    }, []);
    return (
        <div style={{ overflow: "auto" }}>
            <div className="video">
                <video autoPlay loop muted src={Video}></video>
            </div>
            {userLogin === null ?
                <div className="video__title">
                    <h2>Hãy <a href="/login"><button className="btn btn-outline-light">Đăng nhập</button></a> để tham gia vào thế giới Gundam</h2>
                    <p>Bạn chưa có tài khoản ? <a href="/register">Đăng ký tại đây</a></p>
                </div>
                :
                <div className="video__title">
                    <p>Chào mừng bạn đến với thế giới GUNDAM</p>
                </div>
            }
            <div className="container__about">
                <h2>Thông tin</h2>
                <div className="container__about__main">
                    <div id="carouselExampleFade" className="container__about__title carousel slide carousel-fade">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={Image1} className="d-block w-100" alt="titl1" />
                            </div>
                            <div className="carousel-item">
                                <img src={Image2} className="d-block w-100" alt="title2" />
                            </div>
                            <div className="carousel-item">
                                <img src={Image3} className="d-block w-100" alt="title3" />
                            </div>
                        </div>
                        <div className="button__pre"><button className="prevBtn carousel-control-prev" type="button"
                            data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            &#60;
                        </button>
                        </div>
                        <div className="button__next"><button className="nextBtn carousel-control-next" type="button"
                            data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            &#62;
                        </button>
                        </div>

                    </div>
                    <div className="container__about__show">
                        <img src={Image4} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;