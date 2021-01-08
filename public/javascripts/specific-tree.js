document.addEventListener("DOMContentLoaded", async () => {

  window.addEventListener("load", (event) => {
    console.log("hello from javascript!")
  });

  const markClimbedBtn = document.getElementById('mark-climbed-btn')
  const markWantToClimbBtn = document.getElementById('mark-climbed-btn')

  const userId = markClimbedBtn.getAttribute('data-userId')
  const treeId = markClimbedBtn.getAttribute('data-treeId')

  markClimbedBtn.addEventListener('click', async (event) => {
    const body = {
      climbStatus: true,
      favStatus: false,
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
  });
});