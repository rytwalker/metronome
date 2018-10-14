import React, { Component } from 'react';
import './App.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bpm: 100,
      isPlaying: false,
      count: 0,
      beatsPerMeasure: 4
    };
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    // Give first beat different sound
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    // Keep track of what beat we're on
    this.setState(prevState => ({
      count: (prevState.count + 1) % prevState.beatsPerMeasure
    }));
  };

  handleBpmChange = e => {
    const { isPlaying } = this.state;
    const bpm = e.target.value;
    const interval = (60 / bpm) * 1000;

    if (isPlaying) {
      // Stop old timer and start new timer
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, interval);
      // Set new BPM and reset beat counter
      this.setState({ counter: 0, bpm });
    } else {
      // Just update bpm
      this.setState({ bpm });
    }
  };

  toggleMetronomeClick = () => {
    const { isPlaying, bpm } = this.state;
    const interval = (60 / bpm) * 1000;

    if (isPlaying) {
      clearInterval(this.timer);
      this.setState({ isPlaying: false });
    } else {
      // Start Timer
      this.timer = setInterval(this.playClick, interval);
      // setState
      this.setState({ count: 0, isPlaying: true }, this.playClick);
    }
  };

  render() {
    const { bpm, isPlaying, count } = this.state;
    return (
      <div className="App">
        <h1 className="title">Metronome</h1>
        <div className="beats">
          <div
            className="beat"
            style={count === 0 ? { background: '#4b6584' } : null}
          />
          <div
            className="beat"
            style={count === 1 ? { background: '#4b6584' } : null}
          />
          <div
            className="beat"
            style={count === 2 ? { background: '#4b6584' } : null}
          />
          <div
            className="beat"
            style={count === 3 ? { background: '#4b6584' } : null}
          />
        </div>
        <input
          className="slider"
          type="range"
          min="60"
          max="240"
          value={bpm}
          onChange={this.handleBpmChange}
        />
        <div className="bpm">{bpm} BPM</div>
        <button className="btn" onClick={this.toggleMetronomeClick}>
          {isPlaying ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}

export default App;
