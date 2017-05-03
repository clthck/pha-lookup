const twilio = require('twilio');

// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'twilioLookup',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Twilio Lookup',
  display: {
    label: 'Pull Data from Twilio Lookup',
    description: "Retrieves JSON data from Twilio's Lookup."
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      {key: 'phoneNumber', required: true, type: 'string'}
    ],
    perform: (z, bundle) => {
      const client = new twilio.LookupsClient(process.env.TWILIO_LOOKUP_ACCOUNT_SID, process.env.TWILIO_LOOKUP_AUTH_TOKEN);
      return client
        .phoneNumbers(bundle.inputData.phoneNumber)
        .get({
          type: ['carrier', 'caller-name']
        })
        .then(data => ({ data }));
    }
  }
};
