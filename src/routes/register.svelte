
<script>
    import { goto, stores } from '@sapper/app';
    import { post } from 'utils.js';

    const { session } = stores();

    let name = 'mina';
    let username = 'mina@ho.me';
    let password = 'MinuParool';
    let error = null;

    async function submit(event) {
        const response = await post(`auth/register`, { username, name, password });

        console.log("Submit response: ",response);
        error = response.error;

        if (response.user) {
            $session.user = response.user;
            await goto('/login', {});
        }
    }
</script>

<svelte:head>
    <title>Sign up • Conduit</title>
</svelte:head>

<div class="auth-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign up</h1>
                <p class="text-xs-center">
                    <a href="/login">Have an account?</a>
                </p>

                {#if error}
                    <div class="alert alert-danger">
                        {error}
                    </div>
                {/if}

                <form on:submit|preventDefault={submit}>
                    <fieldset>
                        <div class="mt-2 form-group">
                            <input class="form-control form-control-lg" type="text" required placeholder="Your Name" bind:value={name}>
                        </div>
                        <div class="mt-2 form-group">
                            <input class="form-control form-control-lg" type="email" required placeholder="Email" bind:value={username}>
                        </div>
                        <div class="mt-2 form-group">
                            <input class="form-control form-control-lg" type="password" required placeholder="Password" bind:value={password}>
                        </div>
                    </fieldset>

                    <button class="mt-2 btn btn-lg btn-primary pull-xs-right">
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>