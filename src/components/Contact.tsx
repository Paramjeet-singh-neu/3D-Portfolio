import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a
                href="mailto:paramjeetsingh070@gmail.com"
                data-cursor="disable"
              >
                paramjeetsingh070@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>303 475 6390</p>
            <h4>Education</h4>
            <p>
              MS in Information Systems, Northeastern University — Graduating May 2026
            </p>
            <p>
              BE in Electronics and Communication, CMR University — 2021
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Paramjeet-singh-neu"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/paramjeet5ingh/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Portfolio of <br /> <span>Paramjeet Singh</span>
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
