import { AsyncStorage } from 'react-native';

export function get(key) {
  return AsyncStorage.getItem(key);
}

export function set(key, value) {
  return AsyncStorage.setItem(key, value);
}

export function remove(key) {
  return AsyncStorage.removeItem(key);
}
