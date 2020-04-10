'use strict'

module.exports = class {
	constructor() {
		this.generate()
		setInterval(()=> this.generate(), 60000*15)
	}

	isValid(t) {
		return t.toString() === this.token.toString()
	}

	generate() {
		this.token = Buffer.from([parseInt(Math.random()*200), parseInt(Math.random()*200)])
	}
}