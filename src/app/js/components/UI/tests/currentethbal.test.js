import React from 'react';
import {renderWithRouter} from '../../../utils'
//NB: from ../CurrentETHBal wouldn't work.
//Would not accept uppercase in the file name!
import CurrentETHBal from '../Currentethbal'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent, getByText, container, waitForElement, getByLabelText } from '@testing-library/react'

afterEach(cleanup);

describe('CurrentETHBal UI', () => {

     xit('RTL - check CurrentETHBal renders ', () => {
       const props  = {
         updatedExtAcctBalCB: 1.0
       }
       const { getByText } = renderWithRouter(<CurrentETHBal {...props} />)
       //'is not a function' error means you need more import statements ...
           expect (getByText(/SportRank has contributed/i)).toHaveTextContent('SportRank has contributed: 1 ETH to your favourite sport');
    });
});
