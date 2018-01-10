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
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}

export function apiRegister(accountName, email, studentId, password) {
  const params = format({
    accountName,
    email,
    studentId,
    psw: password,
  });
  const url = `/api/auth/signIn?${params}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}

export function apiQueryLable() {
  const url = '/api/lable/query';

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}

export function apiAddQuestion(abstractInfo, detailInfo, lables) {
  const params = format({
    abstractInfo,
    detailInfo,
    lables,
  });
  const url = `/api/question/addNew?${params}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}

export function apiQueryQuestion(page, isOrderByCreateTime) {
  const params = format({
    page,
    isOrderByCreateTime,
  });
  const url = `/api/question/query?${params}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}

export function apiInterestLable(lables) {
  const params = format({
    lables,
  });
  const url = `/api/lable/InterestLable?${params}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}

export function apiQueryMe() {
  const url = '/api/auth/headers';

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}

export function apiLogout() {
  const url = '/api/auth/logout';

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}

export function apiRecommendQuestion() {
  const url = '/api/recommend/question';

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}

export function apiRecommendUser(digit) {
  const params = format({
    digit,
  });
  const url = `/api/recommend/user?${params}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}

export function apiQueryAnswer(questionId, page) {
  const params = format({
    isOrderByCreateTime: false,
    questionId,
    page,
  });
  const url = `/api/answer/query?${params}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}

export function apiConsent(id, isConsent) {
  const params = format({
    id,
    isConsent,
  });
  const url = `/api/answer/consent?${params}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}


export function apiAddAnswer(questionId, answerStr) {
  const params = format({
    questionId,
    answerStr,
  });
  const url = `/api/answer/addNew?${params}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
}
