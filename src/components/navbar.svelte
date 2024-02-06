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
  
  <div class="flex justify-between px-5 lg:px-[80px] py-4 fixed top-0 right-0 w-full max-w-full z-40 bg-white">
    <img class="h-[33px]" src="/assets/logo.png" alt="havilla logo" />
  
    <ul class={`fixed flex flex-col top-0 left-0 h-full lg:w-min bg-white z-30 lg:relative lg:flex-row lg:items-center lg:space-x-8 pt-10 lg:pt-0 transition-all ${!showNav ? "w-0 overflow-hidden lg:w-full" : " w-[17em]"}`}>
      {#each [
        { href: '/home', text: 'Home' },
        { href: '/about', text: 'About' },
        { href: '/booking', text: 'Booking' }
      ] as { href, text }}
        <a href={href} class="w-full">
          <button class="w-full" on:click={() => (activeNavLink.set(href))}><li
            class={`text-lg w-full text-left lg:text-center px-8 lg:px-0 py-2 ${$activeNavLink === href && 'font-bold text-brand-light'} border-t lg:border-t-0 lg:py-0`}
            
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
  