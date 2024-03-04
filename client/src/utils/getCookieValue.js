export function getCookieValue(cookieName) {
  const cookies = document.cookie.split(';')
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith(cookieName + '='));

  return cookies ? cookies.split('=')[1] : null;
}