Who: Paul Lucero, Kyle McDevitt, Daniel Parache, Brittany Choy, Cayleb Langhals, Nick Curie
Title: Shared Spaces App
Vision: Living with roommates is tough, we make it easier.
Automated Tests: We are using the Mocha and Chai Javascript frameworks to automate testing of the backend. This is crucial to ensure that the server can handle a wide variety of requests without crashing or producing incorrect output. Mocha is the library which performs the tests, and Chai is the assertion framework which ensures that all set conditions are met and alerts Mocha if any fail. The documentation for each can be found at [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/api/bdd/). To actually test the project, one requires access to the server, as all of the tests are local to the EC2 instance that the server processor is hosted on, and rely on the architecture being the same as the EC2 instance. From the instance, it is as simple as running

```
cd /srv/SharedSpacesDeployment/server
npm test
```

A reference output is provided below.

![Screenshot of the test results from Mocha](Link)

User Acceptance Tests: These can be found at UATPLAN.pdf.