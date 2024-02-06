<script>
    import Bookingcalendar from "./booking/bookingcalendar.svelte";
    import Bookingform from "./booking/bookingform.svelte";
</script>

<div class="mt-24 mx-5 lg:mx-[80px] space-y-12 mb-20 ">
    <h1 class="text-2xl lg:text-4xl font-bold text-center text-brand-dark">
        Pick a time that works for you let’s talk and get you <br class="hidden lg:block" /> on the right path for your future
    </h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        <Bookingcalendar />
        <Bookingform />
    </div>
</div>