import { Component } from '../../core';
import { API_USER } from '../../constants';
import html from './TopHeader.html';
import css from './TopHeader.css';

import Store from '../../store';

@Component({ selector: 'top-header', template: html, styles: css })
class TopHeader extends HTMLElement {
  constructor() {
    super();
    console.log('TopHeader-this:', this);
    this._store = Store.createStore({
      userLoggedIn: 1,
      user: {},
      showAsList: false,
    });
  }

  toggleListView = () => {
    this._store.showAsList = !this._store.showAsList;
  };

  render(self) {
    fetch(`${API_USER}/${this._store.userLoggedIn}`)
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            'Looks like there was a problem. Status Code: ' + response.status
          );
          return;
        }

        response.json().then((user) => {
          if (user) {
            this._store.user = user;
          }
        });
      })
      .catch((err) => {
        console.log('Fetch Error :S', err);
      });

    self
      .querySelector('.checkbox-show-as-list')
      .addEventListener('click', this.toggleListView);

    let bindUserEl = self.querySelector('[data-bind-user]');

    if (bindUserEl) {
      this._store.subscribe(
        'user',
        (user) => {
          bindUserEl.innerHTML = user.email;
        },
        { firstRun: true }
      );
    }
  }

  destroy() {
    this._store.cleanSubscriptions();
  }
}

export default TopHeader;
