
export const globalranking =
[
  {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/root.json",
    "type": "array",
    "title": "The Root Schema",
    "items": {
      "$id": "#/items",
      "type": "object",
      "title": "The Items Schema",
      "required": [
        "RANKINGID",
        "ACTIVE",
        "RANKINGDESC",
        "RANKINGNAME"
      ],
      "properties": {
        "RANKINGID": {
          "$id": "#/items/properties/RANKINGID",
          "type": "string",
          "title": "The Rankingid Schema",
          "default": "",
          "examples": [
            "5c6a7cf5a83a2931773847b8"
          ],
          "pattern": "^(.*)$"
        },
        "ACTIVE": {
          "$id": "#/items/properties/ACTIVE",
          "type": "boolean",
          "title": "The Active Schema",
          "default": false,
          "examples": [
            true
          ]
        },
        "RANKINGDESC": {
          "$id": "#/items/properties/RANKINGDESC",
          "type": "string",
          "title": "The Rankingdesc Schema",
          "default": "",
          "examples": [
            "testRank"
          ],
          "pattern": "^(.*)$"
        },
        "RANKINGNAME": {
          "$id": "#/items/properties/RANKINGNAME",
          "type": "string",
          "title": "The Rankingname Schema",
          "default": "",
          "examples": [
            "testRank1"
          ],
          "pattern": "^(.*)$"
        }
      }
    }
  }
]
