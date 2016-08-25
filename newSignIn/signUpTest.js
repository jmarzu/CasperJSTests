var casper = require('casper').create();

casper.start('https://www.goodreads.com/');

casper.wait(2000, function() {
  this.echo(this.getTitle());
});

casper.then(function() {
  this.fill('form[id="userSignupForm"]', {
    'user[first_name]' : 'Joe',
    'user[email]' : 'joe@boom.com',
    'user[password]' : 'password'
  });
});

casper.wait(2000, function() {
  casper.capture('newSignIn/newSignIn1.png');
  console.log('form filled out');
});

casper.then(function() {
  casper.click('input[name="next"]');
});

casper.wait(2000, function() {
  casper.capture('newSignIn/newSignIn2.png');
  console.log('new memeber sign up complete');
});

casper.then(function() {
  casper.exit();
});

casper.run();