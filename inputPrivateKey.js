let keyList = [];

function waitElement(selector, times, interval, flag = true) {
  var _times = times || -1,
    _interval = interval || 500,
    _selector = selector,
    _iIntervalID,
    _flag = flag;
  return new Promise(function (resolve, reject) {
    _iIntervalID = setInterval(function () {
      if (!_times) {
        clearInterval(_iIntervalID);
        reject();
      }
      _times <= 0 || _times--;
      var _self = document.querySelectorAll(_selector);
      if ((_flag && _self.length) || (!_flag && !_self.length)) {
        clearInterval(_iIntervalID);
        resolve(_iIntervalID);
      }
    }, _interval);
  });
}

async function main(keyList) {
  if (keyList.length < 1) {
    alert('please add private key list');
    return;
  }
  for (let i = 0; i < keyList.length; i++) {
    key = keyList[i];
    if (
      !document.querySelector(
        '.account-menu__account.account-menu__item--clickable'
      )
    ) {
      document.querySelector('.account-menu__icon').click();
    }
    await waitElement('.account-menu__item.account-menu__item--clickable');
    document
      .querySelectorAll('.account-menu__item.account-menu__item--clickable')[1]
      .click();
    await waitElement('.new-account-import-form__input-password');
    function setNativeValue(element, value) {
      const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
      const prototype = Object.getPrototypeOf(element);
      const prototypeValueSetter = Object.getOwnPropertyDescriptor(
        prototype,
        'value'
      ).set;

      if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
      } else {
        valueSetter.call(element, value);
      }
    }
    const t = document.querySelector(
      '.new-account-import-form__input-password'
    );
    setNativeValue(t, key);
    t.dispatchEvent(new Event('input', { bubbles: true }));
    document
      .querySelector(
        'button.button.btn--rounded.btn-primary.btn--large.new-account-create-form__button'
      )
      .click();
  }
}

main(keyList);
