// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {};
  var methods = [
    'assert',
    'clear',
    'count',
    'debug',
    'dir',
    'dirxml',
    'error',
    'exception',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'log',
    'markTimeline',
    'profile',
    'profileEnd',
    'table',
    'time',
    'timeEnd',
    'timeline',
    'timelineEnd',
    'timeStamp',
    'trace',
    'warn',
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

// START - Constants
const lat = 'LATINICA';
const cyr = 'ЋИРИЛИЦА';

const fromLatPh = 'Ovde unesite tekst (latinica)';
const toLatPh = 'Izlaz';

const fromCyrPh = 'Овде унесите текст (ћирилица)';
const toCyrPh = 'Излаз';

const labelLatToCyr = 'Latinica u ćirilicu - Konvertor teksta';
const labelCyrToLat = 'Ćirilica u latinicu - Konvertor teksta';
// END - Constants

// START - Variables and helpers
const logo = document.getElementById('logo');

const fromPar = document.getElementById('from-p');
const toPar = document.getElementById('to-p');

const fromText = document.getElementById('from-textarea');
const toText = document.getElementById('to-textarea');

const btnConvert = document.getElementById('btn-convert');
const btnCopy = document.getElementById('btn-copy');
const btnPaste = document.getElementById('btn-paste');
const btnDelete = document.getElementById('btn-delete');

const themeCb = document.getElementById('theme-cb');

const getConfig = function () {
  return localStorage.getItem('from');
};
const setConfig = function (txt) {
  localStorage.setItem('from', txt);
};
const getIsDarkTheme = function () {
  return localStorage.getItem('dark_theme');
};
const setDarkTheme = function () {
  localStorage.setItem('dark_theme', 'true');
};
const setLightTheme = function () {
  localStorage.setItem('dark_theme', 'false');
};

function scrollDown(element) {
  if (window.innerWidth < 991) {
    element.scrollIntoView();
  }
}
// END - Helpers and references

// Check if supported
if (!('clipboard' in navigator)) {
  btnCopy.style.visibility = 'hidden';
  btnPaste.style.visibility = 'hidden';
}

// Apply previously selected theme
if (getIsDarkTheme() === 'true') {
  document.body.classList.toggle('dark');
  themeCb.checked = true;
} else if (getIsDarkTheme === null) {
  setLightTheme();
}

//  Theme switch
themeCb.addEventListener('change', function () {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
});

// Focus `from` text area
fromText.focus();

// START - Text Area auto expand
function autoExpand(fromArea) {
  // Reset field height
  fromArea.style.height = 'inherit';

  // Get the computed styles for the element
  let computed = window.getComputedStyle(fromArea);

  // Calculate the height
  let height =
    parseInt(computed.getPropertyValue('border-top-width'), 10) +
    parseInt(computed.getPropertyValue('padding-top'), 10) +
    fromArea.scrollHeight +
    parseInt(computed.getPropertyValue('padding-bottom'), 10) +
    parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  fromArea.style.height = height + 'px';
  toText.style.height = height + 'px';
}

document.addEventListener('input', function (event) {
  if (event.target.tagName.toLowerCase() !== 'textarea') return;
  autoExpand(event.target);
});
// END - Text Area auto expand

// Setting default config (lat) if NOT found in localStorage
if (!getConfig()) {
  setConfig(lat);
}

// START - Applying config or default (lat)
switch (getConfig()) {
  case lat:
    // set from-to paragraphs
    fromPar.innerText = lat;
    toPar.innerText = cyr;
    // set placeholder text
    fromText.placeholder = fromLatPh;
    toText.placeholder = toCyrPh;
    break;
  case cyr:
    // set from-to paragraphs
    fromPar.innerText = cyr;
    toPar.innerText = lat;
    // set placeholder text
    fromText.placeholder = fromCyrPh;
    toText.placeholder = toLatPh;
    break;
  default:
    // set from-to paragraphs
    fromPar.innerText = lat;
    toPar.innerText = cyr;
    // set placeholder text
    fromText.placeholder = fromLatPh;
    toText.placeholder = toCyrPh;
    setConfig(lat);
}
// END - Applying config or default (lat)

// Convert on enter - event listener
window.addEventListener('keyup', function (e) {
  if (!e.shiftKey && (e.code === 'Enter' || e.code === 'NumpadEnter')) {
    convert();
  }
});

// New line only on while holding shift - event listener
fromText.addEventListener('keydown', function (e) {
  if (!e.shiftKey && (e.code === 'Enter' || e.code === 'NumpadEnter')) {
    e.preventDefault();
  }
});

// switch script
document.getElementById('change').addEventListener('click', switchScript);
function switchScript() {
  // 'getConfig()' represents current from ``script``
  switch (getConfig()) {
    case lat:
      fromPar.innerText = cyr;
      toPar.innerText = lat;
      setConfig(cyr);
      fromText.placeholder = fromCyrPh;
      toText.placeholder = toLatPh;
      break;

    case cyr:
      fromPar.innerText = lat;
      toPar.innerText = cyr;
      setConfig(lat);
      fromText.placeholder = fromLatPh;
      toText.placeholder = toCyrPh;
      break;

    default:
      // Purpose: to prevent errors
      // if it comes here then user probably changed the value
      // by himself in localStorage.
      fromPar.innerText = lat;
      toPar.innerText = cyr;
      setConfig(lat);
  }
}

function convert() {
  scrollDown(toText);

  if (getConfig() === lat) {
    // Latin -> Cyrillic
    toText.value = convertLatToCyr(fromText.value);
  } else {
    // Cyrillic -> Latin
    toText.value = convertCyrToLat(fromText.value);
  }
}

// START - Copy, paste, delete, convert buttons
btnConvert.addEventListener('click', function () {
  convert();
});

btnCopy.addEventListener('click', function () {
  navigator.clipboard.writeText(toText.value);
});

btnPaste.addEventListener('click', function () {
  navigator.clipboard
    .readText()
    .then(function (s) {
      fromText.value = s;
      autoExpand(fromText);
    })
    .catch(function (s) {
      alert('Došlo je do greške. Nalepite ručno.');
    });
});

btnDelete.addEventListener('click', function () {
  fromText.value = '';
  toText.value = '';
  autoExpand(fromText);
});
// END - Copy, paste, delete, convert buttons

function convertLatToCyr(txt) {
  txt = txt.replace(/ {2,}/g, ' ');
  txt = txt.replace(/\n{3,}/g, '\n\n');

  txt = txt.replace(/dž/g, 'џ');
  txt = txt.replace(/dz/g, 'џ');
  txt = txt.replace(/dZ/g, 'џ');
  // After error detection is implemented this (next line) will be removed
  txt = txt.replace(/dŽ/g, 'џ');
  txt = txt.replace(/Dž/g, 'Џ');
  txt = txt.replace(/Dz/g, 'Џ');
  txt = txt.replace(/DŽ/g, 'Џ');
  txt = txt.replace(/DZ/g, 'Џ');

  txt = txt.replace(/nj/g, 'њ');
  // After error detection is implemented this (next line) will be removed
  txt = txt.replace(/nJ/g, 'њ');
  txt = txt.replace(/Nj/g, 'Њ');
  txt = txt.replace(/NJ/g, 'Њ');

  txt = txt.replace(/dj/g, 'ђ');
  // After error detection is implemented this (next line) will be removed
  txt = txt.replace(/dJ/g, 'ђ');
  txt = txt.replace(/Dj/g, 'Ђ');
  txt = txt.replace(/DJ/g, 'Ђ');

  txt = txt.replace(/lj/g, 'љ');
  // After error detection is implemented this (next line) will be removed
  txt = txt.replace(/lJ/g, 'љ');
  txt = txt.replace(/Lj/g, 'Љ');
  txt = txt.replace(/LJ/g, 'Љ');

  txt = txt.replace(/a/g, 'а');
  txt = txt.replace(/b/g, 'б');
  txt = txt.replace(/v/g, 'в');
  txt = txt.replace(/g/g, 'г');
  txt = txt.replace(/d/g, 'д');
  txt = txt.replace(/đ/g, 'ђ');
  txt = txt.replace(/e/g, 'е');
  txt = txt.replace(/ž/g, 'ж');
  txt = txt.replace(/z/g, 'з');
  txt = txt.replace(/i/g, 'и');
  txt = txt.replace(/j/g, 'ј');
  txt = txt.replace(/k/g, 'к');
  txt = txt.replace(/l/g, 'л');
  txt = txt.replace(/m/g, 'м');
  txt = txt.replace(/n/g, 'н');
  txt = txt.replace(/o/g, 'о');
  txt = txt.replace(/p/g, 'п');
  txt = txt.replace(/r/g, 'р');
  txt = txt.replace(/s/g, 'с');
  txt = txt.replace(/t/g, 'т');
  txt = txt.replace(/ć/g, 'ћ');
  txt = txt.replace(/u/g, 'у');
  txt = txt.replace(/f/g, 'ф');
  txt = txt.replace(/h/g, 'х');
  txt = txt.replace(/c/g, 'ц');
  txt = txt.replace(/č/g, 'ч');
  txt = txt.replace(/š/g, 'ш');

  txt = txt.replace(/A/g, 'А');
  txt = txt.replace(/B/g, 'Б');
  txt = txt.replace(/V/g, 'В');
  txt = txt.replace(/G/g, 'Г');
  txt = txt.replace(/D/g, 'Д');
  txt = txt.replace(/Đ/g, 'Ђ');
  txt = txt.replace(/E/g, 'Е');
  txt = txt.replace(/Ž/g, 'Ж');
  txt = txt.replace(/Z/g, 'З');
  txt = txt.replace(/I/g, 'И');
  txt = txt.replace(/J/g, 'Ј');
  txt = txt.replace(/K/g, 'К');
  txt = txt.replace(/L/g, 'Л');
  txt = txt.replace(/M/g, 'М');
  txt = txt.replace(/N/g, 'Н');
  txt = txt.replace(/O/g, 'О');
  txt = txt.replace(/P/g, 'П');
  txt = txt.replace(/R/g, 'Р');
  txt = txt.replace(/S/g, 'С');
  txt = txt.replace(/T/g, 'Т');
  txt = txt.replace(/Ć/g, 'Ћ');
  txt = txt.replace(/U/g, 'У');
  txt = txt.replace(/F/g, 'Ф');
  txt = txt.replace(/H/g, 'Х');
  txt = txt.replace(/C/g, 'Ц');
  txt = txt.replace(/Č/g, 'Ч');
  txt = txt.replace(/Š/g, 'Ш');

  return txt;
}

function convertCyrToLat(txt) {
  txt = txt.replace(/ {2,}/g, ' ');
  txt = txt.replace(/\n{3,}/g, '\n\n');

  txt = txt.replace(/а/g, 'a');
  txt = txt.replace(/б/g, 'b');
  txt = txt.replace(/в/g, 'v');
  txt = txt.replace(/г/g, 'g');
  txt = txt.replace(/д/g, 'd');
  txt = txt.replace(/ђ/g, 'đ');
  txt = txt.replace(/е/g, 'e');
  txt = txt.replace(/ж/g, 'ž');
  txt = txt.replace(/з/g, 'z');
  txt = txt.replace(/и/g, 'i');
  txt = txt.replace(/ј/g, 'j');
  txt = txt.replace(/к/g, 'k');
  txt = txt.replace(/л/g, 'l');
  txt = txt.replace(/љ/g, 'lj');
  txt = txt.replace(/м/g, 'm');
  txt = txt.replace(/н/g, 'n');
  txt = txt.replace(/њ/g, 'nj');
  txt = txt.replace(/о/g, 'o');
  txt = txt.replace(/п/g, 'p');
  txt = txt.replace(/р/g, 'r');
  txt = txt.replace(/с/g, 's');
  txt = txt.replace(/т/g, 't');
  txt = txt.replace(/ћ/g, 'ć');
  txt = txt.replace(/у/g, 'u');
  txt = txt.replace(/ф/g, 'f');
  txt = txt.replace(/х/g, 'h');
  txt = txt.replace(/ц/g, 'c');
  txt = txt.replace(/ч/g, 'č');
  txt = txt.replace(/џ/g, 'dž');
  txt = txt.replace(/ш/g, 'š');

  txt = txt.replace(/А/g, 'A');
  txt = txt.replace(/Б/g, 'B');
  txt = txt.replace(/В/g, 'V');
  txt = txt.replace(/Г/g, 'G');
  txt = txt.replace(/Д/g, 'D');
  txt = txt.replace(/Ђ/g, 'Đ');
  txt = txt.replace(/Е/g, 'E');
  txt = txt.replace(/Ж/g, 'Ž');
  txt = txt.replace(/З/g, 'Z');
  txt = txt.replace(/И/g, 'I');
  txt = txt.replace(/Ј/g, 'J');
  txt = txt.replace(/К/g, 'K');
  txt = txt.replace(/Л/g, 'L');
  txt = txt.replace(/Љ/g, 'Lj');
  txt = txt.replace(/М/g, 'M');
  txt = txt.replace(/Н/g, 'N');
  txt = txt.replace(/Њ/g, 'Nj');
  txt = txt.replace(/О/g, 'O');
  txt = txt.replace(/П/g, 'P');
  txt = txt.replace(/Р/g, 'R');
  txt = txt.replace(/С/g, 'S');
  txt = txt.replace(/Т/g, 'T');
  txt = txt.replace(/Ћ/g, 'Ć');
  txt = txt.replace(/У/g, 'U');
  txt = txt.replace(/Ф/g, 'F');
  txt = txt.replace(/Х/g, 'H');
  txt = txt.replace(/Ц/g, 'C');
  txt = txt.replace(/Ч/g, 'Č');
  txt = txt.replace(/Џ/g, 'Dž');
  txt = txt.replace(/Ш/g, 'Š');

  return txt;
}
