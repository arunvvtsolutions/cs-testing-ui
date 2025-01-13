export enum PREDICTOR_RESULT {
  PREDICTOR_TITLE = 'List of colleges',
  LOAD_MORE = 'Load More',
  NO_QUOTA_FOUND = 'No Quota found',
  NO_COLLEGE_FOUND = 'No Colleges Found',
  BOOKMARK_LABEL = 'Bookmark',
  FEES_LABEL = 'Fees',
  SEAT_LABEL = 'Seat',
  ALL_QUOTA = 'All Quota',
  BOOKMARK_ADDED = 'Bookmark Added Succesfully',
  BOOKMARK_REMOVED = 'Bookmark Removed succesfully',
  FILTER_TITLE = 'Filter',
  COLLEGE_TYPE = 'College Type',
  HOSPITAL_TYPE = 'Hospital Type',
  STATE = 'State',
  SORTBY = 'Sort By',
  ORDERBY = 'Order By',
  CLEAR_ALL = 'Clear All',
  AIQ_PATH = 'aiq',
  STATE_PATH = 'state'
}

export const filterKey = {
  COLLEGE_TYPE: 'collegeType',
  HOSPITAL_TYPE: 'hospitalType',
  STATE: 'state',
  SORTBY: 'sortBy',
  ORDERBY: 'orderBy'
};

export const sortByData = [
  { id: 'nirfRank', label: 'NIRF Rank', checked: false, depended: '' },
  { id: 'closingRank', label: 'Closing Rank', checked: false, depended: '' },
  { id: 'bedCount', label: 'Hospital Beds Count', checked: false, depended: '' },
  { id: 'fees', label: 'Fees', checked: false, depended: '' }
];

export const orderByData = [
  { id: '1', label: 'Ascending', checked: false, depended: '' },
  { id: '2', label: 'Descending ', checked: false, depended: '' }
];
