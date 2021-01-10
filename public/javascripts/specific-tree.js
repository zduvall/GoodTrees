document.addEventListener("DOMContentLoaded", async () => {

  // asyncHandler
  const asyncHandler = (handler) => (req, res, next) =>
    handler(req, res, next).catch((err) => next(err));

  const markClimbedBtn = document.getElementById('mark-climbed-btn')
  const markWantToClimbBtn = document.getElementById('mark-want-to-climb-btn')
  const markRemoveBtn = document.getElementById('mark-remove')

  const userId = markClimbedBtn.getAttribute('data-userId')
  const treeId = markClimbedBtn.getAttribute('data-treeId')

  const createOrUpdateFC = async function (trueOrFalse, deleteOrNot) {
    const body = {
      climbStatus: trueOrFalse,
      userId: userId,
      treeId: treeId,
      deleteFC: deleteOrNot,
      createdAt: new Date()
    }
    const response = await fetch('/forestconnections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
  }
  
  markClimbedBtn.addEventListener('click', asyncHandler(async (event) => {
    await createOrUpdateFC(true, false)
    markClimbedBtn.disabled = true;
    markClimbedBtn.innerHTML = 'Climbed ✓';
    markWantToClimbBtn.disabled = false;
    markWantToClimbBtn.innerHTML = 'Want to';
    markRemoveBtn.disabled = false;
  }));
  
  markWantToClimbBtn.addEventListener('click', asyncHandler(async (event) => {
    await createOrUpdateFC(false, false);
    markWantToClimbBtn.disabled = true;
    markWantToClimbBtn.innerHTML = 'Want to ✓';
    markClimbedBtn.disabled = false;
    markClimbedBtn.innerHTML = 'Climbed';
    markRemoveBtn.disabled = false;
  }));

  markRemoveBtn.addEventListener('click', asyncHandler(async (event) => {
    await createOrUpdateFC(false, true);
    markWantToClimbBtn.disabled = false;
    markWantToClimbBtn.innerHTML = 'Want to';
    markClimbedBtn.disabled = false;
    markClimbedBtn.innerHTML = 'Climbed';
    markRemoveBtn.disabled = true;
  }));
  
});

