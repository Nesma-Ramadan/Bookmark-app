
'use strict'

// #region (all decleration)

var nameInput = document.getElementById("bookmarkName");
var urlInput = document.getElementById("bookmarkURL");
var table = document.getElementById("bookmarksTable");
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');



let bookmarks = [];

// #endregion


// #region (display data from storage)

if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks(bookmarks);
}
// #endregion

// #region ( valiid url)

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
// #endregion

// #region (add new bookmark)

function addBookmark() {

    var nameAndUrl = {
        nameWeb: nameInput.value,
        urlWeb: urlInput.value,
    }


    if (nameInput.value === "" || urlInput.value === "") {
        alert("The fields are required!");
        return;
    }

    if (!isValidURL(urlInput.value)) {
        alert("Please enter a valid URL.");
        return;
    }


    bookmarks.push(nameAndUrl);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    displayBookmarks(bookmarks);

    clearForm();

}
// #endregion


// #region (clear form)

function clearForm() {

    nameInput.value = '';
    urlInput.value = '';


}


// #endregion

// #region ( display bookmark)

function displayBookmarks(list) {

    table.innerHTML = "";

    for (var i = 0 ; i < list.length ; i++) {

        table.innerHTML += `
                    <tr class="table-info">
                        <td>${list[i].nameWeb}</td>
                        <td><a href="${list[i].urlWeb}" target="_blank" class="btn btn-success btn-sm w-100">Visit</a></td>
                        <td><button onclick="prepareUpdate(${list[i].oldIndex == undefined ? i : list[i].oldIndex})" class="btn btn-warning btn-sm w-100">Update</button></td>
                        <td><button onclick="deleteBookmark(${list[i].oldIndex == undefined ? i :list[i].oldIndex})" class="btn btn-danger btn-sm w-100">Delete</button></td>
                    </tr>
                `;
    };
}


// #endregion


// #region ( update bookmark)

var currentIndex = -1;

function prepareUpdate(index) {

    currentIndex = index;

    nameInput.value = bookmarks[index].nameWeb;
    urlInput.value = bookmarks[index].urlWeb;

    showTheUpdateButton();

}

function updateBookmark() {

    var nameAndUrl = {
        nameWeb: nameInput.value,
        urlWeb: urlInput.value,
    }

    bookmarks.splice(currentIndex, 1, nameAndUrl);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    displayBookmarks(bookmarks);

    showTheAddButton();

    clearForm();

}

// #endregion


// #region ( show update button)
function showTheUpdateButton() {

    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');

}
function showTheAddButton() {

    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');

}

// #endregion


// #region ( delete Bookmark)

function deleteBookmark(index){

    bookmarks.splice(index , 1);
     
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    displayBookmarks(bookmarks);


}


// #endregion


// #region (search Bookmar)

''.toLowerCase
function searchBookmarks(term){

var matching = [];

    for( var i=0 ; i<bookmarks.length ; i++){

        if(bookmarks[i].nameWeb.toLowerCase().includes(term.toLowerCase())){

        matching.push({...bookmarks[i], oldIndex:i});

        }
    }

    displayBookmarks(matching);
}

// #endregion
