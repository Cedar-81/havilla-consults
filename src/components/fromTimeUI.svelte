<script lang="ts">
  import { showFromTime, fromTime, ufFromTime, ufToTime, toTime } from "$lib/store";
    import { toast } from "@zerodevx/svelte-toast";
    import dayjs from "dayjs";
  import { Check, ChevronDown, ChevronUp, X } from "lucide-svelte";
    import { onMount } from "svelte";

  let hours = '12';
  let minutes = '00';
  let PM = false;

  $: toTime.set(dayjs(`2000-01-01 ${$ufFromTime}`, 'HH:mm').add(30, 'minute').format('hh:mm A'));

  const padWithZero = (value: number) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  const toggleAMPM = (hoursValue: number) => {
    PM = hoursValue >= 12;
  };

  const incrementHours = () => {
    hours = `${(+hours + 1) % 24}`;
    hours = padWithZero(+hours);
    toggleAMPM(+hours);
  };

  const decrementHours = () => {
    hours = `${(+hours - 1 + 24) % 24}`;
    hours =  padWithZero(+hours);
    toggleAMPM(+hours);
  };

  const incrementMinutes = () => {
    minutes = `${(+minutes + 1) % 60}`;
    minutes = padWithZero(+minutes);
  };

  const decrementMinutes = () => {
    minutes = `${(+minutes - 1 + 60) % 60}`;
    minutes = padWithZero(+minutes);
  };

  onMount(() => {
    if ($ufToTime) {
      toTime.set(dayjs(`2000-01-01 ${$ufFromTime}`, 'HH:mm').add(30, 'minute').format('hh:mm A'))
      hours = dayjs(`2000-01-01 ${$ufFromTime}`, 'HH:mm').hour().toString();
      minutes = padWithZero(dayjs(`2000-01-01 ${$ufFromTime}`, 'HH:mm').minute());

      setTime(false);
    }
  })

  const setTime = (setShow: boolean) => {
    const formattedHours = padWithZero(+hours);
    const formattedTime = dayjs(`2000-01-01 ${formattedHours}:${minutes}`, 'YYYY-MM-DD HH:mm').format('hh:mm A');
    fromTime.set(formattedTime);
    ufFromTime.set(`${formattedHours}:${minutes}`)
    
    showFromTime.set(setShow);
    console.log('from time 2', $ufFromTime, $toTime)
  };
</script>


<div class="flex absolute z-10 items-center space-x-8 py-1 px-8 bg-brand-light rounded w-max">
    <div class="flex items-center space-x-4">
        
        <div class="flex flex-col items-center space-y-1">
            <button on:click={incrementHours}><ChevronUp class="text-white/40 hover:text-white" /></button>
            <input type="text" bind:value={hours} class="p-3 rounded w-12 aspect-square outline-2 outline-brand-light bg-transparent border transition-all text-white border-gray-light" maxlength="2" />
            <button on:click={decrementHours}><ChevronDown class="text-white/40 hover:text-white" /></button>
        </div>
        
        <p class="text-xl text-white font-bold">:</p>
        
        <div class="flex flex-col items-center space-y-1">
            <button on:click={incrementMinutes}><ChevronUp class="text-white/40 hover:text-white" /></button>
            <input type="text" bind:value={minutes} class="p-3 rounded w-12 aspect-square outline-2 outline-brand-light bg-transparent border text-white font-extrabold transition-all border-gray-light" maxlength="2" />
            <button on:click={decrementMinutes}><ChevronDown class="text-white/40 hover:text-white" /></button>
        </div>

        <p class="text-lg text-white font-bold"> {PM ? "PM" : "AM"} </p>

    </div>

    <div class="flex space-x-2">
      <button 
        class="hover:bg-white/15 py-2 px-4 text-white rounded" 
        on:click={() => {
          setTime(!$showFromTime)
          toast.push(`Time set for ${$fromTime} to ${$toTime}`)
        }}
      >
      <Check />
      </button>
      <button 
        class="hover:bg-white/15 py-2 px-4 text-white rounded" 
        on:click={() => {
          showFromTime.set(false)
        }}
      >
      <X />
      </button>

    </div>
</div>