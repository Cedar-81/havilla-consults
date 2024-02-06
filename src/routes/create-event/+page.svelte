<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { Loader2 } from "lucide-svelte";
    import { onMount } from "svelte";
    
    let ref = $page.url.searchParams.get('ref')

    async function createEvent() {
        const url = `/api/booking?ref=${ref}`;
        console.log(ref)

        try {
            const response = await fetch(url, {method: 'GET'});

            console.log("response: ", response)

            if (response.ok) {
                // Handle success
                console.log('OAuth2 request successful');
            } else {
                // Handle error
                console.error('OAuth2 request failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    onMount(async () => {
        if(ref) {
            console.log(
                "creatinig event"
            )
            await createEvent()
            console.log("created event")
            goto("/")
        }
        goto("/")
    })
</script>
<div class="absolute top-0 right-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
    <Loader2 class="h-28 w-28 text-brand-light animate-spin" />
</div>