const slots = ['first', 'second', 'third'];

const users = [
  {id: 1, name: 'moe', slot: 'first', selected: false},
  {id: 2, name: 'larry', slot: 'second', selected: false},
  {id: 3, name: 'curly', slot: 'third', selected: false},
  {id: 4, name: 'lucy', slot: 'third', selected: false},
];

const button = document.querySelectorAll('.button');

function displayUsers(users) {
  for (let i = 0; i <= users.length-1; i++) {
    let currentUser = users[i];
    let userSlot = currentUser.slot;
    let slotNodeList = document.querySelectorAll(`#${userSlot}`);
    let slotNode = slotNodeList[0];
    let newChild = document.createElement('p');
    newChild.className = 'name button';
    newChild.innerHTML = currentUser.name;
    slotNode.appendChild(newChild);
  }
}
displayUsers(users);

//listen for clicks on page
selectButton = addEventListener('click', (ev) => {
  const evNode = ev.target;
  const classArr = evNode.className.split(' ');
  //if an arrow is clicked
  if (classArr.includes('left') || classArr.includes('right')) {
    evNode.className = `${evNode.className} select`;
    const arrowContainer = evNode.parentElement;
    const nameContainer = arrowContainer.parentElement;
    const slot = nameContainer.lastElementChild;
    //get all names in the slot
    const slotName = slot.id;
    let slotIndex;
    //loop through slots array and find array index that matches current slot
    for (let i = 0; i <= slots.length-1; i++) {
      let currentSlot = slots[i];
      if (currentSlot === slotName) slotIndex = i;
    };
    //loop through names in current slot and find their match in users object
    const namesInSlot = slot.querySelectorAll('.name');
    for (let i = 0; i <= namesInSlot.length-1; i++) {
      let currentUser = namesInSlot[i];
      let userName = currentUser.innerHTML
      for (const user of users) {
        if (user.name === userName) {
          //if user is selected
          if (user.selected) {
            //see if left or right arrow is clicked
            if (classArr.includes('left')) {
              //select slot to move selected name to
              const destNode = document.querySelector(`#${slots[slotIndex-1]}`)
              //move selected name to that slot
              destNode.appendChild(currentUser)
            } else if (classArr.includes('right')) {
              const destNode = document.querySelector(`#${slots[slotIndex+1]}`)
              destNode.appendChild(currentUser)
            }
          }
        }
      }
    }

  };

  //listen for clicks on names
  if (classArr.includes('name')) {
    //get the name of the object clicked on
    let userName = ev.target.innerHTML;
    //find user object
    for (const obj of users) {
      if (obj.name === userName) {
        //toggle 'selected' in user object
        obj.selected ? obj.selected = false : obj.selected = true;
        if (obj.selected) {
          evNode.className = `${evNode.className} select`;
        } else {
          //remove 'select' from class if name already selected
          evNode.className = evNode.className.split(' ').slice(0, 1)
        }
      }
    };
  };

});
