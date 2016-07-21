
let schemaParse = function(l = [], v) {
	let rules = new Schema2()

	if (typeof v === 'function') {
		rules.push([l,v])
	} else {
		/* All is Object */
		for (let i of Object.keys(v)) {
			let nl = l.map(e => String(e))
			nl.push(i)
			rules = new Schema2([...rules, ...schemaParse(nl, v[i])])
		}
	}

	return rules
}

let schemaFindChild = function(/* Object */ value, /* Array */ pathChild, defaultValue = void 0){
	let currentValue = value
	
	for (let i of pathChild) {
		// console.log({i, pathChild, currentValue})
		if (typeof currentValue === 'object' && i in currentValue) {
			currentValue = currentValue[i]
		} else {
			currentValue = defaultValue
			break
		}
	}

	return currentValue
}

let setter = function (body, pathChild, value) {
	let currentValue = body

	let theIndexLast = `${pathChild.length - 1}`
	let c
	for (let i in pathChild) {
		c = pathChild[i]
		// console.log(theIndexLast, i, c, currentValue)
		if (theIndexLast !== i) {
			if (!(c in currentValue)) {
				currentValue[c] = {} 
			}
			currentValue = currentValue[c]
		}
	}

	currentValue[c] = value

	return body
}

const rulesName = Symbol('Schema2.rules')

class Schema2 {
	constructor(v = []) {
		this[rulesName] = v
	}

	push(d) {
		if ("0" in d && "1" in d && Array.isArray(d[0]) && typeof d[1] === 'function') {
			this[rulesName].push(d)
		}
	}

	* [Symbol.iterator]() {
		yield * this[rulesName]
	}

	toJSON() {
		return this[rulesName].map(e => [e[0], e[1].name])
	}

	validate(obj) {
		let bodyOut = {}

		this[rulesName].map(([index, type]) => {
			// console.log({index, type})
			let valChild = schemaFindChild(obj, index, void 0)
			if (valChild !== void 0) {
				let r
				if (
					/* Numbre Type */
					(type === Number && typeof valChild === 'number') ||
					/* String Type */
					(type === String && typeof valChild === 'string') ||
					/* Boolean Type */
					(type === Boolean && typeof valChild === 'boolean') ||
					/* Default validation */
					(type.prototype.isPrototypeOf(valChild))
				) {
					setter(bodyOut, index, valChild)
				}
			}
		})

		return bodyOut
	}
}

Schema2.rules = rulesName
Schema2.find = schemaFindChild
Schema2.set = setter

Schema2.parse = (a,b = null) => b===null ? schemaParse([], a): schemaParse(a, b)

module.exports['default'] = Schema2
module.exports['Schema2'] = Schema2
