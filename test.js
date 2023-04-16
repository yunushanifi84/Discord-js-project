const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yunushanifi84:1436XYzt+++@bot.7cwextg.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console , 'bağlantı hatası'));
db.once('open', function() {
    console.log("Mongoose veritabanına bağlanıldı.");
});

const userbotSchema = new mongoose.Schema({
    id: String,
    money: {type:Number, default:0},
    nextPrize: {type: Date, default: Date.now}
});

const User = mongoose.model('Kullanici-data',userbotSchema);

async function dene() {
    const userid = '0021';
    let user = await User.findOne({id: userid});
    if (!user) {
        user = new User({id : userid});
    }
    const miktar =50;
    user.money += miktar;
    await user.save();

    console.log(`Bakiye ${user.money}`);
}
dene();