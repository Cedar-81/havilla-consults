// @ts-ignore
import { redirect } from '@sveltejs/kit';
// @ts-ignore
import { OAuth2Client } from 'google-auth-library';
// @ts-ignore
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import axios from 'axios';
import { supabase } from '$lib/supabaseClient.js';


export const actions = {
    // @ts-ignore
    OAuth2: async({request, cookies})=>{
        const data = await request.formData();
        const paymentCode = data.get("paymentCode")
        const email = data.get("email")
        console.log("Payment code: ", paymentCode)
        
        // @ts-ignore
        const verificationStatus = await verifyPayment(paymentCode?.toString().trim(), email?.toString().trim())
        console.log("Verificarion status", verificationStatus)
        if(verificationStatus != "success") {
            console.log("Please do well to make payment first.")
            return
        }
        
        const booked = await checkBooked(paymentCode)
        if(booked) {
            console.log("Sorry. This payment code has already been used to book an event.")
            return
        }
        

        //store event data
        const { error } = await storeEventData(data)
        if(!error.success) {
            console.log("Couldn't store event details \n", error.message)
            return
        }
       
        // @ts-ignore
        const redirectURL = process.env.NODE_ENV === 'development' ? "http://localhost:5173/oauth": "https://havilla.vercel.app/oauth";

        const oAuth2Client = new OAuth2Client(
            CLIENT_ID,
            CLIENT_SECRET,
            redirectURL
        );
        
        // Generate the url that will be used for the consent dialog.
        const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile  openid  https://www.googleapis.com/auth/calendar',
        prompt: 'consent'
        });

        try{
          // Set the cookie using context.cookies.set
            // @ts-ignore
            cookies.set('payment-cookie', paymentCode, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: false, // Set to true if your application is served over HTTPS
                maxAge: 60 * 60 * 24 * 30 // Set the desired maxAge (in seconds)
            });
        } catch(error) {
            console.log("couldnt set cookie", error)
            return
        }
        // Append paymentCode as a query parameter
        // @ts-ignore
        console.log("time to redirect to: ", authorizeUrl)
        throw redirect(302, authorizeUrl);
    }

}


/**
 * @param {any} event_data
 */
async function storeEventData(event_data) {
    const { error } = await supabase
        .from('Events')
        .update({ 
            name: event_data.get("name"),
            email: event_data.get("email"),
            booked: false,
            start_time: event_data.get("startTime"),
            end_time: event_data.get("endTime"),
            title: event_data.get("title"),
            desc: event_data.get("extraInformation"),
        })
        .eq('payment_code', event_data.get("paymentCode"))

    if(error) {
        return { error: {success: false, message: error.message} }
    }

    return {error: {success: true,  message: null}}
}

/**
 * @param {any} code
 */
async function checkBooked(code) {

    const { data, error } = await supabase
        .from('Events')
        .select('booked')
        .eq('payment_code', code)

    console.log("data for booked: ", data)

    if(error) {
        console.log("An error occured: ", error)
        return
    }

    console.log("Check booked data: ", data)

    return data[0].booked
}


/**
 * @param {any} code
 * @param {any} email
 */
async function verifyPayment(code, email) {
    const secretKey = 'sk_test_3367ec8363b78e87398d865c80bc3f97bd2832fa'; // Replace with your actual Paystack secret key
    const url = `https://api.paystack.co/transaction/verify/${code}`;

    const headers = {
        Authorization: `Bearer ${secretKey}`,
    };

    try {
        const response = await axios.get(url, { headers });
        console.log(response.data);
        await updateDb(code, email)
        return response.data.data.status;
    } catch (error) {
        // @ts-ignore
        console.error('Error:', error.response ? error.response.data : error.message);
        // You might want to throw the error or handle it based on your use case
        throw error;
    }
}

// @ts-ignore
async function updateDb(code, email) {
    console.log("in hereee ")
    const { error } = await supabase
        .from('Events')
        .insert({
            payment_code: code,
            email: email,
        });

    if (error) {
        console.log("Error storing data", error);
        return;
    }

}
