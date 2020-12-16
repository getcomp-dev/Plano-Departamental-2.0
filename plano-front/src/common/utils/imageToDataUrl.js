function imageToDataUrl(uri) {
  return new Promise(function(resolve, reject) {
    const image = new window.Image();
    image.onload = function() {
      let canvas = document.createElement("canvas");
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      canvas.getContext("2d").drawImage(this, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = function() {
      reject(new Error("Cannot fetch image " + uri + "."));
    };
    image.src = uri;
  });
}

export default imageToDataUrl;
