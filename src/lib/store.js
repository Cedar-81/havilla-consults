// src/stores/counter.js
import { writable } from 'svelte/store';

// Create a writable store
const fromTime = writable("12:00");
const toTime = writable("12:00");
const ufFromTime = writable("12:00");
const ufToTime = writable("12:00");
const eventDate = writable("2024-02-16")
const activeUrl = writable("/")
const showFromTime = writable(false)
const showToTime = writable(false)
const activeNavLink = writable("/")
const eventForm = writable({
    name: '',
    email: '',
    paymentCode: '',
    extraInformation: '',
})

// Export the store and its methods
export { fromTime, toTime , showFromTime, showToTime, activeNavLink, eventForm, eventDate, ufFromTime, ufToTime, activeUrl };
