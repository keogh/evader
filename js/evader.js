
var Evader = function (game) {
	window.game = game;

	var player = new ze.Rect(game.canvas.width/2 - 50, game.canvas.height - 110, 100, 100);
	game.addObj(player);

	/*app.setLoop(function () {
		rect.pos.x += 1;
	});*/
}

ze.init(Evader);