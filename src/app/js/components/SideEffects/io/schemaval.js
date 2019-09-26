import Validator from 'jsonschema';
import {
  globalranking
} from '../../../../json/schemas/globalranking'
import {
  selectedranking
} from '../../../../json/schemas/selectedranking'

export const validate = (json) => {
  var schema = {
    "type": "number"
  };
  const result = Validator.validate(json, schema);
  //console.log(Validator.validate(json, schema));
  return result.errors.length === 0 ? true : false;
}

export const validateglobal = (json) => {
  //take the schema obj out of the array
  var schema = globalranking[0];
  const result = Validator.validate(json, schema);
  //console.log(Validator.validate(json, schema));
  return result.errors.length === 0 ? true : false;
}

export const validateselected = (json) => {
  var schema = selectedranking[0];
  const result = Validator.validate(json, schema);
  //console.log(Validator.validate(json, schema));
  return result.errors.length === 0 ? true : false;
}
