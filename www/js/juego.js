var app={
  inicio: function(){
    DIAMETRO_BOLA = 50;
    dificultad = 0;
    velocidadX = 0;
    velocidadY = 0;
    puntuacion = 0;
    choque = false;

    alto  = document.documentElement.clientHeight;
    ancho = document.documentElement.clientWidth;
    
    app.vigilaSensores();
    app.iniciaJuego();
  },

  iniciaJuego: function(){

    function preload() {
      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.stage.backgroundColor = '#dcdcdc';

      game.load.image('bola', 'assets/bola.png');
      game.load.image('objetivo', 'assets/agujero2.png');
      game.load.image('agujero1', 'assets/agujero.png');
      game.load.image('agujero2', 'assets/agujero.png');
      game.load.image('agujero3', 'assets/agujero.png');
      game.load.image('agujero4', 'assets/agujero.png');
      game.load.image('agujero5', 'assets/agujero.png');   
      
    }

    function create() {
            
      objetivo = game.add.sprite(app.inicioX(), app.inicioY(), 'objetivo');
      agujero1 = game.add.sprite(app.inicioX(), app.inicioY(), 'agujero1');
      agujero2 = game.add.sprite(app.inicioX(), app.inicioY(), 'agujero2');
      agujero3 = game.add.sprite(app.inicioX(), app.inicioY(), 'agujero3');
      agujero4 = game.add.sprite(app.inicioX(), app.inicioY(), 'agujero4');
      agujero5 = game.add.sprite(app.inicioX(), app.inicioY(), 'agujero5');
      
      bola = game.add.sprite(0, 0, 'bola');
      
      game.physics.arcade.enable(bola);
      game.physics.arcade.enable(objetivo);
      game.physics.arcade.enable(agujero1);
      game.physics.arcade.enable(agujero2);
      game.physics.arcade.enable(agujero3);
      game.physics.arcade.enable(agujero4);
      game.physics.arcade.enable(agujero5);

      bola.body.collideWorldBounds = true;

    }

    function update(){      
      var factorDificultad = (300 + (dificultad * 100));

      bola.body.velocity.y = (velocidadY * factorDificultad);
      bola.body.velocity.x = (velocidadX * (-1 * factorDificultad));

      game.physics.arcade.overlap(bola, objetivo, app.gana, null, this);
      game.physics.arcade.overlap(bola, agujero1, app.falla, null, this);
      game.physics.arcade.overlap(bola, agujero2, app.falla, null, this);
      game.physics.arcade.overlap(bola, agujero3, app.falla, null, this);
      game.physics.arcade.overlap(bola, agujero4, app.falla, null, this);
      game.physics.arcade.overlap(bola, agujero5, app.falla, null, this);
      
    }

    var estados = { preload: preload, create: create, update: update };
    var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser',estados);
  },

  falla: function(){
    alert("HAS PERDIDO!!!");
    recomienza();
    
  },

  gana: function(){
    alert("HAS GANADO!!!");
    
    recomienza();


    
  },

  inicioX: function(){
    return app.numeroAleatorioHasta(ancho - DIAMETRO_BOLA );
  },

  inicioY: function(){
    return app.numeroAleatorioHasta(alto - DIAMETRO_BOLA );
  },

  numeroAleatorioHasta: function(limite){
    return Math.floor(Math.random() * limite);
  },

  vigilaSensores: function(){
    
    function onError() {
        console.log('onError!');
    }

    function onSuccess(datosAceleracion){
      app.detectaAgitacion(datosAceleracion);
      app.registraDireccion(datosAceleracion);
    }

    navigator.accelerometer.watchAcceleration(onSuccess, onError,{ frequency: 10 });
  },

  detectaAgitacion: function(datosAceleracion){
    var agitacionX = datosAceleracion.x > 10;
    var agitacionY = datosAceleracion.y > 10;

    if (agitacionX || agitacionY){
      setTimeout(app.recomienza, 1000);
    }
  },

  recomienza: function(){
    document.location.reload(true);
  },

  registraDireccion: function(datosAceleracion){
    velocidadX = datosAceleracion.x ;
    velocidadY = datosAceleracion.y ;
  }

};

if ('addEventListener' in document) {
    document.addEventListener('deviceready', function() {
        app.inicio();
    }, false);
}