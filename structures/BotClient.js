/* eslint-disable no-undef */
// init
const { Client } = require("discord.js");
const YouTube = require("simple-youtube-api");
const GOOGLE_API_KEY = process.env.YT_API;
const {colors, radioServer} = require("../bot_setting.json");
const superagent = require("superagent");

// Extend class
class botClient extends Client {
	constructor(opt) {
		super(opt);

		// define constructor
		this.util = require("../utils/util");
		this.queue = new Map();
		this.players = require("../utils/players");
		this.youtube = new YouTube('AIzaSyDp9IWrbl0tRZbdCmE6QPa5gHNgle8ppkk');

		this.colors = colors;

		this.radioList = [];
		this.radioUpdate = async () => {
			var dat = await superagent.get(radioServer);
			if(!dat.text) return [];
			var parsed = JSON.parse(dat.text);

			this.radioList = parsed;
		}

		this.radioUpdate();
	}
}

module.exports = botClient;
