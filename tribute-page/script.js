const rankedTitle = document.getElementById('ranked');

rankedTitle.textContent = titleToUpperCase(rankedTitle.textContent);

function titleToUpperCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
}