
      $(document).ready(function () {
        $(".add-circle").on("click", function () {
          $(".task-form").addClass("active");
        });
        $(".task-form .close-btn").on("click", function () {
          $(".task-form").removeClass("active");
        });
      });
      // define UI vars
      const form = document.querySelector("#task-form");
      const taskList = document.querySelector("#collection");
      const taskInput = document.querySelector("#task");
      const d = Date(Date.now());
      formDate = d.toString();
      const clearBtn = document.querySelector(".clear-tasks");
      const filter = document.querySelector("#filter");
      const taskCount = document.querySelector("#task-total");

      // Event all  listeners
      loadEventListeners();

      function loadEventListeners() {
        // DOM load event
        document.addEventListener("DOMContentLoaded", getTasks);
        // add task event
        form.addEventListener("submit", addTask);
        // remove task event
        taskList.addEventListener("click", removeTask);
        //clear task events
        clearBtn.addEventListener("click", clearTasks);
        //filterTasks
        filter.addEventListener("keyup", filterTasks);
      }
      //Get tasks from LS
      function getTasks() {
        let tasks;
        if (localStorage.getItem("tasks") === null) {
          tasks = [];
        } else {
          tasks = JSON.parse(localStorage.getItem("tasks"));
        }
        tasks.forEach(function (task) {
          // create element
          const div = document.createElement("div");
          //add class
          div.className = "task-box";
          // create title div
          const titleDiv = document.createElement("div");
          // add Category
          titleDiv.className = "title";
          // append titleDiv to div
          div.appendChild(titleDiv);
          //create text node
          titleDiv.appendChild(document.createTextNode(task));
          // create new link element
          const link = document.createElement("div");
          //create date element
          const date = document.createElement("div");
          // add class
          date.className = "date";
          // add current date to the element
          date.appendChild(document.createTextNode(formDate.substring(0, 16)));
          // add to div
          div.appendChild(date);
          // add class
          link.className = "check-box delete";
          // Add icon
          link.innerHTML = `<i class="fas fa-times"></i>`;
          // Append link to div
          titleDiv.appendChild(link);
          // Append div to task list
          taskList.appendChild(div);
        });
      }

      //add task
      function addTask(e) {
        if (taskInput.value === "") {
          alert("add a task please!");
        }
        // create element
        const div = document.createElement("div");
        //add class
        div.className = "task-box";
        // create title div
        const titleDiv = document.createElement("div");
        // add Category
        titleDiv.className = "title";
        // append titleDiv to div
        div.appendChild(titleDiv);
        //create text node
        titleDiv.appendChild(document.createTextNode(taskInput.value));
        // create new link element
        const link = document.createElement("div");
        //create date element
        const date = document.createElement("div");
        // add class
        date.className = "date";
        // add current date to the element
        date.appendChild(document.createTextNode(formDate.substring(0, 16)));
        // add to div
        div.appendChild(date);
        // add class
        link.className = "check-box delete";
        // Add icon
        link.innerHTML = `<i class="fas fa-times"></i>`;
        // Append link to div
        titleDiv.appendChild(link);
        // Append div to task list
        taskList.appendChild(div);
        // Close Task form 
        form.classList.remove('active')
        

        // Store in local storage
        storeTaskInLocalStorage(taskInput.value);

        console.log(formDate);

        e.preventDefault();
        // clear form 
        taskInput.value = ''
      }
      // store Task
      function storeTaskInLocalStorage(task) {
        let tasks;
        if (localStorage.getItem("tasks") === null) {
          tasks = [];
        } else {
          tasks = JSON.parse(localStorage.getItem("tasks"));
        }

        tasks.push(task);

        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskCount.innerHTML = tasks.length;
        
      }

      //remove task
      function removeTask(e) {
        if (e.target.parentElement.classList.contains("delete")) {
          if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(
              e.target.parentElement.parentElement.parentElement
            );
          }
        }
      }
      //Remove from LS
      function removeTaskFromLocalStorage(taskItem) {
        console.log(taskItem.firstElementChild.textContent);
        let tasks;
        if (localStorage.getItem("tasks") === null) {
          tasks = [];
        } else {
          tasks = JSON.parse(localStorage.getItem("tasks"));
        }

        tasks.forEach(function (task, index) {
          if (taskItem.firstElementChild.textContent === task) {
            tasks.splice(index, 1);
          }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskCount.innerHTML = tasks.length;
       
      }
      // clear tasks
      function clearTasks(e) {
        // //option one for clearing tasks
        // taskList.innerHTML = "";

        // // option two for clearing which is faster
        while (taskList.firstChild) {
          // if (confirm("Are you sure?")) {
          taskList.removeChild(taskList.firstChild);
          // }
          //Clear Tasks from LS 
          clearTasksFromLocalStorage()
        }
        // Clear Tasks from LS 
        function clearTasksFromLocalStorage() {
          localStorage.clear();
          
        }
        // taskCount.innerHTML = tasks.length;
      }
      function filterTasks(e) {
        const text = e.target.value.toLowerCase();

        document.querySelectorAll(".title").forEach(function (task) {
          const item = task.firstChild.textContent;
          if (item.toLowerCase().indexOf(text) != -1) {
            task.parentElement.style.display = "block";
          } else {
            task.parentElement.style.display = "none";
            console.log(task);
          }
        });
      }
    