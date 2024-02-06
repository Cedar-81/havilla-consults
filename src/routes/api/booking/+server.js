import { json } from '@sveltejs/kit'
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { supabase } from '$lib/supabaseClient.js';
import { google } from 'googleapis';

// @ts-ignore
export async function GET({request, cookies, url}) {

    console.log("got to creating event: ", url)
    const access_token = url.searchParams.get('ref');
    const  payment_code = cookies.get("payment-cookie")
    console.log(access_token, payment_code)
    
    if(!payment_code) {
      return json({msg: "Failed to create event"}, {status: 304})
    }

    let {error} = await getEventData(payment_code)
    if(!error.success) {
        console.log("Couldn't retrieve event data: ", error)
    }
    console.log(event)

    await createEvent(access_token)


    console.log("enemies: ", access_token, payment_code)
    return json({msg: "Event created successfully"}, {status: 200})

}


/**
 * @type {{ 
// @ts-ignore
summary: any; location: string; 
// @ts-ignore
description: any; start: { 
// @ts-ignore
dateTime: any; }; end: { 
// @ts-ignore
dateTime: any; }; attendees: { email: string; }[]; reminders: { useDefault: boolean; overrides: { method: string; minutes: number; }[]; }; }}
 */
let event;
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, process.env.NODE_ENV === 'development' ? "localhost:5173": "https://havilla.vercel.app")

const getEventData = async (/** @type {any} */ code) => {
    const { data, error } = await supabase
      .from('Events')
      .select()
      .eq('payment_code', code)


    console.log(data)

    
    
    if(error) {
      return { error: { success: false, message: error.message}}
    }
  
    event = {
      // @ts-ignore
      'summary': data[0].title,
      'location': '',
      // @ts-ignore
      'description': data[0].desc,
      'start': {
        'dateTime': data[0].start_time,
        // @ts-ignore
        // 'timeZone': 'UTC'
      },
      'end': {
        // @ts-ignore
        'dateTime': data[0].end_time,
        // @ts-ignore
        // 'timeZone': 'UTC'
      },
      'attendees': [
        {'email': 'lpage@example.com'},
        {'email': 'sbrin@example.com'},
        {'email': 'havillaconsult@gmail.com'},
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10}
        ]
      }
    };
    return { error: { success: true, message: null}}
  }
  
const createEvent = (/** @type {string | null | undefined} */ refresh_token) => {
    oauth2Client.setCredentials({ refresh_token })
    const calendar = google.calendar('v3')
    // @ts-ignore
    // @ts-ignore
    const response  = calendar.events.insert({
      auth: oauth2Client,
      calendarId: "primary",
      // @ts-ignore
      requestBody: event
    })
}