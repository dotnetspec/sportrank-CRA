import {validate, validateglobal, validateselected} from '../io/schemaval'
import {
  //wait
} from '@testing-library/react'
import '@testing-library/dom'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import {globalRankings} from '../../../../../../test-fixtures/jsonbin/globalRankings'
import {malformedglobalRankings} from '../../../../../../test-fixtures/jsonbin/malformedglobalRankings'
//import {specificRankingData} from '../../../../../../test-fixtures/jsonbin/specificRankingData'
import {specificranking} from '../../../../../../test-fixtures/jsonbin/specificranking'
import {malformedspecificranking} from '../../../../../../test-fixtures/jsonbin/malformedspecificranking'

const specifranking =   {
    "RANKING": "NEWRANKING",
    "STATUS": "NEW",
    "id": 1,
    "ACTIVE": false,
    "RANK": 0,
    "CURRENTCHALLENGERNAME": "AVAILABLE"
  }

describe('Schema Validator tests', () => {

  it('Simple validate', () => {

    const result = validate(4);
    expect(result).toBe(true);
    //with 'bad' data
    const result2 = validate('hello');
    expect(result2).toBe(false)
  });

  it('Global json validate', () => {

    const result = validateglobal(globalRankings);
    expect(result).toBe(true);
    //with 'bad' data
    const result2 = validateglobal(malformedglobalRankings);
    expect(result2).toBe(false)
  });

  fit('Selected ranking json validate', () => {

    //NB: probably change this param back
    const result = validateselected(specifranking);
    expect(result).toBe(true);
    //with 'bad' data
    // const result2 = validateselected(malformedspecificranking);
    // expect(result2).toBe(false)
  });
});
