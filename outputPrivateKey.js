let password = ''; // metamask passwrod

function waitElement(selector, times, interval, flag=true){
  var _times = times || -1,
      _interval = interval || 500,
      _selector = selector,
      _iIntervalID,
      _flag = flag;
  return new Promise(function(resolve, reject){
      _iIntervalID = setInterval(function() {
          if(!_times) {
              clearInterval(_iIntervalID);
              reject();
          }
          _times <= 0 || _times--;
          var _self = document.querySelectorAll(_selector);
          if( (_flag && _self.length) || (!_flag && !_self.length) ) {
              clearInterval(_iIntervalID);
              resolve(_iIntervalID);
          }
      }, _interval);
  });
}

function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

async function main() {
  if(!password) {
    alert('Password is null!please check password in code!');
    return;
  }
  const keyList = [];
  document.querySelector('.account-menu__icon').click();
  const account = document.querySelectorAll(
    '.account-menu__account.account-menu__item--clickable'
  );
  try {
    for (let i = 0; i < account.length; i++) {
      console.log(i);
      if (
        !document.querySelector(
          '.account-menu__account.account-menu__item--clickable'
        )
      ) {
        document.querySelector('.account-menu__icon').click();
      }
      await waitElement('.account-menu__account.account-menu__item--clickable')
      const accountList = document.querySelectorAll(
        '.account-menu__account.account-menu__item--clickable'
      );
      accountList[i].click();
      await waitElement('.fas.fa-ellipsis-v.menu-bar__account-options')
      document
        .querySelector('.fas.fa-ellipsis-v.menu-bar__account-options')
        .click();
      document.querySelector('button[class="menu-item"]:nth-child(2)').click();
      await waitElement('.button.btn--rounded.btn-secondary.account-details-modal__button')
      document
        .querySelectorAll(
          '.button.btn--rounded.btn-secondary.account-details-modal__button'
        )[1]
        .click();
      await waitElement('.export-private-key-modal__password-input')
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
        '.export-private-key-modal__password-input'
      );
      setNativeValue(t, password);
      t.dispatchEvent(new Event('input', { bubbles: true }));
      await waitElement('.button.btn--rounded.btn-primary.btn--large.export-private-key-modal__button')
      document
        .querySelector(
          '.button.btn--rounded.btn-primary.btn--large.export-private-key-modal__button'
        )
        .click();
      await waitElement('textarea')
      const key = document.querySelector('textarea').value;
      keyList.push(key);
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log(`总数：${account.length}，完成：${keyList.length}`)
    download('key.txt', JSON.stringify(keyList));
  }
}

main();
