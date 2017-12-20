# Shared Spaces App
### A mobile app to make living with (and communicating with) your roommates easier
Shared Spaces is an app designed to make communicating the annoying bits of living with roommates (whose turn it is to take out the trash, whose job it is to get the kitchen sink repaired, who's paying for groceries, etc.) that much easier.

Shared Spaces is available as an Android app. The source code for this app can be found in the `android-studio` directory of this repository. Other defunct frontends can be found in the `react` and `react-native` folders. The server is written in Node.JS with ExpressJS as the main routing framework. Its source code is available in the `server-side` folder, and is broken down into `api` (containing the actual logic) and `test` (containing a comprehensive test suite, runnable using the Mocha framework for NodeJS.)

To run the test suite (assuming that Node version 8 or higher is installed on your machine):

```
git clone https://github.com/p-lucero/SharedSpacesApp.git
cd SharedSpacesApp/server-side
npm i && npm test
```

Compilation and usage of the UI can be done through Android Studio. This requires importing the project into Android Studio and then clicking the "Run" button on the top bar.