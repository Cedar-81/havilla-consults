import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { google } from 'googleapis';
import { supabase } from '$lib/supabaseClient.js';

// @ts-ignore
let event;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, process.env.NODE_ENV === 'development' ? "localhost:5173": "https://havilla.vercel.app")

/**
 * @param {string | null | undefined} access_token
 */
async function getUserData(access_token) {

  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  console.log('response',response);
  const data = await response.json();
  console.log('data',data);
}


// @ts-ignore
export const GET = async ({ url, cookies}) => {
    const redirectURL = process.env.NODE_ENV === 'development' ? "http://localhost:5173/oauth": "https://havilla.vercel.app/oauth";
    const code = url.searchParams.get('code');
    const paymentCode = url.searchParams.get('paymentCode');
    console.log("PaymentCode", paymentCode)
    // const paymentCode = localStorage.getItem("havilla_payment_code");

    // const { error } = await getEventData(paymentCode)
    // if(!error.success) {
    //   console.log("Could't retrive event data", error.message)
    //   return new Response(JSON.stringify({error: error}))
    // }

    let cred;

      try {
          const oAuth2Client = new OAuth2Client(
            CLIENT_ID,
            CLIENT_SECRET,
              redirectURL
            );
          // @ts-ignore
          const r = await oAuth2Client.getToken(code);
  
          // Make sure to set the credentials on the OAuth2 client.
          // @ts-ignore
          oAuth2Client.setCredentials(r.tokens);
          console.info('Tokens acquired.');
          const user = oAuth2Client.credentials;
          console.log('credentials',user);
          
          await getUserData(user.access_token);
          cred = user.refresh_token
          // createEvent(user.refresh_token)
  
        } catch (err) {
          console.log('Error logging in with OAuth2 user', err);
      }


    let redirect_url =cred && `create-event?ref=${encodeURIComponent(cred?.toString().trim())}`
    
    // @ts-ignore
    throw redirect(303, redirect_url);
};


const getEventData = async (/** @type {any} */ code) => {
  const { data, error } = await supabase
    .from('Events')
    .select()
    .eq('payment_code', code)
  
  if(error) {
    return { error: { success: false, message: error.message}}
  }

  event = {
    // @ts-ignore
    'summary': data.title,
    'location': '',
    // @ts-ignore
    'description': data.desc,
    'start': {
      // @ts-ignore
      'dateTime': data.start_time,
      'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    'end': {
      // @ts-ignore
      'dateTime': data.end_time,
      'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    'attendees': [
      {'email': 'lpage@example.com'},
      {'email': 'sbrin@example.com'}
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
  const response  = calendar.events.insert({
    auth: oauth2Client,
    calendarId: "primary",
    // @ts-ignore
    requestBody: event
  })
}