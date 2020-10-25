/* eslint-disable no-undef */
module.exports = {
	exec : (client)=>{
		const express = require("express");
		const app = express();
		const socketStats = require("socketstats");
		const server = new socketStats(app,client);


		const _PORT = process.env.PORT || 3000;

		app.use(express.static("public"));

		app.get("/",(req,resp) => {
			return resp.json({
				status:"ok"
			});
		})

		server.listen(_PORT,()=>{
			console.log(`Listening to port : ${_PORT}`);
		})
	}
}