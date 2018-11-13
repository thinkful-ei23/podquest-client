import React from 'react';
import { createBrowserHistory } from "history";

export default class BackButton extends React.Component {
  history = createBrowserHistory();

  handleGoBack() {
    this.history.goBack();
  }

  render() {
    return (
      <button
        className="btn btn-small btn-blue btn-back"
        onClick={() => this.handleGoBack()}
      >
        <i className="fas fa-angle-left" />&nbsp;Back
      </button>
    );
  }
}
