
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import BireyselRoute from './routes/bireyselRoute.js';
import KurumsalRoute from './routes/kurumsalRoute.js';
import AuthRoute from './routes/authRoute.js';
import http from 'http';

/*
 Express ve cors modüllerini projemize dahil ediyoruz.

 Express ve cors modüllerini şu işe yarar:
 Express: Node.js üzerinde çalışan web uygulamaları için hızlı ve minimalist bir web çerçevesidir.
 Cors: Cross-Origin Resource Sharing (CORS), bir web sayfası üzerinde çalışan bir betik dilinin, farklı bir domain, alt domain veya farklı bir protokol ile kaynak paylaşımına izin verme mekanizmasıdır.
*/
/*
 models/database.js dosyasını projemize dahil ediyoruz. Yani configüre edip oluşturduğumuz sequelize nesnesini projemize dahil ediyoruz. 
 db üzerinden ilgili işlemleri yapacağız.
 */
/*
routes klasöründeki dosyaları projemize dahil ediyoruz. 
Hangi istek için hangi url, hangi metotlar kullanılıcak, bu istek gerçekleşirken bir middleware den geçicek mi bunları route içinde belirtiyoruz.
*/
dotenv.config();
/*
dotenv modülünü projemize dahil ediyoruz.
*/
const app = express();
app.use(cors({
    origin: '*', 
    methods: 'GET, POST, PUT, PATCH, DELETE', 
    allowedHeaders: '*', 
}));
/*
  origin: '*', | * 'ın anlamı tüm domainlere izin verir. Eğer sadece belirli bir domaine izin vermek istiyorsanız o domaini yazabilirsiniz.
  methods: 'GET, POST, PUT, PATCH, DELETE' | Bu backend e hangi metotlar ile istek atılabileceğini belirtir.
  allowedHeaders: '*' | RestApi ye yapılan her istekte header bilgileri bulunur. Eğer izin verilenler dışında bir header bilgisi gönderilirse bu hataya sebep olur.
  "*" ın anlamı tüm header bilgilerine izin verir.
*/

app.use(express.json());
/*
`app.use(express.json())` kodu, Express uygulamasında bir middleware'ı kullanmaya başlar. Bu middleware, gelen isteklerdeki JSON verilerini ayrıştırmak ve JavaScript nesnelerine dönüştürmek için kullanılır.
Express, gelen HTTP isteklerini işlemek için middleware'leri kullanır. Middleware'ler, bir isteğin işlenmeden önce veya sonra belirli işlemleri gerçekleştirmek için kullanılır. `express.json()` middleware'i, gelen isteklerdeki JSON verilerini işlemek için kullanılan önceden tanımlanmış bir middleware'dir.
JSON verileri genellikle POST veya PUT isteklerinde gönderilen verilerdir. Örneğin, bir kullanıcı formu doldurduğunda ve bu form verileri bir JSON nesnesi olarak bir HTTP POST isteği ile sunucuya gönderildiğinde, `express.json()` middleware'i bu JSON verilerini alır ve JavaScript nesnelerine dönüştürür. Böylece, bu verilere Express uygulamanız içinde kolayca erişebilirsiniz.
Özetle, `app.use(express.json())` kodu, Express uygulamanızda gelen isteklerdeki JSON verilerini işlemek için kullanılan bir middleware'i başlatır ve kullanıma sokar. Bu sayede, gelen isteklerdeki JSON verilerini kolayca işleyebilir ve kullanabilirsiniz.
*/

app.get('/', (_, res) => { res.json({ message: "welcome vertexforge" }) })
app.use('/Bireysel', BireyselRoute);
app.use('/Kurumsal', KurumsalRoute);
app.use('/auth', AuthRoute);

import { login, register, registerkurumsal, verifyToken } from './controllers/authController.js'; // Relative path used here

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/registerkurumsal', registerkurumsal);

// Protected route example
router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'You have access to this route', user: req.user });
});

export default router;

/*
Route üzerinde tanımlanan isteklerin hangi url üzerinden geleceğini belirtir.
Örneğin: (POST)http://localhost:3000/student/create adresine bir istek geldiğinde bu istek 'StudentRoute' üzerindeki 'create' ile işlenecek.
*/


// db.sequelize.authenticate().then(() => {
//   console.log('Veritabanına başarıyla bağlanıldı.');
// }).catch(err => {
//   console.error('Veritabanına bağlanırken bir hata oluştu:', err);
// });
/*
 Veritabanı bağlantısını doğruluyoruz. Eğer bağlantı başarılı olursa 'Veritabanına başarıyla bağlanıldı.' mesajını, başarısız olursa 'Veritabanına bağlanırken bir hata oluştu:' mesajını yazdırıyoruz.
*/

const server = http.createServer(app);
/*
 Sunucuyu başlatmak için 'http' modülünden 'createServer' fonksiyonunu kullanıyoruz. Bu fonksiyon, bir HTTP sunucusu oluşturur.
 Not: eğer Postman üzerinde https kullanırsanız hata alırsınız. Çünkü bu sunucu http üzerinden çalışıyor.
*/


const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});
/*
 Sunucuyu belirtilen port üzerinden başlatıyoruz. Eğer sunucu başarıyla başlatılırsa 'Server is live on port ${port}' mesajını yazdırıyoruz.
*/
