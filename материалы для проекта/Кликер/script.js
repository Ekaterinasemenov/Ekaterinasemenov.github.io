
var score = 0;
updating = 1;
function clickBtn() {
  score = score + updating;
  document.getElementsByTagName("h1")[0].firstChild.data = score;
}

function update() {
  score = score - 50;
  document.getElementsByTagName("h1")[0].firstChild.data = score;
  if1();
  updating += 1;
}
function update1() {
  score = score - 100;
  document.getElementsByTagName("h1")[0].firstChild.data = score;
  if1();
  updating += 2;
}
function update2() {
  score = score - 200;
  document.getElementsByTagName("h1")[0].firstChild.data = score ;
  if1();
  updating += 3;


}
function update3() {
  score = score - 300;
  document.getElementsByTagName("h1")[0].firstChild.data = score ;
  if1();
  updating += 4;
}
function auto() {
  score = score - 20;
  document.getElementsByTagName("h1")[0].firstChild.data = score ;
  if1();
  setTimeout("plusauto()", 500);
}
function if1 () {
  if (score < -50) {
    document.write("Вы проиграли, так-как вы превысили лимит задолженности вжухов");
  }

}
function plusauto () {
  score += updating;
  document.getElementsByTagName("h1")[0].firstChild.data = score;
  setTimeout("auto1()", 1000);
}
function auto1 () {
  score += updating;
  setTimeout("plusauto()", 1000);
  document.getElementsByTagName("h1")[0].firstChild.data = score;
}
function glknopka () {
  score += 1;
  document.getElementsByTagName("h1")[0].firstChild.data = score;
}
function reboot () {
  alert("Ваш уровень прокачки " + updating + ". Ваш баланс " + score + " .");
}

