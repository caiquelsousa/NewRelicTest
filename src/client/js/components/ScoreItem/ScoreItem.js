import { Component } from '../../core';
import html from './ScoreItem.html';
import css from './ScoreItem.css';

@Component({ selector: 'score-item', template: html, styles: css })
class ScoreItem extends HTMLElement {
  constructor(score, description) {
    super();
    this.score = score;
    this.description = description;
  }

  render(self) {
    const apdexBindEl = self.querySelector('[data-bind-score]');
    apdexBindEl.innerHTML = this.score;

    const nameBindEl = self.querySelector('[data-bind-description]');
    nameBindEl.innerHTML = this.description;
  }
}

export default ScoreItem;
