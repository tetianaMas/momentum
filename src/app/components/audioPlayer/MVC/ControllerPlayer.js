import { eventBus } from '../../../service/eventBus';

export class ControllerPlayer {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.isShown = null;
  }

  init() {
    eventBus.subscribe('block-play-changed', isShown => {
      this.isShown = isShown;

      if (isShown && !this.model.isPlaying) {
        this.view.renderPlaylist(this.model.getPlaylist());
        this.view.setTrackTitle(this.model.getTrackTitle());
        this.view.setFullTime(this.model.getTrackFullTime());
        this.model.initAudio();
        this.view.showBlock();
      } else if (isShown && this.model.isPlaying) {
        this.view.showBlock();
      } else {
        this.view.hideBlock();
      }
    });

    this.model.getAudio().addEventListener('loadeddata', () => {
      const duration = this.model.getTrackDuration();
      this.view.setAudioDuration(duration);
    });

    this.view.progressBar.addEventListener('input', () => {
      const currentTime = this.view.progressBar.value;
      this.model.setTrackCurrentTime(currentTime);
    });

    this.view.volumeBar.addEventListener('input', this.changeVolume.bind(this));
    this.view.volumeButton.addEventListener(
      'click',
      this.toggleMute.bind(this)
    );

    this.model.getAudio().addEventListener('timeupdate', () => {
      this.view.progressBar.value = this.model.getTrackCurrentTime();
      this.view.changeTimelineBg(
        this.model.getTrackCurrentTime(),
        this.model.getTrackDuration()
      );
    });

    this.view.playBtn.addEventListener('click', () => {
      this.view.togglePlayBtn();
      const id = `track-${this.model.getTrackNum()}`;
      if (this.model.getTrackCurrentTime() > 0) {
        this.model.playAudio();
        if (this.model.isPlaying) {
          this.view.removePauseToActiveTrack(id);
        } else {
          this.view.setPauseToActiveTrack(id);
        }
      } else {
        this.view.activePlayBtn();
        this.view.removePauseToActiveTrack(id);
        this.play();
      }
    });

    this.view.nextBtn.addEventListener('click', () => {
      this.model.increaseTrackNum();
      this.view.setPauseBtn();
      this.model.isPlaying = false;
      this.play();
    });

    this.view.prevBtn.addEventListener('click', () => {
      this.model.decreaseTrackNum();
      this.view.setPauseBtn();
      this.model.isPlaying = false;
      this.play();
    });

    this.model.getAudio().addEventListener('ended', () => {
      this.model.isPlaying = false;
      this.model.increaseTrackNum();
      this.play();
    });

    this.view.playList.addEventListener('click', e => {
      if (e.target.tagName === 'LI' || e.target.tagName === 'BUTTON') {
        let elem;

        if (e.target.tagName === 'LI') {
          elem = e.target;
        } else {
          elem = e.target.closest('LI');
        }
        const trackNum = parseInt(elem.id.replace('track-', ''), 10);
        this.view.togglePlayBtn();
        this.view.setActiveTrack(trackNum);

        if (this.model.getTrackNum() === trackNum) {
          this.model.playAudio();
        } else {
          this.model.setTrackNum(trackNum);
          this.model.isPlaying = false;
          this.view.activePlayBtn();
          this.play();
        }

        if (this.model.isPlaying === false) {
          this.view.setPauseToActiveTrack(elem.id);
        } else {
          this.view.removePauseToActiveTrack(elem.id);
        }
      }
    });
  }

  play() {
    this.view.changeTimelineBg(0, 1);
    this.model.initAudio();
    this.view.setAudioDuration(this.model.getTrackDuration());
    this.model.playAudio();
    this.initCurrentTime();

    this.view.setActiveTrack(this.model.getTrackNum());
    this.view.setTrackTitle(this.model.getTrackTitle());
    this.view.setFullTime(this.model.getTrackFullTime());
    this.model.getAudio().volume = this.model.volume;
    this.model.setTrackVolume(this.model.volume);
  }

  initCurrentTime() {
    setInterval(() => {
      const timeCode = this.model.getTimeCode();
      this.view.setCurrentTime(timeCode);
    }, 500);
  }

  changeVolume() {
    const currentValue = parseFloat(this.view.volumeBar.value, 10);
    if (currentValue === 0) {
      this.view.setMuted();
      this.model.getAudio().muted = true;
    } else {
      this.view.removeMuted();
      this.model.getAudio().muted = false;
    }
    this.model.setTrackVolume(currentValue);
    this.model.volume = currentValue;
    this.view.changeVolumeBarBg(currentValue);
  }

  toggleMute() {
    if (!this.model.getAudio().muted) {
      this.model.volume = this.model.getAudio().volume;
      this.model.getAudio().muted = true;
      this.model.setTrackVolume(0);
      this.view.volumeBar.value = 0;
      this.view.setMuted();
      this.view.changeVolumeBarBg(0);
    } else {
      this.model.getAudio().muted = false;
      this.model.setTrackVolume(this.model.volume);
      this.view.volumeBar.value = this.model.volume;
      this.view.removeMuted();
      this.view.changeVolumeBarBg(this.model.volume);
    }
  }
}
