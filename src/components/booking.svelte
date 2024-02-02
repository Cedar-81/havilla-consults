<script>
    import Bookingcalendar from "./booking/bookingcalendar.svelte";
    import Bookingform from "./booking/bookingform.svelte";
</script>

<div class="mt-24 mx-[80px] space-y-12 mb-20">
    <h1 class="text-3xl lg:text-4xl font-bold text-brand-light text-center lg:text-brand-dark">
        Pick a time that works for you let’s talk and get you <br /> on the right path for your future
    </h1>
    <div class="grid grid-cols-2 gap-20 items-center">
        <Bookingcalendar />
        <Bookingform />
    </div>
</div>