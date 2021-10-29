export class ViewPlayer {
  constructor() {
    this.playerContainer = document.querySelector('.player-js');
    this.playBtn = document.querySelector('.play-js');
    this.nextBtn = document.querySelector('.play-next-js');
    this.prevBtn = document.querySelector('.play-prev-js');
    this.playList = document.querySelector('.play-list-js');
    this.trackTitle = document.querySelector('.player-title-js');
    this.fullTime = document.querySelector('.full-time-js');
    this.currentTime = document.querySelector('.current-time-js');
    this.progressBar = document.querySelector('.player-progress-js');
    this.timeline = document.querySelector('.timeline-js');
    this.volumeBar = document.querySelector('.volume-progress-js');
    this.volumeButton = document.querySelector('.volume-btn-js');
  }

  renderPlaylist(playlist) {
    let template = '';
    playlist.forEach((item, index) => {
      template += `<li class="play-item play-item-js" id="track-${index}">
        <button class="play-item-btn"></button>
        ${item.title}
      </li>`;
    });
    this.playList.innerHTML = template;
  }

  togglePlayBtn() {
    this.playBtn.classList.toggle('pause');
  }

  activePlayBtn() {
    this.playBtn.classList.add('pause');
  }

  deactivePlayBtn() {
    this.playBtn.classList.remove('pause');
  }

  setPauseBtn() {
    this.playBtn.classList.add('pause');
  }

  setActiveTrack(id) {
    const trackElems = document.querySelectorAll('.play-item-js');
    trackElems.forEach(elem => elem.classList.remove('played', 'active-track'));

    trackElems[id].classList.add('played', 'active-track');
  }

  setPauseToActiveTrack(id) {
    document.getElementById(id).classList.remove('played');
  }

  removePauseToActiveTrack(id) {
    document.getElementById(id).classList.add('played');
  }

  setTrackTitle(title) {
    this.trackTitle.textContent = title;
  }

  setCurrentTime(time) {
    this.currentTime.textContent = time;
  }

  setFullTime(time) {
    this.fullTime.textContent = time;
  }

  setUpProgressBar(width) {
    this.progressBar.style.width = width;
  }

  setAudioDuration(duration) {
    this.progressBar.setAttribute('max', duration);
  }

  changeTimelineBg(currTime, duration) {
    this.progressBar.style.background = `linear-gradient(to right, rgba(70, 70, 70, 0.8) 0%, rgba(70, 70, 70, 0.8) ${
      (currTime / duration) * 100
    }%, rgba(255, 255, 255, 0.8) ${
      (currTime / duration) * 100
    }%, rgba(255, 255, 255, 0.8) 100%)`;
  }

  changeVolumeBarBg(value) {
    this.volumeBar.style.background = `linear-gradient(to right, rgba(70, 70, 70, 0.8) 0%, rgba(70, 70, 70, 0.8) ${
      value * 100
    }%, rgba(255, 255, 255, 0.8) ${
      value * 100
    }%, rgba(255, 255, 255, 0.8) 100%)`;
  }

  setMuted() {
    this.volumeButton.classList.add('muted');
  }

  removeMuted() {
    this.volumeButton.classList.remove('muted');
  }

  hideBlock() {
    this.playerContainer.classList.add('hidden');
  }

  showBlock() {
    this.playerContainer.classList.remove('hidden');
  }
}
