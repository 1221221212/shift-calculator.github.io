var ics_year;
var ics_month;

function makeIcs(y,l){

  var cal = ics(y,l);
  worktimes_for_month_l = {};

  for (var i = 0; i < WORKTIME_ARRAY.length; i++) {
        var WORKTIME = WORKTIME_ARRAY[i];
        if (WORKTIME.start.getMonth()+1 === l && WORKTIME.start.getFullYear() === y){
            var key = WORKTIME.getDayKey();
            if (!worktimes_for_month_l.hasOwnProperty(key)){
                worktimes_for_month_l[key] = []
            }
            var begin = isostring(WORKTIME.start);
            var end = isostring(WORKTIME.finish);
            cal.addEvent("勤務",begin,end);
        }
    }
  javascript:cal.download(y+'年'+l+'月の勤務カレンダー');
}

/* global saveAs, Blob, BlobBuilder, console */
/* exported ics */

var ics = function(y,l) {
  'use strict';

  if (navigator.userAgent.indexOf('MSIE') > -1 && navigator.userAgent.indexOf('MSIE 10') == -1) {
    console.log('Unsupported Browser');
    return;
  }

  var SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
  var calendarEvents = [];
  var calendarStart = [
    'BEGIN:VCALENDAR',
    'PRODID:' + '//Naoki Iwasa//',
    'VERSION:2.0'
  ].join(SEPARATOR);
  var calendarEnd = SEPARATOR + 'END:VCALENDAR';
  var BYDAY_VALUES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return {
    /**
     * Returns events array
     * @return {array} Events
     */
    'events': function() {
      return calendarEvents;
    },

    /**
     * Returns calendar
     * @return {string} Calendar in iCalendar format
     */
    'calendar': function() {
      return calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;
    },

    /**
     * Add event to the calendar
     * @param  {string} subject     Subject/Title of event
     * @param  {string} begin       Beginning date of event
     * @param  {string} stop        Ending date of event
     */
    'addEvent': function(subject, begin, end) {
      // I'm not in the mood to make these optional... So they are all required
      if (typeof subject === 'undefined' ||
        typeof begin === 'undefined' ||
        typeof stop === 'undefined'
      ) {
        return false;
      }


      //TODO add time and time zone? use moment to format?
      var now_date = new Date();

      var now_year = ("0000" + (now_date.getFullYear().toString())).slice(-4);
      var now_month = ("00" + ((now_date.getMonth() + 1).toString())).slice(-2);
      var now_day = ("00" + ((now_date.getDate()).toString())).slice(-2);
      var now_hours = ("00" + (now_date.getHours().toString())).slice(-2);
      var now_minutes = ("00" + (now_date.getMinutes().toString())).slice(-2);
      var now_seconds = ("00" + (now_date.getSeconds().toString())).slice(-2);

      // Since some calendars don't add 0 second events, we need to remove time if there is none...
      var now_time = 'T' + now_hours + now_minutes + now_seconds;
      var now = now_year + now_month + now_day + now_time;

      var stamp = new Date().toISOString();

      var calendarEvent = [
        'BEGIN:VEVENT',
        'UID:' + calendarEvents.length + y + l + '@iwasanaoki',
        'CLASS:PUBLIC',
        'DTSTAMP;VALUE=DATE-TIME:' + now,
        'DTSTART;VALUE=DATE-TIME:' + begin,
        'DTEND;VALUE=DATE-TIME:' + end,
        'SUMMARY;LANGUAGE=en-ja:' + subject,
        'TRANSP:TRANSPARENT',
        'END:VEVENT'
      ];


      calendarEvent = calendarEvent.join(SEPARATOR);

      calendarEvents.push(calendarEvent);
      return calendarEvent;
    },

    /**
     * Download calendar using the saveAs function from filesave.js
     * @param  {string} filename Filename
     * @param  {string} ext      Extention
     */
    'download': function(filename, ext) {
      if (calendarEvents.length < 1) {
        return false;
      }

      ext = (typeof ext !== 'undefined') ? ext : '.ics';
      filename = (typeof filename !== 'undefined') ? filename : 'calendar';
      var calendar = calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;

      var blob;
      if (navigator.userAgent.indexOf('MSIE 10') === -1) { // chrome or firefox
        blob = new Blob([calendar]);
      } else { // ie
        var bb = new BlobBuilder();
        bb.append(calendar);
        blob = bb.getBlob('text/x-vCalendar;charset=' + document.characterSet);
      }
      location.href = window.URL.createObjectURL(blob);
      return calendar;
    },

    /**
     * Build and return the ical contents
     */
    'build': function() {
      if (calendarEvents.length < 1) {
        return false;
      }

      var calendar = calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;

      return calendar;
    }
  };
};
