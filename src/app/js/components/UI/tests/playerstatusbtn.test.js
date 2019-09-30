//moved from isCurrentUserActive to sending specificranking rankingJSONdata
//TODO: update the other tests to use same
import {
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  wait,
} from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import '@testing-library/dom'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import PlayerStatusBtn from '../buttons/PlayerStatusBtn'
import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  getByText,
  container,
  waitForElement,
  getByLabelText
} from '@testing-library/react'
import {
  specificranking
} from '../../../../../../test-fixtures/jsonbin/specificranking'
//originally based on example:
//https://testing-library.com/docs/dom-testing-library/example-intro

//PlayerStatusBtn uses CB function to change the user activation status
//Can't therefore test the btn text directly on click (cos it will re-render only via the CB)
//we can only test that the CB is called and that correct text is displayed on loading the component

afterEach(cleanup);

it('PlayerStatusBtn calls isCurrentUserActiveCB on click when user active is false', async () => {
      const historyMock = {
        push: jest.fn()
      };
      const setOnCallbackisCurrentUserActiveCB = jest.fn();
      const props = {
        rankingJSONdata: specificranking,
        setOnCallbackisCurrentUserActiveCB: setOnCallbackisCurrentUserActiveCB,
        username: 'testuser3',
        history: historyMock
      }
      const {
        getByTestId
      } = render( < PlayerStatusBtn {
          ...props
        }
        />)
        fireEvent.click(getByTestId('activatebtn-input')); expect(setOnCallbackisCurrentUserActiveCB).toHaveBeenCalled();
      })


    it('PlayerStatusBtn text correct with CurrentUser Active = true', async () => {
        const historyMock = {
          push: jest.fn()
        };

        const props = {
          rankingJSONdata: specificranking,
          username: 'GanacheAcct3',
          history: historyMock
        }
        const {
          getByTestId
        } = render( < PlayerStatusBtn {
            ...props
          }
          />)

          const inputNode = getByTestId('activatebtn-input')

          expect(inputNode).toHaveTextContent(
            'De-Activate?'
          );
          expect(inputNode).toMatchSnapshot();
        })

      xit('PlayerStatusBtn text correct with CurrentUser Active = false', async () => {
          //const isCurrentUserActiveCB = jest.fn();
          const historyMock = {
            push: jest.fn()
          };
          const props = {
            //isCurrentUserActive: false,
            rankingJSONdata: specificranking,
            username: 'testuser3',
            history: historyMock
          }
          const {
            getByTestId
          } = render( < PlayerStatusBtn {
              ...props
            }
            />)
            const inputNode = getByTestId('activatebtn-input')
            expect(inputNode).toHaveTextContent('Re-Activate?');
            expect(inputNode).toMatchSnapshot();
          })
