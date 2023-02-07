import ComponentModule from './js/components/ComponentModule';
import Store from './js/store';
import { initLogger } from '../common/logger';
import 'construct-style-sheets-polyfill';

window.onload = function () {
  initLogger();
  ComponentModule.import();
};

window.onbeforeunload = function () {
  Store.unsubscribeAll();
};
