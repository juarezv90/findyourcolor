const apiUrl = "https://www.thecolorapi.com/";
const divContainer = document.getElementById("colorHolder");
let colorInput = "";
let toRequested = "";
let colorsReturned = {};

function submitted(exist) {
  if(exist) {
    divContainer.innerHTML = "";
    if (sb.value === "hex") {
      colorInput = `hex=${document.getElementById("hex").value}`;
    } else if (sb.value === "rgb") {
      var r, g, b;
      r = document.getElementById("one").value;
      g = document.getElementById("two").value;
      b = document.getElementById("three").value;
      colorInput = `rgb=rgb(${r},${g},${b})`;
    } else if (sb.value === "hsl") {
      var h, s, l;
      h = document.getElementById("one").value;
      s = document.getElementById("two").value;
      l = document.getElementById("three").value;
      colorInput = `hsl=hsl(${h},${s},${l})`;
    }

    const scheme = document.getElementById("scheme").value;

    if (scheme !== "none") {
      let colorCount = document.getElementById("colorqty").value;
      toRequested = `scheme?${colorInput}&mode=${scheme}&count=${colorCount}`;
      fetchSingle(`id?${colorInput}`);
      fetchSchemed();
    } else {
      toRequested = `id?${colorInput}`;
      fetchSingle(toRequested);
    }
  }
}

function fetchSchemed() {
  fetch(`${apiUrl}${toRequested}`)
    .then((response) => response.json())
    .then((data) => {
      for (color of data.colors) {
        let colorDiv = document.createElement("div");
        colorDiv.className = "colored";
        colorDiv.innerHTML = `<p>${color.hex.value}</p>
        <p>${color.rgb.value}</p>
        <p>${color.hsl.value}</p>`;
        colorDiv.style.backgroundColor = color.hsl.value;
        divContainer.append(colorDiv);
      }
    });
}

function fetchSingle(tag) {
  fetch(`${apiUrl}${tag}`)
    .then((response) => response.json())
    .then((data) => {
      let colorDiv = document.createElement("div");
      colorDiv.className = "colored";
      colorDiv.innerHTML = `<p>${data.hex.value}</p>
      <p>${data.rgb.value}</p>
      <p>${data.hsl.value}</p>`;
      colorDiv.style.backgroundColor = data.hsl.value;
      divContainer.append(colorDiv);
    });
}
