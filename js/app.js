
//--------------------------------------View
/* no momento da criação do this.name até p return.title. , pertencia ao var ViewModel
 porque era necessário para criar um gato. Uma vez concluido  fase inicial, resolvemos fazer
  um var Cat para poder ter mais gatos e assim eles seguirem um modelo.
    o this incrementCounter ficou no ViewModel pois ele efetivamente muda quando o usuário tem interação
    com o view. ( por isso justifica ficar no octopus-viewmodel)
*/
var Cat = function (data) {
  this.name = ko.observable(data.name);
  this.clickCount = ko.observable(data.clickCount);
  this.imgSrc = ko.observable(data.imgSrc);
  this.imgAttribution = ko.observable(data.imgAttribution);

  //list of cats
  this.cats = ko.observableArray(data.cats);

// não é alterado pq ele foi construido dentro do var Cat com as referências nelas estipuladas
// e não no data  NON editable - Hard Code
  this.title = ko.computed(function(){
    var title;
    var clicks = this.clickCount();
    if(clicks < 10){
      title = 'Newborn';
    } else if (clicks < 15) {
      title = 'Infant';
    } else if (clicks < 20) {
      title = 'Teen';
    } else if (clicks < 25) {
      title = 'Pro';
    } else {
      title = 'Ninja';
    }
    return title;
  }, this);

};

//----------octopus - ViewModel

var ViewModel = function () {

  //criação de uma var para criar os outros cats - chamando outros cat
  /* ao fazer isso, sou obrigada a alterar o meu html data-bind pelo atual para
  que  os new cats passem pelo Cat exemplo:
  <h2 data-bind="text: name"></h2>
  <div data-bind="text: clickCount"></div>
  para:
  <h2 data-bind="text: currentCat().name"></h2>
  <div data-bind="text: currentCat().clickCount"></div>
  */
  this.currentCat = ko.observable( new Cat({
    name = 'Taty';
    clickCount = 0;
    imgSrc = 'img/22252709_010df3379e_z.jpg';
    imgAttribution = 'https://wwww.google.com';
    cats = ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4'];
  }) );

  // incrementCounter
  /* por ter criado o currentCat temos também que alterar o:
  this.incrementCounter = function() {
    this.clickCount(this.clickCount() + 1);
     por currentCat.clickCount  etc.  pois o ViewModel irá ler o HTML que foi alterado
      CASO CONTRÁRIO O DEV TOOLS IRÁ DIZER QUE QUE clickCount NÃO É UMA FUNÇÃO
  */
  this.incrementCounter = function() {
    this.clickCount(this.clickCount() + 1);
  };

};




ko.applyBindings(new ViewModel);
