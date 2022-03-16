$.fn.datepicker.dates['quarterly'] = {
    days: ['Sunday', 'Moonday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Moon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['Q1', 'Q2', 'Q3', 'Q4', '', '', '', '', '', '', '', ''],
    monthsShort: ['Q1', 'Q2', 'Q3', 'Q4', '', '', '', '', '', '', '', ''],
    // today: "Today",
    clear: 'Clear',
    // format: "mm/dd/yyyy",
    titleFormat: 'MM yyyy',
    /* Leverages same syntax as 'format' */
    weekStart: 0
};

$.fn.datepicker.dates['halfYearly'] = {
    days: ['Sunday', 'Moonday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Moon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['H1', 'H2', '', '', '', '', '', '', '', '', '', ''],
    monthsShort: ['H1', 'H2', '', '', '', '', '', '', '', '', '', ''],
    today: 'Today',
    clear: 'Clear',
    format: 'mm/dd/yyyy',
    titleFormat: 'MM yyyy',
    /* Leverages same syntax as 'format' */
    weekStart: 0
};

(function ($) {
    // Private variable
    var currentPickerElement;
    $.fn.irxDatePicker = function () {
        console.log(this);
        this.each(function (index, element) {
            currentPickerElement = this;
            const monthArr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            let inputVal = $.trim($(this).val()).toUpperCase();
            if (inputVal.charAt(0) === 'Q') {
                $.fn.irxDatePicker.quarterView();
            } else if (inputVal.charAt(0) === 'H') {
                $.fn.irxDatePicker.halfYearlyView();
            } else if (monthArr.includes(inputVal.substr(0, 3))) {
                $.fn.irxDatePicker.monthView();
            } else if (inputVal.length === 4) {
                $.fn.irxDatePicker.yearlyView();
            } else {
                $.fn.irxDatePicker.dateView();
            }

            $(this).off('click.irxDatePicker');
            $(this).bind('click.irxDatePicker', function () {
                console.log(this);
                currentPickerElement = this;
            });

            // $(this).off('click');
            // $(this).click(function () {
            //     // Thing to do
            //     console.log(this);
            //     constant.currentIrxPickerElement = this;
            // });
        });
        return this; // 'return this' makes the function chainable
    };

    $.fn.irxDatePicker.dateView = function (event) {
        $(currentPickerElement)
            .datepicker('destroy')
            .datepicker({
                autoclose: true,
                clearBtn: true,
                orientation: 'bottom',
                format: 'yyyy-mm-dd'
            })
            .on('show', function (event) {
                const topButtons = $(event.target).data().topbuttons;
                if (topButtons && !$('.top-btn').is(':visible')) {
                    $('.datepicker').prepend($.fn.irxDatePicker.getTopButtons(topButtons));
                }
            });
        if (event && event.target.type == 'button') {
            $(currentPickerElement).trigger('focus');
        }
    };

    $.fn.irxDatePicker.monthView = function (event) {
        $(currentPickerElement)
            .datepicker('destroy')
            .datepicker({
                autoclose: true,
                clearBtn: true,
                orientation: 'bottom',
                minViewMode: 1,
                format: 'M yyyy'
            })
            .on('show', function (event) {
                const topButtons = $(event.target).data().topbuttons;
                if (topButtons && !$('.top-btn').is(':visible')) {
                    $('.datepicker').prepend($.fn.irxDatePicker.getTopButtons(topButtons));
                }
                $('.month').each(function (index, element) {
                    $(element).width('23%');
                    $(element).show();
                });
            });
        if (event && event.target.type == 'button') {
            $(currentPickerElement).trigger('focus');
        }
    };

    $.fn.irxDatePicker.quarterView = function (event) {
        $(currentPickerElement)
            .datepicker('destroy')
            .datepicker({
                autoclose: true,
                clearBtn: true,
                orientation: 'bottom',
                format: 'MM yyyy',
                minViewMode: 1,
                language: 'quarterly',
                forceParse: false
            })
            .on('show', function (event) {
                const topButtons = $(event.target).data().topbuttons;
                if (topButtons && !$('.top-btn').is(':visible')) {
                    $('.datepicker').prepend($.fn.irxDatePicker.getTopButtons(topButtons));
                }
                $('.month').each(function (index, element) {
                    if (index > 3) {
                        $(element).hide();
                    } else {
                        $(element).show();
                        $(element).width('23%');
                    }
                });
            });
        if (event && event.target.type == 'button') {
            $(currentPickerElement).trigger('focus');
        }
    };

    $.fn.irxDatePicker.halfYearlyView = function (event) {
        $(currentPickerElement)
            .datepicker('destroy')
            .datepicker({
                autoclose: true,
                clearBtn: true,
                orientation: 'bottom',
                format: 'MM yyyy',
                minViewMode: 1,
                language: 'halfYearly',
                forceParse: false
            })
            .on('show', function (event) {
                const topButtons = $(event.target).data().topbuttons;
                if (topButtons && !$('.top-btn').is(':visible')) {
                    $('.datepicker').prepend($.fn.irxDatePicker.getTopButtons(topButtons));
                }
                $('.month').each(function (index, element) {
                    if (index > 1) {
                        $(element).hide();
                    } else {
                        $(element).show();
                        $(element).width('47%');
                    }
                });
            });
        if (event && event.target.type == 'button') {
            $(currentPickerElement).trigger('focus');
        }
    };

    $.fn.irxDatePicker.yearlyView = function (event) {
        $(currentPickerElement)
            .datepicker('destroy')
            .datepicker({
                autoclose: true,
                clearBtn: true,
                orientation: 'bottom',
                minViewMode: 2,
                format: 'yyyy'
            })
            .on('show', function (event) {});
        if (event && event.target.type == 'button') {
            $(currentPickerElement).trigger('focus');
        }
    };

    $.fn.irxDatePicker.getTopButtons = function (options = '') {
        /** required options:   'DMQHY' */
        if (options.length < 2) return '';

        let optionsArr = options.toUpperCase().split('');

        const buttons = {
            D: `<div class="col p-0">
          <button type="button" onClick="$.fn.irxDatePicker.dateView(event)" class="w-100 border-0">D</button>
        </div>`,
            M: `<div class="col p-0">
            <button type="button" onClick="$.fn.irxDatePicker.monthView(event)" class="w-100 border-0">M</button>
        </div>`,
            Q: `<div class="col p-0">
            <button type="button" onClick="$.fn.irxDatePicker.quarterView(event)" class="w-100 border-0">Q</button>
        </div>`,
            H: `<div class="col p-0">
            <button type="button" onClick="$.fn.irxDatePicker.halfYearlyView(event)" class="w-100 border-0">H</button>
        </div>`,
            Y: `<div class="col p-0">
            <button type="button" onClick="$.fn.irxDatePicker.yearlyView(event)" class="w-100 border-0">Y</button>
        </div>`
        };
        html = `<div class="top-btn" style="display: flex;">`;
        optionsArr.forEach(function (val, inx) {
            html += buttons[val];
        });
        html += `</div>`;

        return html;
    };
})(jQuery);
