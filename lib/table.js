'use strict'

const crypto = require('crypto')

class Node {
	static generateID() {
		return crypto.createHash('sha1').update(`${(new Date).getTime()}:${Math.random()*99999}`).digest()
	}

	constructor(id) {
		this.id = id || Node.generateNodeID()
	}

	static neighbor(target, id) {
		return Buffer.concat([target.slice(0, 6), id.slice(6)])
	}

	static encodeNodes(nodes) {
		return Buffer.concat(nodes.map((node)=> Buffer.concat([node.id, Node.encodeIP(node.address), Node.encodePort(node.port)])))
	}

	static decodeNodes(data) {
		const nodes = []
		for (let i = 0; i + 26 <= data.length; i += 26) {
			nodes.push({
				id: data.slice(i, i + 20),
				address: `${data[i + 20]}.${data[i + 21]}.${data[i + 22]}.${data[i + 23]}`,
				port: data.readUInt16BE(i + 24)
			})
		}
		return nodes
	}

	static encodeIP(ip) {
		return Buffer.from(ip.split('.').map((i)=>parseInt(i)))
	}

	static encodePort(port) {
		const data = Buffer.alloc(2)
		data.writeUInt16BE(port, 0)
		return data
	}
}

class Table{
	constructor(cap) {
		this.id = Node.generateID()
		this.nodes = []
		this.caption = cap
	}
	add(node) {
		if (this.nodes.length < this.caption) {
			this.nodes.push(node)
		}
	}
	shift() {
		return this.nodes.shift()
	}
	first() {
		if(this.nodes.length >= 8) {
			return this.nodes.slice(0, 8)
		}else if(this.nodes.length > 0) {
			return new Array(8).join().split(',').map(()=> this.nodes[0])
		}
		return []
	}
}

module.exports = {Table, Node}