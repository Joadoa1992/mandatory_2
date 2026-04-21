<script>
    import { onMount } from 'svelte';
    import { logout } from './authStore.js';

    let message = $state("");
    let secretData = $state("");

    onMount(async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3000/dashboard', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                message = data.message;
                secretData = data.secretData;
            } else {
                console.error("Auth failed, logging out...");
                logout();
                window.location.href = '/';
            }
        } catch (err) {
            console.error("Fetch error:", err);
        }
    });
</script>

<main>
    {#if message}
        <h1>{message}</h1>
        <p>{secretData}</p>
        <button onclick={logout}>Sign Out</button>
    {:else}
        <p>Loading secure data...</p>
    {/if}
</main>