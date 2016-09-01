var numberOfTests = 2;

casper.test.begin('Testing Good Reads', numberOfTests, function(test) {

  casper.start('https://www.goodreads.com/', function() {
    test.assertTitle('Share Book Recommendations With Your Friends, Join Book Clubs, Answer Trivia', 'good reads has correct title');
    test.assertExists('form[action="/search"]', 'Search form found');
    this.fill('form[action="/search"]', {
      'query' : '1984'
    }, true);
  });

  casper.run(function() {
    test.done();
  });
});