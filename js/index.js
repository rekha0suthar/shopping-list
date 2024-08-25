const itemForm = document.getElementById('form');
const inputValue = document.getElementById('input-item');
const itemList = document.getElementById('item-list');
const filterInput = document.getElementById('fiter');

const formBtn = document.querySelector('.add-btn');
const clearButton = document.querySelector('.clear-btn');
const deleteButton = document.querySelector('.fa-solid .fa-xmark');

let isEditModeOn = false;
let itemAlreadyExists = false;

function checkUI() {
  inputValue.value = '';
  const listItems = itemList.querySelectorAll('li');
  if (listItems.length === 0) {
    clearButton.style.display = 'none';
    filterInput.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
    filterInput.style.display = 'block';
  }
}

function setItemToEdit(item) {
  isEditModeOn = true;
  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));
  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = '#228B22';
  inputValue.value = item.textContent;
}

function removeItem(item) {
  if (confirm('Are you sure? ')) {
    item.remove();
    checkUI();
  }
}

function onClickItems(e) {
  console.log(e.target);
  if (e.target.parentElement.classList.contains('remove-item')) {
    console.log('remove item');
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = inputValue.value;
  if (newItem === '') {
    alert('this is empty');
    return;
  }

  if (isEditModeOn) {
    const itemToEdit = itemList.querySelector('edit-mode');
    itemToEdit.remove();
    isEditModeOn = false;
  } else {
    if (!checkIfitemExists(newItem)) {
      console.log(newItem);
      alert('Item already exists!');
      return;
    }
  }
  addItemToDOM(newItem);
  checkUI();
  inputValue.value = '';
}

function checkIfitemExists(item) {
  const allItems = itemList.querySelectorAll('li');
  const allItemsArray = Array.from(itemList);
  return allItemsArray.filter((li) => {
    if (
      li.childElement === document.TEXT_NODE &&
      li.childElement.value === item
    ) {
      return true;
    }
    return false;
  });
}

function addItemToDOM(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  li.className = 'item';

  const button = createButton('remove-item btn-click text-red');
  li.appendChild(button);

  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;

  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}
function init() {
  itemList.addEventListener('click', onClickItems);
  itemForm.addEventListener('submit', onAddItemSubmit);
}

init();
