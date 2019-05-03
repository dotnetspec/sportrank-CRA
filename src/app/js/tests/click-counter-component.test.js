import { describe } from 'riteway';
import render from 'riteway/render-component';
import React from 'react';
import ClickCounter from './click-counter-component';
describe('ClickCounter component', async assert => {
  const createCounter = clickCount =>
    render(<ClickCounter clicks={ clickCount } />)
  ;
  {
    const count = 13;
    const $ = createCounter(count);
    assert({
      given: 'a click count',
      should: 'render the correct number of clicks.',
      actual: parseInt($('.clicks-count').html().trim(), 10),
      expected: count
    });
  }
  {
    const count = 5;
    const $ = createCounter(count);
    assert({
      given: 'a click count',
      should: 'render the correct number of clicks.',
      actual: parseInt($('.clicks-count').html().trim(), 10),
      expected: count
    });
  }
  {
    const $ = createCounter(0);
      assert({
        given: 'expected props',
        should: 'render the click button.',
        actual: $('.click-button').length,
        expected: 1
      });
    }
});
