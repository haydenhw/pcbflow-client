import React, { Component } from 'react';
import { routeToProjects } from 'helpers/routeHelpers';
import { connect } from 'react-redux';

import LandingPageCard from './LandingPageCard';
import Logo from 'components/logo/Logo';

import './landing-page-styles/LandingStylesIndex.scss';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      scrollY: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    this.setState({ scrollY: window.scrollY });
  }

  render() {
    const { scrollY } = this.state;

    return (
      <div className="landing-container">
        <header className={`header ${scrollY > 0 ? 'header-white' : ''}`} >
          <Logo />
          <div className="header-button-wrapper">
            <button
              className={`${scrollY > 0 ? '' : 'header-button-hidden'} header-button onboard-button`}
              onClick={routeToProjects}
            >
              <span className="header-button-text" onClick={routeToProjects}>GET STARTED</span>
              <span className="icon-arrow-right" />
            </button>
          </div>
        </header>
        <section className="hero">
          <div className="hero-circle">
            <div className="hero-circle-content">
              <h1 className="hero-title">Design cutting edge electronics in minutes.</h1>
              <button className="onboard-button hero-button" onClick={routeToProjects}>GET STARTED</button>
            </div>
          </div>
        </section>
        <section className="demo-section">
          <div className="section-heading-wrapper">
            <h2 className="section-heading">Bring your ideas to life</h2>
            <p className="section-sub-heading">Learn to create custom circuit board designs with PCBflow, save work in progress diagrams, and export them when you're ready to build the real thing.</p>
          </div>
          <div className="design-to-pcb-demo">
            <div className="computer-wrapper">
              <img className="computer-image inline-image" src="images/computer.png" alt="computer" />
              <img className="design-tool-screenshot" src="images/design-tool-screenshot.png" alt="app screenshot" />
            </div>
            <img className="dots inline-image" src="images/dots.svg" alt="dots" />
            <img className="less-dots inline-image" src="images/less-dots.svg" alt="dots" />
            <img className="arrows-right inline-image" src="images/arrows-right.svg" alt="arrow" />
            <img className="arrows-down inline-image" src="images/arrows-down.svg" alt="arrow" />
            <img className="circuit-board-image inline-image" src="images/real-pcb.jpg" alt="circuit board" />
          </div>
        </section>
        <section className="info-card-section row">
          <div className="section-heading-wrapper section-heading-wrapper-info">
            <h2 className="section-heading">Design with ease</h2>
            <p className="section-sub-heading">PCBflow's user friendly drag and drop interface is a breeze to learn and use.</p>
          </div>
          <div className="info-card-wrapper">
            <div className="col4">
              <LandingPageCard
                infoType="no-engineer"
                iconClassName="card-icon icon-wrench"
                title="No Engineering Required"
                content="PCBflow abstracts away the hard parts of printed circuit board design. You don’t need to worry about routing or connections."
              />
            </div>
            <div className="col4">
              <LandingPageCard
                infoType="tutorial"
                iconClassName="card-icon icon-school"
                title="Interactive Tutorial"
                content="Our step by step tutorial will teach you how to reason about printed circuit board design while demostrating how to use the tool."
              />
            </div>
            <div className="col4">
              <LandingPageCard
                infoType="price-estimate"
                iconClassName="card-icon icon-credit"
                title="Instant Price Estimates"
                content="Get a price estimate that updates automatically as you add and remove modules so you can keep your project under budget."
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

// TODO investigate to see if this can be deleted
const mapStateToProps = state => {
  return {
    projects: state.projects.items
  };
};

export default connect(mapStateToProps)(LandingPage);
