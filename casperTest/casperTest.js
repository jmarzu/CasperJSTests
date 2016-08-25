casper.test.begin('Testing Good Reads', 5, function(test) {

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

  casper.wait(3000,function() {
    casper.capture('casperTest/grBookResults.png');
  });

  casper.run(function() {
    test.done();
  });

 });