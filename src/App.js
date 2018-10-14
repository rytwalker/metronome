import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bpm: 100,
      isPlaying: false
    };
  }
  render() {
    const { bpm, isPlaying } = this.state;
    return (
      <div className="App">
        <h1 className="title">Metronome</h1>
        <div className="bpm">{bpm} BPM</div>
        <input className="slider" type="range" min="60" max="240" value={bpm} />
        <button className="btn">{isPlaying ? 'Stop' : 'Start'}</button>
      </div>
    );
  }
}

export default App;
