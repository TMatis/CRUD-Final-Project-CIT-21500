let Library = LibraryAPI();

const setup = () => {
    ///console.log("Setup Start");
    // 1. Create a 2px solid black border around the login box
    $(".access").css({ border: "2px solid black" });
    // 2. Hide li tags on the nav bar 
    $("#series_container").hide();
    $("#backup_footer").hide();
    $(".Series_Input").hide();
    // 3. Add event handler for login button so login function is called
    $("#login").on("click", login);
    $("#secret").on("click", bypassLogin);
};

const authOK = (userName, userPasscode) => {
    ////console.log("in authOK")
    // 1. Add a check : pass back true if the password is "pi" and the username is "timo", otherwise false
    // Note: && is the logical AND operator in JavaScript
    if (userName == "timo" && userPasscode == "pi") {
        ////console.log("true");
        return true
    }
    else {
        ////console.log("false");
        return false //Change during testing
    }
};

const login = () => {
    ////console.log("Loged In");
    //  Set variable, userName, to the content of the text box with id of id_Name
    let userName = document.querySelector("#id_Name").value;
    ////console.log(userName)
    //  Set variable, userPasscode, to the content of the text box with id of id_Passcode
    let userPasscode = document.querySelector("#id_Passcode").value;
    ////console.log(userPasscode)
    //  Use function authOK with userName and userPasscode- 
    if (authOK(userName, userPasscode) == true) { //       if the return is true show the li tags in the nav bar
        $("#series_container").show();
        //hide the element with class of access and the log in prompt header
        $("#Add_Series .access").hide();
        $("header h2").hide();
        //use jQuery to create an H3 tag, with content of
        nameStr = $(`<h3>Welcome, "${userName.toUpperCase()}" the account handler!</h3>`);
        //    "Welcome," whatever the user name is, and "account handler!"
        //Store the H3 tag reference (above) in variable nameStr.
        // Hide the secret button
        $("#secret").hide();
        $("#backup_footer").show();
        $(".Series_Input").show();

        //updated status bar
        updateStatus(`Logged in successfully as "${userName}"!`, 5000);
    } else {
        /* alert(`Username or Password is incorrect. User is: timo, Pass is: pi`); */
        
        //updated status bar
        updateStatus("Login failed. Please check your credentials. hint: User is: timo, Pass is: pi", 5000);
    }
  
    $("header").append(nameStr);

    Add_Series();
};

const bypassLogin = () => {
    // Directly show the hidden elements without checking credentials
    $("#series_container").show();
    $("#Add_Series .access").hide();
    $("header h2").hide();
    $("#secret").hide();
    $("#backup_footer").show();
    $(".Series_Input").show();
    
    // Create the H3 element using jQuery
    let nameStr = $("<h3>").text('Welcome, "SECRET USER" the account handler!');
    $("header").append(nameStr);

    Add_Series();

    //updated status bar
    updateStatus('Bypassed login successfully. Welcome, "SECRET USER"!');
};

const updateStatus = (message, duration = 3500) => {
    const statusInfo = $("#Status_Info");
    statusInfo.text(message);

    // Highlight the status bar for visibility
    $("#StatusBar").css({
        backgroundColor: "lightgreen",
        border: "2px solid green",
    });

    // Automatically clear the message after the specified duration
    setTimeout(() => {
        statusInfo.text("");
        $("#StatusBar").css({
            backgroundColor: "",
            border: "",
        });
    }, duration);
};

const Add_New_Series = () => {

    const seriesName = document.getElementById('seriesName').value;
    const description = document.getElementById('description').value;
    const author = document.getElementById('author').value;
    const booksInput = document.getElementById('books').value;
    const RoomInput = document.getElementById('room').value;
    const Book_CaseInput = document.getElementById('bookCase').value;
    const ShelfInput = document.getElementById('shelf').value;
    
    // Split the booksInput string into an array and remove leading/trailing spaces
    const booksArray = [];
    const books = booksInput.split(',');
    for (let i = 0; i < books.length; i++) {
        booksArray.push({ Title: books[i].replace(/^\s+|\s+$/g, '') });
    }

    const newSeries = {
        S_Name: seriesName,
        Description: description,
        Author: author,
        Books_Owned: booksArray,
        Storage_Location: {
            Room: RoomInput,
            Book_Case: Book_CaseInput,
            Shelf: ShelfInput
        }
    };

    // Add the new series to the existing array (Library.series)
    Library.push(newSeries); // Assuming Library is an object with a series array
    console.log(Library);  // Check the updated Library

    // Refresh the display
    Add_Series(); 

    // Clear the input fields
    document.getElementById('seriesName').value = '';
    document.getElementById('description').value = '';
    document.getElementById('author').value = '';
    document.getElementById('books').value = '';
    document.getElementById('room').value = '';
    document.getElementById('bookCase').value = '';
    document.getElementById('shelf').value = '';

    //updated status bar
    updateStatus(`Series "${seriesName}" has been added successfully!`);
};

const Add_Series = () => {

    let area = $("#series_container");
    
    //clear content
    area.children().remove();

    Library.forEach((Lib, index) => {
        console.log(Lib);

        // On click will show books owned, On hover it will show the Description.
        let S_Box = $(`
            <div class="SeriesBox card" id="SeriesBox${index}">
                    <button class="read">Read</button>
                    <button class="update">Update</button>
                    <button class="delete">Delete</button>
                    <button class="duplicate">Duplicate</button>
                <h3 class="SeriesName">${Lib.S_Name}</h3>
                <p class="S_Description" style="display: none;">${Lib.Description}</p>
                <div class="BooksOwned" style="display: none;">
                    <h4>Books Owned:</h4>
                    <ul class="Books-List"></ul>
                </div>
            </div>
        `);


        area.append(S_Box);

        //grab UL element from BooksOwned
        let booksList = S_Box.find("ul");

        //iterate through Books_Owned and append each title to the ul
        Lib.Books_Owned.forEach((book) => {
            let BookItem = $(`<li>${book.Title}</li>`);
            booksList.append(BookItem);
        });

        // Show description on hover
        S_Box.hover(
            function() { $(this).find(".S_Description").show(); },
            function() { $(this).find(".S_Description").hide(); }
        );

        // Show book list on click
        S_Box.on("click", function() {
            $(this).find(".BooksOwned").toggle();
        });
    }); 


    // Add event handler for buttons
    $(".container button").on("click", (e) => {
        const target = $(e.target);
        console.log(target[0]);
        handler(target[0]);
    });

    //updated status bar
    updateStatus("Series list refreshed successfully!");
};

const handler = (element) => {
    //console.log(element);
    let elementClass = element.className;

    let indexOflib = $(`button.${elementClass}`).index(element);

    if (elementClass == "read") {
        console.log("Read called");
        viewHandler(indexOflib);
    } else if ((elementClass == "update")) {
        console.log("update called");
        updateHandler(indexOflib);
    } else if (elementClass == "delete") {
        console.log("removed called");
        removeHandler(indexOflib);
    }else if (elementClass == "duplicate") {
        console.log("duplicate called");
        duplicateHandler(indexOflib);
    }
};

const updateHandler = (index) => {

    $(".Series_Input").css("display", "none");// hide series input
    $("#Update_Content").css("display", "block");//show update box

    // Get the series that needs to be updated
    let series = Library[index];

    //make books a string
    let booksString = "";
    for (let i = 0; i < series.Books_Owned.length; i++) {
        booksString += series.Books_Owned[i].Title;
        if (i < series.Books_Owned.length - 1) {
            booksString += ", "; // Add a comma between books
        }
    }

    // Create a form with the current data populated for updating
    let updateForm = $(`
        <div class="updateForm card">
            <h3>Update Series</h3>

            <label for="newSeriesName">Series Name:</label>
            <input type="text" id="newSeriesName" value="${series.S_Name}"><br><br>
            
            <label for="newDescription">Description:</label>
            <textarea id="newDescription">${series.Description}</textarea><br><br>
            
            <label for="newAuthor">Author:</label>
            <input type="text" id="newAuthor" value="${series.Author}"><br><br>
            
            <label for="newBooks">Books (comma-separated):</label>
            <input type="text" id="newBooks" value="${booksString}"><br><br>

            <h4>Storage Location:</h4>
            <label for="newRoom">Room:</label>
            <input type="text" id="newRoom" value="${series.Storage_Location.Room}"><br><br>

            <label for="newBookCase">Book Case:</label>
            <input type="text" id="newBookCase" value="${series.Storage_Location.Book_Case}"><br><br>

            <label for="newShelf">Shelf:</label>
            <input type="number" id="newShelf" value="${series.Storage_Location.Shelf}"><br><br>

            <input type="button" value="Save Changes" id="saveUpdate">
            <input type="button" value="Cancel" id="cancelUpdate">
        </div>
    `);

    // Append the form to the #Update_Content container
    $("#Update_Content").html(updateForm);  // Clear any previous content and add the update form

    // Cancel button action
    $("#cancelUpdate").on("click", () => {
        $("#Update_Content").html(""); // Clear the form when canceled

        // Hide update and show the Series Input box
        $("#Update_Content").css("display", "none");
        $(".Series_Input").css("display", "block");

        //updated status bar
        updateStatus(`Canceled Update!`);
    });

    // Save changes button action
    $("#saveUpdate").on("click", () => {
        // Get new values from the form
        let newSeriesName = $("#newSeriesName").val();
        let newDescription = $("#newDescription").val();
        let newAuthor = $("#newAuthor").val();

        //update books
        let newBooksString = $("#newBooks").val();
        let newBooks = [];
        let booksArray = newBooksString.split(',');

        for (let i = 0; i < booksArray.length; i++) {
            newBooks.push({ Title: booksArray[i].trim() });
        }

        let newRoom = $("#newRoom").val();
        let newBookCase = $("#newBookCase").val();
        let newShelf = $("#newShelf").val();

        // Update the series object with the new values
        Library[index] = {
            S_Name: newSeriesName,
            Description: newDescription,
            Author: newAuthor,
            Books_Owned: newBooks,
            Storage_Location: {
                Room: newRoom,
                Book_Case: newBookCase,
                Shelf: newShelf
            }
        };

        // Refresh the series display
        Add_Series();

        // Clear the #Update_Content container after saving
        $("#Update_Content").html("");

        // Hide update and show the Series Input box
        $("#Update_Content").css("display", "none");
        $(".Series_Input").css("display", "block");

        //updated status bar
        updateStatus(`Series "${newSeriesName}" has been updated successfully!`);
    });
};



const viewHandler = (index) => {

    let info = $(`#Info`); // Target the specific Info box

    // Add the details to the display area
    info.html(
        `
        <div class="card">
            <h1>Location</h1><br>
            <h2>
                Storage Location: Room - ${Library[index].Storage_Location.Room}, <br>
                Book Case - ${Library[index].Storage_Location.Book_Case}, <br>
                Shelf - ${Library[index].Storage_Location.Shelf} <br>
                <button class="close">X</button>
            </h2>
        </div>
        `
    );

    $("#Info").css("display", "block");

    info.find(".close").on("click", () => {
        setTimeout(function () {
            // Use .html to reset the content
            info.html("");
            //Set Info box to hidden again
            $("#Info").css("display", "none");
        }, 1000);
    });

    //updated status bar
    updateStatus(`Viewed series details!`);
}

const removeHandler = (index) => {
    let removedSeriesName = Library[index].S_Name; // Get the name of the series being removed
    Library.splice(index, 1);//delete indexed item

    Add_Series();//refresh page

    //updated status bar
    updateStatus(`Series "${removedSeriesName}" has been removed successfully!`, 5000);
};

const duplicateHandler = (index) => {
    console.log("Duplicate called for index:", index);

    let duplicatedSeriesName = Library[index].S_Name; // Get the name of the series being duplicated

    // Clone the item
    let clonedItem = { ...Library[index] };

    // Insert the cloned item back into the list
    Library.splice(index + 1, 0, clonedItem);

    console.log("Duplicated item:", clonedItem);
    console.log("Updated Library", Library);

    Add_Series(); //refresh display

    //updated status bar
    updateStatus(`Series "${duplicatedSeriesName}" has been duplicated successfully!`);
};

$(document).ready(setup);