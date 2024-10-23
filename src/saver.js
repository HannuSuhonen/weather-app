const orderKey = "order";

export function getItems(key) {
  const values = localStorage.getItem(key);
  return values ? JSON.parse(values) : [];
}

function saveItems(key, values) {
  localStorage.setItem(key, JSON.stringify(values));

  let order = JSON.parse(localStorage.getItem(orderKey)) || [];
  order.push(key);
  localStorage.setItem(orderKey, JSON.stringify(order));
}

export function addItems(key, value) {
  const values = getItems(key);
  values.push(value);
  saveItems(key, values);
}

export function deleteItem(key, index) {
  let values = getItems(key);
  if (index > -1) {
    values.splice(index, 1);
  }
  saveItems(key, values);
}
