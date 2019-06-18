import {
  wait,
} from '@testing-library/dom'
import 'jest-dom/extend-expect'
import JSONops from '../JSONops'
//import React from 'react'
import { render, cleanup, fireEvent, getByText, container, waitForElement, getByLabelText } from '@testing-library/react'

afterEach(cleanup);

xit('JSONops reactivatePlayer test ', async () => {
const fromJson = JSONops.reactivatePlayer();
expect(fromJson).toBe(false);
})

xit('JSONops first test ', async () => {
const fromJson = JSONops.simple();
expect(fromJson).toBe(false);
})
