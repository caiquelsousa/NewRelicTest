import { Component } from '../../core';
import { API_APPS_BY_HOST } from '../../constants';
import html from './AppPage.html';
import css from './AppPage.css';

import Store from '../../store';

@Component({ selector: 'app-page', template: html, styles: css })
class AppPage extends HTMLElement {
  constructor() {
    super();
    console.log('Page-this:', this);

    this._store = Store.createStore({
      hosts: [],
      showAsList: false,
    });
  }

  render(self) {
    fetch(API_APPS_BY_HOST)
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            'Looks like there was a problem. Status Code: ' + response.status
          );
        } else {
          response.json().then((data) => {
            this._store.hosts = data;
          });
        }
      })
      .catch((err) => {
        console.log('Fetch Error :S', err);
      });

    const dialogEl = self.querySelector('dialog-box');
    const appDialogNameEl = dialogEl.querySelector('[data-bind-name]');
    const appDialogApdexEl = dialogEl.querySelector('[data-bind-apdex]');
    const appDialogVersionEl = dialogEl.querySelector('[data-bind-version]');
    console.log(appDialogNameEl, appDialogApdexEl, appDialogVersionEl);

    const contentEl = self.querySelector('.content');

    this._store.subscribe('hosts', (hosts) => {
      contentEl.innerHTML = '';
      const CardBox = customElements.get('card-box');
      const ScoreItem = customElements.get('score-item');
      for (let host of hosts) {
        const cardBoxEl = new CardBox(host.name);
        cardBoxEl.setAttribute('class', 'box-item');
        contentEl.appendChild(cardBoxEl);

        const applicationListEl = document.createElement('div');
        applicationListEl.setAttribute('class', 'score-list');
        for (let i = 0; i < 5 && i < host.applications.length; i++) {
          const applicationItemEl = new ScoreItem(
            host.applications[i].apdex,
            host.applications[i].name
          );
          applicationItemEl.onclick = () => {
            appDialogNameEl.innerHTML = host.applications[i].name;
            appDialogApdexEl.innerHTML = host.applications[i].apdex;
            appDialogVersionEl.innerHTML = host.applications[i].version;
            dialogEl.open = true;
          };
          applicationListEl.appendChild(applicationItemEl);
        }
        cardBoxEl.appendChild(applicationListEl);
      }
    });

    this._store.subscribe('showAsList', () => {
      contentEl.classList.toggle('hidden');
      setTimeout(() => {
        const hostBoxesEl = self.querySelector('[data-bind-host-boxes]');
        hostBoxesEl.classList.toggle('boxes-as-list');
        contentEl.classList.toggle('hidden');
      }, 250);
    });
  }

  destroy() {
    this._store.cleanSubscriptions();
  }
}

export default AppPage;
