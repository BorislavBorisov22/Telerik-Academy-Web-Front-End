function solve() {
    $.fn.datepicker = function() {
        var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        Date.prototype.getMonthName = function() {
            return MONTH_NAMES[this.getMonth()];
        };

        Date.prototype.getDayName = function() {
            return WEEK_DAY_NAMES[this.getDay()];
        };

        // you are welcome :)
        var date = new Date();
        var now = new Date();

        var $this = $(this).addClass('datepicker');

        var wrapper = $('<div />').addClass('datepicker-wrapper');

        $this.wrap(wrapper);
        wrapper = $this.parent();

        var picker = $('<div />').addClass('picker').appendTo(wrapper);

        var controls = $('<div />').addClass('controls').appendTo(picker),
            leftArrowButton = $('<button />').addClass('btn').html('<').appendTo(controls),
            currentMonth = $('<div />').addClass('current-month').html(now.getMonthName() + " " + now.getFullYear()).appendTo(controls),
            rightArrowButton = $('<button />').addClass('btn').html('>').appendTo(controls);

        var calendar = getCalendar().appendTo(picker);

        var currentDate = $('<div />').addClass('current-date').appendTo(picker);

        var currentDateLink = $('<div />')
            .addClass('current-date-link')
            .html(now.getDate() + " " + now.getMonthName() + " " + now.getFullYear())
            .appendTo(currentDate);

        $('.datepicker').on('click', function() {
            $('.picker').toggleClass('picker-visible');
        });

        $('.current-date-link').on('click', function() {
            $('.datepicker').val(now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear());
            $('.picker').removeClass('picker-visible');
        });

        $('.btn').on('click', function() {
            var $this = $(this);

            if ($this.html() === '&lt;') {
                date.setMonth(date.getMonth() - 1);
            } else if ($this.html() === '&gt;') {
                date.setMonth(date.getMonth() + 1);
            }

            $('div.current-month').html(date.getMonthName() + " " + date.getFullYear());
            $('.calendar').replaceWith(getCalendar(date));
        });

        $('.picker').on('click', 'td', function() {
            console.log('triggered');
            var $this = $(this);
            $('input.datepicker').val($this.html() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
            $('.picker').removeClass('picker-visible');
        });

        $(document).on('click', function(ev) {
            var clickedElement = $(ev.target);
            if (clickedElement.parents('.datepicker-wrapper').length === 0) {
                if ($('.picker').hasClass('picker-visible')) {
                    $('.picker').toggleClass('picker-visible');
                }
            }
        });

        function getCalendar(date) {

            var CALENDAR_ROWS = 6,
                CALENDAR_COLS = 7;

            var dateToFill = date || new Date(),
                month = dateToFill.getMonth(),
                day = dateToFill.getDate(),
                year = dateToFill.getFullYear();

            var calendarTable = $('<table />').addClass('calendar');

            // filling up the upper part of the calendar
            var calendarTableHead = $('<thead />').appendTo(calendarTable),
                headRow = $('<tr />').appendTo(calendarTableHead);

            for (var i = 0, len = WEEK_DAY_NAMES.length; i < len; i += 1) {
                $('<th />').html(WEEK_DAY_NAMES[i]).appendTo(headRow);
            }

            // setting up the dates for the month
            var currentMonthLastDay = new Date(year, month + 1, 0).getDate(),
                lastMonthLastDay = new Date(year, month, 0).getDate(),
                firstWeekDayOfMonth = new Date(year, month, 1); //getDay();

            var prevMonthVisibleDays;
            if (firstWeekDayOfMonth.getDayName() === 'Su') {
                prevMonthVisibleDays = CALENDAR_COLS;
            } else {
                prevMonthVisibleDays = firstWeekDayOfMonth.getDay();
            }

            var isPrevMonth = true;
            var isNextMonth = false;

            var currentMonthDaysCount = 1,
                nextMonthDaysCount = 1;

            for (var row = 0; row < CALENDAR_ROWS; row += 1) {
                var currentRow = $('<tr />').appendTo(calendarTable);

                for (var col = 0; col < CALENDAR_COLS; col += 1) {
                    var currentCell = $('<td />');

                    if (prevMonthVisibleDays <= 0) {
                        isPrevMonth = false;
                    }

                    prevMonthVisibleDays -= 1;

                    if (isPrevMonth) {
                        currentCell
                            .html(lastMonthLastDay - prevMonthVisibleDays)
                            .addClass('another-month');
                    } else if (currentMonthDaysCount <= currentMonthLastDay) {
                        currentCell
                            .html(currentMonthDaysCount)
                            .addClass('current-month');

                        currentMonthDaysCount += 1;
                    } else {
                        currentCell
                            .html(nextMonthDaysCount)
                            .addClass('another-month');

                        nextMonthDaysCount += 1;
                    }

                    currentCell.appendTo(currentRow);
                }
            }

            return calendarTable;
        }

        return $this;
    };
}

module.exports = solve;