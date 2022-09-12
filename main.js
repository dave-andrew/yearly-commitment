if(typeof(Storage) === "undefined"){
    alert("Oops, your progress will be lost!");
}

//array storage for tasks
let itemList = [];
const storage_todo="storage_todo";

//array storage for dates
let dateList = [];
const storage_date = "storage_date";

//Get Item from Local Storage
if(todoFromLocal = localStorage.getItem(storage_todo)){
if(dateFromLocal = localStorage.getItem(storage_date)){
    //untuk ganti string dalam array jadi object
    itemList = JSON.parse(todoFromLocal);
    dateList = JSON.parse(dateFromLocal);
    const list_el2 = document.querySelector("#tasks");
    const input2 = document.querySelector("#new-task-input");
    //fdsoapf[disa[]]
    const dates_el2 = document.querySelector("#dates");
    //for loop biar satu array semua kena
    for (let i = 0; i < itemList.length; i++) {
        //create div element for DATE
        const date_el2 = document.createElement("div");
        date_el2.classList.add("date");

        const date_content_el2 = document.createElement("div");
        date_content_el2.classList.add("content");

        date_el2.appendChild(date_content_el2);

        const date_p_el2 = document.createElement("p");
        date_p_el2.classList.add("text");
        date_p_el2.value = dateList[i];
        date_p_el2.textContent = date_p_el2.value;

        date_content_el2.appendChild(date_p_el2);
        dates_el2.appendChild(date_el2);

        //buat div(list) untuk setiap object dalam array
        const task_el2 = document.createElement("div");
        task_el2.classList.add("task");

        const task_content_el2 = document.createElement("div");
        task_content_el2.classList.add("content");

        task_el2.appendChild(task_content_el2);

        const task_input_el2 = document.createElement("input");
        task_input_el2.classList.add("text");
        task_input_el2.type = "text";
        //buat value yang mau di list(yang udah keinput di localStorage)
        task_input_el2.value = itemList[i];
        task_input_el2.setAttribute("readonly", "readonly");
        
        task_content_el2.appendChild(task_input_el2);
        const task_actions_el2 = document.createElement("div");
        task_actions_el2.classList.add("actions");
        
        const task_edit_el2 = document.createElement("button");
        task_edit_el2.classList.add("edit");
        task_edit_el2.innerHTML = "Edit";

        const task_delete_el2 = document.createElement("button");
        task_delete_el2.classList.add("delete");
        task_delete_el2.innerHTML = "Delete";

        task_actions_el2.appendChild(task_edit_el2);
        task_actions_el2.appendChild(task_delete_el2);

        task_el2.appendChild(task_actions_el2);

        list_el2.appendChild(task_el2);

        input2.value = "";

        //Edit list items
        task_edit_el2.addEventListener('click', () => {
            if(task_edit_el2.innerText.toLowerCase() == "edit"){
                task_input_el2.removeAttribute("readonly");
                task_input_el2.focus(); //langsung bisa ngetik disitu
                task_edit_el2.innerText = "Save";
            }else{
                task_input_el2.setAttribute("readonly", "readonly");
                task_edit_el2.innerText = "Edit";
                syncLocalStorage('EDIT', task_input_el2.value, itemList[i]);
            }
        });
        
        //Delete list items
        task_delete_el2.addEventListener('click', () => {
            list_el2.removeChild(task_el2);
            syncLocalStorage('DELETE', task_input_el2.value);
            dates_el2.removeChild(date_el2);
            syncDateLocalStorage('DELETE DATE', date_p_el2.value);
        });
    }
}
}

//nambahin ke localStorage (tasks)
function syncLocalStorage(activity, item, item2=null){
    switch (activity) {
        case 'ADD':
            //nambahin item di array
            itemList.push(item);
            break;
        case 'DELETE':
            //dicari dlu itemnya keberapa yang mau didelete pake indexOf
            //1 nya buat delete item itu
            itemList.splice(itemList.indexOf(item), 1);
            console.log(itemList);
            break;
        case 'EDIT':
            //di loop buat ngecek arraynya satu"
            for (let i = 0; i < itemList.length; i++) {
                //dicek di itemList yang udah ada, ada ga yang sama kyk item2
                if(itemList[i] == item2){
                    //kalo sama, item yang lama diganti item yang baru
                    itemList[i] = item;
                }
            }
    }
    console.log(itemList);
    localStorage.setItem(storage_todo, JSON.stringify(itemList));
}

//nambahin item ke LocalStorage (dates)
function syncDateLocalStorage(save, newDate, oldDate) {
    switch (save) {
        case 'ADD DATE':
            dateList.push(newDate);
            break;
        case 'EDIT DATE':

            break;
        case 'DELETE DATE':
            dateList.splice(dateList.indexOf(newDate), 1);
            console.log(dateList);
            break;
    }
    console.log(dateList);
    localStorage.setItem(storage_date, JSON.stringify(dateList));
}

window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");

    //task list Selectors
    const list_el = document.querySelector("#tasks");

    //date list Selectors
    const dates_el = document.querySelector("#dates");
    
    //preventing refresh in each submition
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const task = input.value;
        
        if (!task) {
            alert("Please fill out the commitment");
            return;
        }

        //--creating div for dates--
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date();
        let date = d.getDate();
        const m = new Date();
        let month = months[m.getMonth()];
        const y = new Date();
        let year = y.getFullYear();

        const date_el = document.createElement("div");
        date_el.classList.add("date");

        let fullDate;
        if (window.matchMedia("(max-width: 501px)").matches) {
            month = m.getMonth();
            month+=1;
            year = y.getFullYear().toString().slice(2);
            fullDate = date+"/"+month+"/"+year;
        } else {
            fullDate = date + " " + month + " " + year;
        }  
        
        const date_content_el = document.createElement("div");
        date_content_el.classList.add("content");

        date_el.appendChild(date_content_el);

        const date_p_el = document.createElement("p");
        date_p_el.classList.add("text");
        date_p_el.value = fullDate;
        date_p_el.textContent = date_p_el.value;

        date_content_el.appendChild(date_p_el);
        dates_el.appendChild(date_el);

        //Saving date progress
        syncDateLocalStorage("ADD DATE", date_p_el.value);

        //--creating div task--
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");
        
        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);
        
        //Save task progress
        syncLocalStorage('ADD', task);

        input.value = "";

        //Edit list items
        task_edit_el.addEventListener('click', () => {
            if(task_edit_el.innerText.toLowerCase() == "edit"){
                task_input_el.removeAttribute("readonly");
                task_input_el.focus(); //langsung bisa ngetik disitu
                task_edit_el.innerText = "Save";
            }else{
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
                //task_input_value itu value yang baru diedit
                //task itu value yang awal
                syncLocalStorage('EDIT', task_input_el.value, task);
            }
        });
        
        //Delete list items
        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            syncLocalStorage('DELETE', task);
            dates_el.removeChild(date_el);
            syncDateLocalStorage('DELETE DATE', date_p_el.value)
        });
    });
});



/* 
--INI JIKA GA ADA APA" DI LOCALSTORAGE(sebelum di refresh)--
jadi klo misal dimasukin syncLocalStorage(edit, item = task_input_el.value(value baru)
, item2 = task(value yang lama))

nanti di scan pake for loop
jika yang di dalem array itemList ada yang sama kyk item2(value yang lama)
value tersebut diganti dengan yang task_input_el.value(value baru)

buat yang syncLocalStorage(delete, item)   (item = input.value)
dicari dlu itemnya keberapa yang mau didelete pake indexOf
1 nya buat delete item itu

--INI BUAT YANG ADA DI LOCALSTORAGE(sesudah di refresh)--
jadi for loop yang pertama itu buat div listnya dlu semua item yang udah di localStorage

trus klo mau langsung delete bisa langsung pake task_input_value2(value yang udah ada di localStorage)
cara kerjanya sama     (item = task_input_value2)
dicari dlu itemnya keberapa yang mau didelete pake indexOf   
1 nya buat delete item itu

untuk yang edit, nanti task_input_value2 diedit jadi new value
syncLocalStorage(edit, task_input_value2, itemList[i]) (itemList[i] tuh value yang lama(?)) tapi kenapa array
untuk yang itemList[i] masi gtw knp pake itu

*/