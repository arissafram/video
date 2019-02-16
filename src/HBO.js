import React, { Component } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css';

export default class HBOPlayer extends Component {
  
  componentDidMount() {

    videojs.hook('beforesetup', () => {
      videojs.getComponent('ControlBar').prototype.options_ = {
        loadEvent: 'ready',
        children: [
          'progressControl',
          'playToggle',
          'currentTimeDisplay',
          'remainingTimeDisplay',
          'muteToggle',
          'volumeControl',
          'subsCapsButton',
          'fullscreenToggle'
        ]
      }
    })

    this.player = videojs(this.videoNode, this.props, () => console.log('player ready:', this))

    window.player = this.player

    this.player.on('ready', () => {
      // this.autoPlayWithSound()
      this.player.volume(0)
    })

    // NOTE: re-ordering btns - https://github.com/videojs/video.js/issues/2673
  //   videojs.getComponent('ControlBar').prototype.options_ = {
  //     loadEvent: 'ready',
  //     children: [
  //       'muteToggle',
  //       'playToggle',
  //       'volumeControl',
  //       'fullscreenToggle'
  //     ]
  //   }
  }

  comoponentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  autoPlayWithSound() {
    let promise = this.player.play()

    if (promise !== undefined) {
      promise.then(() => {
        this.player.play()
      }).catch(() => {
        console.log('click to play')
      })
    }
  }
  
  render() {
    return (
      <div data-vjs-player>
        <video 
          ref={ref => this.videoNode = ref}
          controls
          poster="//vjs.zencdn.net/v/oceans.png"
          className="videoNode video-js vjs-16-9 vjs-hbo">
            <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
        </video>
        <ul>
          <li>progress bar - position, color, hover</li>
          <li>rewind 10 seconds btn</li>
          <li>time remaining/elapsed</li>
          <li>cc button</li>
          <li>play button in bottom left corner</li>
          <li>volume - right side, panel is vertical, colors</li>
          <li>animated play/pause on video click</li>
        </ul>
      </div>
    )
  }
}