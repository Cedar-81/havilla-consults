<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { AlignRight } from "lucide-svelte";
    import { page } from '$app/stores';
    import { activeNavLink, activeUrl } from '$lib/store';


  
    let showNav = false;
    $: activeNavLink.set($activeUrl);
    console.log("active url", $activeUrl)
    
    
    function toggleNav() {
      console.log("clicked")
      showNav = !showNav;
    }
    
    onMount(() => {
      activeUrl.set($page.url.pathname == "/" ? "/home" : `${$page.url.pathname}`)
      console.log("active url", $activeUrl)
      // Check if running on the client side before calling goto
      if (import.meta.env.browser) {
        goto($activeNavLink);
      }
    });
  </script>
  
  <div class={`flex justify-between px-5 3xl:max-w-7xl left-[50%] -translate-x-[50%] lg:px-[80px] py-4 fixed top-0 right-0 w-full z-40 bg-white ${!showNav ? "h-max" : "h-full items-start"}`}>
    <img class="h-[33px]" src="/assets/logo.png" alt="havilla logo" />
  
    <ul class={`fixed flex flex-col top-0 left-0 h-full lg:w-min bg-white z-50 lg:relative lg:flex-row lg:items-center lg:space-x-8 pt-10 lg:pt-0 transition-all ${!showNav && "hidden overflow-hidden !lg:w-[30em] lg:flex"}`}>
      {#each [
        { href: '/home', text: 'Home' },
        { href: '/about', text: 'About' },
        { href: '/booking', text: 'Booking' }
      ] as { href, text }}
        <a href={href} class="w-full relative z-40 bg-white">
          <button class="w-full" on:click={() => {
            (activeNavLink.set(href))
            showNav = !showNav
          }}><li
            class={`text-lg w-full text-left lg:text-center px-8 lg:px-0 py-2 ${$activeNavLink === href && 'font-bold text-brand-light'} lg:py-0`}
            
          >
            <p class="text-lg">{text}</p>
          </li></button>
        </a>
      {/each}
      <div class="w-full flex lg:hidden px-8">
        <a href="#booking"><button class="btn-primary mt-8 bg-brand-light">Book a call</button></a>
      </div>
    </ul>
  
    <a href="/booking"><button class="btn-primary bg-brand-light hidden lg:flex">Book a call</button></a>
    <button class="lg:hidden" on:click={toggleNav}>
      <AlignRight class="text-gray-600" />
    </button>
  </div>
  