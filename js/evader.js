
var Evader = function (game) {
	window.game = game;

	var x_positions = [game.canvas.width/2 - 150, game.canvas.width/2 - 50, game.canvas.width/2 + 50];
	var player_positions = [
			new ze.Vec(x_positions[0], game.canvas.height - 105),
			new ze.Vec(x_positions[1], game.canvas.height - 105),
			new ze.Vec(x_positions[2], game.canvas.height - 105),
		],
		player_position = 1;
	//window.pos = player_position;
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
		if (input == 0) {
			if (e.keyCode == 39 && player_position < 2) {
				input = 1;
			} else if (e.keyCode == 37 && player_position > 0) {
				input = -1;
			}
		}
	});

	window.addEventListener('keyup', function (e) {
		if (e.keyCode == 39 || e.keyCode == 37) {
			console.log('no');
			input = 0;
		}
	})

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
	}

	var current_obstacle = 0,
		visible_obstacles = [];
	
	var updateObstacles = function () {
		if (current_obstacle == 0 || obstacles[current_obstacle-1].pos.y > 200) {
			visible_obstacles.push(obstacles[current_obstacle]);
			game.addObj(obstacles[current_obstacle]);
			current_obstacle++;
		}

		var distance = 100 * game.delta;
		for (var i = 0; i < visible_obstacles.length; i++) {		
			visible_obstacles[i].pos.y += distance;
			if (visible_obstacles[i].pos.y > game.canvas.height) {
				game.removeObj(visible_obstacles[i]);
				visible_obstacles.splice(i, 1);
				i--;
			}
		}
	}

	var updatePlayer = function () {
		if (input > 0 && player_position < 2) {
			player_position++;
			input = 0;
		} else if (input < 0 && player_position > 0) {
			player_position--;
			input = 0;
		}

		player.pos = new ze.Vec(player_positions[player_position].x, player_positions[player_position].y);
	}

	var fps_div = document.getElementById('fps');
	var cont = 1;
	game.setLoop(function () {
		//player.pos = new ze.Vec(player_positions[player_position].x, player_positions[player_position].y);
		updatePlayer();
		updateObstacles();

		fps_div.innerHTML = 'FPS: ' + game.fps;
	});
}

ze.init(Evader);