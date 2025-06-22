
'use strict'

 let bookmarks = [];
        let currentIndex = -1;

        if (localStorage.getItem("bookmarks")) {
            bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
            displayBookmarks(bookmarks);
        }

        function isValidURL(url) {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        }

        function addBookmark() {
            const name = document.getElementById("bookmarkName").value.trim();
            const url = document.getElementById("bookmarkURL").value.trim();

            if (name === "" || url === "") {
                alert("Both fields are required!");
                return;
            }

            if (!isValidURL(url)) {
                alert("Please enter a valid URL.");
                return;
            }

            bookmarks.push({ name, url });
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            displayBookmarks(bookmarks);
            clearForm();
        }

        function displayBookmarks(list) {
            const table = document.getElementById("bookmarksTable");
            table.innerHTML = "";
            list.forEach((bookmark, index) => {
                table.innerHTML += `
                    <tr class="table-info">
                        <td>${bookmark.name}</td>
                        <td><a href="${bookmark.url}" target="_blank" class="btn btn-success btn-sm w-100">Visit</a></td>
                        <td><button onclick="prepareUpdate(${index})" class="btn btn-warning btn-sm w-100">Update</button></td>
                        <td><button onclick="deleteBookmark(${index})" class="btn btn-danger btn-sm w-100">Delete</button></td>
                    </tr>
                `;
            });
        }

        function clearForm() {
            document.getElementById("bookmarkName").value = "";
            document.getElementById("bookmarkURL").value = "";
            currentIndex = -1;
            document.getElementById("addBtn").classList.remove("d-none");
            document.getElementById("updateBtn").classList.add("d-none");
        }

        function deleteBookmark(index) {
            bookmarks.splice(index, 1);
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            displayBookmarks(bookmarks);
        }

        function prepareUpdate(index) {
            document.getElementById("bookmarkName").value = bookmarks[index].name;
            document.getElementById("bookmarkURL").value = bookmarks[index].url;
            currentIndex = index;
            document.getElementById("addBtn").classList.add("d-none");
            document.getElementById("updateBtn").classList.remove("d-none");
        }

        function updateBookmark() {
            const name = document.getElementById("bookmarkName").value.trim();
            const url = document.getElementById("bookmarkURL").value.trim();

            if (name === "" || url === "") {
                alert("Both fields are required!");
                return;
            }

            if (!isValidURL(url)) {
                alert("Please enter a valid URL.");
                return;
            }

            bookmarks[currentIndex] = { name, url };
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            displayBookmarks(bookmarks);
            clearForm();
        }

        function searchBookmarks(term) {
            const filtered = bookmarks.filter(b => b.name.toLowerCase().includes(term.toLowerCase()));
            displayBookmarks(filtered);
        }