const moment = require('moment');

function firstOfMonth(date) {
  if (date === undefined || !Boolean(date)) {
    date = moment().startOf('month').format('YYYY-MM-DD');
  } else if (date && moment(date).isValid()) {
    date = moment(date).format('YYYY-MM-DD');
  }
  return date;
}

function today(date) {
  if (date === undefined || !Boolean(date)) {
    date = moment().format('YYYY-MM-DD');
  } else if (date && moment(date).isValid()) {
    date = moment(date).format('YYYY-MM-DD');
  }
  return date;
}

exports.firstOfMonth = firstOfMonth;
exports.today = today;
