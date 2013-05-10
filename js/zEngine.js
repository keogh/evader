
ze = {};
(function (ze) {
  // Objects

  ze.init = function (func) {
    var app = new ze.App();
    func(ze);
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
    ctx.fillStyle = '#FF0000';
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
    this.draw();
  }

  App.prototype.addObj = function () {

  }

  App.prototype.draw = function() {
    if (this.userLoop) {
      requestAnimFrame(draw);
      this.userLoop();
    }

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
