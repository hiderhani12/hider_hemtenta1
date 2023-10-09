var add = document.getElementById('addToDo');
var input = document.getElementById('inputField');
var toDoContainer = document.getElementById('toDoContainer');
var toDoList = []; 

add.addEventListener('click', addItem);
input.addEventListener('keydown', function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addItem();
  }
});

function addItem() {
  const item_value = input.value;
  if (item_value.trim() === '') {
    alert('Du måste skriva något');
    return;
  }

  const item = {
    value: item_value,
    completed: false
  };

  toDoList.push(item);
  renderToDoList();

  input.value = '';
}

function renderToDoList() {
  toDoContainer.innerHTML = '';

  toDoList.forEach(function(item, index) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    const itemContentDiv = document.createElement('div');
    itemContentDiv.classList.add('content');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('check');
    checkbox.id = 'check-' + index;

    const input_item = document.createElement('input');
    input_item.classList.add('text');
    input_item.value = item.value;
    input_item.id = 'text-' + index;

    checkbox.addEventListener('change', function () {
      item.completed = checkbox.checked;
      renderToDoList();
    });

    input_item.addEventListener('input', function () {
      item.value = input_item.value;
      renderToDoList();
    });

    itemContentDiv.appendChild(checkbox);
    itemContentDiv.appendChild(input_item);

    const item_action = document.createElement('div');
    item_action.classList.add('actions');

    const edit_item = document.createElement('button');
    edit_item.classList.add('edit', 'btn', 'btn-success');
    edit_item.type = "button";
    edit_item.innerText = 'Edit';

    edit_item.addEventListener('click', function () {
      input_item.removeAttribute('readonly');
      input_item.focus();
    });

    const delete_item = document.createElement('button');
    delete_item.classList.add('delete', 'btn', 'btn-danger', 'fa', 'fa-trash');
    delete_item.addEventListener('click', function () {
      toDoList.splice(index, 1);
      renderToDoList();
    });

    item_action.appendChild(edit_item);
    item_action.appendChild(delete_item);

    itemDiv.appendChild(itemContentDiv);
    itemDiv.appendChild(item_action);

    if (item.completed) {
      input_item.style.textDecoration = "line-through";
      checkbox.checked = true;
    }

    toDoContainer.appendChild(itemDiv);
  });

  saveToDoList();
}

function saveToDoList() {
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

function loadToDoList() {
  const savedItems = localStorage.getItem('toDoList');
  if (savedItems) {
    toDoList = JSON.parse(savedItems);
    renderToDoList();
  }
}

window.addEventListener('load', loadToDoList);
