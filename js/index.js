createCalendar('root', 2016, 5)
function createCalendar(id, year, month) {

    var calendarContainer = document.createElement('div');

    calendarContainer.classList.add('calendarContainer');
    calendarContainer.appendChild(renderHeader(year, month));
    calendarContainer.appendChild(renderTable(year, month));

    var toPage = document.getElementById(id).appendChild(calendarContainer);
}

function renderHeader(year, month) {
    var header = document.createElement('header'),
        monthElem = document.createElement('span');
    yearElem = document.createElement('span');

    header.classList.add('header');

    monthElem.textContent = month;
    yearElem.textContent = year;
    monthElem.classList.add('header__month');
    yearElem.classList.add('header__year');

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
    row.classList.add('daysRow');
    days.forEach(function (item) {
        var th = document.createElement('th');
        if (item == 'Saturday' || item == 'Sunday') {
            th.style.color = 'red';
        }
        th.textContent = item;
        row.appendChild(th);
    });
    return tHead.appendChild(row);
}

function renderTBody(year, month) {
    var tBody = document.createElement('tbody'),
        daysInMouth = new Date(year, month - 1, 0).getDate(),
        day = new Date(year, month - 1).getDay();
        if(day == 0) {
            day = 7;
        }
    for (var i = 0; i <= daysInMouth; i++) {
        var tr = document.createElement('tr');
        
        for (var j = 0; j < 7; j++) {
            var td = document.createElement('td');
            if(day > daysInMouth) {
                tr.appendChild(td);
                break;
            }
            if (!(day > j) || day >= 7) {
                td.textContent = day;
                day++;
                i++;
            } 
           
            tr.appendChild(td);
        }

        tBody.appendChild(tr);
    }
    return tBody;
}
