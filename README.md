## rem-track-hunter
_Library used in [Rem Bot](https://github.com/lk-developers/Rem/) to extract tracks from Youtube, Spotify and Themes.moe URLs._

### Installation
```
npm i @ipmanlk/rem-track-hunter
```

### Usage
```javascript
const { getTracks } = require("@ipmanlk/rem-track-hunter");

getTracks("https://youtu.be/4t__wczfpRI").then(tracks => {
  console.log(tracks);
}).catch(e => {
  console.log(e);
});

getTracks("Naruto", {type: "themes.moe"}).then(tracks => {
  console.log(tracks);
}).catch(e => {
  console.log(e);
});

```
### Docs
[View Docs](https://github.com/ipmanlk/rem-track-hunter/blob/master/docs/globals.md)