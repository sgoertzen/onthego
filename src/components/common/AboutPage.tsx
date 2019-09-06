import React from "react"
import familyImage from "./../../images/Family.jpg"
import './AboutPage.css'

class AboutPage extends React.Component {

    render() {
        return (
            <div className="about-container">
                <img className="about-image" alt="Goertzen Family" src={familyImage} />
                <br />
                <div className="about-text">
                    Welcome to our website!  </div><div className="about-text">We are <b>The Goertzen's</b>: Shawn, Kyla, Bryce, and Stacey.  We are currently taking a twelve month adventure around the world.  On this site you can see our progress as we go, as well learn about our experiences.  We would love to hear from you so feel free to drop a comment on anything that catches your eye.
                </div>
            </div>
        )
    }
}

export default AboutPage