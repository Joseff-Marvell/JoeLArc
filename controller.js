exports.main = (req, res) => {
	const Datastore = require('nedb')
	const db = new Datastore({ filename: 'lvivold.json', autoload: true })
	db.find({ table:"arctype" }, (err, docs) => {
		res.render(path + '/index.ejs', { types: docs })
	})	
}

exports.listObjects = (req, res) => {
	var tpId = parseInt(req.params.id)
	
	const Datastore = require('nedb')
	const db = new Datastore({ filename: 'lvivold.json', autoload: true })
	db.find( { table:"arcobj", type_id: tpId }, (err, docs) => { 
		db.findOne( {table:"arctype", id:tpId }, (err, doc) => {
			res.render(path + '/objects.ejs', { tpName: doc.typeName, arcObjects: docs })
		})
	})	
}

exports.arcObject = (req, res) => {
	var objId = parseInt(req.params.id)
	
	const Datastore = require('nedb')
	const db = new Datastore({ filename: 'lvivold.json', autoload: true })
	db.findOne( {table:"arcobj", id:objId }, (err, doc) => {
		var type_id = doc.type_id
		db.findOne( {table:"arctype", id:type_id }, (err, docType) => {
			res.render(path + '/object.ejs', { objName: doc.objName, 
				descr:doc.descr, 
				image:doc.image, 
				curAddr:doc.curaddr, 
				typeId:type_id,
				tpName:docType.typeName
			})
		})
	})
}

exports.page404 = (req,res) => {
  res.sendFile(path + '404.html')
}
