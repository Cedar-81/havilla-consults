<script>
    import { formatDateTime } from "$lib/calendar";
    import { eventForm, eventDate, fromTime, toTime } from "$lib/store";

    let formData = {
      name: '',
      email: '',
      title: '',
      paymentCode: '',
      startTime: ``,
      endTime: ``,
      extraInformation: '',
    };

    $: {
        formData.startTime = formatDateTime($eventDate, $fromTime);
        formData.endTime = formatDateTime($eventDate, $toTime);
    }


    let showPaymentButton = true;

    // @ts-ignore
    function handleInputChange(event, field) {
        // @ts-ignore
        formData[field] = event.target.value;
        eventForm.set(formData);

        console.log(formData.startTime, formData.endTime, $eventDate)

    }

    function payWithPaystack() {

        // @ts-ignore
        let handler = PaystackPop.setup({
            key: 'pk_test_6101d437d218fe27006cf5281a225ac8f4095b0c', // Replace with your public key
            email: formData.email,
            amount: 1000 * 100,
            // onClose: function(){
            //     alert('Window closed.');
            // },
            callback: (/** @type {{ reference: string; }} */ response) => {
                let message = 'Payment complete! Your reciept has been sent to the provided email address';
                formData.paymentCode = response.reference
                showPaymentButton = false
                alert(message);
            }
        });
        
        handler.openIframe();
    }
</script>

<form action="?/OAuth2" method="post" class="lg:w-[80%] space-y-8">
    <input type="text" bind:value={formData.name} name="name" on:input={(e) => handleInputChange(e, 'name')} class="p-3 rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark" placeholder="Name" />
    <input type="text" bind:value={formData.email} name="email" on:input={(e) => handleInputChange(e, 'email')} class="p-3 rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark" placeholder="Email" />
    <input type="text" bind:value={formData.startTime} name="startTime" on:input={(e) => handleInputChange(e, 'start')} class="p-3 hidden rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark" placeholder="Start Datetime" />
    <input type="text" bind:value={formData.endTime} name="endTime" on:input={(e) => handleInputChange(e, 'end')} class="p-3 hidden rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark" placeholder="End Datetime" />
    <input type="text" bind:value={formData.title} name="title" on:input={(e) => handleInputChange(e, 'title')} class="p-3 rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark" placeholder="Event title" />
    <input type="text" bind:value={formData.paymentCode} name="paymentCode" on:input={(e) => handleInputChange(e, 'paymentCode')} class="p-3 hidden rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark" placeholder="Payment code" />
    <textarea bind:value={formData.extraInformation} name="extraInformation" on:input={(e) => handleInputChange(e, 'extraInformation')} class="p-3 rounded outline-2 w-full outline-brand-light border transition-all border-gray-dark min-h-72" placeholder="Any extra information about the event..."></textarea>

    <div class="w-full flex items-center justify-end">
        {#if showPaymentButton}
            <button on:click={payWithPaystack} class="btn-primary bg-green-400 text-white  lg:w-[15em]" type="button">Make Payment</button>
        {/if}
        {#if !showPaymentButton} 
            <button class="btn-primary bg-brand-dark lg:w-[15em]" type="submit">Book call</button>
        {/if}
    </div>
</form>
