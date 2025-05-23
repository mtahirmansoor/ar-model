import "./About.css";

import React, { useEffect } from "react";

import tick from './tick.png';
import archery from './archery.png';
import gun from './rightimg3.png'
import img1 from './prob1.jpg'
import img2 from './prob2.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {   faArrowUp} from '@fortawesome/free-solid-svg-icons'

const About = () => {
    useEffect(() => {
        const sections = document.querySelectorAll(".fromtop-anim, .fade-effect, .aboutrightsec, .left-img-effect, .right-img-effect");

        const observer = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });
    }, []);

    const [showScrollUpButton, setShowScrollUpButton] = React.useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const showButtonThreshold = 200;
  
        // Show the scroll-up button when the user scrolls down
        setShowScrollUpButton(scrollY > showButtonThreshold);
      };
  
      // Add event listener for scroll
      window.addEventListener("scroll", handleScroll);
  
      // Remove event listener when the component is unmounted
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <div className="about-banner">
                <div className="about-banner-front">
                    <div className="aboutleft"><div className="aboutleftsec fromtop-anim">AR based Ecommerce</div>
                        <p className="abouleftseccont fade-effect">A web application for immersive augmented reality shopping experiences.</p></div>

                    <img src={gun} className="aboutrightsec" alt="image" />


                </div>

            </div>
            <div>
                <h1 className="second-head fromtop-anim">Why AR Eccommerce ?</h1>
                <div className="prob-box">
                    <img src={img1} className="prob-img left-img-effect"  alt="image1"/>
                    <div className="about-prob fade-effect">
                        <p className="about-prob-header"><i>Problem</i></p>
                        <p className="about-prob-sol">Traditional e-commerce platforms fail to deliver immersive product experiences,
                            leaving customers uncertain about the look, fit, and functionality of items. This lack of
                            visualization leads to higher return rates as products may not meet expectations. Additionally,
                            customer engagement suffers due to the limited ability to interact with and explore products online.</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="prob-box2">

                    <div className="about-prob fade-effect">
                        <p className="about-prob-header" style={{ "padding": "1vh", "width": "70%" }}><i>Solution</i></p>
                        <p className="about-prob-sol2"> With AR-Ecommerce,customers can visualize products
                            in their own spaces and view all the virtual features more clearly. This empowers
                            customers to make informed decisions, reduces return rates, and enhances
                            engagement, resulting in a more satisfying and immersive shopping journey.</p>
                    </div>
                    <img src={img2} className="prob-img2 right-img-effect" alt="image2" />
                </div>
            </div>
            <div className="about-goals-box">

                <div className="status fade-effect">
                    <h1 className="status-header fromtop-anim" style={{ "color": " rgb(19, 227, 19)" }}>Current Status</h1>
                    <div style={{ "display": "flex" }}><img style={{ "height": "40px", "display": "block", "margin": "4vh 2vh 0 0" }} src={tick} className="fromtop-anim" alt="image3" /><p className="status-points fromtop-anim" >E-commerce products with 3D models for 360° viewing</p></div>
                    <div style={{ "display": "flex" }}><img style={{ "height": "40px", "display": "block", "margin": "4vh 2vh 0 0" }} src={tick} className="fromtop-anim" /><p className="status-points fromtop-anim">Photorealistic 3D models for immersive shopping experiences.</p></div>
                    <div style={{ "display": "flex" }}><img style={{ "height": "40px", "display": "block", "margin": "4vh 2vh 0 0" }} src={tick} className="fromtop-anim" /><p className="status-points fromtop-anim">360° viewer for detailed inspection of chairs, frames, and cars.</p></div>
                    <div style={{ "display": "flex" }}><img style={{ "height": "40px", "display": "block", "margin": "4vh 2vh 0 0" }} src={tick} className="fromtop-anim" /><p className="status-points fromtop-anim">Explore products in your space using augmented reality.</p></div>
                    <div style={{ "display": "flex" }}><img style={{ "height": "40px", "display": "block", "margin": "4vh 2vh 0 0" }} src={tick} className="fromtop-anim" /><p className="status-points fromtop-anim">Augmented reality for in-home product exploration.</p></div>
                </div>
                <div className="status fade-effect">
                    <h1 className="status-header fromtop-anim" style={{ "color": "rgb(9, 16, 250)" }}>Future Goals</h1>
                    <div style={{ "display": "flex" }}><img style={{ "height": "40px", "display": "block", "margin": "4vh 2vh 0 0" }} src={archery} className="fromtop-anim" /><p className="status-points fromtop-anim">Build an e-commerce platform providing an immersive shopping experience.</p></div>
                    <div style={{ "display": "flex" }}><img style={{ "height": "40px", "display": "block", "margin": "4vh 2vh 0 0" }} src={archery} className="fromtop-anim" /><p className="status-points fromtop-anim">Make the products interactive in a real environment rather than just demonstrating static
                        3D models using ML-AI.</p></div>

                </div>

            </div>
           
          
            <div>


                {showScrollUpButton && (
        <button className='scroll-up-button' onClick={scrollToTop}>
<FontAwesomeIcon icon={faArrowUp} />
   </button>
      )}
            </div>
        </>

    );
};

export default About;
