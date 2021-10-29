import playList from '../playList';

export class ModelPlayer {
  constructor(customPlaylist) {
    this.trackNum = 0;
    this.playList = customPlaylist || playList;
    this.audio = new Audio();
    this.isPlaying = false;
    this.volume = 1;
  }

  initAudio() {
    this.audio.src = this.getAudioSrc();
    this.audio.load();
  }

  increaseTrackNum() {
    this.trackNum++;
    if (this.trackNum > this.playList.length - 1) {
      this.trackNum = 0;
    }
  }

  decreaseTrackNum() {
    this.trackNum--;
    if (this.trackNum < 0) {
      this.trackNum = this.playList.length - 1;
    }
  }

  getPlaylist() {
    return this.playList;
  }

  getAudioSrc() {
    return this.playList[this.trackNum].src;
  }

  getAudio() {
    return this.audio;
  }

  getTrackNum() {
    return this.trackNum;
  }

  setTrackNum(num) {
    this.trackNum = num;
  }

  getTrackTitle() {
    return this.playList[this.trackNum].title;
  }

  getTrackFullTime() {
    return this.playList[this.trackNum].duration;
  }

  getTrackDuration() {
    return this.audio.duration;
  }

  getTrackCurrentTime() {
    return this.audio.currentTime;
  }

  getTimeCode() {
    return this.getTimeCodeFromNum(this.getTrackCurrentTime());
  }

  getTimeCodeFromNum(num) {
    let seconds = parseInt(num, 10);
    let minutes = parseInt(seconds / 60, 10);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60, 10);
    minutes -= hours * 60;

    if (hours === 0) {
      return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    }
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }

  setTrackCurrentTime(value) {
    this.audio.currentTime = value;
  }

  setTrackVolume(value) {
    this.audio.volume = value;
  }

  playAudio() {
    if (!this.isPlaying) {
      this.audio.play();
    } else {
      this.audio.pause();
    }

    this.isPlaying = !this.isPlaying;
  }
}
