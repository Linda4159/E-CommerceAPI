import nodemailer from "nodemailer"
import {google} from "googleapis"
import path from "path"
import ejs from "ejs"



// const oAuth = new google.auth.OAuth2()

const GOOGLE_ID="827223708490-r6uia8hqhnlna8fltdslilur0rvjjcp2.apps.googleusercontent.com"

const GOOGLE_SECRET = "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"

const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground"

const GOOGLE_REFRESHTOKEN = "1//04VBX3I4Q7lGsCgYIARAAGAQSNwF-L9IronxB3NUkR7Y18cUUli-FA1Xnd_uxdx0Y3nIUXOrf2ya0LWgtOjWFigf4Fvi9GlUKK1w"

const oAuth = new google.auth.OAuth2(GOOGLE_ID,GOOGLE_SECRET,GOOGLE_REDIRECT)

oAuth.setCredentials({refresh_token: GOOGLE_REFRESHTOKEN})


export const verifyUser = async(name:any)=>{
    try {
        const accessToken = await oAuth.getAccessToken()
        const transporter = nodemailer.createTransport({
    
            service:"gmail", 
            port: 587,
            secure: true,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              type:"oAuth2",
              user: 'poshlindajay@gmail.com',
              refeshToken: GOOGLE_REFRESHTOKEN,
              clientSecret:GOOGLE_SECRET,
              accessToken:accessToken
            }
          })
          const buildFile = path.join(__dirname,"../Views/verifyAccount.ejs")
    } catch (error) {
       console.log("first") 
       console.log(error)
    }
}