class Clock {

	constructor() {
		this._clockEl = document.querySelector('#clock');
		this._setTime = this._setTime.bind(this);
		this._startClock();
	}

	// Append 0 before time elements if less hour's than 10
	_appendZero = k => {
		if (k < 10) {
			return '0' + k;
		} else {
			return k;
		}
	}

	_setTime = () => {
		const date = new Date();
		// 时间部分
		let hour = date.getHours();
		let min = date.getMinutes();
		hour = this._appendZero(hour);
		min = this._appendZero(min);
		const timeStr = `${hour}:${min}`;

		// 日期部分
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const weekArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
		const weekStr = weekArr[date.getDay()];
		const dateStr = `${year}年${month}月${day}日 ${weekStr}`;

		// Windows锁屏风格：大号时间+下方日期
		this._clockEl.innerHTML = `
			<div class="clock-time">${timeStr}</div>
			<div class="clock-date">${dateStr}</div>
		`;
	}

	_startClock = () => {
		this._setTime();
		setInterval(this._setTime, 1000);
	}

}