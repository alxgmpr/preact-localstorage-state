// Wrap the Storage object's methods with proxies to dispatch custom events. Browsers natively expose a `storage` event,
// but this is designed for updates from one frame, so that other frames/tabs/windows can sync themselves. So we proxy
// the CUD methods on localStorage and emit our own
Storage.prototype.setItem = new Proxy(Storage.prototype.setItem, {
  apply(target, thisArg, argumentList) {
    const event = new CustomEvent('localstorage', {
      detail: {
        type: 'setItem',
        key: argumentList[0],
        newValue: argumentList[1],
      },
    })
    Reflect.apply(target, thisArg, argumentList)
    window.dispatchEvent(event)
  },
})

Storage.prototype.removeItem = new Proxy(Storage.prototype.removeItem, {
  apply(target, thisArg, argumentList) {
    const event = new CustomEvent('localstorage', {
      detail: {
        type: 'removeItem',
        key: argumentList[0],
      },
    })
    Reflect.apply(target, thisArg, argumentList)
    window.dispatchEvent(event)
  },
})

Storage.prototype.clear = new Proxy(Storage.prototype.clear, {
  apply(target, thisArg, argumentList) {
    const event = new CustomEvent('localstorage', {
      detail: {
        type: 'clear',
        key: '__all__',
      },
    })
    Reflect.apply(target, thisArg, argumentList)
    window.dispatchEvent(event)
  },
})
