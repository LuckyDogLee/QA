import format from '../utils';

export default function (account, password, captcha) {
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
