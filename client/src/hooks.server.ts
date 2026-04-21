import {redirect} from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
    const token = event.cookies.get('session');

    if (event.url.pathname.startsWith('/dashboard') && !token) {
        throw redirect(303, '/login');
    }

    return await resolve(event);
};