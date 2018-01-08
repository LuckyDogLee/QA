import format from '../utils';

export function apiLogin(account, password, captcha) {
  const params = format({
    account,
    password,
    captcha,
  });
  const url = `/api/auth/login?${params}`;

  return fetch(url, {
    method: 'POST',
    // body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}

export function apiRegister(accountName, email, password) {
  const params = format({
    accountName,
    email,
    psw: password,
  });
  const url = `/api/auth/signIn?${params}`;

  return fetch(url, {
    method: 'POST',
    // body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}
