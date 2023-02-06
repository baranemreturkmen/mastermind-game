import {GameStatistics} from "./statistics.js";
import {Game} from "./mastermind.js";
//statistics.js içerisinden birden fazla import edersem nasıl ederim?
//import {GameStatistics,blabla} from "./statistics";

export class GameViewModel{
    constructor(router) {
        this.game = new Game(router);
        this.statistics = new GameStatistics();
    }

    /*Her bir yapıyı ayrı sınıflara dağıtarak cohesive bir yapı oluşturmuş oldum.*/

    /*Genel Not!!!:
    * Model: Game, GameStatistics -> oyunun lojiğini oyunun state'ini barındırıyor.
    * Önyüz ile ilgili hiçbir bilgi barındırmıyor.
    * View: game.html (HTML/CSS)
    * Bu 2 yapı arasındaki eksiklik etkileşim. Kullanıcı arayüzü ile Model arasındaki etkileşimi nereye
    * yansıtmam gerekiyor? Model'e yansıtmam gerekiyor. Onu da app.js'de yapacağız. app class'ı view'daki
    * tüm detaylara sahip yani DOM'da ki tüm elemanları seçiyorum. Model güncellendiğinde ön yüzde güncellemek
    * istediğim ne varsa yada butona basıldığında bir aksiyon almak istiyoruz bunu app.js'de constructor'da
    * yaptık.*/

    play = (guess) => {
        this.game.guess = Number(guess);
        this.game.play();//Oyunun state'i değişti burada bu değişikliği neye yansıtmam gerekiyor?
        //Bunun için app.js dosyasını kullanacağız.
    }

    //MVVM-> Model View ViewModel

    /*Nasıl ki model game ile ilgili lojiği kendi içerisinde barındırıyorsa ui'a ön yüze ait lojiği barındırma görevi de
    * ViewModel'a ait. Yani mesela ön yüzde bir tablo var diyelim ki. Bu tabloyu besleme görevi ViewModel'da olmalı.
    * 3.rd party bir framework kullanmıyorsan modeldeki değişiklikleri ön yüze yansıtmak için senin kod yazman gerekiyor.
    * Modeli View'a bağlaman gerekiyor. Yada tam tersi kullanıcının View'da ki etkileşimini modele yanstıman da gerekebilir.*/
}