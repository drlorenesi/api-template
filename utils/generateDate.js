const dayjs = require('dayjs');

function startOfMonth(date) {
  if (date === undefined || !Boolean(date)) {
    date = dayjs().startOf('month').format('YYYY-MM-DD');
  } else if (date && dayjs(date).isValid()) {
    date = dayjs(date).format('YYYY-MM-DD');
  }
  return date;
}

function today(date) {
  if (date === undefined || !Boolean(date)) {
    date = dayjs().format('YYYY-MM-DD');
  } else if (date && dayjs(date).isValid()) {
    date = dayjs(date).format('YYYY-MM-DD');
  }
  return date;
}

exports.startOfMonth = startOfMonth;
exports.today = today;
