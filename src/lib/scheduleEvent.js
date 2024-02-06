import { google } from 'googleapis';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';


const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, process.env.NODE_ENV === 'development' ? "localhost:5173": "https://havilla.vercel.app")

const event = {
  summary: 'Test Event',
  location: 'Test Location',
  start: {
    dateTime: '2024-01-15T12:00:00Z',
    timeZone: 'UTC+1',
  },
  end: {
    dateTime: '2024-01-15T13:00:00Z',
    timeZone: 'UTC+1',
  },
  attendees: [
    { email: 'cedarvidz@gmail.com' },
    { email: 'cedarcreative123@gmail.com' },
  ],
};

export const createEvent = (/** @type {string | null | undefined} */ refresh_token) => {
  oauth2Client.setCredentials({ refresh_token })
  const calendar = google.calendar('v3')
  const response  = calendar.events.insert({
    auth: oauth2Client,
    calendarId: "primary",
    requestBody: event
  })
}
