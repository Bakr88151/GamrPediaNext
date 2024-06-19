/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a3wm4tsoj1nzsra")

  // remove
  collection.schema.removeField("4wqwbiae")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a3wm4tsoj1nzsra")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4wqwbiae",
    "name": "password",
    "type": "text",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": 8,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
