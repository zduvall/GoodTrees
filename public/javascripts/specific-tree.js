document.addEventListener('DOMContentLoaded', async () => {
  // asyncHandler
  const asyncHandler = (handler) => (req, res, next) =>
    handler(req, res, next).catch((err) => console.log(err));

  // code for forest connections
  const markClimbedBtn = document.getElementById('mark-climbed-btn');
  const markWantToClimbBtn = document.getElementById('mark-want-to-climb-btn');
  const markRemoveBtn = document.getElementById('mark-remove');

  const userId = markClimbedBtn.getAttribute('data-userId');
  const treeId = markClimbedBtn.getAttribute('data-treeId');

  const createOrUpdateFC = async function (trueOrFalse, deleteOrNot) {
    const body = {
      climbStatus: trueOrFalse,
      userId: userId,
      treeId: treeId,
      deleteFC: deleteOrNot,
    };
    const response = await fetch('/forestconnections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  };

  markClimbedBtn.addEventListener(
    'click',
    asyncHandler(async (event) => {
      await createOrUpdateFC(true, false);
      markClimbedBtn.disabled = true;
      markClimbedBtn.innerHTML = 'Climbed ✓';
      markWantToClimbBtn.disabled = false;
      markWantToClimbBtn.innerHTML = 'Want to';
      markRemoveBtn.disabled = false;
    })
  );

  markWantToClimbBtn.addEventListener(
    'click',
    asyncHandler(async (event) => {
      await createOrUpdateFC(false, false);
      markWantToClimbBtn.disabled = true;
      markWantToClimbBtn.innerHTML = 'Want to ✓';
      markClimbedBtn.disabled = false;
      markClimbedBtn.innerHTML = 'Climbed';
      markRemoveBtn.disabled = false;
    })
  );

  markRemoveBtn.addEventListener(
    'click',
    asyncHandler(async (event) => {
      await createOrUpdateFC(false, true);
      markWantToClimbBtn.disabled = false;
      markWantToClimbBtn.innerHTML = 'Want to';
      markClimbedBtn.disabled = false;
      markClimbedBtn.innerHTML = 'Climbed';
      markRemoveBtn.disabled = true;
    })
  );

  // code for delete
  const deleteTreeBtn = document.getElementById('delete-tree');
  const treeIdDelete = deleteTreeBtn.getAttribute('data-treeId');

  deleteTreeBtn.addEventListener('click', async (event) => {
    console.log('clicked!!!!');

    await fetch(`/trees/${treeIdDelete}`, {
      method: 'DELETE',
    });
  });
  // deleteTreeBtn.addEventListener(
  //   'click',
  //   asyncHandler(async (event) => {
  //     console.log('clicked!!!!');

  //     const response = await fetch(`/trees/${treeIdDelete}`, {
  //       method: 'DELETE',
  //     })
  //     // }).then((res) => res.json());
  //   })
  // );
});
