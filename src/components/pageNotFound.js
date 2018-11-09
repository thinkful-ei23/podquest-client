import React from 'react';
import './pageNotFound.css';

export class PageNotFound extends React.Component {
	componentDidMount() {
		this.updateCanvas();
	}
	updateCanvas() {
		function start(canvas) {
			var width = (canvas.width = document.body.clientWidth);
			var height = (canvas.height = 500);
			var letters = Array(256)
				.join(1)
				.split('');

			var draw = function() {
				canvas.getContext('2d').fillStyle = 'rgba(0,0,0,.05)';
				canvas.getContext('2d').fillRect(0, 0, width, height);
				canvas.getContext('2d').fillStyle = '#4b6cb7';
				canvas.getContext('2d').fillText('404 no page Exists here', 20, 200);
				canvas.getContext('2d').font = '50px Arial';
				letters.map(function(y_pos, index) {
					let num = 404;
					let text = String(num);
					let x_pos = index * 10;
					canvas.getContext('2d').fillText(text, x_pos, y_pos);
					letters[index] = y_pos > 758 + Math.random() * 1e4 ? 0 : y_pos + 10;
				});
			};
			setInterval(draw, 60);
		}

		var canvas = this.refs.canvas;
		start(canvas);
	}

	render() {
		return (
			<div className="content-canvas">
				<canvas ref="canvas" id="canvas" />
			</div>
		);
	}
}

export default PageNotFound;
