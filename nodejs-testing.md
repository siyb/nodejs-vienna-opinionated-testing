% Oppinionated Testing With Node.js
% Patrick Sturm
% 08.05.2017

# Introduction

## Contact

* Patrick Sturm
* E-Mail p.sturm@sphericalelephant.com

## Agenda

* testing with mocha
* asserting ourselves
* mocking with sinon
* testing private API
* integration testing

# Testing With Mocha

## Testing With Mocha - Installation

* before we get started, we need to install mocha, the following command will install mocha globally.

```bash
sudo npm install mocha -g
```

* alternativly, you can add mocha as a test dependency and use an npm test script to start it using: ```npm test```

```bash
npm install mocha --save-dev
```

* pro tip: you can pass command line arguments to npm scripts like this ```npm test -- -g "test"```

## Testing With Mocha - Basic Methods

* **describe** - starts a block and expects a string describing the suite and an empty callback containing the block. Can be nested. Use this to create testsuits and subsuites.
* **it** - denotes an individual test case, expects a string, describing the test case and the done callback, which needs to be called to signify that the test case has completed.
* **before** - is run once before all test cases in the test suite. Expects the done callback.
* **after** - is run once after all test cases in the test suite. Expects the done callback.
* **beforeEach** - is run before all test cases in the test (sub) suite. Expects the done callback.
* **afterEach** - is run before all test cases in the test (sub) suite. Expects the done callback.
* if you forget to call done() where it is required, you will cause a timeout!

# Example 1 - "Basics"

## Testing With Mocha - Context

* mocha supports context, meaning that we temporarily store context specific information.
* please note that test cases are not executed in order and must not rely on each other, therefore do not use the context to transport information between test cases!
* you may use the context to provide fixtures to your test cases or work with the context in **beforeEach** or **afterEach**.
    * we will rely on this heavily later ;).
* now it's a good time to tell you that you can grep for test cases:
    * ```mocha -g "Context"```
    * each test case name is denoted in the slides

# Example 2 - "Context"

## Testing With Mocha - Shared Behaviour

* sometimes, you want to reuse test cases in the context of another test, you may do so with shared behaviours.
* think of behaviours as context driven mixins ;).

# Example 3 - "SharedBehaviour"

## Testing With Mocha - About Reporters

* reporters adjust the output of the test run.
* this can be used for silly stuff, like the nyan reporter ...
* ... or for exporting to various other formats accepted by test analysis tools.
* reporters can be set using the command line and the mocha.opts config file.

## Testing With Mocha - Using Reporters (Command Line)

* Use this command to get a list of all possible reporters ...

```bash
mocha --reporters
```
* ... and use this command to use a custom reporter:

```bash
mocha --reporter nyan
```

## Asserting Ourselves! - Chai Installation

* first off, we need to install chai.

```bash
npm install chai --save-dev
```

## Asserting Ourselves! - Expect Dialects

* chai features three different dialect, **should**, **expect** and **assert**.
* you can use any of those dialects, I prefer expect so I will only show you that dialect.
    * **expect** and **should** are BDD.

```javascript
const expect = require('chai').expect
```

## Asserting Ourselves! - Expect In Action

* **expect** and **should** are both chainable, they support numerous fill words that do not add logic but only improove readablility.
    * e.g.: ***to***, ***be***, ***been***, ***is***, ***that***, ***which***, ***have***, ***at***, ***of***, etc...
* Syntax:
    * expect(something).?[fillword]...?.?[flag]...?.assertion?(somethingElse)?
* Flags:
    * ***not*** can be used to negate the chain and yield the opposite result.
    * the ***deep*** flag can be used to toggle deep assertions of objects.
    * the ***any*** and ***all*** flags are used in conjunction with the key assertion.

## Asserting Ourselves! - Quick comparison

```javascript 
i.should.be.a('better person');
```
very human, but also very invasive, BDD style API.
```javascript 
expect(i).to.equal('better person);
```
slightly less human, not invasive, BDD style API.
```javascript
assert.equal(i, 'better person');
```
every day assertions ;), not very human, not invasive.

# Example 4 - "Assertions"

## Asserting Ourselves - Extending Chai

* chai provides a plugin system which makes it easy to add new test assertion functionality to all dialects.
* supports: chainable method, regular methods, properties and flags.

# Example 5 - "Plugin"

## Mocking with Sinon - Sinon installation

* first off, we need to install sinon.

```bash
npm install sinon --save-dev
```

## Mocking with Sinon - Possibilities

* spies - mocked function, records calls. Available as wrapper or standalone mock.
* stub - programmable spy that allows modifing the program control flow.
    * e.g. control program flow, prevent execution of functions with side effects
* mock - spies with build in assertions,
    * use mocks only on the method that is being tested.
    * -> once per unit test!

## Mocking with Sinon - Spies

```javascript
const sinon = require('sinon');

// anon function
const callback = sinon.spy();
myTestFunction(callback);
expect(callback.called).to.be.true;

// wrapper
sinon.spy(console, 'log');
console.log('test');
expect(console.called).to.be.true;
```

## Mocking with Sinon - Stubs

```javascript
const sinon = require('sinon');

// anon function
const callback = sinon.stub();
myTestFunction(callback);
expect(callback.called).to.be.true;

// wrapper
sinon.stub(console, 'log').returns(1);
expect(console.log('test')).to.equal(1);
expect(console.called).to.be.true;
```

## Mocking with Sinon - Mocks

```javascript
const sinon = require('sinon');

// anon function
const callback = sinon.mock();
myTestFunction(callback);
mock.verify();

// wrapper
sinon.mock(console, 'log').once();
mock.verify();
```

# Example 6 - "Mocking"

## Testing Private API - Problem

* as you well know, node.js expects us to export code using the module system.
* what if our module is comprised of multiple functions, but only one ends up being exported?
* we could split the module up into different module to leverage this issue, but sometimes this does not make sense ...
* ... enter: rewire

## Testing Private API - Rewire Installation

* first off, we need to install rewire.

```bash
npm install rewire --save-dev
```

## Testing Private API - Rewire Introduction

* rewire is a monkey patching framework, explicitly designed for testing.
    * i.e. if I catch any one of you using rewire in production code I will smack you in the balls!
* used like require:

```javascript
const toTest = rewire('./to-test');
```

* use toTest.__get__ and toTest.__set__ or toTest.__with__ to monkey patch the code to test respectively.

## Testing Private API - Limitations

* const can't be monkeypatch (duh...)
* issues with transpilers
* no rewiring of variables inside functions
* does not work on modules that export primitives (duh...)
* globals with invalid variable names are ignored, global object and eval cannot be rewired
* not hot rewiring (i.e. rewire(myObject))

# Example 7 - "Rewire"

## Integration Testing - What Is Integration Testing?

* Does not test a unit, but the correctness of external calls:
    * API
    * Database
* Usually black box testing, in the context of this presentation, we are writing white box tests.
    * Can be written by stake holder or developer
* If you are unit testing databases or APIs with test data, you are doing something wrong, because you are in fact testing the behaviour of external dependencies,
which is something that you should not do in unit tests.
* We are looking at API testing for expressjs today.

## Integration Testing - Supertest Installation

* first off, we need to install supertest.

```bash
npm install rewire --save-dev
```

## Integration Testing - Supertest Explained

* http test framework build on top of superagent.
* works by accessing the app object created by express().
    * you do not need to start a webserver by calling app.listen to test your app.
    * call the routes and lets them run as if they were accessed via the web API ...
    * ... while still having to option to alter the application state for testing ;)

# Example 8 - "Integration Test"

# Any Questions?