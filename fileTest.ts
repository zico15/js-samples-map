// In this example, we center the map, and add a marker, using a LatLng object
// literal instead of a google.maps.LatLng object. LatLng object literals are
// a convenient way to add a LatLng coordinate and, in most cases, can be used
// in place of a google.maps.LatLng object.
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';






  function saveCanvas(x_canvas){
    x_canvas.toBlob(function(blob) {
        saveAs(
            blob
            , "screenshot.png"
        );
    }, "image/png");
}

  function jpj(node: HTMLElement) {
    alert("PDF Generated: 3");
    let pixelAtXYOffset: number;
    let pixelAtXY: Uint8Array;
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    alert("PDF Generated: 3");
    domtoimage.toPixelData(node)
    .then(function (pixels) {
        for (var y = 0; y < 100; ++y) {
          for (var x = 0; x < 100; ++x) {
            pixelAtXYOffset = (4 * y * node.scrollHeight) + (4 * x);
            /* pixelAtXY is a Uint8Array[4] containing RGBA values of the pixel at (x, y) in the range 0..255 */
            pixelAtXY = pixels.slice(pixelAtXYOffset, pixelAtXYOffset + 4);
            const imgData = ctx?.createImageData(1, 1) as ImageData;
            imgData.data.set(pixelAtXY);
            ctx?.putImageData(imgData, x, y);
            alert(pixelAtXY);
          }
        }
    });
    PrintDiv(canvas);
   
  }

 

  function converHTMLFileToPDF() {
    
    var doc = new jsPDF('l', 'mm', [1200, 1210]);

  
    let pdfjs = document.querySelector('#temp-target');
  
    // Convert HTML to PDF in JavaScript
    doc.html(pdfjs as HTMLElement, {
      callback: function(doc) {
        doc.save("output.pdf");
      },
      x: 10,
      y: 10
    });
    doc.save("output.pdf");
    alert("PDF Generated");
  }


  

  export default function PrintDiv(div) {
    alert("map.getDiv()");
    html2canvas(div).then(canvas => {
      var myImage = canvas.toDataURL();
      downloadURI(myImage, "MaSimulation.png");
    });
  }

  function downloadURI(uri, name) {
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    //after creating link you should delete dynamic link
    //clearDynamicLink(link); 
  }

  PrintDiv(document.getElementById("main"));




