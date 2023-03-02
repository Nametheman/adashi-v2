import html2canvas from "html2canvas";

export const exportAsPicture = (transId: any) => {
  //   var html = document.getElementsByTagName("HTML")[0];
  //   console.log(html);
  //   //   var body = document.getElementsByTagName("BODY")[0];
  //   //   var htmlWidth = html.clientWidth;
  //   //   var bodyWidth = body.clientWidth;

  var data = document.getElementById("exportContainer");
  if (data !== null) {
    //   //     var newWidth = data.scrollWidth - data.clientWidth;

    //   //     if (newWidth > data.clientWidth) {
    //   //       htmlWidth += newWidth;
    //   //       bodyWidth += newWidth;
    //   //     }

    //   //     html.style.width = htmlWidth + "px";
    //   //     body.style.width = bodyWidth + "px";
    //   //     html.style.width = htmlWidth + "px";
    //   //     body.style.width = bodyWidth + "px";

    html2canvas(data, { backgroundColor: null })
      .then((canvas: HTMLCanvasElement) => {
        var image: string = canvas.toDataURL("image/png", 1.0);
        return image;
      })
      .then((image: string) => {
        saveAs(image, `${transId}.png`);
        // saveAs(image, "exported-vis.png");
        // html.style.width = null;
        // body.style.width = null;
      });
  }
};

const saveAs = (blob: any, fileName: any) => {
  var elem = window.document.createElement("a");
  elem.href = blob;
  elem.download = fileName;
  //  elem.style = "display:none;";
  (document.body || document.documentElement).appendChild(elem);
  if (typeof elem.click === "function") {
    elem.click();
  } else {
    elem.target = "_blank";
    elem.dispatchEvent(
      new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      })
    );
  }
  URL.revokeObjectURL(elem.href);
  elem.remove();
};

// import { toPng } from "html-to-image";
// import html2canvas from "html2canvas";

// const ref = useRef<HTMLDivElement>(null);

// const onButtonClick = useCallback(() => {
//   if (ref.current === null) {
//     return;
//   }

//   toPng(ref.current, { cacheBust: true })
//     .then((dataUrl) => {
//       const link = document.createElement("a");
//       link.download = `${transId}.png`;
//       link.href = dataUrl;
//       link.click();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // }, [ref, transId]);
//   // }, [transId]); //this is a test scenario, want to see how it reacts. Ideal one is above
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [ref]); //this is a test scenario, want to see how it reacts. Ideal one is above

// const ref = useRef<HTMLDivElement>(null);

// const handleDownloadImage = async () => {
//   const element = document.getElementById("sContainer"),
//     canvas = await html2canvas(element),
//     data = canvas.toDataURL("image/png"),
//     link = document.createElement("a");

//   link.href = data;
//   link.download = "downloaded-image.png";

//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
