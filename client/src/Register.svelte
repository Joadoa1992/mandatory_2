<script>
    import toast from 'svelte-french-toast';

    let email = $state('');
    let password = $state('');

    async function handleRegister(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            toast.success('Account created!');
        } else {
            toast.error(data.message || 'Registration failed');
        }
    }
</script>

<form onsubmit={handleRegister}>
    <h2>Create Account</h2>
    <input type="email" bind:value={email} placeholder="Email" required />
    <input type="password" bind:value={password} placeholder="Password" required />
    <button type="submit">Sign Up</button>
</form>