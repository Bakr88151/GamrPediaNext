/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a3wm4tsoj1nzsra")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g7kpnf3u",
    "name": "hashedPassword",
    "type": "text",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a3wm4tsoj1nzsra")

  // remove
  collection.schema.removeField("g7kpnf3u")

  return dao.saveCollection(collection)
})
