$(document).ready(function() {
  getQuote();

  $('#quotebtn').on('click', function() {
    getQuote();
  });
});

function getQuote() {
  var url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
  $.getJSON(url, function(data) {
    $('#quote').html('“' + data.quoteText.replace(/\s+$/g, '') + '”' + '<br>' + '—' + '<span class="author">' + data.quoteAuthor + '</span>');

      if(!data.quoteAuthor || /^\s*$/.test(data.quoteAuthor)) {
        $('#quote').html('“' + data.quoteText.replace(/\s+$/g, '') + '”' + '<br>' + '—' + '<span class="author">' + 'Unknown' + '</span>');
      }

    var shareQuote = '“' + data.quoteText.replace(/\s+$/g, '') + '”' + ' ' + '—' + data.quoteAuthor;
    $('#tweetbtn').on('click', function() {
      if(data.quoteText.length + data.quoteAuthor.length > 117) {
        window.open('https://twitter.com/intent/tweet?text=' + shareQuote.slice(0, 117).concat('...') + ' via %40MichelleJanosi ',  'Twitter window', 'width=600, height=600');
      } else {
        window.open('https://twitter.com/intent/tweet?text=' + shareQuote + ' via %40MichelleJanosi ',  'Twitter window', 'width=600, height=600');
      }
    });
  });
};
