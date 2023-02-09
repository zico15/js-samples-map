// In this example, we center the map, and add a marker, using a LatLng object
// literal instead of a google.maps.LatLng object. LatLng object literals are
// a convenient way to add a LatLng coordinate and, in most cases, can be used
// in place of a google.maps.LatLng object.
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
// import { saveAsPng, saveAsJpeg } from 'save-html-as-image';

let map: google.maps.Map;

async function initMap(): Promise<void> {

  const position = { lat: 38.778722, lng: -9.153323 };
  const mapOptions = {
    zoom: 20,
    center: position,
    mapTypeId: "satellite",
  };

  const latElement = document.getElementById("lat") as HTMLInputElement;
  const latEndElement = document.getElementById("latEnd") as HTMLInputElement;
  const lngElement = document.getElementById("lng") as HTMLInputElement;
  const lngEndElement = document.getElementById("lngEnd") as HTMLInputElement;
  const zoomElement = document.getElementById("zoom") as HTMLInputElement;
  const mapElement = document.getElementById("map") as HTMLElement;
  const triggerElement = document.getElementById("trigger") as HTMLButtonElement;

  latElement.value = position.lat.toString();
  lngElement.value = position.lng.toString();
  latEndElement.value = (position.lat + 100).toString();
  lngEndElement.value = (position.lng).toString();

  map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    mapOptions
  );


  const div1 = document.getElementsByName("gmnoprint");
  const div2 = document.getElementsByName("gm-control-active gm-fullscreen-control");
  const div3 = document.getElementsByName("gmnoprint gm-bundled-control gm-bundled-control-on-bottom");
  const div4 = document.getElementsByName("gm-control-active");



  const marker = new google.maps.Marker({
    // The below line is equivalent to writing:
    // position: new google.maps.LatLng(-34.397, 150.644)
    position: position,
    map: map,
  });


  triggerElement?.addEventListener("click", (e) => {
    if (triggerElement.value == "Stop") {
      triggerElement.value = "Start";
      triggerElement.innerHTML = "Start";
    } else {
      triggerElement.value = "Stop";
      triggerElement.innerHTML = "Stop";
      update();
    }
  });

  function update() {
    if (triggerElement.value == "Stop") {
      const lat_end = Number(latEndElement.value.trim());
      const d = marker.getPosition();
      position.lat = d?.lat() as number + Number(zoomElement.value.trim());
      marker.setPosition(position);
      latElement.value = position.lat.toString();
      lngElement.value = position.lng.toString();
      infowindow.open(map, marker);
      if (position.lat < lat_end) {
        setTimeout(update, 1500 + Math.floor(Math.random() * 1000));
      }
    }
  }


  function saveCanvas(x_canvas) {
    x_canvas.toBlob(function (blob) {
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
      callback: function (doc) {
        doc.save("output.pdf");
      },
      x: 10,
      y: 10
    });
    doc.save("output.pdf");
    alert("PDF Generated");
  }

  const moonMapType = new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
      return (
        "https://mw1.google.com/mw-planetary/lunar/lunarmaps_v1/clem_bw" +
        "/" +
        zoom +
        "/" +
        coord.x +
        "/" +
        coord.y +
        ".jpg"
      );
    }
  })

  function tes() {
    alert("tes");
    const canvas = document.createElement('canvas')
    const body = document.getElementById('main') as HTMLElement

    const ctx = canvas.getContext('2d')
    canvas.width = canvas.height = 100
    canvas.appendChild(map.getDiv())



    const targetImg = document.createElement('img')
    body.appendChild(targetImg)

    function onTempImageLoad(e) {
      ctx?.drawImage(e.target, 0, 0)
      targetImg.src = canvas.toDataURL()
    }
  }

  function PrintDiv(div) {
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






  // You can use a LatLng literal in place of a google.maps.LatLng object when
  // creating the Marker object. Once the Marker object is instantiated, its
  // position will be available as a google.maps.LatLng object. In this case,
  // we retrieve the marker's position using the
  // google.maps.LatLng.getPosition() method.
  const infowindow = new google.maps.InfoWindow();

  google.maps.event.addListener(marker, "click", () => {
    console.log(marker.getPosition());
    infowindow.open(map, marker);

  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export { initMap };
