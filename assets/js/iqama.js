// https://stackoverflow.com/a/35970894/3431636
function getJSON(url, callback) {
  let xhr = new XMLHttpRequest()
  xhr.open("GET", url, true)
  xhr.responseType = "json"
  xhr.onload = function() {
  let status = xhr.status;
  if (status === 200) {
  callback(null, xhr.response);
} else {
  callback(status, xhr.response);
}
};
  xhr.send()
}

function iqama() {
  getJSON("https://iqama.ccil-kbw.com/iqamatimes.php", function (err, data) {
    if (err !== null) {
      console.log("Something went wrong in loading the Iqama.")
    } else {
      console.log(data)
    }
  })
}
