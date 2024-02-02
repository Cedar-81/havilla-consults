<script lang="ts">
    import dayjs from "dayjs";
    import { onMount } from "svelte";
    import { ArrowRight, ChevronLeft, ChevronRight, Clock } from 'lucide-svelte';
    import { generateDate, months } from "$lib/calendar";
    import cn from "$lib/cn";
    import FromTimeUi from "./fromTimeUI.svelte";
    import { fromTime, showFromTime, toTime, showToTime } from "$lib/store";
    import ToTimeUi from "./toTimeUI.svelte";
  
    let currentDate = dayjs();
    let today = currentDate;
    let selectDate = currentDate;
    let days = ["S", "M", "T", "W", "T", "F", "S"];
  
    onMount(() => {
      // Use this block for any code that should run after the component is mounted.
    });
  
    function handlePreviousMonth() {
      today = today.month(today.month() - 1);
    }
  
    function handleToday() {
      today = currentDate;
    }
  
    function handleNextMonth() {
      today = today.month(today.month() + 1);
    }
  
    function handleDateClick(date: dayjs.Dayjs) {
      selectDate = date;
    }
  </script>
  
  <div class="h-max">
    <div class="lg:w-full h-max p-4 pt-8 bg-brand-light/15">
      <div class="flex justify-between items-center mx-4">
        <h1 class="select-none font-semibold">
          {months[today.month()]}, {today.year()}
        </h1>
        <div class="flex gap-10 items-center">
            <button on:click={handlePreviousMonth}>
                <ChevronLeft
                  class="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                  
                />
            </button>
          <button
            class="cursor-pointer hover:scale-105 transition-all"
            on:click={handleToday}
          >
            Today
          </button>

          <button on:click={handleNextMonth}>
              <ChevronRight
                class="w-5 h-5 cursor-pointer hover:scale-105 transition-all"          
              />
          </button>
        </div>
      </div>
      <div class="grid grid-cols-7 mt-4 ">
        {#each days as day }
          <h1
            class="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none" 
          >
            {day}
          </h1>
        {/each}
      </div>
      <div class=" grid grid-cols-7 ">
        {#each generateDate(today.month(), today.year()) as { date, currentMonth, today }}
          <div
            class="p-2 text-center h-14 grid place-content-center text-sm"
          >
            <button
              class={cn(
                currentMonth ? "" : "text-gray-400",
                today ? "bg-brand-dark text-white" : "",
                selectDate.toDate().toDateString() === date.toDate().toDateString()
                  ? "bg-brand-light/80 text-white"
                  : "",
                "h-10 w-10 rounded-full grid place-content-center hover:bg-brand-light/20 hover:text-black transition-all cursor-pointer select-none"
              )}
              on:click={() => handleDateClick(date)}
            >
              {date.date()}
              </button>
          </div>
        {/each}
      </div>
      <div class="flex items-center justify-center">
        <div class="flex space-x-4 items-center py-4">
          <div class="flex items-center relative justify-between w-[8em] px-3 border-brand-light border-2 rounded">
            <input type="text" bind:value={ $fromTime } class="p-2 rounded w-20 flex items-center justify-center aspect-video bg-transparent transition-all outline-none" maxlength="5" />
            <button on:click={() => showFromTime.set(!$showFromTime)} class=""><Clock class="h-5 w-5 text-gray-600" /></button>
            <div class={`${$showFromTime ? "block" : "hidden"}`}>
              <FromTimeUi />
            </div>
          </div>
          <ArrowRight class="text-gray-500" />
          <div class="flex items-center relative justify-between w-[8em] px-3 border-brand-light border-2 rounded">
            <input type="text" bind:value={ $toTime } class="p-2 rounded w-20 flex items-center justify-center aspect-video bg-transparent transition-all outline-none" maxlength="5" />
            <button on:click={() => showToTime.set(!$showToTime)} class=""><Clock class="h-5 w-5 text-gray-600" /></button>
            <div class={`${$showToTime ? "block" : "hidden"}`}>
              <ToTimeUi />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="h-96 w-96 sm:px-5">
      <h1 class="font-semibold">
        Schedule for {selectDate.toDate().toDateString()}
      </h1>
      <p class="text-gray-400">No meetings for today.</p>
    </div> -->
  </div>
  