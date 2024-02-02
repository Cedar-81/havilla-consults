// src/stores/counter.js
import { writable } from 'svelte/store';

// Create a writable store
const fromTime = writable("12:00");
const toTime = writable("12:00");
const showFromTime = writable(false)
const showToTime = writable(false)

// Export the store and its methods
export { fromTime, toTime , showFromTime, showToTime };
