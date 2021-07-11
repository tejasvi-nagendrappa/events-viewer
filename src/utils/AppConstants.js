export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const SHOW_EVENT_DETAIL = 'SHOW_EVENT_DETAIL';
export const HIDE_EVENT_DETAIL = 'HIDE_EVENT_DETAIL';
export const UPDATE_DATE_RANGE = 'UPDATE_DATE_RANGE';

export const ERROR_CODES_TEXT = {
  422: [
    '1. Starts at is not a valid date',
    '2. Ends at is not a valid date',
    '3. Limit is out of range',
    '4. Offset is out of range'
  ],
  401: ['Not Authorized'],
  404: ['Not Found']
}

export const MESSAGE_DISPLAY_TIME = 5;
