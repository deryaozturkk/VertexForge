import dbConfig from '../config/config.js';
import { Sequelize, DataTypes } from 'sequelize';
import bireyselModel from './Bireysel.js';
import kurumsalModel from './Kurumsal.js';
//import studentCounterModel from './StudentCounter.js';
/*
  Sequelize için yapılandırma dosyasını çağırdık.
*/
/*
  Sequelize modülünü çağırdık.
*/
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        },
        logging: dbConfig.loggingLevel

    }
)
/* 'const sequelize' nedir:
  Sequelize ile veritabanına bağlantı nesnesi oluşturduk.
*/

sequelize.authenticate()
  .then(() => {
      console.log('connected..')
  })
  .catch(err => {
      console.log('Error'+ err)
  });
/* 'sequelize.authenticate()' açıklaması:
  Veritabanına bağlantıyı kurulup-kurulamadığını doğruladık.
  Not: dbConfig.DB referansı oluşturduğumuz veritabanı adını gösteriyor. Bu isimde bir veritabnının önceden oluşturulmuş olması gerekiyor.
*/

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.bireysel = bireyselModel(sequelize, DataTypes);
db.kurumsal = kurumsalModel(sequelize, DataTypes);
//db.studentCounter = studentCounterModel(sequelize, DataTypes);

/* Yeni modelleri veri tabanına ekleme işlemleri:
  Yeni eklenecek tabloları buraya ekleyeceğiz.
  veritabanına stdudent şemasını(nesnesini) ekledik.
*/


// Set up associations
//db.student.belongsTo(db.department, {
  //foreignKey: 'deptid',
  //as: 'department', 
//});

//db.department.hasMany(db.student, {
  //foreignKey: 'deptid',
  //as: 'students', 
//});


db.sequelize.sync({ force: false}).then(() => {
  console.log('Veritabanı başarıyla oluşturuldu.');
}).catch(err => {
  console.error('Veritabanını oluştururken bir hata oluştu:', err);
});

/* 'db.sequelize.sync' açıklaması:
  Sequelize nesnemize eklediğimiz tabloları(nesne özelliği gösteriyor), veritabanında oluşturduk.
  'force: true' olursa sürekli tabloyu silip yeniden oluşturur.
  'force: false' olursa tablo yoksa oluşturur varsa oluşturmaz. Fakat tablo yapısında değişiklik olunca tabloyu güncellemiyor.(bunu araştırıcam şimdilik true kullanalım.)
*/

export default db;
/*
 Tüm configrasyonnlarımızı tutan db nesnesini dışarıya return ettik.
*/