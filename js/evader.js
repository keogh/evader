
var Evader = function (game) {
	window.game = game;

	var x_positions = [game.canvas.width/2 - 150, game.canvas.width/2 - 50, game.canvas.width/2 + 50];
	var player_positions = [
			new ze.Vec(x_positions[0], game.canvas.height - 105),
			new ze.Vec(x_positions[1], game.canvas.height - 105),
			new ze.Vec(x_positions[2], game.canvas.height - 105),
		],
		player_position = 1;
	player = new ze.Rect(player_positions[player_position].x, player_positions[player_position].y, 100, 100)
		.setFillStyle('#FF0000');
	game.addObj(player);

	// Guide lines
	var first_x = (game.canvas.width/2) - 50, second_x = (game.canvas.width/2) + 50;
	game.addObj(new ze.Line(first_x, 0, first_x, game.canvas.height).setStrokeStyle('#CCCCCC'));
	game.addObj(new ze.Line(second_x, 0, second_x, game.canvas.height).setStrokeStyle('#CCCCCC'));
	game.addObj(new ze.Line(first_x-100, 0, first_x-100, game.canvas.height).setStrokeStyle('#CCCCCC'));
	game.addObj(new ze.Line(second_x+100, 0, second_x+100, game.canvas.height).setStrokeStyle('#CCCCCC'));

	//Events
	var input = 0;
	window.addEventListener('keydown', function (e) {
		// 39 Right arrow, 37 left arrow
		//console.log(e.keyCode);
		if (e.keyCode == 39 && player_position < 2) {
			player_position++;
		} else if (e.keyCode == 37 && player_position > 0) {
			player_position--;
		}
	});

	// Map
	var map = [
		[0,0,1],
		[0,1,0],
		[0,1,1],
		[1,0,0],
		[1,0,1],
		[1,1,0],
	];

	var obstacles = [];
	for (var i = 0; i <= 100; i++) {
		var ran = map[ze.getRandom(0, map.length - 1)],
			initial_x = 0,
			end_width = 100,
			j = 0;
		while (j < ran.length) {
			if (ran[j] == 1)
				initial_x = player_positions[j].x;
			else {
				j++;
				continue;
			}
			if (j+1 < ran.length - 1  && ran[j+1] == 1) {
				end_width = 200;
				j++;
			}
			if (initial_x > 0)
				obstacles.push(new ze.Rect(initial_x, -50, end_width, 20).setFillStyle('#FFCCCC'));
			j++;
		}
		/*for (var j = 0; j < ran.length; j++) {
			if (ran[j] == 1)
				obstacles.push(new ze.Rect(player_positions[j].x, -20, 100, 20).setFillStyle('#FFCCCC'));
		}*/
	}
	//console.log(obstacles);

	//game.addObj(new ze.Rect(10,10,100,20).setFillStyle('#AACCBB'));
	/*function calcSpeed(del, speed) {
		return (speed * 60 * del) / 1000;
	}*/
	var current_obstacle = 0,
		visible_obstacles = [];
	
	//var now, delta,
		//then = new Date().getTime();
	var updateObstacles = function () {
		//now = new Date().getTime();
		//delta = (now - then) / 1000;
		if (current_obstacle == 0 || obstacles[current_obstacle-1].pos.y > 200) {
			visible_obstacles.push(obstacles[current_obstacle]);
			game.addObj(obstacles[current_obstacle]);
			current_obstacle++;
		}

		var distance = 100 * game.delta;
		for (var i = 0; i < visible_obstacles.length; i++) {		
			visible_obstacles[i].pos.y += distance;
			//visible_obstacles[i].pos.y += 3;
			if (visible_obstacles[i].pos.y > game.canvas.height) {
				game.removeObj(visible_obstacles[i]);
			}
		}

		//then = now;
	}

	var fps_div = document.getElementById('fps');
	var cont = 1;
	game.setLoop(function () {
		player.pos = new ze.Vec(player_positions[player_position].x, player_positions[player_position].y);
		updateObstacles();

		fps_div.innerHTML = 'FPS: ' + game.fps;
	});
}

ze.init(Evader);