
const API_URL = "http://127.0.0.1:8080/api";
//const API_URL = "";

async function getRooms() {
    const res = await fetch(`${API_URL}/rooms`);
    const rooms = await res.json();

    console.log(rooms);
    for (room of rooms) {
        document.getElementById("roomSelector").innerHTML += `
            <option value="${room.id}">
                ${room.room_number} -
                ${room.room_type} -
                ${room.price} €
            </option>
        `;
    }
}

async function getGuests() {
    const res = await fetch(`${API_URL}/guests`);
    const guests = await res.json();

    console.log(guests);

    const guestList = document.getElementById("guest-list");
    guestList.innerHTML = ""; // clear existing options

    for (const guest of guests) {
        guestList.innerHTML += `
            <option value="${guest.id}">
                ${guest.firstname} ${guest.lastname}
                (${guest.total_visits} visits)
            </option>
        `;
    }
}

getGuests();

async function bookRoom() {
    const roomid = document.getElementById("roomSelector").value;
    const dateFrom = document.getElementById("checkIn").value;
    const dateTo = document.getElementById("checkOut").value;
    const guestid = document.getElementById("guest-list").value;
    const addInfo = document.getElementById("additionalInfo").value;

    const booking = {
        room_id: roomid,
        guest_id: guestid,
        date_from: dateFrom,
        date_to: dateTo,
        addinfo: addInfo
    }

    const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });

    const data = await res.json();

    console.log(data);

}
getRooms();