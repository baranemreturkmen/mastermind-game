Binnur Kurt'un düzenlemiş olduğu Javascript eğitiminde yapılan çalışmaları ve aldığım notları içermektedir.

Not: Node.js'li kısımları içermiyor.

Not2: React öncesi temel olması açısından hocanın
dcl304-2022-apr-06 altında mastermind-game-ko projesi incelenebilir.

Not3: Reaktif programlama projesi var. study-reactive-programming yine dcl304-2022-apr-06 altında
yine bunu da incelemek faydalı olacaktır.

Game Level : 3
Secret : 549
Player tries to guess the secret:
123 -> No Match
456 -> -2
574 -> -1 +1
549 -> Next Game Level: 4
...
Game Level: 10 -> Player wins!
60 + 10 * (Game Level - 3) seconds
Number of moves: 10 + 2 * (Game Level - 3)
3 Lives
+1 Live

! Local Storage

The Web Storage API is a set of mechanisms that enable browsers to store key-value pairs. It is designed to be much more intuitive than using cookies.

The key-value pairs represent storage objects, which are similar to objects except they remain intact during page loads, and are always strings.

The Web Storage API consists of two mechanisms: sessionStorage and localStorage. Both sessionStorage and ** localStorage** maintain a separate storage area for each available origin for the duration of the page session.

The main difference between sessionStorage and localStorage is that sessionStorage only maintains a storage area while the browser is open (including when the page reloads or restores) while localStorage continues to store data after the browser is closed. In other words, whereas data stored in sessionStorage is cleared when the page is closed, data stored in localStorage does not expire.

localStorage is a property that allows JavaScript sites and apps to save key-value pairs in a web browser with no expiration date. This means the data stored in the browser will persist even after the browser window is closed.

To use localStorage in your web applications, there are five methods to choose from:

setItem(): Add key and value to localStorage
getItem(): This is how you get items from localStorage
removeItem(): Remove an item by key from localStorage
clear(): Clear all localStorage
key(): Passed a number to retrieve the key of a localStorage