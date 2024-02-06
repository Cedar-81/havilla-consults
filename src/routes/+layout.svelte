<script>
    import "../app.css";
    import { SvelteToast } from '@zerodevx/svelte-toast'
	  import Navbar from "../components/navbar.svelte";
  </script>
 
 <SvelteToast />
 <Navbar />
<slot />