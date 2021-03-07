const functions = require('firebase-functions');
const admin = require('firebase-admin');

const {OAuth2Client} = require('google-auth-library');
const {google} = require('googleapis');
const { Nuxt } = require('nuxt-start')
const nuxtConfig = require('./nuxt.config.js')

admin.initializeApp();

const config = {
  dev: false,
  buildDir: "nuxt",
  build: {
    publicPath: "/assets/"
  }
};
const nuxt = new Nuxt(config);

// TODO: Use firebase functions:config:set to configure your googleapi object:
// googleapi.client_id = Google API client ID,
// googleapi.client_secret = client secret, and
// googleapi.sheet_id = Google Sheet id (long string in middle of sheet URL)
const CONFIG_CLIENT_ID = functions.config().googleapi.client_id;
const CONFIG_CLIENT_SECRET = functions.config().googleapi.client_secret;
const CONFIG_SHEET_ID = functions.config().googleapi.sheet_id;

// TODO: Use firebase functions:config:set to configure your watchedpaths object:
// watchedpaths.data_path = Firebase path for data to be synced to Google Sheet
const CONFIG_DATA_PATH = functions.config().watchedpaths.data_path;

// The OAuth Callback Redirect.
const FUNCTIONS_REDIRECT = `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com/oauthcallback`;

// setup for authGoogleAPI
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const functionsOauthClient = new OAuth2Client(CONFIG_CLIENT_ID, CONFIG_CLIENT_SECRET,
  FUNCTIONS_REDIRECT);

// OAuth token cached locally.
let oauthTokens = null;

// visit the URL for this Function to request tokens
exports.authgoogleapi = functions.https.onRequest((req, res) => {
  res.set('Cache-Control', 'private, max-age=0, s-maxage=0');
  res.redirect(functionsOauthClient.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  }));
});

// setup for OauthCallback
const DB_TOKEN_PATH = '/api_tokens';

// after you grant access, you will be redirected to the URL for this Function
// this Function stores the tokens to your Firebase database
exports.oauthcallback = functions.https.onRequest(async (req, res) => {
  res.set('Cache-Control', 'private, max-age=0, s-maxage=0');
  const code = `${req.query.code}`;
  try {
    const { tokens } = await functionsOauthClient.getToken(code);
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    await admin.database().ref(DB_TOKEN_PATH).set(tokens);
    res.status(200).send('App successfully configured with new Credentials. '
        + 'You can now close this page.');
  } catch (error) {
    res.status(400).send(error);
  }
});

// trigger function to write to Sheet when new data comes in on CONFIG_DATA_PATH
exports.appendrecordtospreadsheet = functions.database.ref(`${CONFIG_DATA_PATH}/{ITEM}`).onCreate(
    (snap) => {
      const newRecord = snap.val();
      return appendPromise({
        spreadsheetId: CONFIG_SHEET_ID,
        range: 'A:C',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [[newRecord.firstColumn, newRecord.secondColumn, newRecord.thirdColumn]],
        },
      });
    });

// accepts an append request, returns a Promise to append it, enriching it with auth
function appendPromise(requestWithoutAuth) {
  return new Promise((resolve, reject) => {
    return getAuthorizedClient().then((client) => {
      const sheets = google.sheets('v4');
      const request = requestWithoutAuth;
      request.auth = client;
      return sheets.spreadsheets.values.append(request, (err, response) => {
        if (err) {
          console.log(`The API returned an error: ${err}`);
          return reject(err);
        }
        return resolve(response.data);
      });
    });
  });
}

// checks if oauthTokens have been loaded into memory, and if not, retrieves them
async function getAuthorizedClient() {
  if (oauthTokens) {
    return functionsOauthClient;
  }
  const snapshot = await admin.database().ref(DB_TOKEN_PATH).once('value');
  oauthTokens = snapshot.val();	
  functionsOauthClient.setCredentials(oauthTokens);
  return functionsOauthClient;
}

// HTTPS function to write new data to CONFIG_DATA_PATH, for testing
exports.testsheetwrite = functions.https.onRequest(async (req, res) => {
  const random1 = Math.floor(Math.random() * 100);
  const random2 = Math.floor(Math.random() * 100);
  const random3 = Math.floor(Math.random() * 100);
  const ID = new Date().getUTCMilliseconds();
  await admin.database().ref(`${CONFIG_DATA_PATH}/${ID}`).set({
    firstColumn: random1,	
    secondColumn: random2,
    thirdColumn: random3,
  });
  res.send(`Wrote ${random1}, ${random2}, ${random3} to DB, trigger should now update Sheet.`);
});

const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Sends an email confirmation when a user changes his mailing list subscription.
exports.sendEmailConfirmation = functions.database.ref('/bookings/{uid}').onWrite(async (change) => {
  // Early exit if the 'subscribedToMailingList' field has not changed
  if (change.after.child('createDatetime').val() === change.before.child('createDatetime').val()) {
    return null;
  }

  const val = change.after.val();

  const mailOptions = {
    from: '"Spammy Corp." <noreply@firebase.com>',
    to: val.email,
  };

  // Building Email message.
  mailOptions.subject = 'Thanks and Welcome!';
  mailOptions.text = 
      'Thanks you for subscribing to our newsletter. You will receive our next weekly newsletter.';
  
  try {
    await mailTransport.sendMail(mailOptions);
    console.log(`New subscription confirmation email sent to:`, val.email);
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
  return null;
});


exports.ssrapp = functions.https.onRequest(async (req, res) => {
  await nuxt.ready();
  nuxt.render(req, res);
});