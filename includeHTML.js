function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute("include-html");
      if (file) {
        (function(elmnt) { // Create a new scope for each element
          xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              elmnt.innerHTML = this.responseText;
              elmnt.removeAttribute("include-html");
            }
          };
          xhttp.open("GET", file, true);
          xhttp.send();
        })(elmnt); // Pass elmnt into the IIFE to create a local scope
      }
    }
  }
  includeHTML();
  