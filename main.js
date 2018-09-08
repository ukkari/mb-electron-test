'use strict';

// Electronのモジュール
const electron = require("electron");
var nodeStatic = require('node-static');

var file = new nodeStatic.Server(__dirname + '/mb');

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response);
  }).resume();
}).listen(7171);//ポートは空いていそうなところで

// アプリケーションをコントロールするモジュール
const app = electron.app;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function () {
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({
    width: 800, height: 600,
    webPreferences: {
      //nodeIntegration: false
    }
  });
  mainWindow.loadURL('http://localhost:7171/index.html');
  mainWindow.webContents.openDevTools()

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
/*
"use strict";

const electron = require("electron");
var nodeStatic = require('node-static');
var file = new nodeStatic.Server(__dirname + '/html');

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response);
  }).resume();
}).listen(7170);//ポートは空いていそうなところで。

var app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;

app.on('window-all-closed', () => app.quit());
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 600,
    resizable: false,
    alwaysOnTop: true,
    movable: false
  });

  //ローカルで立てたサーバーにアクセス
  mainWindow.loadURL('http://localhost:7170/index.html');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', () => mainWindow = null);

});*/