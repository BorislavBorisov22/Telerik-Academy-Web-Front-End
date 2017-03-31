function solve() {
    $.fn.datepicker = function() {
        var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        var CALENDAR_ROWS = 6,
            CALENDAR_COLS = 7;

        Date.prototype.getMonthName = function() {
            return MONTH_NAMES[this.getMonth()];
        };

        Date.prototype.getDayName = function() {
            return WEEK_DAY_NAMES[this.getDay()];
        };

        var initialDate = new Date();
        var date = new Date();

        var $this = $(this);

        var $datepickerWrapper = $('<div/>').addClass('datepicker-wrapper');
        $this.wrap($datepickerWrapper);
        $this.addClass('datepicker');

        $datepickerWrapper = $this.parent();

        var $datepickerContent = $('<div/>')
            .addClass('datepicker-content')
            .appendTo($datepickerWrapper);

        var $controls = $('<div/>')
            .addClass('controls')
            .appendTo($datepickerContent);

        var $prevMonthButton = $('<button/>')
            .addClass('btn')
            .html('<').appendTo($controls);

        var $currentMonth = $('<div/>')
            .addClass('current-month')
            .html(date.getMonthName() + " " + date.getFullYear())
            .appendTo($controls);

        var $nextMonthButton = $prevMonthButton.clone(false);
        $nextMonthButton.html('>').appendTo($controls);

        var $calendar = getCalendar(date);
        $calendar.appendTo($datepickerContent);

        var $currentDate = $('<div/>')
            .addClass('current-date')
            .appendTo($datepickerContent);

        var $currentDateLink = $('<a/>')
            .addClass('current-date-link')
            .text(date.getDate() + " " + date.getMonthName() + " " + date.getFullYear())
            .appendTo($currentDate);

        // events
        $('.datepicker-content').on('click', '.btn', function(ev) {
            var $this = $(this);

            var monthDiff;

            if ($this.html() === '&gt;') {
                monthDiff = 1;
            } else if ($this.html() === '&lt;') {
                monthDiff = -1;
            }

            date.setMonth(date.getMonth() + monthDiff);

            $('.calendar').replaceWith(getCalendar(date));
            $('.controls .current-month').html(date.getMonthName() + " " + date.getFullYear());
        });

        $('input.datepicker').on('click', function() {
            var $this = $(this);
            $datepickerContent = $('.datepicker-content');

            toggleVisibility();
        });

        $('.datepicker-content').on('click', 'td.current-month', function() {
            var $this = $(this);

            toggleVisibility();

            $('input.datepicker').val($this.html() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
        });

        $('.current-date-link').on('click', function() {
            var $this = $(this);

            //toggleVisibility();

            $('input.datepicker')
                .val(initialDate.getDate() + '/' + initialDate.getMonth() + 1 + '/' + initialDate.getFullYear());
        });

        $(document).on('click', function(ev) {
            var $clickedItem = $(ev.target);

            if ($clickedItem.parents('.datepicker-wrapper').length <= 0) {
                if ($datepickerContent.hasClass('datepicker-content-visible')) {
                    toggleVisibility();
                }
            }
        });

        function toggleVisibility() {
            $('.datepicker-content').toggleClass('datepicker-content-visible');
        }

        function getCalendar(date) {
            var dateToFill = date || new Date(),
                currentMonth = dateToFill.getMonth(),
                dayOfWeek = dateToFill.getDay(),
                currentDate = dateToFill;
            var i;

            var $calendarTable = $('<table/>')
                .addClass('calendar');

            // adding the week names on the calendar
            var $calendarTableHead = $('<thead/>').appendTo($calendarTable),
                $calendarTableHeadRow = $('<tr/>').appendTo($calendarTableHead);

            for (i = 0; i < WEEK_DAY_NAMES.length; i += 1) {
                $('<th/>')
                    .html(WEEK_DAY_NAMES[i])
                    .appendTo($calendarTableHeadRow);
            }

            var $currentMonthFirstDate = new Date(dateToFill.getFullYear(), dateToFill.getMonth(), 1);

            var currentMonthLastDay = new Date(dateToFill.getFullYear(), dateToFill.getMonth() + 1, 0).getDate();
            var currentMonthFirstDayOfWeek = $currentMonthFirstDate.getDay();

            var prevMonthVisibleDays = getPrevMonthVisibleDaysCount(currentMonthFirstDayOfWeek);
            var prevMonthLastDayOfMonth = new Date(dateToFill.getFullYear(), dateToFill.getMonth(), 0).getDate();

            var currentMonthDayCount = 1,
                prevMonthDayCount = prevMonthLastDayOfMonth - prevMonthVisibleDays + 1,
                nextMonthDayCount = 1;

            // filling up the days for the current month
            var dateNumberToFill;
            for (var row = 0; row < CALENDAR_ROWS; row += 1) {
                var $currentRow = $('<tr/>').appendTo($calendarTable);

                for (var col = 0; col < CALENDAR_COLS; col += 1) {
                    var $currentCell = $('<td/>');

                    if (prevMonthDayCount <= prevMonthLastDayOfMonth) {
                        $currentCell.html(prevMonthDayCount);
                        $currentCell.addClass('another-month');
                        prevMonthDayCount += 1;
                    } else if (currentMonthDayCount <= currentMonthLastDay) {
                        $currentCell.html(currentMonthDayCount);
                        currentMonthDayCount += 1;
                        $currentCell.addClass('current-month');
                    } else {
                        $currentCell.html(nextMonthDayCount);
                        $currentCell.addClass('another-month');
                        nextMonthDayCount += 1;
                    }

                    $currentCell.appendTo($currentRow);
                }
            }

            return $calendarTable;
        }

        function getPrevMonthVisibleDaysCount(firstDayOfWeek) {
            if (firstDayOfWeek === 0) {
                return 7;
            } else {
                return firstDayOfWeek;
            }
        }

        return $this;
    };
}