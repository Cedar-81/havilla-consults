<script>
    import { Instagram, Phone, Twitter } from "lucide-svelte";
    
    let emailContent = {
        name: "",
        subject: "",
        email:"havillaconsults@gmail.com",
        body:"",
    }

    const handleSubmit = () => {
        window.open(`mailto:${emailContent.email}?subject=${emailContent.subject}&body=${emailContent.body}`);
    }
    

    // @ts-ignore
    function handleInputChange(event, field) {
        // @ts-ignore
        emailContent[field] = event.target.value;
    }
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
        <input type="text" name="name" on:input={(e) => handleInputChange(e, 'name')} class="p-3 rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark" placeholder="Name" />
        <input type="text" on:input={(e) => handleInputChange(e, 'subject')} name="subject" class="p-3 rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark" placeholder="Subject" />
        <!-- <input type="text" name="email" on:input={(e) => handleInputChange(e, 'email')} class="p-3 rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark" placeholder="Email" /> -->
        <textarea name="body" on:input={(e) => handleInputChange(e, 'body')} class="p-3 rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark min-h-72" placeholder="Message" />
        <button on:click={handleSubmit} class="btn-primary bg-brand-dark w-full lg:w-[15em]">Send</button>
    </div>
</div>