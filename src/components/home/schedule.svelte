<script lang="ts">
	import Calendar from '../calendar.svelte';
</script>
  
<div class="mx-5 lg:mx-0 lg:flex lg:justify-center">
  <div class="flex flex-col-reverse lg:flex-row lg:space-x-20 lg:space-y-0">
    <div class="w-full lg:w-max space-y-10 mt-14 lg:space-y-0 lg:mt-0">
      <Calendar />
      <button class="btn-primary bg-brand-dark w-[15em] lg:hidden">Book consultation</button>
    </div>
    <div class="space-y-5 lg:w-[30rem]">
      <h3 class="text-2xl lg:text-3xl font-medium text-brand-dark">Ready to Begin Your Journey? Book a consultation now</h3>
      <p class="">Take the first step towards your global education adventure. Schedule a consultation with our expert advisors today</p>
      <button class="btn-primary bg-brand-dark w-[15em] hidden lg:flex">Book consultation</button>
    </div>
  </div>
</div>