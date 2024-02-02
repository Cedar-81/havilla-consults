<script>
    import { Instagram, Phone, Twitter } from "lucide-svelte";
</script>

<div id="contact" class='lg:flex mx-5 lg:mx-[80px] lg:space-x-20 space-y-14 lg:space-y-0 justify-center'>
    <div class="space-y-14">
        <div class="space-y-2">
            <h2 class="text-2xl lg:text-3xl text-brand-dark font-semibold mx-auto">Get in touch with us</h2>
            <p class="">Have questions or ready to get started? Our team is here to assist you.</p>
        </div>

        <div class="space-y-4">
            <div class="flex space-x-3 items-center"><Instagram class="h-5 text-brand-light w-5" /> <a href="/"><p>instagramusernamelink</p></a></div>
            <div class="flex space-x-3 items-center"><Phone class="h-5 text-brand-light w-5" /> <p>+2348102232353</p></div>
            <div class="flex space-x-3 items-center"><Twitter class="h-5 text-brand-light w-5" /> <a href="/"><p>instagramusernamelink</p></a></div>
        </div>
    </div>

    <div class="lg:w-[40%] space-y-8">
        <input type="text" class="p-3 rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark" placeholder="Name" />
        <input type="text" class="p-3 rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark" placeholder="Subject" />
        <input type="text" class="p-3 rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark" placeholder="Email" />
        <textarea  class="p-3 rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark min-h-72" placeholder="Message" />
        <button class="btn-primary bg-brand-dark w-full lg:w-[15em]">Send</button>
    </div>
</div>