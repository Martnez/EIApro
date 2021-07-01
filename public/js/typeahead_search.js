var substringMatcher = function(strs) {
return function findMatches(q, cb) {
var matches, substringRegex;

// an array that will be populated with substring matches
matches = [];

// regex used to determine if a string contains the substring `q`
substrRegex = new RegExp(q, 'i');

// iterate through the pool of strings and for any string that
// contains the substring `q`, add it to the `matches` array
$.each(strs, function(i, str) {
if (substrRegex.test(str)) {
matches.push(str);
}
});

cb(matches);
};
};
function httpGet(theUrl)
{
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
xmlHttp.send( null );
return xmlHttp.responseText;
}
var results = httpGet("http://localhost:3000/search")
results  = results.replace(/\"/g, "").replace("[", "").replace("]","").split(",")
console.log(results)

$('#the-basics .typeahead').typeahead({
hint: true,
highlight: true,
minLength: 1
},
{
name: 'results',
source: substringMatcher(results)
});
