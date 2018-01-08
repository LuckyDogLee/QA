export default function (obj) {
  const pairs = [];
  const keys = Object.keys(obj);
  keys.forEach((key) => { pairs.push(`${key}=${obj[key]}`); });
  return pairs.join('&');
}
