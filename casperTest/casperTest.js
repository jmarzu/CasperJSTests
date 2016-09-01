var envVars = require('system').env;

casper.test.begin('Testing Good Reads', 8, function(test) {

  casper.start('https://www.goodreads.com/', function() {
    test.assertTitle('Share Book Recommendations With Your Friends, Join Book Clubs, Answer Trivia', 'good reads has correct title');
    test.assertExists('.formBox input', "sign in found"); 
    test.assertExists('form[action="/search"]', 'form found');
    this.fill('form[action="/search"]', {
      'query' : '1984'
    }, true);
  });

  casper.then(function() {
    test.assertUrlMatch('https://www.goodreads.com/search?utf8=✓&query=1984', "search term has been submitted");
    test.assertEval(function() {
            return __utils__.findAll("a.bookTitle").length >= 10;
        }, "good reads search for \"1984\" retrieves 10 or more results");
  });

  casper.wait(3000, function() {
    this.capture('casperTest/bookResults.png');
    console.log('book search results successful');
  });

  casper.thenOpen('https://www.goodreads.com/', function() {
    test.assertTitle('Share Book Recommendations With Your Friends, Join Book Clubs, Answer Trivia', 'navigated to home page');
  });

  casper.wait(3000, function() {
    this.capture('casperTest/homePage.png');
    test.comment('back to the home page');
  });

  casper.then(function() {
    test.assertExists('form[id="userSignupForm"]', 'sign up form exists');
    this.fill('form[id="userSignupForm"]', {
      'user[first_name]' : 'Joe',
      'user[email]' : 'joe@boom.com',
      'user[password]' : 'password'
    });
    test.comment('User Sign Up Form filled');
  });

  casper.wait(3000, function() {
    casper.capture('casperTest/enterInfo.png');
    test.comment('entered in user information');
  });

  casper.then(function() {
    test.assertExists('input[value="Sign up"]', 'sign up button exists');
    this.click('input[value="Sign up"]')
  });

  casper.wait(3000,function() {
    casper.capture('casperTest/grBookResults.png');
  });

  casper.run(function() {
    test.done();
  });

 });