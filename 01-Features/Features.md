# Features

## api.ts & api.test.ts

Unit tests are almost always in memory tests, not doing calls over the network
If you want to test code that would usually make a network calls there are way to "Mock" out the functionality

Notice in the api.test.ts file we "mock" out axios our library that is hitting the api. We are able to override the .get behavior to serve up json that is saved in the test folder.
<br>

&nbsp;
&nbsp;
---
## callback.ts callback.test.ts

Often in Typescript we write functions that take in callbacks. And you might want to validate the the callback was called.
Here is a toy example where we check that when you call a function that takes a callback, that the callback is fired the expected number of times.

