//VARIABEL
const
inp = [{element: document.getElementById('month'),maxvalue: 999999},{element: document.getElementById('day'),maxvalue: 9999999},{element: document.getElementById('hour'),maxvalue: 999999999},{element: document.getElementById('minute'),maxvalue: 9999999999}],
btn_reset = document.getElementById('reset'),
display = document.getElementById('display'),
display2 = document.getElementById('display2'),
strDay = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'],
strMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']



//EVENT LISTENER
inp.forEach((x, i) => {
    x.element.addEventListener('input', (e) => {
        validasiValue(e.target, x.maxvalue, i)
        calc()
    })
})

inp.forEach((x, i) => {
    x.element.addEventListener('keydown', (e) => {
        if (e.key == 'Backspace' && !e.target.value.length) inp[i-1].element.focus()
    })
})

btn_reset.addEventListener('click', () => {
    inp.forEach(x => x.element.value = '')
    calc()
})



//FUNCTION
function calc() {

    const x = new Date();
    const newDate = inp.map(x => +x.element.value || 0)

    const cek = newDate.reduce((x,
        y) => x + y)

    if (!cek) {
        display2.innerText = ''
        display.innerText = ''
        return
    }

    const getTimeTarget = new Date(x.getFullYear(),
        x.getMonth() + newDate[0],
        x.getDate() + newDate[1],
        x.getHours() + newDate[2],
        x.getMinutes() + newDate[3],
        x.getSeconds(),
        x.getMilliseconds());

    display2.innerText = `${!newDate[0] ? '': newDate[0] + ' Bulan'} ${!newDate[1] ? '': newDate[1] + ' Hari'} ${!newDate[2] ? '': newDate[2] + ' Jam'} ${!newDate[3] ? '': newDate[3] + ' Menit'}`

    display.innerText = `${strDay[getTimeTarget.getDay()]}, ${getTimeTarget.getDate()} ${strMonth[getTimeTarget.getMonth()]} ${getTimeTarget.getFullYear()} - ${getTimeTarget.getHours() < 10 ? '0'+getTimeTarget.getHours(): getTimeTarget.getHours()}.${getTimeTarget.getMinutes() < 10 ? '0'+getTimeTarget.getMinutes(): getTimeTarget.getMinutes()}`
}

function validasiValue(target, maxvalue, nextIndex) {
    if (target.value > maxvalue) {
        target.value = maxvalue
        if (nextIndex < inp.length - 1) inp[nextIndex+1].element.focus()
    }
}