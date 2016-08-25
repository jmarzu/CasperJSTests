var casper = require('casper').create();

casper.start('https://www.goodreads.com/');

casper.wait(3000, function() {
  this.echo(this.getTitle());
});

casper.then(function() {
  this.click('input[tabindex="4"]')
});

casper.wait(3000, function() {
  casper.capture('signIn/signin1.png');
  console.log('sign in button clicked');
});

casper.then(function() {
  this.fill('form[action="https://www.goodreads.com/user/sign_in"]', {
    'user[email]' : 'joe@boom.com',
    'user[password]' : 'password'
  });
});

casper.wait(3000, function() {
  casper.capture('signIn/signin2.png');
  console.log('entered in user information');
});

casper.then(function() {
  casper.exit();
});

casper.run();