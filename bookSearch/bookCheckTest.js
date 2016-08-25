var casper = require('casper').create();

casper.start('https://www.goodreads.com/');

casper.wait(3000, function() {
  this.echo(this.getTitle());
});

casper.then(function() {
  this.click('#headerSearchForm');
});

casper.then(function() {
  this.fill('form[id="headerSearchForm"]', { 
    'query' : 'enders game' 
  });
});

casper.then(function() {
  this.click('img[title="Title / Author / ISBN"]');
});

casper.wait(3000, function() {
  casper.capture('bookSearch/goodreads1.png');
  console.log('search button clicked');
  console.log('Results for query shown');
});

casper.then(function() {
  this.click('a[title="Ender\'s Game"]');
});

casper.wait(3000, function() {
  casper.capture('bookSearch/goodreads2.png');
  console.log('book image clicked');
});

casper.then(function() {
  casper.click('a[id="js-kcrPreviewButton"]');
});

casper.wait(3000, function() {
  casper.capture('bookSearch/goodreads3.png');
  console.log('preview the pages');
});

casper.then(function() {
  casper.exit();
});

casper.run();