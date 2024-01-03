const itemForm = document.querySelector('#item-form')
const itemInput =document.querySelector('#item-input')
const itemList = document.querySelector('.items')
const clearBtn = document.querySelector('.btn-clear')
const itemFilter = document.getElementById('filter')
const formBtn = itemForm.querySelector('button')
let isEditMode = false

function displayItems(){
  const itemsFromStorge = getItemsfromStorage()

  itemsFromStorge.forEach( item =>addItemtoDom(item) )
  checkUI()
}

 function onAddItemSubmit(e){
    e.preventDefault()
    const newItem = itemInput.value
  
    if(newItem === '')
    {
        alert('add something before submiting')
        return
    }
      
    if(isEditMode){
      const itemToEdit = itemList.querySelector('.edit-mode')

      removeItemFromStorage(itemToEdit.textContent)
      itemToEdit.classList.remove('edit-mode')
      itemToEdit.remove()
      isEditMode = false
    }else{
      if(checkIfItemExists(newItem)){
        alert('Item already exists')
        return
      }
    }
      
    addItemtoDom(newItem)
    addItemtoStorge(newItem)
     checkUI()
     itemInput.value = ''

}
  
function addItemtoDom(item){
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(item))

   const button = creatButton('remove-item btn-link text-red')
   li.appendChild(button)

   itemList.appendChild(li) 
  
}

creatButton = (classes) =>{
  const button = document.createElement('button')
  button.className = classes
  const icon = creatIcon('fa-solid fa-xmark')
  button.appendChild(icon)
  return button
}

creatIcon = (classes) =>{
    const icon = document.createElement('i')
    icon.className = classes
    return icon
}   

function addItemtoStorge(item){

    const itemsFromStorge = getItemsfromStorage()

    itemsFromStorge.push(item)

    localStorage.setItem('items', JSON.stringify(itemsFromStorge) )
   

}

function getItemsfromStorage(){
  let itemsFromStorge;
  
    if(localStorage.getItem('items') === null){
      itemsFromStorge = []
    }
    else{
      itemsFromStorge = JSON.parse(localStorage.getItem('items'))
    }

    return itemsFromStorge 
}
 

function onclickItem(e){
  if(e.target.parentElement.classList.contains('remove-item')){
      removeItem(e.target.parentElement.parentElement)
    
   }
   else{
    setItemToEdit(e.target);
   }
}

function checkIfItemExists(item){
const itemsFromStorge = getItemsfromStorage()

return itemsFromStorge.includes(item)

}
  
function setItemToEdit(item){
  isEditMode = true 
  itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'))

  item.classList.add('edit-mode')
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
  formBtn.style.background = '#228b22'
  itemInput.value = item.textContent

}

function removeItem(item){
   if(confirm('Are you sure?')){
    item.remove()

  removeItemFromStorage(item.textContent)


    checkUI()
   }  
}

function removeItemFromStorage(item){
 let itemsFromStorge = getItemsfromStorage()
  
 itemsFromStorge = itemsFromStorge.filter( i => i !== item)

 localStorage.setItem('items' , JSON.stringify(itemsFromStorge))
}
 
 function clearAll(){
  while(itemList.firstChild){
  itemList.removeChild(itemList.firstChild)
}

 localStorage.clear()
checkUI()
 }

 function filterItems(e){
  const items = document.querySelectorAll('li')
 const text = e.target.value.toLowerCase()

 items.forEach((item) =>{
  const itemName = item.firstChild.textContent.toLocaleLowerCase()

  if(itemName.indexOf(text) != -1){

    item.style.display = 'flex'
  }else
  {
      item.style.display = 'none'
  }

 })

 
}   
 

 function checkUI(){
  itemInput.value =''

  const items = document.querySelectorAll('li')

  if(items.length === 0){
    clearBtn.style.display = 'none'
    itemFilter.style.display = 'none'
  }else{
    clearBtn.style.display = 'block'
    itemFilter.style.display = 'block'
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item '
  formBtn.style.backgroundColor = '#333'

  isEditMode = false
  }

  
//Event Listeners
  
itemForm.addEventListener('submit' , onAddItemSubmit)
itemList.addEventListener('click' , onclickItem)
clearBtn.addEventListener('click' , clearAll)
itemFilter.addEventListener('input' , filterItems)
document.addEventListener('DOMContentLoaded' , displayItems)

checkUI()

