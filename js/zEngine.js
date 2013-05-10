
ze = {};
(function (ze) {
  // Objects
  window.animId = null;
  ze.init = function (func) {
    var app = new ze.App();
    func(app);
    app.draw();
  }

})(ze);

// Vector
(function () {
  function Vec() {
    this.Vec.apply(this, arguments);
  };
  ze.Vec = Vec;

  Vec.prototype.Vec = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
})();

// Rect
(function () {
  function Rect(x, y, w, h) {
    this.Rect.apply(this, arguments);
  }
  ze.Rect = Rect;

  Rect.prototype.Rect = function (x, y, w, h) {
    this.pos = new ze.Vec(x,y);
    this.width = w;
    this.height = h;
  }

  Rect.prototype.draw = function(ctx) {
    //console.log('rect draw');
    ctx.fillStyle = '#FF0000';
    //console.log(this.pos.x, this.pos.y, this.width, this.height);
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
})();


(function () {
  function App() {
    this.App.apply(this, arguments);
  }
  ze.App = App;

  App.prototype.App = function () {
    this.canvas = document.getElementById('c');
    this.ctx = this.canvas.getContext('2d');
    this.objs = [];
    this.userLoop = null;
  }

  App.prototype.addObj = function (obj) {
    this.objs.push(obj);
    //console.log('add', this.objs);
  }

  App.prototype.draw = function() {
    if (this.userLoop) {
      window.animId = requestAnimationFrame(App.prototype.draw.bind(this));
      this.userLoop();
      //console.log('enter loop');
    }
    //console.log('draw');

    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    for (var i = 0; i < this.objs.length; i++) {
      this.objs[i].draw(this.ctx);
    }
  }

  App.prototype.setLoop = function (func) {
    this.userLoop = func;
    this.draw();
  }
})();
