var myButton = document.getElementById('buttAct');
var contenidoDiv = document.getElementById('contenido');
var loader = document.getElementById('load');
var divcont = document.getElementById('divcont');
var buttCopy = document.getElementById('buttCopy');
var copI1 = document.getElementById('copyIcon1');
var copI2 = document.getElementById('copyIcon2');
var tooltip = document.getElementById('tooltip');
var tooltipText = document.getElementById('tooltipText');
var selectLanguage = document.getElementById('typeLanguage');

myButton.addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "get_body_content" }, async function (response) {
      try{
      loading();
      let callGPTViewModel = {
        Text :response,
        Language : selectLanguage.value,
      }
      var respuesta = await fetch("https://localhost:7168/GPT", {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(callGPTViewModel),
      }).then(resp => {
        if(resp.status != 200){
          throw new Error();
        }
        return resp.text();
      }).then(data=>{
        loaded();
        chrome.storage.local.set({ 'lastResponse': data });
        contenidoDiv.textContent = data;
      }).catch(error=>{
        loaded();
        chrome.storage.local.set({ 'lastResponse': "Ha ocurrido un error"});
        contenidoDiv.textContent = "Ha ocurrido un error!";  
      });
      }catch(error){
        loaded();
        contenidoDiv.textContent = error;  
      }
    });
  });
});

function clipBoard() {
  // get the container
  const element = document.querySelector('#contenido');
  // Create a fake `textarea` and set the contents to the text
  // you want to copy
  const storage = document.createElement('textarea');
  storage.value = element.innerHTML;
  element.appendChild(storage);

  // Copy the text in the fake `textarea` and remove the `textarea`
  storage.select();
  storage.setSelectionRange(0, 99999);
  document.execCommand('copy');
  element.removeChild(storage);
  copied();
}

document.querySelector("#buttCopy").addEventListener("click", clipBoard);
function loading(){
  myButton.disabled = true;
  loader.style.display = "block";
  contenidoDiv.textContent = "";
  divcont.style.display = "none"
  buttCopy.style.display = "none"
}

function copied(){
  tooltip.addEventListener("click", function() {
    tooltipText.style.top = "140%";
    tooltipText.style.visibility = "visible";
    tooltipText.style.opacity = "1";
  });
  buttCopy.classList.add('copied');
  copI2.style.display = 'none';
  copI1.style.display = 'inline-block';
  var refreshIntervalId = setInterval(function() {
    buttCopy.classList.remove('copied');
    copI1.style.display = 'none';
    copI2.style.display = 'inline-block';
    tooltipText.style.top = "";
    tooltipText.style.visibility = "";
    tooltipText.style.opacity = "";
    clearInterval(refreshIntervalId);
  }, 1200)
}


function loaded(){
  myButton.disabled = false;
  loader.style.display = "none";
  divcont.style.display = "block";
  buttCopy.style.display = "inline-block"
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get(['lastResponse'], function(result) {
    var lastResponse = result.lastResponse;
    if (lastResponse) {
      loaded();
      contenidoDiv.textContent = lastResponse;
    }
  });
});