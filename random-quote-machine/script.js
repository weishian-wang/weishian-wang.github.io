const bgImageID = [ 'Rfflri94rs8', 'r9RW20TrQ0Y', '1WQ5RZuH9xo', '2Hzmz15wGik', 'bAXBuCBHfRc',
                    'a5XN1f09_ek', '2XfDYMK9cSE', 'crqFmUw5MrE', 'nXOB-wh4Oyc', 'ycG0A6DlvOk' ];

const quotesDataURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const fbShareDialogParams = {
  method: 'share',
  display: 'popup',
  hashtag: '#inspirationalquotes',
  quote: '',
  mobile_iframe: true,
  href: 'https://weishian-wang.github.io/random-quote-machine/',
};

const newQuoteButton = document.getElementById('new-quote');
const body = document.querySelector('body');
const shareToTweet = document.getElementById('tweet-quote');
const shareToFacebook = document.getElementById('facebook-share-quote');

getRandomBackground();
let quotesData;
getQuotesData(quotesDataURL);
newQuoteButton.addEventListener('click', updateQuote);

shareToFacebook.addEventListener('click', function() {
  FB.ui(fbShareDialogParams, function(response) {});
});

function getQuotesData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => quotesData = data)
    .then(() => updateQuote());
}

function getRandomQuote() {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

function updateQuote() {
  const newQuote = getRandomQuote();

  $("#text").animate(
    { opacity: 0 }, 600,
    function() {
      $(this).animate({opacity: 1}, 600);
      $('#quote').text(newQuote.quote);
    }
  );

  $("#author").animate(
    { opacity: 0 }, 600,
    function() {
      $(this).animate({opacity: 1}, 600);
      $(this).text('- ' + newQuote.author);
    }
  );

  updateTweetContent(newQuote.quote, newQuote.author);
  updateFacebookContent(newQuote.quote, newQuote.author);
}

function getRandomImageID() {
  return bgImageID[Math.floor(Math.random() * bgImageID.length)];
}

function getRandomBackground() {
  const srcURL = 'https://source.unsplash.com/';
  const imgID = getRandomImageID();
  const width = (window.screen.width) || 1366;
  const height = (window.screen.height) || 768;
  const imgSize = `/${width}x${height}`;
  const imgURL = srcURL + imgID + imgSize;
  body.style.backgroundImage = `url(${imgURL})`;
}

function updateTweetContent(newQuote, newAuthor) {
  const hashtag = "&hashtags=inspirationalquotes";
  const url = `https://twitter.com/intent/tweet?text="${newQuote}" -${newAuthor}${hashtag}`;
  const encodedURL = encodeURI(url);
  shareToTweet.href = encodedURL;
}

function updateFacebookContent(newQuote, newAuthor) {
  fbShareDialogParams.quote = `"${newQuote}" -${newAuthor}`;
}