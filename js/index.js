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
        monthElem = document.createElement('span'),
        yearElem = document.createElement('span'),
        getMonthName = new Date(year, month - 1).toLocaleDateString('en-us', { month: 'long' }); // convert number month to string

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
        tHead = document.createElement('thead'),
        days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    row.className = 'daysRow';
    days.forEach(function (item) { // each day add to row
        var th = document.createElement('th');
        if (item == 'Saturday' || item == 'Sunday') { // if weekend day add color red
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

    (startDay == 0) ? startDay = 6 : startDay--; // chack for sunday(by default sunday = 0) if sunday then make sunday equel 6 
    // every day make decrement because we start week from monday
    var rowCount = Math.ceil((daysInMouth + startDay) / 7); // count how many weeks

    for (var i = 0; i < rowCount; i++) { 
        var tr = document.createElement('tr');

        for (var j = 0; j < 7; j++) { 
            var td = document.createElement('td');
            if (!(i == 0 && j < startDay) && dayCount <= daysInMouth) { // check for empty cells 
                td.textContent = dayCount;
                td.className = 'date';
                dayCount++; // increment day for next iteration
                if (j == 5 || j == 6) { // check for weekends days (make red)
                    td.style.color = '#EE6E73';
                }
            }
            tr.appendChild(td);
        }

        tBody.appendChild(tr);
    }

    // modal window on click
    var getMonthName = new Date(year, month - 1).toLocaleDateString('en-us', { month: 'long' }), // convert month to string
        modal = new tingle.modal({ // for modal used tingle script 
            footer: true,
            stickyFooter: false,
            cssClass: ['custom-class-1', 'custom-class-2'],
            beforeClose: function () {
                return true; // close modal
            }
        });

    tBody.addEventListener('click', function (e) { 
        if (e.target.textContent) { // when click on cell with number then make modal
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
