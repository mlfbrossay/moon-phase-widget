// let moonPhase = await getMoonPhase();

const today = new Date().toISOString().slice(0, 16);

const widget = new ListWidget();

const imgUrl = await getMoonPhaseImage();

const imgRqst = new Request(imgUrl);
const img = await imgRqst.loadImage();
// 
// widget.addText(moonPhase);
const image= widget.addImage(img);
image.applyFillingContentMode();
image.centerAlignImage();
widget.backgroundColor = Color.black();
widget.url = "https://www.nasa.gov";

const now = Date.now();
widget.refreshAfterDate = new Date(now + (8 * 60 * 60 * 1000));

Script.setWidget(widget);
Script.complete();

widget.presentSmall();
// 
// unused function
async function getMoonPhase() {
  let today = new Date().toISOString().slice(0, 16);
  let url = 
   "https://aa.usno.navy.mil/api/rstt/oneday?date=";
  
  let urlWithDate = url.concat(today);
  let fullUrl = urlWithDate.concat("&coords=50.00,50.0");
  let req = new Request(fullUrl);
  let json = await req.loadJSON();
  return json.properties.data.curphase;
}

async function getMoonPhaseImage() {
  let today = new Date().toISOString().slice(0, 16);
  let url = "https://svs.gsfc.nasa.gov/api/dialamoon/";
  let fullUrl = url.concat(today);
  let req = new Request(fullUrl);
  let json = await req.loadJSON();
  return json.image.url;
}
