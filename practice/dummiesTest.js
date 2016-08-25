var casper = require('casper').create({
  verbose: true,
  logLevel: 'debug'
});

casper.start('http://mca.gov.in/DCAPortalWeb/dca/MyMCALogin.do?method=setDefaultProperty&mode=14');

casper.then(function() {
  this.click('tr:nth-child(5) input');
});

casper.then(function() {
  this.capture('result1.png');
});

casper.then(function() {
  this.click('#searchCriteria');
});

casper.then(function() {
  this.fill('form[name="CompanyCINSRForm"]', {
    'searchCriteria': 'CONT',
    'companyName': 'Microsoft'
  }, false);
});

casper.then(function() {
  this.click('#Default');
});

casper.then(function() {
  console.log('clicked Submit, new location is ' + this.getCurrentUrl());
});

casper.then(function() {
  var name_selector = 'table[id="list1"] tbody tr td:nth-of-type(2)';
  var cin_selector = 'table[id="list1"] tbody tr td:nth-of-type(3)';
  var names_info = this.getElementsInfo(name_selector); 
  var cin_info = this.getElementsInfo(cin_selector);

var names = [];
  var cin = [];
  for (var i = 0; i < names_info.length; i++) {
    names.push(names_info[i].text);
    cin.push(cin_info[i].text);
  }
  // Dump the town_names array to screen
  require('utils').dump(names);
  require('utils').dump(cin);
  var fs = require('fs');
  var myfile = "output.txt"
  fs.write(myfile, cin, 'w');
});

/*Utility to print out a screenshot whenever you're confused about any page
casper.then(function() {
 this.capture("result.png");
});
*/
casper.run();