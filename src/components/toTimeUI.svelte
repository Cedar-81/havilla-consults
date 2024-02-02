<script lang="ts">
    import { showToTime, toTime } from "$lib/store";


    import { ChevronDown, ChevronUp } from "lucide-svelte";

    let hours = "12";
    let minutes = "00";

    const padWithZero = (value: number) => {
      return value < 10 ? `0${value}` : `${value}`;
    };

  const incrementHours = () => {
    hours = `${(+hours + 1) % 24}`;
    hours = padWithZero(+hours)
  };

  const decrementHours = () => {
    hours = `${(+hours - 1 + 24) % 24}`;
    hours =  padWithZero(+hours)
  };

  const incrementMinutes = () => {
    minutes = `${(+minutes + 1) % 60}`;
    minutes = padWithZero(+minutes)
  };

  const decrementMinutes = () => {
    minutes = `${(+minutes - 1 + 60) % 60}`;
    minutes = padWithZero(+minutes)
  };

  const setTime = () => {
    toTime.set(`${hours}:${minutes}`)
    showToTime.set(!$showToTime)
  }

</script>

<div class="flex absolute z-10 items-center space-x-8 py-1 px-8 bg-brand-light rounded w-max">
    <div class="flex items-center space-x-4">
        
        <div class="flex flex-col items-center space-y-1">
            <button on:click={incrementHours}><ChevronUp class="text-white/10 hover:text-white" /></button>
            <input type="text" bind:value={hours} class="p-3 rounded w-12 aspect-square outline-2 outline-brand-light bg-transparent border transition-all border-gray-light" maxlength="2" />
            <button on:click={decrementHours}><ChevronDown class="text-white/10 hover:text-white" /></button>
        </div>
        
        <p class="text-xl text-white font-bold">:</p>
        
        <div class="flex flex-col items-center space-y-1">
            <button on:click={incrementMinutes}><ChevronUp class="text-white/10 hover:text-white" /></button>
            <input type="text" bind:value={minutes} class="p-3 rounded w-12 aspect-square outline-2 outline-brand-light bg-transparent border transition-all border-gray-light" maxlength="2" />
            <button on:click={decrementMinutes}><ChevronDown class="text-white/10 hover:text-white" /></button>
        </div>

    </div>

    <button class="bg-brand-dark/15 py-2 px-4 rounded" on:click={setTime}>Done</button>
</div>