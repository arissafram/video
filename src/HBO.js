import React, { Component } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css';

export default class HBOPlayer extends Component {
  
  componentDidMount() {

    videojs.hook('beforesetup', () => {
      let Button = videojs.getComponent('Button');
      let MyButton = videojs.extend(Button, {
        constructor: function() {
          Button.apply(this, arguments);
          this.controlText = "mybutton"
        },
        handleClick: function() {
          this.player_.currentTime(this.player_.currentTime() - 10)
        },
        buildCSSClass: function() {
          return "vjs-icon-skip-back vjs-control vjs-button";
         }
      })
      videojs.registerComponent('MyButton', MyButton);    
      console.log(MyButton)

      videojs.getComponent('ControlBar').prototype.options_ = {
        loadEvent: 'ready',
        children: [
          'progressControl',
          'playToggle',
          'myButton',
          'currentTimeDisplay',
          'remainingTimeDisplay',
          'volumePanel',
          'subsCapsButton',
          'fullscreenToggle',
        ]
      }
      return {}
    })

    this.options = {
      controlBar: {
        volumePanel: {
          inline: false,
          vertical: true
        }
      }
    }

    this.player = videojs(this.videoNode, this.options)
    window.player = this.player

    this.player.on('ready', () => {
      // this.autoPlayWithSound()
      this.player.volume(0)
    })

    // this.player.controlBar.volumePanel.muteToggle.on('click', () => {
    //   this.player.controlBar.volumePanel.toggleClass('vjs-lock-showing')
    // })
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