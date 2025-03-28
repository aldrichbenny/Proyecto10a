import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainCliente.module.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const MainCliente = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const slides = [
    {
      image: '/images/fondo.jpg',
      title: 'Mayorstore',
      subtitle: 'Moda',
      description: 'Tu estilo, tu elección'
    },
    {
      image: '/images/fondo2.jpg',
      title: 'Calidad',
      subtitle: 'Premium',
      description: 'Diseños exclusivos'
    },
    {
      image: '/images/fondo3.jpg',
      title: 'Colección',
      subtitle: 'Nueva',
      description: 'Descubre las tendencias'
    }
  ];

  const getSlideStatus = (index) => {
    if (index === currentSlide) return 'current';
    if (index === (currentSlide + 1) % slides.length) return 'next';
    if (index === (currentSlide - 1 + slides.length) % slides.length) return 'previous';
    return '';
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { id: 1, name: 'Camisetas manga corta', image: '/images/camiseta-corta.png' },
    { id: 2, name: 'Camisetas manga larga', image: '/images/camiseta-larga.png' },
    { id: 3, name: 'Sudaderas', image: '/images/sudadera.png' },
    { id: 4, name: 'Suéters', image: '/images/sueter.png' }
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/catalogo/${categoryName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.mainContainer}>
        <div 
          className={styles.sliderSection} 
          style={{'--bg': `url(${slides[currentSlide].image})`}}
        >
          <div className={styles.slider}>
            <button className={`${styles.sliderBtn} ${styles.sliderBtnPrev}`} onClick={prevSlide}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div className={styles.slidesWrapper}>
              <div className={styles.slides} ref={sliderRef}>
                {slides.map((slide, index) => (
                  <div key={index} className={styles.slide} data-status={getSlideStatus(index)}>
                    <div className={styles.slideInner}>
                      <div className={styles.slideImageWrapper}>
                        <img className={styles.slideImage} src={slide.image} alt={`Slide ${index + 1}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.slidesInfos}>
                {slides.map((slide, index) => (
                  <div key={index} className={styles.slideInfo} data-status={getSlideStatus(index)}>
                    <div className={styles.slideInfoInner}>
                      <div className={styles.slideInfoTextWrapper}>
                        <div data-title className={styles.slideInfoText}>
                          <span>{slide.title}</span>
                        </div>
                        <div data-subtitle className={styles.slideInfoText}>
                          <span>{slide.subtitle}</span>
                        </div>
                        <div data-description className={styles.slideInfoText}>
                          <span>{slide.description}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className={`${styles.sliderBtn} ${styles.sliderBtnNext}`} onClick={nextSlide}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.heroSection} style={{ textAlign: 'center' }}>
          <h1>MAYORSTORE</h1>
          <p>Tu destino para ropa de calidad al por mayor</p>
        </div>

        <div className={styles.categoriesContainer}>
          <section className={styles.categoriesSection}>
            <h2>CATEGORÍAS</h2>
            <div className={styles.categoriesGrid}>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={styles.categoryCard}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <img src={category.image} alt={category.name} />
                  <h3>{category.name}</h3>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainCliente;