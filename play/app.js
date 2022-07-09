let REGION;

/* #region s5 */
REGION = document.getElementById('s5');

const draggables = REGION.querySelectorAll('[draggable]');

const dragStart = e => {
  this.style.opacity = '0.4';
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
};
const dragEnter = e => {
  this.classList.add('over');
};
const dragOver = e => {
  e?.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  dragSrcEl = undefined;
  return false;
};
const dragLeave = e => {
  this.classList.remove('over');
};
const dragDrop = e => {
  e.stopPropagation();
  e.preventDefault();
  if (dragSrcEl !== this) {
    if (dropAction === "swap") {
      swapItems(dragSrcEl, this);
    } else {
      shiftItems(dragSrcEl, this);
    }
    dragSrcEl = undefined;
  }
  return false;
};
const dragEnd = e => {
  this.style.opacity = '1';
};

console.log(draggables);

draggables.forEach(item => {
  item.addEventListener('dragstart', dragStart, false);
  item.addEventListener('dragenter', dragEnter, false);
  item.addEventListener('dragover', dragOver, false);
  item.addEventListener('dragleave', dragLeave, false);
  item.addEventListener('drop', dragDrop, false);
  item.addEventListener('dragend', dragEnd, false);
});
/* #endregion */