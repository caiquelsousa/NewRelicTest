import { Component } from '../../core';
import html from './DialogBox.html';
import css from './DialogBox.css';

@Component({ selector: 'dialog-box', template: html, styles: css })
class Dialog extends HTMLElement {
  constructor() {
    super();
    console.log('Dialog-this:', this);
    this.close = this.close.bind(this);
    this._watchEscape = this._watchEscape.bind(this);
  }

  render(self) {
    self.querySelector('.overlay').addEventListener('click', this.close);
  }

  destroy(self) {
    self.querySelector('.overlay').removeEventListener('click', this.close);
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(isOpen) {
    const { _shadowRoot } = this;
    console.log('open', isOpen, _shadowRoot.querySelector('.wrapper'));
    _shadowRoot.querySelector('.wrapper').classList.toggle('open', isOpen);
    _shadowRoot.querySelector('.wrapper').setAttribute('aria-hidden', !isOpen);
    if (isOpen) {
      this._wasFocused = document.activeElement;
      this.setAttribute('open', '');
      document.addEventListener('keydown', this._watchEscape);
      this.focus();
    } else {
      this._wasFocused && this._wasFocused.focus && this._wasFocused.focus();
      this.removeAttribute('open');
      document.removeEventListener('keydown', this._watchEscape);
    }
  }

  close() {
    this.open = false;
  }

  _watchEscape(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}

export default Dialog;
