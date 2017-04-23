# Introduction
At Nova Credit, we're building a system that helps immigrants and lenders access international credit data. Part of this system is called Nova Connect. It's a web app that allows customers from any country to provide different authentication details required by a credit bureau to fetch a report.

As a result, we spent a lot time geeking out about forms. Whereas most forms have a predefined schema (a typical auth form will require a username and password field, for eg.), we need to write form logic that can cater to various uses cases depending on the chosen country.

For this challenge, build a simple version of Nova Connect.

# Pre-requisites
`npm`
Node v7.x. If you don't have a version manager see [here](https://github.com/creationix/nvm/blob/master/README.markdown).

# Usage
To start
```
git clone https://github.com/neednova/simple-connect
npm run start
```

To test
```
npm run test
```

To build
```
npm run build
```

# The challenge
In src/utils, you'll find several .json files each containing a JSON object. The object is similar to the one sent by the the Nova back-end to Nova Connect once a user chooses a country and starts the flow. Start by using to `utils/response1.json` to create a form builder which would pass QA for the following stories:
- As a user, I can choose a country from a list of countries.
- As a user, I can enter data for any given field.
- As a user, I should not be able to submit the form unless all fields pass validations
- As a user, I can use the form on the web and on my phone.

From the JSON, you'll notice a few use cases that your solution should be able to handle:
- types of fields: the form should be able to handle text, select and radio
- validations : when/how should you validate user input to allow for the most seamless user experience.
- error handling: how do you handle and display errors?

Use this repo to get a basic react app setup. We love using Redux to manage state but feel free to use any other system.

A note on validations:
Each field in the JSON object provides a `validation` key which provides information on the required validation logic for that field. Write validation logic for the following three validation types.
ALPHANUMERIC: only letters and numbers should be allowed
PHONE: only numbers should be allowed.
CUSTOM: this field's value should match (or be in the range of) another field's value. See the `field.validation.pairKey` value to know which other field to validate against

# Example
You can see the actual Nova Connect app live here: www.neednova.com/docs.html (click on the 'Import Credit Report' button to launch the modal)

# Criteria:
Important
- does the solution pass QA for the provided user stories and for the various JSON files provided
- is the code production grade?
- is the code well organized/abstracted/DRY

Not important
- UI: we love good UI but this is not a CSS challenge

Bonus
- is the user's life made easier through simple design


# Misc
This repo was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). If you have any issues running the app, contact us or refer to the create-react-app documentation.
