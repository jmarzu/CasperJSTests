var links = [];
var casper = require('casper').create();

function getLinks() {
    var links = document.querySelectorAll('a.bookTitle');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.start('https://www.goodreads.com/', function() {
    // search for '1984' from good reads form
    this.fill('form[action="/search"]', { q: '1984' }, true);
});

casper.then(function() {
    // aggregate results for the '1984' search
    links = this.evaluate(getLinks);
    // now search for 'the notebook' by filling the form again
    this.fill('form[action="/search"]', { q: 'the notebook' }, true);
});

casper.then(function() {
    // aggregate results for the 'the notebook' search
    links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});