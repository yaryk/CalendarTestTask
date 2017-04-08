createCalendar('root', 2016, 1);

function createCalendar(id, year, month) {
    var calendar = document.createElement('div');

    calendar.className = 'calendarContainer';
    calendar.appendChild(renderHeader(year, month));
    calendar.appendChild(renderTable(year, month));

    document.getElementById(id).appendChild(calendar);
}

function renderHeader(year, month) {
    var header = document.createElement('header'),
        monthElem = document.createElement('span');
    yearElem = document.createElement('span');
    getMonthName = new Date(year, month - 1).toLocaleDateString('en-us', { month: 'long' });

    header.className = 'header';
    monthElem.className = 'header__month';
    yearElem.className = 'header__year';

    monthElem.textContent = getMonthName;
    yearElem.textContent = year;

    header.appendChild(monthElem);
    header.appendChild(yearElem);

    return header;
}

function renderTable(year, month) {
    var table = document.createElement('table');

    table.appendChild(renderTHead());
    table.appendChild(renderTBody(year, month));

    return table;
}

function renderTHead() {
    var row = document.createElement('tr'),
        tHead = document.createElement('thead');

    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    row.className = 'daysRow';
    days.forEach(function (item) {
        var th = document.createElement('th');
        if (item == 'Saturday' || item == 'Sunday') {
            th.style.color = '#EE6E73';
        }
        th.textContent = item;
        row.appendChild(th);
    });

    return tHead.appendChild(row);
}

function renderTBody(year, month) {
    var tBody = document.createElement('tbody'),
        daysInMouth = new Date(year, month, 0).getDate(),
        startDay = new Date(year, month - 1).getDay();
        dayCount = 1;

    (startDay == 0) ? startDay = 6 : startDay--;
    var rowCount = Math.ceil((daysInMouth + startDay) / 7);
    
    for (var i = 0; i < rowCount; i++) {
        var tr = document.createElement('tr');

        for (var j = 0; j < 7; j++) {
            var td = document.createElement('td');

            if (!(i == 0 && j < startDay) && dayCount <= daysInMouth) {
                td.textContent = dayCount;
                td.className = 'date';
                dayCount++;
                if (j == 5 || j == 6) {
                    td.style.color = '#EE6E73';
                }
            }
            tr.appendChild(td);
        }

        tBody.appendChild(tr);
    }

    // modal window on click
    var getMonthName = new Date(year, month - 1).toLocaleDateString('en-us', { month: 'long' }),
        modal = new tingle.modal({
            footer: true,
            stickyFooter: false,
            closeLabel: "Close",
            cssClass: ['custom-class-1', 'custom-class-2'],
            beforeClose: function () {
                return true;
                return false;
            }
        });
    tBody.addEventListener('click', function (e) {
        if (e.target.textContent) {
            modal.setContent('<div class="modal_container">' +
                '<div class="modal__cal">' +
                '<span class="modal__ribbon"></span>' +
                '<span class="modal__day">' + e.target.textContent + '</span>' +
                '</div>' +
                '<span class="modal__month">' + getMonthName + '</span>' +
                '</div>');
            modal.open();
        }
    });
    return tBody;
}
