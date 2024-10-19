import React from "react";
const swiper = () => {
    return (
        <section className="swiper__container">
            <div className="card__container swiper">
                <div className="card__content">
                    <div className="swiper-wrapper">
                        <article className="card__article swiper-slide">
                            <div className="card__image">
                                <img src="assets/img/avatar-1.png" alt="image" className="card__img" />
                                <div className="card__shadow" />
                            </div>
                            <div className="card__data">
                                <h3 className="card__name">Kell Dawx</h3>
                                <p className="card__description">
                                    Passionate about development and design,
                                    I carry out projects at the request of users.
                                </p>
                                <a href="#" className="card__button">View More</a>
                            </div>
                        </article>
                        <article className="card__article swiper-slide">
                            <div className="card__image">
                                <img src="assets/img/avatar-2.png" alt="image" className="card__img" />
                                <div className="card__shadow" />
                            </div>
                            <div className="card__data">
                                <h3 className="card__name">Lotw Fox</h3>
                                <p className="card__description">
                                    Passionate about development and design,
                                    I carry out projects at the request of users.
                                </p>
                                <a href="#" className="card__button">View More</a>
                            </div>
                        </article>
                        <article className="card__article swiper-slide">
                            <div className="card__image">
                                <img src="assets/img/avatar-3.png" alt="image" className="card__img" />
                                <div className="card__shadow" />
                            </div>
                            <div className="card__data">
                                <h3 className="card__name">Sara Mit</h3>
                                <p className="card__description">
                                    Passionate about development and design,
                                    I carry out projects at the request of users.
                                </p>
                                <a href="#" className="card__button">View More</a>
                            </div>
                        </article>
                        <article className="card__article swiper-slide">
                            <div className="card__image">
                                <img src="assets/img/avatar-4.png" alt="image" className="card__img" />
                                <div className="card__shadow" />
                            </div>
                            <div className="card__data">
                                <h3 className="card__name">Jenny Wert</h3>
                                <p className="card__description">
                                    Passionate about development and design,
                                    I carry out projects at the request of users.
                                </p>
                                <a href="#" className="card__button">View More</a>
                            </div>
                        </article>
                        <article className="card__article swiper-slide">
                            <div className="card__image">
                                <img src="assets/img/avatar-5.png" alt="image" className="card__img" />
                                <div className="card__shadow" />
                            </div>
                            <div className="card__data">
                                <h3 className="card__name">Lexa Kin</h3>
                                <p className="card__description">
                                    Passionate about development and design,
                                    I carry out projects at the request of users.
                                </p>
                                <a href="#" className="card__button">View More</a>
                            </div>
                        </article>
                    </div>
                </div>
                {/* Navigation buttons */}
                <div className="swiper-button-next">
                    <i className="ri-arrow-right-s-line" />
                </div>
                <div className="swiper-button-prev">
                    <i className="ri-arrow-left-s-line" />
                </div>
                {/* Pagination */}
                <div className="swiper-pagination" />
            </div>
        </section>

    );
}
export default swiper