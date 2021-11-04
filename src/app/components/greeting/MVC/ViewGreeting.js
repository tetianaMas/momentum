export class ViewGreeting {
  constructor() {
    this.greetingContainer = document.querySelector('.greeting-js');
    this.greetingWrapper = document.querySelector('.greeting-container-js');

    this.inputName = document.querySelector('.input-name-js');
  }

  render(greeting) {
    this.greetingContainer.innerText = greeting;
  }

  hideBlock() {
    this.greetingWrapper.classList.add('hidden');
  }

  showBlock() {
    this.greetingWrapper.classList.remove('hidden');
  }
}
