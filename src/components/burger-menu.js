import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import './burger-menu.css';

export class BurgerMenu extends React.Component {
  makeId() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 24; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  render() {
    const menu = (this.props.showMenu && this.props.links)
      ? (
        <div className="menu">
          <ul>
            {this.props.links.map((link) => {
              if (link.isLink) {
                return (
                  <li className={link.classes} key={this.makeId()}>
                    <Link
                      to={link.href}
                      onClick={() => link.onClick()}
                    >
                      {link.text}
                    </Link>
                  </li>
                );
              } else if (link.isNavLink) {
                return (
                  <li className={link.classes} key={this.makeId()}>
                    <NavLink
                      to={link.href}
                      onClick={() => link.onClick()}
                    >
                      {link.text}
                    </NavLink>
                  </li>
                );
              } else {
                return (
                  <li className={link.classes} key={this.makeId()}>
                    <a href={link.href} onClick={() => link.onClick()}>
                      {link.text}
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )
      : (null);

    return (
      <div aria-hidden={this.props.ariaHidden} className={`menu-container ${this.props.classes}`}>
        <button aria-label="menu" label="menu" className="menu-icon fas fa-bars" id="menu-icon" onClick={() => this.props.toggleMenu()}>
        </button>
        <div aria-live="polite" aria-atomic="true" aria-relevant="additions">
          {menu}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

export default withRouter(connect(mapStateToProps)(BurgerMenu));
