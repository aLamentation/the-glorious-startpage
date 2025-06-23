class DockButtons {
	
	constructor() {
		this._dock = document.querySelector('#dock');
		
		// Retrieve dockSites object from Config instance
		this.dockSites = config.getDockSites();
		
		// Populate dock
		this._populateDock();
	}

	_buildDockButton = (id, className, callback = null) => {

		const dockButton = document.createElement('div');
		dockButton.id = `button${id}`;
		dockButton.className = 'dockButton';
		dockButton.onmouseup = callback;

		return dockButton;
	}

	_buildDockButtonImage = (id, className, background) => {

		const buttonImage = document.createElement('div');
		buttonImage.id = id;
		buttonImage.className = className;
		buttonImage.style.backgroundImage = background;
	
		return buttonImage;
	}

	_generateFromManual = (id, icon, callback) => {
		const dockButton = this._buildDockButton(
			`button${id}`,
			'dockButton',
			callback
		);
		const buttonImage = this._buildDockButtonImage(
			`buttonImage${id}`,
			'dockButtonImage',
			`url('assets/buttons/${icon}.svg')`
		);
		dockButton.appendChild(buttonImage);
		this._dock.appendChild(dockButton);
	}

	_generateFromList = () => {

		for (let i = 0; i < (this.dockSites.length); i++) {
	
			const site = this.dockSites[parseInt(i, 10)].site;
			const icon = this.dockSites[parseInt(i, 10)].icon;
			const url = this.dockSites[parseInt(i, 10)].url;
	
			// Create a href
			const aDock = document.createElement('a');
			aDock.className = 'dockLink';
			aDock.href = url;
			aDock.tabIndex = '-1';
			aDock.title = site;
	
			// Create div container
			const dockButton = this._buildDockButton(
				site,
				'dockButton'
			);
	
			// Create div container for button icon
			const buttonImage = this._buildDockButtonImage(
				`buttonImage${i}`,
				'dockButtonImage',
				`url('assets/webcons/${icon}.svg')`
			);
	
			// Append divs
			dockButton.appendChild(buttonImage);
			aDock.appendChild(dockButton);

			this._dock.appendChild(aDock);
		}
	}

	_populateDock = () => {
		// 先渲染 launch.svg 按钮
		this._generateFromManual(
			'Launch',
			'launch',
			() => {
				// 打开大屏展示所有跳转按钮
				webMenu.toggleWebMenu();
			}
		);
		// 再渲染 getDockSites 返回的按钮（目前只有朋友圈）
		this._generateFromList();
	}
}

