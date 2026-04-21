import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initialToken = browser ? localStorage.getItem('token') : null;

export const isAuthenticated = writable(!!initialToken);

export function logout() {
    if (browser) {
        localStorage.removeItem('token');
    }
    isAuthenticated.set(false);
}