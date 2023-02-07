class Store {
  static _stores = {};

  static getStore(name = 'global') {
    return this._stores[name];
  }

  static createStore(initialValue, name = 'global', context = window) {
    this._stores[name] = this._stores[name] || {
      _subscriptions: [],
      cleanSubscriptions: function () {
        for (const subscription of this._subscriptions) {
          context.removeEventListener(
            subscription.type,
            subscription.event,
            subscription.options
          );
        }
      },
    };

    for (let prop in initialValue) {
      const ref = `v-${prop}`;

      console.log('defineProperty:', prop, this._stores[name][ref]);
      if (typeof this._stores[name][ref] === 'undefined') {
        Object.defineProperty(this._stores[name], prop, {
          set: function (value) {
            console.log('set', value);
            this[ref] = value;
            context.dispatchEvent(
              new CustomEvent(`${name}:${prop}`, {
                detail: { prop, value },
              })
            );
          },
          get: function () {
            console.log('get', this[ref]);
            return this[ref];
          },
        });
      }
      this._stores[name][ref] = initialValue[prop];
    }
    console.log(this._stores[name]);
    this._stores[name].subscribe = (prop, callback, options = {}) => {
      if (options.firstRun) {
        callback(this._stores[name][prop]);
      }
      const subscription = {
        type: `${name}:${prop}`,
        event: (e) => callback(e.detail.value),
        options,
      };
      context.addEventListener(
        subscription.type,
        subscription.event,
        subscription.options
      );
      this._stores[name]._subscriptions.push(subscription);

      return () => {
        context.removeEventListener(
          subscription.type,
          subscription.event,
          subscription.options
        );
        const subIndex = this._stores[name]._subscriptions.findIndex(
          (sub) => sub === subscription
        );
        console.log('usubscribe', subIndex);
        if (subIndex > -1) {
          this._stores[name]._subscriptions.splice(subIndex, 1);
        }
      };
    };

    return this._stores[name];
  }

  static unsubscribeAll(context = window) {
    for (const store of Object.values(this._stores)) {
      for (const subscription of store._subscriptions) {
        console.log('unsubscribeAll', subscription.type);
        context.removeEventListener(
          subscription.type,
          subscription.event,
          subscription.options
        );
      }
    }
  }
}

export default Store;
