document.addEventListener("DOMContentLoaded", async () => {

  // asyncHandler
  const asyncHandler = (handler) => (req, res, next) =>
    handler(req, res, next).catch((err) => next(err));

  const markClimbedBtn = document.getElementById('mark-climbed-btn')
  const markWantToClimbBtn = document.getElementById('mark-want-to-climb-btn')

  const userId = markClimbedBtn.getAttribute('data-userId')
  const treeId = markClimbedBtn.getAttribute('data-treeId')

  const createOrUpdateFC = async function (trueOrFalse) {
    const body = {
      climbStatus: trueOrFalse,
      userId: userId,
      treeId: treeId,
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
    await createOrUpdateFC(true)
  }));
  
  markWantToClimbBtn.addEventListener('click', asyncHandler(async (event) => {
    await createOrUpdateFC(false)
  }));
  
});

