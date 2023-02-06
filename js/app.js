import {GameViewModel} from "./game.js";
import {emptyElement} from "./utils.js";
import {Router} from "./router.js";

const storeKey = "mastermind-store";

export class App{
    constructor(router) {
        this.gameViewModel = new GameViewModel(router);

        //Eventleri tetikleyecek bir yapı kurdum. Bu tetiklenecek yapılara GameViewModel üzerinden gidiyorum.
        //GameViewModel class'ı bir köprü aslında. View ile Model class'ları arasında.
        //Views -> app.js(DOM API) -> GameViewModel -> Models şeklinde bir akış var.

        //Aşağıdaki if'i undefined is not an object hatasını çözmek için koydum..
        if (typeof(this.playButton) != 'undefined'){
            this.playButton.addEventListener("click",(event) => {
                let guess = this.guessInputText.value;
                this.gameViewModel.play(guess);
                //Play metodu çalıştığında model tarafında state değişiyor bunu ön yüze yansıtmam gerekiyor bunu nasıl yaparım?
                this.updateView();
                //Bu değişikliği updateView aracılığıyla view'a yansıtıyorum. Modelde ki değeri alıp ön yüzde ilgili yere yazıyorum.
                //Bunu DOM API kullanarak yapıyorum.
            });
        }
    }

    init(){
        //region DOM API: Html Element Selection in View
        this.playButton = document.querySelector("#playButton");
        /*Ön yüzdeki modele bağlayacağım her bir html elemanını DOM API kullanarak seçiyorum.
        * elemanları farklı şekillerde seçebilirim. Id'ye göre, class'a göre tag'e göre vs.
        * # varsa id'ye göre seçmiştir. Ön yüzden seçtiğim butonu mesela aşağıda kullanıyorum.
        * addEventListener olan kodda şunu diyorum bu butona tıklandığında verdiğim call back
        * fonksiyonunu çağır. addEventListener'a parametre olarak call back fonksiyonu geçiyorsun.
        * */
        this.guessInputText = document.querySelector("#guess");
        this.triesBadge = document.querySelector("#tries");
        this.gameLevel = document.querySelector("#game-level");
        this.counterBadge = document.querySelector("#counter");
        this.movesTableBody = document.querySelector("#moves");
        this.divLivesIcons = document.querySelector("#lives-icons");
        this.counterProgressBar = document.querySelector("#counterProgressBar");
        this.winsBadge = document.querySelector("#wins");
        this.losesBadge = document.querySelector("#loses");
        //endregion

        setInterval( () => {
            this.gameViewModel.game.countdown();
            this.saveToStore();
            this.updateView();
        },1000)

        this.playButton.addEventListener('click', (event) => {
            let guess = this.guessInputText.value;
            /*Yukarıdaki arkadaşı DOM API ile almıştım şimdi değerine ulaşıyorum. Ben bu değeri ViewModel'e delegate ediyorum.
            * ViewModel'de bunu alıp modele delegate edecek.*/
            this.gameViewModel.play(guess);
            /*Yukarıdaki play çalışınca oyunun state'i değişti. İşi önce ViewModele delegate etti sonra da ViewModel
            * Model'a delegate etti. View -> app.js (DOM API) -> ViewModel -> Model*/
            this.saveToStore();
            /*Oyunun state'i değişti. Değişen oyun state'inş localStorage'da tutuyorum. LocalStorage ile ilgili gerekli
            * bilgileri readme'de verdik. Genel olarak built-in bir object. Key value çalışan bir storage. Nasıl kullanılıyor?
            * localStorage.setItem("master",JSON.stringfy({x: 0, y: 0})) parametre olarak string aldığı için stringfy ile
            * string'e seriliaze ediyorum. Sonuçta verdiğim değer bir JS objesi
            * circle = JSON.parse(localStorage.getItem("master")) daha önceden verdiğim key ile çekip tekrar JS objesine parse
            * ediyorum. Hem key hem de value string parametre alıyor ama bu bizi kısıtlamıyor. Çünkü ben stringfy herhangi
            * bir geçerli js değişkeni verebilirim. Array'de verebilirim. Yukarıda ki parse işini yapmazsan string olarak dönecek.
            * localStorage.setItem("numbers",JSON.stringfy([4,8,15,16,23]))
            * sessionStorage localStorage gibi çalışıyor hatta metodları bile aynı fakat localStorage'da tarayıcıyı kapadın
            * mesela hatta bilgisayarın kapadın sonra tarayıcıyı tekrar açtın localStorage'da sakladıklarına ulaşabilirsin.
            * Kalıcı oradakiler silmediysen eğer. Ama sessionStorage öyle değil ki zaten adı üzerinde session. O oturumda
            * saklıyorsun tarayıcıyı kapatığ açınca tekrar bilgilerine ulaşamazsın.*/
            this.updateView();
            /*Şimdi model değişti. Modelde ki değişiklikleri View'a yansıtmak gerekiyor. Bunu da updateView ile yapıyorum.
            * Yine burada da DOM API kullanıyoruz.*/
        });

    }

    updateView = () => {
        // Heavily uses DOM API
        this.gameLevel.innerHTML = this.gameViewModel.game.gameLevel;
        this.triesBadge.innerHTML = this.gameViewModel.game.tries;
        this.winsBadge.innerHTML = `${this.gameViewModel.statistics.wins} of ${this.gameViewModel.statistics.total}`;
        this.losesBadge.innerHTML = `${this.gameViewModel.statistics.loses} of ${this.gameViewModel.statistics.total}`;
        this.counterBadge.innerHTML = this.gameViewModel.game.counter;
        this.counterProgressBar.style.width = `${100 * this.gameViewModel.game.counter / this.gameViewModel.game.maxCounter}%`;

        if (this.divLivesIcons.childNodes.length !== this.gameViewModel.game.lives) {
            emptyElement(this.divLivesIcons);
            for (let i = 0; i < this.gameViewModel.game.lives; ++i) {
                const image = document.createElement('img');
                image.src = "images/heart-icon.jpg";
                image.style.width = "16px"
                image.style.height = "16px"
                this.divLivesIcons.appendChild(image);
                /*Burada dinamik olarak görüntü ekliyor ard arda.*/
            }
        }
        // DOM API is a low level API, it requires boilerplate code even simply to add table rows.
        emptyElement(this.movesTableBody);
        for (let move of this.gameViewModel.game.moves) {
            let tr = this.movesTableBody.insertRow();
            let cellGuess = tr.insertCell(0);
            let cellEvaluation = tr.insertCell(1);
            cellGuess.appendChild(document.createTextNode(move.guess));
            cellEvaluation.appendChild(document.createTextNode(move.evaluation));
            /*Oyuncunun her bir hamlesini ön yüzdeki tabloya yazıyorum. Third party bir framework kullanmayınca
            * arayüz birazcık karışık bir hale gelince kodlar da karışıyor. Angular, Vue gibi frameworkler
            * kullansaydım eğer böyle bir sorun olmayacaktı. Modelde birşeyler değişitiğinde arayüzde ne değişiyor
            * kısmını biz kendimiz halletmeye çalışıyoruz. Mesela tries değişitği zaman ui'Da ne değiştiği kısmında
            * ki lojik developer'ın üzerine yıkılmış durumda. Angular, react gibi frameworkler de bu bind etme
            * işini declaritive olarak yapıyoruz. Model View'a bu şekilde bağlı olduğu zaman Model değiştiğinde
            * View'da otomatik olarak değişiyor yada tam tersi. Buna 2 way binding deniyor. Böylelikle app.js
            * içerisinde yazdığın kodun hiç birini yazmana gerek yok. Bizim tüm karmaşıklık zaten updateView metodunun
            * içerisinde. Bir de burada şöyle bir sıkıntı var DOM API yavaş ve verimsiz çalıştığı için
            * modelin ui'ya bağımlı bir şekilde hangi statelerinin değiştiğini bilip ona göre DOM API kullanmam lazım
            * tüm stateleri kullanmak mantıksız DOM API zaten yavaş çalışıyor.*/

            /*Basit bir reactive programlama mantığı. x=5, y=3 -> x+y=8 -> x++ -> z=9 oluyorsa eğer sen reactive
            * programlama yapıyorsun. */

            /*Tüm client side mvc'lerin reactive olması gerekir ki verimli bir şekilde uygulama geliştirebilelim.*/
        }
    }

    loadFromStore = (store) => {
        this.gameViewModel.game.loadFromStore(store.game);
        this.gameViewModel.statistics.loadFromStore(store.statistics);
        this.updateView();
    }

    saveToStore = () => {
        localStorage.setItem(storeKey, JSON.stringify({
            game: this.gameViewModel.game,
            statistics: this.gameViewModel.statistics
        }));
    }
}

/*Bu şekilde View ile Model arasındaki bağlantıyı kurmuş olduk. Bunu yaparken DOM API'dan faydalandık. HTML standardı
* içerisinde yer alan bir API tüm tarayıcılar tarafından desteklenen temel bir API. Bunu kullanırken de JS'in event
* driven yapısını burada görebiliyoruz. Butona basıldığında tetiklenmesini istediğim metodu register ediyorum.
* Register etme işlemini DOM API ile 6. satırda yapıyorum.*/

let router = new Router({
    "loses": "gameover.html",
    "wins": "wins.html"
});

let app = new App(router);

window.onload = () => {
    app.init();
    let store = localStorage.getItem(storeKey);
    if (store !== null) {
        store = JSON.parse(store);
        app.loadFromStore(store);
    }
}
/*Uygulamayı tüm sayfa render edildikten sonra çalıştıracağım. Bundan dolayı app'i burada çalıştırıyorum.
* App sınıfından nesneyi bundan dolayı burada oluşturuyorum.*/