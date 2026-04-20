import {redirect} from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
    const token = event.cookies.get('session');

    // If trying to access /dashboard without a token, redirect to /login
    if (event.url.pathname.startsWith('/dashboard') && !token) {
        throw redirect(303, '/login');
    }

    return await resolve(event);
};