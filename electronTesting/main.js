const {app, BrowserWindow, Menu, Tray} = require('electron')
const path = require('path')
const url = require('url')
var fs = require('fs')
var events = require('events')

// https://electron.atom.io/docs/tutorial/quick-start/
// https://github.com/electron/electron/tree/master/docs/tutorial
// https://github.com/electron/electron/blob/master/docs/tutorial/online-offline-events.md
// https://github.com/electron/electron/blob/master/docs/tutorial/desktop-environment-integration.md
// https://github.com/electron/electron-quick-start
// https://github.com/electron/electron/blob/master/docs/tutorial/security.md

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
	let win
	const iconPath = path.join(__dirname, 'icon.png');
	let appIcon = null;
// Console Log the Args
	var arguments = process.argv.slice(2);
	arguments.forEach(function(val,index, array) {
		console.log(index + ': ' + val);
	});
//Disable all of the Default Menus
	app.on('browser-window-created',function(e,window) {
	  window.setMenu(null);
	});


// https://electron.atom.io/docs/api/browser-window/
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
		width: 780, height: 500, 
		backgroundColor: '#2e2c29',
		resizable: false,
		movable: true,
		minimizable: true,
		maximizable: false, 
		closable: true,
	});
  
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
	createWindow();
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});