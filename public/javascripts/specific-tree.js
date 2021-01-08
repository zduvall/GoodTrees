document.addEventListener("DOMContentLoaded", async () => {

  window.addEventListener("load", (event) => {
    console.log("hello from javascript!")
  });

  const markClimbedBtn = document.getElementById('mark-climbed-btn')
  const markWantToClimbBtn = document.getElementById('mark-climbed-btn')

  markClimbedBtn.addEventListener('click', async (event) => {
  console.log(markClimbedBtn);
    //   const body = {
  //     climbStatus: true,
  //     favStatus: false,
  //     userId: locals.curUser.id,
  //     treeId: tree.id,
  //   }
  //   const response = await fetch('/forestconnections', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(body)
  //   }).then(res => res.json())
  });
});