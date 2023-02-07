[Back to Home](../README.md)

# Store

The system uses the PUB/SUB pattern in its core, it's based on major libraries like Redux and RxJS.

Using only the browser platform, the store execute the `Object.defineProperty` to redefine how the property `set` and `get` works, so everytime that a property change (`store.prop = newValue`) it creates a new `CustomEvent`. if some element is subscribed to the property (`store.subscribe(prop, callback)`, it generate an `addEventListeners(name:prop, callback)`)

![Store Diagram](/docs/Store.png)

## Example:

Create the store first:

```js
this._store = Store.createStore({ visible: false }, 'global');
```

Subscribe to that property anywhere:

```js
this._store.subscribe('visible', (newValue) => {
  // Callback function code...
});

//Don't forget to unsubscribe when you don't need it anymore
destroy() {
  this._store.cleanSubscriptions();
}
```

Notify subscribers simply changing the property value:

```js
this._store.visible = true;
```

## Store functions

#### Store.createStore(initialValue[, name]) ⇒ `Store`

**Kind**: Class method of Store

Creates a new store instance.

| Param        | Type   | Default  | Description                                                                      |
| ------------ | ------ | -------- | -------------------------------------------------------------------------------- |
| initialValue | object | {}       | initialize store, in case it already has some value to that prop it get ignored. |
| name         | string | "global" | store context name                                                               |

#### storeInstace.subscribe(prop, callback)

**Kind**: Instance method of Store

Subscribe to change to a property

| Param    | Type               | Default | Description                                                                      |
| -------- | ------------------ | ------- | -------------------------------------------------------------------------------- |
| prop     | string             | null    | initialize store, in case it already has some value to that prop it get ignored. |
| callback | function(newValue) | null    | function to be called when the property changes                                  |

#### storeInstace.cleanSubscriptions()

Clean all subscriptions made in that instance

**Kind**: Instance method of Store

#### Store.unsubscribeAll()

Clean all subscriptions

**Kind**: Class method of Store
