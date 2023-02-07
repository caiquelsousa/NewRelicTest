[Back to Home](../README.md)

# Component

In this project I couldn't use any framework or library to help me build web-components, so I thought about create my own web-component framework, which made me buid some set of tweaks to build the vanilla web-components.

This is the basic structure of the a component:

Basic files to build the component:

```
ComponentFolder
+---Component.css
+---Component.html
+---Component.js
+---index.js
```

Component example:

```
import { Component } from '../../core';
import html from './ComponentName.html';
import css from './ComponentName.css';

@Component({ selector: 'component-tag', template: html, styles: css })
class ComponentName extends HTMLElement {
  static get observedAttributes() { // <-- OPTIONAL
    return ['open'];
  }

  constructor(args) {
    super();
  }

  render(self) {
    // COMPONENT IMPLEMENTATION ON RENDER
  }
}

export default ComponentName;
```

This components can extend any HTMLElement interface like HTMLParagraphElement that provides special properties for manipulating `<p>` elements. It also gives you flexibility to overwrite useful functions like:

```
  static get observedAttributes() { // <-- OPTIONAL
    return ['open'];
  }
```

and

```
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attrName] = this.hasAttribute(attrName);
    }
  }
```

## Decorator

[`src/client/js/core/ComponentDecorator.js`](../src/client/js/core/ComponentDecorator.js)

Based on what angular does on the background, I decided to create decorator that takes the component `selector` together with the `html` and `css` to build it so when you need to create a new component you just need to worry with the implementation itself.

The decorator `@Component` is the base of all components. It's responsible for defining the component into the platform, creates a `Shadow DOM` and inject the `html` and `css` passed as argument.

Example:

`@Component({ selector: 'component-tag', template: html, styles: css })`

To make the css available inside the shadow and cacheble by the browser, I had to include a polyfill to make sure the class CSSStyleSheet could be accessible in all Browser.

## Import

[`src/client/js/core/ComponentImport.js`](../src/client/js/core/ComponentImport.js)

```
ComponentImport(PageComponent, [...dependencyList]);
```

To make our components available, we have to create Modules that calls the `ComponentImport` function passing the `PageComponent` and all it's dependencies.

Example:

```
class ComponentModule {
  static import() {
    ComponentImport(AppPage, [DialogBox, CardBox, ScoreItem, TopHeader]);
  }
}
```

[`src/client/js/components/ComponentModule.js`](../src/client/js/components/ComponentModule.js)
