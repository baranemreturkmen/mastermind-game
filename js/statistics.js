// Model
export class GameStatistics {
    constructor() {
        this.wins = 0;
        this.loses = 0;
        this.total = 0;
        window.addEventListener("wins", (event) => {
            this.wins++;
            this.total++;
        }, false);
        window.addEventListener("loses", (event) => {
            this.loses++;
            this.total++;
        }, false);
        /*JS'de event driven bir programlama yapısı var. Bu eventlerin önemli bir kısmı kullanıcı tarafından tetikleniyor.
          ön yüzden butona checkbox'a tıkladım text'e tıkladım vs. vs. bunların hepsi bir event ve bunların hepsi bir event
          kuyruğuna gidecektir ve kod yazarken bu eventler gerçekleştiğinde tetiklenmesini istediğim callback fonksiyonunu
          (bizim q***k iç projede de vardı.) birbirine bağlamam gerekiyor. Bunu DOM API ile yapıyoruz. Ve kullanıcı butona
          tıkladığında bizim call back fonksiyonu tetikleniyor. Event driven bir yapı var ve bu eventler built-in DOM API,
          html içerisinde tanımlanan eventler. Ama biz custom event'de oluşturabilir ve JS'de yazdığımız fonksiyonlar ve
          nesneler arasında event driven bir yapı kurabilirsiniz. Yukarıda ki bu yapı event driven bir yapı. Bu event driven
          yapıda özel bir eventlerimiz var isimleri wins ve loses. Mesela wins event'i. Oyuncu kazanıyor ve bu event çalışıyor
          bu sınıfta bu event'i dinlemek istiyor. Çünkü oyuncu kazandığında biz statelerimizi değiştireceğiz. 2. loses event'in
          de de benzer şekilde çalışıyoruz. Yani ben bu class'ın statelerini dışarıdan gelen eventler sayesinde değiştiriyorum.
          Peki nereden tetikliyoruz. 2 tane modelimiz vardı. Bu 2 model arasında loosely coupled bir yapı kuruldu. mastermind.js
          içerisinde play metodu içersinde oyunu kazanma yada kaybetme durumlarına göre custom eventler oluşturuldu. Bu eventler
          dispatch yada emit ettirildiğinde yani gönderdiğimde burası addEventListenerlar yani callback fonksiyonlarımız tetikleniyor.
          2 sınıf arasında ki fonksiyon arasında aslında ben loosely coupled bir yapı kurmuş oldum eventler aracılığıyla.
          JS programlama dili bir mimari üzerinde oturuyor. O mimari üzerinde bir JS Engine var. JS engine içerisinde bir execution
          thread var ve bu execution thread'e bağlı olarak event queue var. Bu event queue'ya genelde kullanıcı tabanlı olarak
          tetiklenen eventler geliyor. Onun dışında biz de programatik olarak event üretebiliyoruz. setInterval, setTimeout gibi
          metodlar da birer event üretiyor. Onlarda yine bu event queue'ya gidiyor. Bunlarında dışında biz de custom eventler oluşturabilir
          ve componentler ve nesneler arasında bir event yapı kurup loosely coupled bir çözüm sağlıyor. Bu yazdığımız eventlerde dolaylı olarak
          programatik eventler oluyor çünkü kullanıcı tarafından tetiklenmiyor, mastermind.js içerisinde belli bir lojiğe bağlı bir
          sekilde geliyor. Dolaylı olarak çünkü oyuncu bir butona basıyor hamle yapıyor ama bu eventler o oyuncu butona bastığı için
          tetiklenen şeyler değil biz dispatch ediyoruz. Yukarıdaki tüm durum aslında JS'in bize built-in sunduğu bir özellik.
           */
    }

    /*loadFromStore metodu dışında bu class dışarıdan doğrudan çağrılan bir metod barındırmıyor kendi bünyesinde. Stateler vs.
    * hep eventler ile değişiyor. Mesela mastermind.js'De ki play butonu öyle değildi. Dışarıdan kullanıcı butona basıyordu.*/

    /*SPA -> Single Page Application -> Frontend'de web uygulamaları aynı desktop uygulamaları görünümünde çalışıyor.
    * Burada use case değişitinde arayüzü view'u farklı bir görünüme view'a yönlendirmem gerekiyor. Buna routing diyoruz. Her
    * bir view farklı use caselere denk düşecek vs. 3rd party bir framework kullanmadığımız için routingleri de kendimiz
    * çözmemiz gerekiyor.*/

    /*Knocked Out ile de 2 way binding yapıp reactive programlama yapıyoruz. Reactive programlama içerisinde 2 temel bileşen var
    * observable pattern ve asenkron programlama. Burada ki oyunun aynısı knocked out ile yapılmış ve app.js bomboş Model ile
    * View arasında ki bind çok daha kolay bir şekilde yapılıyor.*/

    loadFromStore = (statistics) => {
        this.wins = statistics.wins;
        this.loses = statistics.loses;
        this.total = statistics.total;
    }

    /*Daha basit bir model içerisinde çok fazla lojik barındırmıyor.*/
}