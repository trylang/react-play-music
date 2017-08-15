import React from 'react';
import './progress.scss';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
  }

  setProgress(e) {
    let settedProgress = (e.pageX - this.refs.progressBar.getBoundingClientRect().left) / this.refs.progressBar.clientWidth;
    this.props.setProgress(settedProgress);
  }

  render() {
    let barStyle = {
      width: `${this.props.progress}%`,
      background: this.props.barColor
    };
    return (
      <div onClick={this.setProgress.bind(this)}  ref="progressBar" className="components-progress">
        <div className="progress" style={barStyle}></div>
      </div>
    );
  }
}