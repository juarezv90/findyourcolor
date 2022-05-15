/**
 * hex input val id = hex
 * hsl/rgb input val id = one two three
 * scheme id = scheme
 * color count = colorqty
 */

const rgbLab = ["R", "G", "B"];
const hslLab = ["H", "S", "L"];
const sb = document.querySelector("#color");
const regExp = /[0-9A-Fa-f]{6}/;

const handleChange = () => {
  if (sb.value != "hex") {
    displayThreeValue(sb.value);
  } else {
    removeRGB();
  }
};

const displayThreeValue = (value) => {
  let labels = document.getElementsByClassName("rgblabels");
  let rgbInputs = document.getElementsByClassName("colorIn");
  document.getElementById('colorError').innerHTML ='';
  document.getElementById("hex").style.border = regBorderStyle;

  for (label of labels) {
    label.style.display = "inline-block";
  }
  if (value === "hsl") {
    for (let i = 0; i < value.length; i++) {
      labels[i].innerHTML = hslLab[i];
    }
  } else {
    for (let i = 0; i < value.length; i++) {
      labels[i].innerHTML = rgbLab[i];
    }
  }
  for (rgb of rgbInputs) {
    rgb.style.display = "inline-block";
    rgb.maxLength = 3;
    rgb.value = 0;
  }

  document.getElementById("hexLabel").style.display = "none";
  document.getElementById("hex").style.display = "none";
};

const removeRGB = () => {
  let labels = document.getElementsByClassName("rgblabels");
  let rgbInputs = document.getElementsByClassName("colorIn");
  for (label of labels) {
    label.style.display = "none";
  }
  for (rgb of rgbInputs) {
    rgb.style.display = "none";
  }

  document.getElementById("hexLabel").style.display = "inline-block";
  document.getElementById("hex").style.display = "inline-block";
  document.getElementById("hex").setAttribute("placeholder", "enter hex value");
};

const inputOnchange = (value) => {
  const sb = document.querySelector("#color");
  if (sb.value == "rgb") {
    if (value.value > 256) {
      document.getElementById(value.id).value = 256;
    } else if (value.value < 0) {
      document.getElementById(value.id).value = 0;
    }
  } else if (sb.value == "hsl") {
    if (value.id === "one") {
      if (value.value > 360) {
        document.getElementById(value.id).value = 360;
      } else if (value.value < 0) {
        document.getElementById(value.id).value = 0;
      }
    } else if (value.id === "two" || value.id === "three") {
      if (value.value > 100) {
        document.getElementById(value.id).value = 100;
      } else if (value.value < 0) {
        document.getElementById(value.id).value = 0;
      }
    }
  }
};

const onSchemeChange = (scheme) => {
  if (scheme.value !== "none") {
    document.getElementById("colorqty").disabled = false;
    document.getElementById("colorqty").value = 5;
  } else {
    document.getElementById("colorqty").disabled = true;
    document.getElementById("colorqty").value = '';
  }
};

function inputs() {
  let qty = document.getElementById("colorqty");
  let hexElement = document.getElementById("hex");
  
  if (sb.value == "hex") {
    if (hexElement.value == "") {
      hexElement.style.borderColor = "red";
      document.getElementById('colorError').innerHTML = "Cannot be blank!"
      return false;
    } else if (hexElement.value.length != 6) {
      hexElement.style.borderColor = "red";
      document.getElementById('colorError').innerHTML = "Invalid hex code"
      return false;
    } else if (!regExp.test(hexElement.value)) {
      hexElement.style.borderColor = "red";
      document.getElementById('colorError').innerHTML = "Invalid hex code"
      return false;
    } else {
      hexElement.style.border = regBorderStyle;
      document.getElementById('colorError').innerHTML ='';
    }
  }

  if (!qty.disabled && qty.value == "") {
    qty.style.borderColor = "red";
    document.getElementById('errQty').innerHTML = "Missing quantity value!";
    return false;
  } else {
    qty.style.border = regBorderStyle;
    document.getElementById('errQty').innerHTML ='';
  }
  document.getElementById('errQty').innerHTML ='';
  document.getElementById('colorError').innerHTML ='';
  return true;
}

const regBorderStyle = "1px solid black";
