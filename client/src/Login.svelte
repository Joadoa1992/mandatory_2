<script>
    import toast from 'svelte-french-toast';
    import { isAuthenticated } from './authStore.js';

    let email = $state('');
    let password = $state('');

    async function handleLogin(event) {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                isAuthenticated.set(true);
                toast.success('Welcome back!');
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (error) {
            toast.error('Server connection failed');
        }
    }
</script>

<form onsubmit={handleLogin}>
    <h2>Login</h2>
    <input type="email" bind:value={email} placeholder="Email" required />
    <input type="password" bind:value={password} placeholder="Password" required />
    <button type="submit">Log In</button>
</form>