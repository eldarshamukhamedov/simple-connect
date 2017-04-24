# Introduction
At Nova Credit, we're building a system that helps immigrants and lenders access international credit data. Part of this system is called [NovaConnect](https://neednova.com/docs.html). It's a widget that allows applicants from any country to apply through the same portal. Every country that is on Nova's platform requires a completely different set of personal data from that applicant in order to generate a match in their local databases. The number of data-points required from the applicant can be quite big. In order to have the NovaConnect widget remain lightweight we have created an in-house spec independent of the country.

To make NovaConnect independent of the country we have spent a lot of time geeking out on form-structures. The internal spec we have written is a JSON structure that defines the format of the form to be rendered in NovaConnect. This JSON structure is fetched from the back-end of Nova when the applicant has chosen their country.

For this challenge, build a simple version of NovaConnect.

# Pre-requisites
- `npm`
- Node v7.x. If you don't have a version manager see [here](https://github.com/creationix/nvm/blob/master/README.markdown).

# Usage
To start
```
git clone https://github.com/neednova/simple-connect
npm run start
```

To test
```
npm test
```

To build
```
npm run build
```

# The challenge
In `src/utils`, you'll find two .json files. The JSON objects are similar to the structures sent back by the Nova back-end to NovaConnect once a user chooses a country. Start by creating a country selector page that will initiate a fetch from the back-end for the form structure JSON of that specific country. You can stub out the back-end call by just ingesting JSON files in the `utils` directory. Once the input to the form you have rendered is valid, the user should be able to 'proceed' which can just be a flag that you set somewhere (or log to console). Your country-independent form builder has to handle the following:
- *types of fields*: the form should be able to handle `TEXT`, `SELECT` and `RADIO`-button fields.
- *validations*: the types of validations on fields can be `DATE`, `ALPHANUMERIC`, `PHONE`, and `DATE`. If the validation type is not a string but on object, it is subject to custom validation. See below for more information on these validation types. It's up to you when/how you should validate user input to allow for the most seamless user experience.
- *error handling*: show appropriate messages if invalid

Use this repo to get a basic react app setup. We like using [ReDux](http://redux.js.org/) to manage state but feel free to use any other system.

## Validations
Each field in the JSON object provides a `validation` key which contains information on the required validation logic. Write validation logic for the following four validation types.
- *DATE*: ISO 8601
- *ALPHANUMERIC*: only letters and numbers should be allowed
- *PHONE*: Phone format

When the validation key has an object as it's value it means that it's a complex validation where the field's validity depends on it's own type of validation *and* whether another field in the JSON form structure matches a RegExp pattern. As an example:
```
{
	key: 'state'
	validation: {
		type: 'ALPHANUMERIC',
		dependsOn: 'zipcode',
		pattern: '/[A-Z]\d{6}/'
	}
}
```

# Example
For your reference, you can see the actual NovaConnect app live [here](https://neednova.com/docs.html) (click on the 'Import Credit Report' button to launch the widget)

# Criteria:
Important
- Does the solution pass our internal tests that are written to adhere to the assumptions in this guide?
- Is the code production grade?
- Is the code well organized/abstracted/DRY?

# Misc
This repo was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). If you have any issues running the app, contact us or refer to the create-react-app documentation.
