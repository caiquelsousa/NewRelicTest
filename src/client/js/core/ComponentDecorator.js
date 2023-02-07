export function Component({ selector, template = '', styles = '' }) {
  return function decorator(WrappedComponent) {
    return class extends WrappedComponent {
      static selector = selector;

      constructor(...args) {
        super(...args);
        this._shadowRoot = this.attachShadow({
          mode: 'open',
        });
        this._shadowRoot.innerHTML = template;

        const css = new CSSStyleSheet();
        css.replaceSync(styles.toString());
        this._shadowRoot.adoptedStyleSheets = [css];
      }

      connectedCallback() {
        if (this.render) this.render(this._shadowRoot);
      }

      disconnectedCallback() {
        if (this.destroy) this.destroy();
        this._shadowRoot.innerHTML = '';
      }
    };
  };
}
