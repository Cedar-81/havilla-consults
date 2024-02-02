<script>

    import { activeNavLink } from "$lib/store";

</script>
<div class="relative lg:grid grid-cols-2 h-[100vh] gap-20">
    <div class="relative w-screen lg:w-full h-full overflow-hidden">
        <img class="absolute h-full w-full object-cover
        " src="assets/abtbannerimg.png" alt="banner" />
        <div class="w-full h-full top-0 right-0 lg:hidden absolute bg-black/70"></div>
    </div>
    <div class="absolute top-0 lg:relative right-0 h-full flex items-center">
        <div class="mt-10 lg:mt-0 w-[80%] space-y-8">
            <div class="space-y-5">
                <h1 class="text-3xl lg:text-4xl font-bold text-brand-light ">About Us</h1>
                <p class="text-sm text-gray-100 lg:text-black lg:text-lg font-medium">
                    Welcome to Havilla Consults, where the pursuit of knowledge meets the boundless opportunities 
                    of a globalized world. Established with a profound dedication to facilitating international 
                    education and relocation, Havilla Consults is more than an educational consulting firm 
                    - it's a gateway to transformative experiences and limitless possibilities.
                </p>
            </div>
            <div class="flex gap-10">
                <a href="/booking"><button on:click={() => activeNavLink.set("/booking")} class="btn-primary bg-brand-light">Book a consultation</button></a>
            </div>
        </div>

    </div>
    
</div>