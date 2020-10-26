/* eslint-disable no-undef */
// init
const { Client } = require("discord.js");
const YouTube = require("simple-youtube-api");
const GOOGLE_API_KEY = require(../config.json);
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
		this.youtube = new YouTube(GOOGLE_API_KEY);

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
