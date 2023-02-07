import { Component } from '../../core';
import html from './CardBox.html';
import css from './CardBox.css';

@Component({ selector: 'card-box', template: html, styles: css })
class CardBox extends HTMLElement {
  constructor(cardTitle) {
    super();
    this.cardTitle = cardTitle;
    console.log('CardBox', cardTitle);
    console.log('CardBox-this:', this);
  }

  render(self) {
    console.log('connectedCallback - card-box');
    const cardTitleEl = self.querySelector('[data-bind-title]');
    cardTitleEl.innerHTML = this.cardTitle;
  }
}

export default CardBox;
