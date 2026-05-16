import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="mailto:paramjeetsingh070@gmail.com"
                data-cursor="disable"
              >
                paramjeetsingh070@gmail.com
              </a>
            </p>
            <p>
              <a
                href="https://www.linkedin.com/in/paramjeet5ingh/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — paramjeet5ingh
              </a>
            </p>
            <p>
              <a
                href="https://www.paramjeetsingh.me/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                paramjeetsingh.me
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="mailto:paramjeetsingh070@gmail.com"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
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
            <a
              href="https://github.com/paramjeet5ingh"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
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
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Paramjeet Singh</span>
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
