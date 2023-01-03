const enterBtn = document.getElementById("enterBtn");
const inputItem = document.getElementById("inputItem");
const listItems = document.getElementById("listItems");

let numberOfItemsDisplayed = 0;

localStorage.clear();

let closeItems;
let items;

enterBtn.addEventListener("click", addItem);

function addItem() {
  if (inputItem.value) {
    let value = `
        <div class="item">
              <p>${inputItem.value}</p>
              <button class="closeItem" id="item${numberOfItemsDisplayed}">X</button>
        </div>`;
    localStorage.setItem(`item${numberOfItemsDisplayed}`, value);
    inputItem.value = "";
    listItems.innerHTML = renderAllItems({ ...localStorage });
  }
  numberOfItemsDisplayed++;
  closeEventListener(closeItems);
  doneEventListener(items);
}

function closeEventListener(items) {
  for (let close of items) {
    close.addEventListener("click", removeItem);
  }
}

function removeItem(e) {
  localStorage.removeItem(e.target.id);
  listItems.innerHTML = renderAllItems({ ...localStorage });
  closeEventListener(closeItems);
  e.preventDefault();
  e.stopPropagation();
}

function doneEventListener(items) {
  for (let done of items) {
    done.addEventListener("click", (e) => {
      done.classList.toggle("done");
      localStorage.setItem(`${done.childNodes[3].id}`, done.outerHTML);
    });
  }
}

function renderAllItems(objectOfItems) {
  let thelist = "";
  for (let item of Object.values(objectOfItems)) {
    thelist += item;
  }
  closeItems = document.getElementsByClassName("closeItem");
  items = document.getElementsByClassName("item");
  return thelist;
}
