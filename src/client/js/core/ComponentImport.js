export function ComponentImport(PageComponent, dependencyList) {
  for (let component of dependencyList) {
    customElements.define(component.selector, component);
  }
  customElements.define(PageComponent.selector, PageComponent);
}
