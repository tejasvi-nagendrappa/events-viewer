import { render } from '@testing-library/react';
import { formatDateTime } from '../../utils/Helpers';
import EventListView from './EventListView';

const eventData = [{
  "id": 1,
  "position": {
    "name": "Movies",
    "color": "violet",
    "id": 20
  },
  "startsAt": "2020-05-03T06:00:00.000Z",
  "endsAt": "2020-05-03T14:00:00.000Z"
},
{
  "id": 9,
  "position": {
    "name": "Baby",
    "color": "orange",
    "id": 31
  },
  "startsAt": "2020-08-05T09:00:00.000Z",
  "endsAt": "2020-08-05T15:00:00.000Z"
}
];

describe('EventListView Tests', () => {
  it('EventListView should render with two rows', async () => {
    const table = render(<EventListView events={eventData}/>);
    const firstRow = await table.findByText(/Movies/i);
    expect(firstRow).toBeVisible();
    const secondRow = await table.findByText(/Baby/i);
    expect(secondRow).toBeVisible();
  });

  it('EventListView should show No Data on no events', async () => {
    const table = render(<EventListView events={[]} />);
    const noDataNode = await table.findByText(/No Data/i);
    expect(noDataNode).toBeVisible();
  });

  it(`EventListView should show position, starts at,
   ends at as column headers`, () => {
    const table = render(<EventListView events={[]} />);
    const postionCol = table.getByText(/Position/i);
    expect(postionCol).toBeVisible();
    const startsAtCol = table.getByText(/Starts At/i);
    expect(startsAtCol).toBeVisible();
    const endsAtCol = table.getByText(/Ends At/i);
    expect(endsAtCol).toBeVisible();
  });

  it(`EventListView should show formatted Start and End dates`, () => {
    const table = render(<EventListView events={eventData} />);
    const formattedStartDate = formatDateTime(eventData[0].startsAt);
    const formattedEndDate = formatDateTime(eventData[1].endsAt);
    const startAtRow = table.getByText(formattedStartDate);
    expect(startAtRow).toBeVisible();
    const endsAtRow = table.getByText(formattedEndDate);
    expect(endsAtRow).toBeVisible();
  });

  it(`EventListView should show Fetching Events in
  Spinner if loading is true`,async () => {
    const table = render(<EventListView events={eventData} isLoading/>);
    const loadingText = await table.findByText(/Fetching Events/i);
    expect(loadingText).toBeVisible();
  });
});
