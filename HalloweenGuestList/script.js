const guests = [];

// Function: Capitalizes the first letter of each word
function capitalize(str) {
    return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}

// Function: Adds a new guest to the list
function addGuest() {
    let name = document.getElementById('guestName').value;
    let character = document.getElementById('guestCharacter').value;

    // Capitalize name & character
    name = capitalize(name);
    character = capitalize(character);

    if (name && character) {
        const newGuest = { name, character, likes: 0, dislikes: 0 };
        guests.push(newGuest);
        document.getElementById('guestName').value = '';
        document.getElementById('guestCharacter').value = '';
        updateGuestList();
    } else {
        alert('Please enter both name and character.');
    }
}

// Function: Updates the guest list
function updateGuestList() {
    const guestList = document.getElementById('guestList');
    guestList.innerHTML = '';

    guests.forEach((guest, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td onclick="editGuest(${index})">${guest.name}</td>
            <td>${guest.character}</td>
            <td>
                Likes: ${guest.likes}
                <button class="btn btn-success btn-sm" onclick="increaseLikes(${index})">👍</button>
                Dislikes: ${guest.dislikes || 0}
                <button class="btn btn-danger btn-sm" onclick="increaseDislikes(${index})">👎</button>
                <button class="btn btn-secondary btn-sm" onclick="removeGuest(${index})">❌</button>
            </td>
            <input type="hidden" id="editGuestIndex" value="${index}">
        `;
        guestList.appendChild(row);
    });

    countGuests();
    highlightTopGuest();
}

// Function: Counts the total number of guests
function countGuests() {
    document.getElementById('guestCount').textContent = `Total Guest Count: ${guests.length}`;
}

// Function: Sorts the guests alphabetically using first letter of name
function sortGuests() {
    guests.sort((a, b) => a.name.localeCompare(b.name));
    updateGuestList();
}

// Function: Searchs for a guest by name
function searchGuest() {
    const searchValue = document.getElementById('searchBox').value.toLowerCase();
    const filteredGuests = guests.filter(guest => guest.name.toLowerCase().includes(searchValue));
    displayGuests(filteredGuests);
}

// Function: Displays filtered guests
function displayGuests(list) {
    const guestList = document.getElementById('guestList');
    guestList.innerHTML = '';

    list.forEach((guest, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td onclick="editGuest(${index})">${guest.name}</td>
            <td>${guest.character}</td>
            <td>
                Likes: ${guest.likes}
                <button class="btn btn-success btn-sm" onclick="increaseLikes(${index})">👍</button>
                Dislikes: ${guest.dislikes || 0}
                <button class="btn btn-danger btn-sm" onclick="increaseDislikes(${index})">👎</button>
                <button class="btn btn-secondary btn-sm" onclick="removeGuest(${index})">❌</button>
            </td>
            <input type="hidden" id="editGuestIndex" value="${index}">
        `;
        guestList.appendChild(row);
    });
}

// Function: Edits a guest's details
function editGuest(index) {
    const guest = guests[index];
    document.getElementById('editName').value = guest.name;
    document.getElementById('editCharacter').value = guest.character;
    document.getElementById('editGuestIndex').value = index;
    $('#editGuestModal').modal('show');
}

// Function: Saves edited guest details
function saveEditedGuest() {
    const index = document.getElementById('editGuestIndex').value;
    let newName = document.getElementById('editName').value;
    let newCharacter = document.getElementById('editCharacter').value;

    // Capitalize newName & newCharacter
    newName = capitalize(newName);
    newCharacter = capitalize(newCharacter);

    if (newName && newCharacter) {
        guests[index].name = newName;
        guests[index].character = newCharacter;
        updateGuestList();
        $('#editGuestModal').modal('hide');
    } else {
        alert('Please enter both name and character.');
    }
}

// Function: Used to remove a guest from the list
function removeGuest(index) {
    guests.splice(index, 1);
    updateGuestList();
}

// Function to increase likes for a guest
function increaseLikes(index) {
    guests[index].likes++;
    updateGuestList();
    mostLikedCostume();
}

// Function: Increases dislikes for a guest
function increaseDislikes(index) {
    if (!guests[index].dislikes) {
        guests[index].dislikes = 1;
    } else {
        guests[index].dislikes++;
    }
    updateGuestList();
}

// Function: Clears all guests from the list
function clearGuests() {
    guests.length = 0;
    updateGuestList();
    countGuests();
    mostLikedCostume();
}

// Function" Displays the most liked costume
function mostLikedCostume() {
    if (guests.length === 0) {
        document.getElementById('likedCostume').textContent = `Most Liked Costume: None Total Likes: 0`;
    } else {
        const mostLikedGuest = guests.reduce((prev, current) => (prev.likes > current.likes) ? prev : current);
        
        if (mostLikedGuest.likes === 0) {
            document.getElementById('likedCostume').textContent = `Most Liked Costume: None Total Likes: 0`;
        } else {
            document.getElementById('likedCostume').textContent = `Most Liked Costume: ${mostLikedGuest.name} Total Likes: ${mostLikedGuest.likes}`;
        }
    }
}

// Function: Hghlights the guest with the most likes
function highlightTopGuest() {
    if (guests.length === 0) return;

    const maxLikes = Math.max(...guests.map(g => g.likes));
    const rows = document.querySelectorAll('#guestList tr');
    
    rows.forEach(row => row.classList.remove('highlight'));
    
    guests.forEach((guest, index) => {
        if (guest.likes === maxLikes) {
            rows[index].classList.add('highlight');
        }
    });
}

