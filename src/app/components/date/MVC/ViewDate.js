export class ViewDate {
  constructor() {
    this.dateContainer = document.querySelector('.date-js');
    this.timeContainer = document.querySelector('.time-js');
  }

  renderTime(time) {
    this.timeContainer.innerText = time;
  }

  renderDate(date) {
    this.dateContainer.innerText = date;
  }

  hideBlockTime() {
    this.timeContainer.classList.add('hidden');
  }

  showBlockTime() {
    this.timeContainer.classList.remove('hidden');
  }

  hideBlockDate() {
    this.dateContainer.classList.add('hidden');
  }

  showBlockDate() {
    this.dateContainer.classList.remove('hidden');
  }
}
