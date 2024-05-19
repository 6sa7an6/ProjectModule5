import React from "react";
import './Footer.scss';

function Footer() {
    return (
        <>
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-xs-12">
                            <div className="first">
                                <h4>Về chúng tôi</h4>
                                <p>Với đội ngũ nhân viên tay nghề cao và trang thiết bị tân tiến nhất hiện nay chúng tôi
                                    tự tin sẽ đưa những sản phẩm tuyệt vời nhất đến tay khách hàng.
                                </p>
                                <p>Xin chân thành cảm ơn quý khách hàng đã lựa chọn tin tưởng chúng tôi.</p>
                                <p>Mọi thông tin chi tiết xin liên hệ tới đội ngũ tư vấn : 09122xx34xxx.</p>
                            </div>
                        </div>

                        <div className="col-md-4 col-xs-12">
                            <div className="second">
                                <h4> Menu</h4>
                                <ul>
                                    <li><a href="/">Trang chủ</a></li>
                                    <li><a href="#product">Sản phẩm</a></li>
                                    <li><a href="#moveto">Thông tin</a></li>
                                    <li><a href="#contact">Liên Hệ</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-4 col-xs-12">
                            <div className="third">
                                <h4 id="contact"> Contact</h4>
                                <ul>
                                    <li>Project của Vũ Việt Anh</li>
                                    <li></li>
                                    <li><i className="far fa-envelope"></i>Tà Shop</li>
                                    <li><i className="far fa-envelope"></i> vuvietanh29061995@gmail.com</li>
                                    <li><i className="fas fa-map-marker-alt"></i>Thanh Trì , Hà Nội</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="line"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;