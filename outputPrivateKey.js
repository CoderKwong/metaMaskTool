let password = ''; // metamask passwrod

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
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
  const keyList = [];
  document.querySelector('.account-menu__icon').click();
  const account = document.querySelectorAll(
    '.account-menu__account.account-menu__item--clickable'
  );
  for (let i = 0; i < account.length; i++) {
    console.log(i);
    if (
      !document.querySelector(
        '.account-menu__account.account-menu__item--clickable'
      )
    ) {
      document.querySelector('.account-menu__icon').click();
    }
    await sleep(100);
    const accountList = document.querySelectorAll(
      '.account-menu__account.account-menu__item--clickable'
    );
    // console.log(accountList[i]);
    accountList[i].click();
    await sleep(100);
    document
      .querySelector('.fas.fa-ellipsis-v.menu-bar__account-options')
      .click();
    document.querySelector('button[class="menu-item"]:nth-child(2)').click();
    await sleep(100);
    document
      .querySelectorAll(
        '.button.btn--rounded.btn-secondary.account-details-modal__button'
      )[1]
      .click();
    await sleep(100);
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
    await sleep(100);
    document
      .querySelector(
        '.button.btn--rounded.btn-primary.btn--large.export-private-key-modal__button'
      )
      .click();
    await sleep(100);
    const key = document.querySelector('textarea').value;
    // console.log(key);
    keyList.push(key);
  }
  // console.log(keyList);
  download('key.txt', JSON.stringify(keyList));
}

main();
