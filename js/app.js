var dataCats = [
  {
    name : "Bob",
    clickCount : 0,
    imgSrc : "img/cat1.jpg",
    word : "I need some love !!!"
  },
  {
    name : "Tiger",
    clickCount : 0,
    imgSrc : "img/cat2.jpg",
    word : "I just want to be famous on Instagram, get rich by taking photos and doing nothing else!"
  },
  {
  name : "Zest",
  clickCount : 0,
  imgSrc : "img/cat3.jpg",
  word : "The only thing I'm thinking right now!"
  },
  {
  name : "Mr.Down",
  clickCount : 0,
  imgSrc : "img/cat4.jpg",
  word : "Please! Can I have my moment without being disturbed? "
  },
  {
  name : "Xoxo",
  clickCount : 0,
  imgSrc : "img/cat5.jpg",
  word : "Are you sure you want to talk?"
  },
  {
  name : "Zimba",
  clickCount : 0,
  imgSrc : "img/cat6.jpg",
  word : "OMG! I need to sleep! I can't work!"
  }
  ]


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

  // coloquei o self para usar com o catList
  var self = this;
  //criação de uma var para criar os outros cats - chamando outros cat
  /* ao fazer isso, sou obrigada a alterar o meu html data-bind pelo atual para
  que  os new cats passem pelo Cat exemplo:
  <h2 data-bind="text: name"></h2>
  <div data-bind="text: clickCount"></div>
  para:
  <h2 data-bind="text: currentCat().name"></h2>
  <div data-bind="text: currentCat().clickCount"></div>
  eliminei o excesso de currentCat()... por with
  */

  //crio um var observableArray so I can store the data Cats  inside the observableArray
  this.catList = ko.observableArray([]);

  // loop por cada dataCats - loop direto sem this. e retiro(extraio) PUSH toda info
  // para o catList se apropiar
  dataCats.forEach(function(catItem){
    self.catList.push (new Cat(catItem));
  });

  /* this. currentCat se torna um observable que carrega consigo todo o catList
  ou seja é um ponteiro  que tem como base o index 0 , o primeiro cat para dar acesso. Isso torna
  o with: currentCat do HTML  uma info estática. ou seja.  quando eu criei o primeiro cat
  eram essas info que eu precisa para o cat atual.
  Ao criar um array de vários cats com  a mesma info eu simplesmente linko essa lista de data array com o current cat
  PARA EU ACESSAR UM GATO EM PARTICULAR EU VOU PELO CATLIST*/
  this.currentCat = ko.observable ( this.catList()[0] );

  /*Segundo a documentação do knockoutJs, quando clicamos em algo e este executa uma função, ele passa o objeto
  no qual você fez o click, especificamente no modelo( cat que estamos falando). Por isso damos e usamos qualquer
  nome  ex: getClicketCat para confirmar que o cat clicado é o cat  data que deve ser atualizado no view.
  */

  this.seatCat = function(getClicketCat){
    self.currentCat(getClicketCat);
  };


  // incrementCounter
  /* por ter criado o currentCat temos também que alterar o:
  this.incrementCounter = function() {
    this.clickCount(this.clickCount() + 1);
     por currentCat.clickCount  etc.  pois o ViewModel irá ler o HTML que foi alterado
      CASO CONTRÁRIO O DEV TOOLS IRÁ DIZER QUE QUE clickCount NÃO É UMA FUNÇÃO
  */
  this.incrementCounter = function() {
    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  };

};




ko.applyBindings(new ViewModel);
