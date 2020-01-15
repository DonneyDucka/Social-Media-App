import React, { Component } from 'react'
/*
unused. pls delete!
*/

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer-distributed">

            <div className="footer-left">

                <h3><span>RMITY</span></h3>

                <p className="footer-links">
                    <a href="#">Home</a>
                    ·
                    <a href="#">Blog</a>
                    ·
                    <a href="#">Pricing</a>
                    ·
                    <a href="#">About</a>
                    ·
                    <a href="#">Faq</a>
                    ·
                    <a href="#">Contact</a>
                </p>

                <p className="footer-company-name">RMIT &copy; 2019</p>
            </div>

            <div className="footer-center">

                <div>
                    <i className="fa fa-map-marker"></i>
                    <p><span>124 La Trobe St</span> Melbourne, Australia</p>
                </div>

                <div>
                    <i className="fa fa-phone"></i>
                    <p>(03) 9925 2000</p>
                </div>

                <div>
                    <i className="fa fa-envelope"></i>
                    <p><a href="mailto:s1234567@company.com">s1234567@student.rmit.edu.au</a></p>
                </div>

            </div>

            <div className="footer-right">

                <p className="footer-company-about">
                    <span>About the company</span>
                    We are a startup group in RMIT of 5 students attempting to create an RMIT application caterting to students and tutors.
                </p>

                <div className="footer-icons">

                    <a href="https://www.facebook.com/RMITuniversity/" target="_blank"><i className="fa fa-facebook"></i></a>
                    <a href="https://twitter.com/RMIT" target="_blank"><i className="fa fa-twitter"></i></a>
                    <a href="https://www.linkedin.com/school/rmit-university/" target="_blank"><i className="fa fa-linkedin"></i></a>
                    <a href="https://github.com/yongjiajun/inSEPTion" target="_blank"><i className="fa fa-github"></i></a>

                </div>

            </div>

        </footer>
        )
    }
}

export default FooterComponent
