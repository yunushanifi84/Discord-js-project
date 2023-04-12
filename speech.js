const gTTS = require('gtts');
const metin = "deneme";

const gtts = new gTTS(metin,'tr');
gtts.save( './ses/ses.mp3', (err) => {
    if(err) throw new Error(err)
    console.log('Ses çevirildi')
})