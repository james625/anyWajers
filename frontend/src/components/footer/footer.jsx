import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.githubUrl = 'https://github.com/james625/anyWajers';
  }

  render() {
    return (
      <div className="footer">
        <div>
          <div className="footer-name">James</div>
          <p>team lead</p>
          <div className="footer-icons">
            <a
              href={'https://www.linkedin.com/in/jameschen625/'}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={['fab', 'linkedin']} />
            </a>
            <a
              href={'https://github.com/james625'}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={['fab', 'github']} />
            </a>
            <a href={this.githubUrl} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={['fab', 'angellist']} />
            </a>
          </div>
        </div>

        <div>
          <div className="footer-name">Carly</div>
          <p>flex / fullstack engineer</p>
          <div className="footer-icons">
            <a
              href={'https://www.linkedin.com/in/carly-gradeff-62438a1a0/'}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={['fab', 'linkedin']} />
            </a>
            <a
              href={'https://github.com/cgradeff'}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={['fab', 'github']} />
            </a>
            <a href={this.githubUrl} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={['fab', 'angellist']} />
            </a>
          </div>
        </div>

        <div>
          <div className="footer-name">Joseph</div>
          <p>frontend engineer</p>
          <div className="footer-icons">
            <a
              href={'https://www.linkedin.com/in/joseph-felicidario/'}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={['fab', 'linkedin']} />
            </a>
            <a
              href={'https://github.com/JFlec'}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={['fab', 'github']} />
            </a>
            <a href={this.githubUrl} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={['fab', 'angellist']} />
            </a>
          </div>
        </div>
        <div>
          <div className="footer-name">Wajahat</div>
          <p>backend engineer</p>
          <div className="footer-icons">
            <a
              href={'https://www.linkedin.com/in/wajahat-shoukat-3397a9143/#'}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={['fab', 'linkedin']} />
            </a>
            <a
              href={'https://github.com/waj919'}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={['fab', 'github']} />
            </a>
            <a href={this.githubUrl} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={['fab', 'angellist']} />
            </a>
          </div>
        </div>

        <a href={this.githubUrl} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={['fab', 'github']} />
        </a>
      </div>
    );
  }
}

export default Footer;
