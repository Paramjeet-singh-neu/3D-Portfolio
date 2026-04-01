import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Get in Touch</h4>
            <p>
              <a
                href="mailto:paramjeetsingh070@gmail.com"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                Email — paramjeetsingh070@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>
              MS in Information Systems, Northeastern University — 2024–2026
            </p>
            <p>
              B.Tech Electrical, Electronics and Communications Engineering, CMR University — 2017–2021
            </p>
          </div>
          <div className="contact-box">
            <h4>Connect</h4>
            <a
              href="https://www.linkedin.com/in/paramjeet5ingh/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="https://www.paramjeetsingh.me/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Portfolio <MdArrowOutward />
            </a>
            <a
              href="mailto:paramjeetsingh070@gmail.com"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Crafted by <br /> <span>Paramjeet Singh</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
