
export const selectedranking =
[
  {
  "description" : "schema validating people and vehicles",
  "$schema": "http://json-schema.org/draft-04/schema#",
      "type" : "object",
      "oneOf" : [{
          "properties" : {
              "RANKING" : {
                  "type" : "string"
              }
              // ,
              // "lastName" : {
              //     "type" : "string"
              // },
              // "sport" : {
              //     "type" : "string"
              // }
          },
          "required" : ["RANKING"]
      }, {
          "properties" : {
              "CURRENTCHALLENGERADDRESS" : {
                  "type" : "string"
              }
              // ,
              // "price" : {
              //     "type" : "integer"
              // }
          },
          "additionalProperties":false
      }
    ]
}
  // {
  //   "$schema": "http://json-schema.org/draft-07/schema#",
  //   "$id": "http://sportrank.com/schemas/selectedranking",
  //   "definitions": [{
  //     "id": {
  //           "$id": "#/id",
  //           "type": "object",
  //           "properties": {
  //             "id": {"type": "string"}
  //             }
  //           }
  //   }]
  // }

//
// {
//     "$schema": "http://json-schema.org/draft-04/schema#",
//     "type": "object",
//     "properties": {
//         //"RANKING": { "type": "string" },
//         //"STATUS": {"type": "string"},
//         "CURRENTCHALLENGERADDRESS": {"type": "string"}
//         //,
//
//             //"properties": {
//                 //"book-title": {"$ref": "#/definitions/book-title"},
//                 // "book-author": {"$ref": "#/definitions/book-author"},
//                 // "rfc-date": {"$ref": "#/definitions/rfc-date"},
//                 // "book-publisher": {"$ref": "#/definitions/book-publisher"}
//           //  }
//        //}
//     },
//     "additionalProperties": true
//     // ,
//     // "definitions": {
//     //     "CURRENTCHALLENGERADDRESS": {"type": "object"}
//         // "book-author": {"type": "string"},
//         // "rfc-date": {"type": "string", "format": "date-time"},
//         // "book-publisher": {"type": "string"}
//     //}
// }




//   {
//   "definitions": {},
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "$id": "http://sportrank.com/schemas/selectedranking",
//   "type": "array",
//   "title": "The Root Schema",
//   "items": {
//     "$id": "#/items",
//     "type": "object",
//     "title": "The Items Schema",
//     "required": [
//       "DATESTAMP",
//       "CURRENTCHALLENGERNAME",
//       "CURRENTCHALLENGERID",
//       "CURRENTCHALLENGERADDRESS",
//       "ACTIVE",
//       "ADDRESS",
//       "RANK",
//       "NAME",
//       "id"
//     ],
//     "properties": {
//       "DATESTAMP": {
//         "$id": "#/items/properties/DATESTAMP",
//         "type": "integer",
//         "title": "The Datestamp Schema",
//         "default": 0,
//         "examples": [
//           1569386461484
//         ]
//       },
//       "CURRENTCHALLENGERNAME": {
//         "$id": "#/items/properties/CURRENTCHALLENGERNAME",
//         "type": "string",
//         "title": "The Currentchallengername Schema",
//         "default": "",
//         "examples": [
//           "AVAILABLE"
//         ],
//         "pattern": "^(.*)$"
//       },
//       "CURRENTCHALLENGERID": {
//         "$id": "#/items/properties/CURRENTCHALLENGERID",
//         "type": "integer",
//         "title": "The Currentchallengerid Schema",
//         "default": 0,
//         "examples": [
//           0
//         ]
//       },
//       "CURRENTCHALLENGERADDRESS": {
//         "$id": "#/items/properties/CURRENTCHALLENGERADDRESS",
//         "type": "string",
//         "title": "The Currentchallengeraddress Schema",
//         "default": "",
//         "examples": [
//           ""
//         ],
//         "pattern": "^(.*)$"
//       },
//       "ACTIVE": {
//         "$id": "#/items/properties/ACTIVE",
//         "type": "boolean",
//         "title": "The Active Schema",
//         "default": false,
//         "examples": [
//           true
//         ]
//       },
//       "ADDRESS": {
//         "$id": "#/items/properties/ADDRESS",
//         "type": "object",
//         "title": "The Address Schema",
//         "required": [
//           "creationDate",
//           "balance",
//           "owner",
//           "picture",
//           "rankingDefault",
//           "username",
//           "contactno",
//           "email",
//           "description"
//         ],
//         "properties": {
//           "creationDate": {
//             "$id": "#/items/properties/ADDRESS/properties/creationDate",
//             "type": "string",
//             "title": "The Creationdate Schema",
//             "default": "",
//             "examples": [
//               "12345678"
//             ],
//             "pattern": "^(.*)$"
//           },
//           "balance": {
//             "$id": "#/items/properties/ADDRESS/properties/balance",
//             "type": "string",
//             "title": "The Balance Schema",
//             "default": "",
//             "examples": [
//               "99.873"
//             ],
//             "pattern": "^(.*)$"
//           },
//           "owner": {
//             "$id": "#/items/properties/ADDRESS/properties/owner",
//             "type": "string",
//             "title": "The Owner Schema",
//             "default": "",
//             "examples": [
//               "0x48DF2ee04DFE67902B83a670281232867e5dC0Ca"
//             ],
//             "pattern": "^(.*)$"
//           },
//           "picture": {
//             "$id": "#/items/properties/ADDRESS/properties/picture",
//             "type": "string",
//             "title": "The Picture Schema",
//             "default": "",
//             "examples": [
//               "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL"
//             ],
//             "pattern": "^(.*)$"
//           },
//           "rankingDefault": {
//             "$id": "#/items/properties/ADDRESS/properties/rankingDefault",
//             "type": "string",
//             "title": "The Rankingdefault Schema",
//             "default": "",
//             "examples": [
//               "5d89fab625cf38577615edeb"
//             ],
//             "pattern": "^(.*)$"
//           },
//           "username": {
//             "$id": "#/items/properties/ADDRESS/properties/username",
//             "type": "string",
//             "title": "The Username Schema",
//             "default": "",
//             "examples": [
//               "testuser1"
//             ],
//             "pattern": "^(.*)$"
//           },
//           "contactno": {
//             "$id": "#/items/properties/ADDRESS/properties/contactno",
//             "type": "string",
//             "title": "The Contactno Schema",
//             "default": "",
//             "examples": [
//               ""
//             ],
//             "pattern": "^(.*)$"
//           },
//           "email": {
//             "$id": "#/items/properties/ADDRESS/properties/email",
//             "type": "string",
//             "title": "The Email Schema",
//             "default": "",
//             "examples": [
//               ""
//             ],
//             "pattern": "^(.*)$"
//           },
//           "description": {
//             "$id": "#/items/properties/ADDRESS/properties/description",
//             "type": "string",
//             "title": "The Description Schema",
//             "default": "",
//             "examples": [
//               ""
//             ],
//             "pattern": "^(.*)$"
//           }
//         }
//       },
//       "RANK": {
//         "$id": "#/items/properties/RANK",
//         "type": "integer",
//         "title": "The Rank Schema",
//         "default": 0,
//         "examples": [
//           1
//         ]
//       },
//       "NAME": {
//         "$id": "#/items/properties/NAME",
//         "type": "string",
//         "title": "The Name Schema",
//         "default": "",
//         "examples": [
//           "testuser1"
//         ],
//         "pattern": "^(.*)$"
//       },
//       "id": {
//         "$id": "#/items/properties/id",
//         "type": "integer",
//         "title": "The Id Schema",
//         "default": 0,
//         "examples": [
//           2
//         ]
//       }
//     }
//   }
// }
]
