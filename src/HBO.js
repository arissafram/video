import React, { Component } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css';

export default class HBOPlayer extends Component {
  
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, () => console.log('player ready:', this))
    window.player = this.player

    this.player.on('ready', () => {
      // this.autoPlayWithSound()
      this.player.volume(0)
    })

    this.player.on('ended', () => {
      this.player.posterImage.el_.style.display = "block"
    })
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
      </div>
    )
  }
}