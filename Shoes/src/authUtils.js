const USERS_KEY = "shopease_users";
const CURRENT_USER_KEY = "shopease_current_user";
const CART_PREFIX = "shopease_cart_";
const ADDRESS_PREFIX = "shopease_address_";

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function emailExists(email) {
  return getUsers().some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
}

export function findUser(email, password) {
  return getUsers().find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );
}

export function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getCurrentUser() {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCart(email) {
  const data = localStorage.getItem(CART_PREFIX + email);
  return data ? JSON.parse(data) : [];
}

export function saveCart(email, cart) {
  localStorage.setItem(CART_PREFIX + email, JSON.stringify(cart));
}

export function getAddress(email) {
  const data = localStorage.getItem(ADDRESS_PREFIX + email);
  return data ? JSON.parse(data) : null;
}

export function saveAddress(email, address) {
  localStorage.setItem(ADDRESS_PREFIX + email, JSON.stringify(address));
}
