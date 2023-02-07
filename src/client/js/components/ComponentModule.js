import { ComponentImport } from '../core/ComponentImport';
import AppPage from './AppPage';
import CardBox from './CardBox';
import TopHeader from './TopHeader';
import ScoreItem from './ScoreItem';
import DialogBox from './DialogBox';

class ComponentModule {
  static import() {
    ComponentImport(AppPage, [DialogBox, CardBox, ScoreItem, TopHeader]);
  }
}

export default ComponentModule;
