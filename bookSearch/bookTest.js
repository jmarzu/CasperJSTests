var numberOfTests = 3;

casper.test.begin('Testing Good Reads', numberOfTests, function(test) {

  casper.start('https://www.goodreads.com/', function() {
    test.assertTitle('Share Book Recommendations With Your Friends, Join Book Clubs, Answer Trivia', 'good reads has correct title');
    test.assertExists('form[action="/search"]', 'Search form found');
    this.fill('form[action="/search"]', {
      'query' : '1984'
    }, true);
  });

  casper.wait(3000, function() {
    this.capture('bookSearch/goodReadsTry1.png');
    test.comment('book search saved in png');
  });

  // casper.then(3000, function() {
  //   test.assertExists('div[class="wtrDown wtrLeft wtrStatusReadingNow"]', 'Set Book to currently-reading');
  // });

  casper.run(function() {
    test.done();
  });
});