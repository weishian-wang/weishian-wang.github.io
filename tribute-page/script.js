let ranked = document.getElementById('ranked').innerText;

document.getElementById('ranked').innerText = titleCase(ranked);

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(" ");
}