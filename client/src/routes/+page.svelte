<script>
    import { Toaster } from 'svelte-french-toast';
    import { isAuthenticated } from '../authStore.js';
    import Login from '../Login.svelte';
    import Register from '../Register.svelte';
    import Dashboard from '../Dashboard.svelte';

    let showRegister = $state(false);
</script>

<Toaster />

<main>
    {#if $isAuthenticated}
        <Dashboard />
    {:else}
        {#if showRegister}
            <Register />
            <p>Already have an account?
                <button onclick={() => showRegister = false}>Login</button>
            </p>
        {:else}
            <Login />
            <p>Need an account?
                <button onclick={() => showRegister = true}>Sign up</button>
            </p>
        {/if}
    {/if}
</main>