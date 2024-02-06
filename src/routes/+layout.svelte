<script>
    import "../app.css";
    import { SvelteToast } from '@zerodevx/svelte-toast'
	  import Navbar from "../components/navbar.svelte";
    import Footer from "../components/footer.svelte";
  </script>
 
 <div class="3xl:max-w-7xl 3xl:mx-auto">
    <SvelteToast />
    <Navbar />
    <slot />
    <Footer />
 </div>