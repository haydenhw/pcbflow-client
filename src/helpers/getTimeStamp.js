import moment from 'moment';

export default function getTimeStamp() {
  return moment().format('h:mm:ss a');
}

export function getTimeDateStamp() {
  return moment().format('MMM-Do-YYYY h:mm A');
}

