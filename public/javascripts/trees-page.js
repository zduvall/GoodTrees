document.addEventListener("DOMContentLoaded", async () => {

  // asyncHandler
  const asyncHandler = (handler) => (req, res, next) =>
    handler(req, res, next).catch((err) => next(err));

  const diffDropdown = document.getElementById('find-trees-difficulty');
  const funDropdown = document.getElementById('find-trees-funFactor');
  const viewDropdown = document.getElementById('find-trees-viewFromTop');
  const treeListTrees = document.getElementById('tree-list-trees')

  const filterTrees = async function () {
    const body = {
      difficulty: diffDropdown.value,
      funFactor: funDropdown.value,
      viewFromTop: viewDropdown.value,
    }

    const response = await fetch('/filter-trees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(res => res.json())

    treeListTrees.innerHTML = ''
    
    response.forEach(tree => {
      let treeNameAnchor = document.createElement('a');
      treeNameAnchor.setAttribute('href', `/trees/${tree.id }`);
      treeNameAnchor.innerHTML = tree.name;
      let td1 = document.createElement('td');
      td1.classList.add('column');
      td1.appendChild(treeNameAnchor);

      
      let cityStateParagraph = document.createElement('p');
      cityStateParagraph.innerHTML = tree.cityState;
      let td2 = document.createElement('td');
      td2.classList.add('column');
      td2.appendChild(cityStateParagraph);

      let treeCreatorAnchor = document.createElement('a');
      treeCreatorAnchor.setAttribute('href', `/users/${tree.adderId}`);
      treeCreatorAnchor.innerHTML = tree.user.username
      let td3 = document.createElement('td');
      td3.classList.add('column');
      td3.appendChild(treeCreatorAnchor)

      let tr = document.createElement('tr');
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);

      treeListTrees.appendChild(tr);
    });

  }

  asyncHandler(filterTrees())
  diffDropdown.addEventListener('change', (event) => { asyncHandler(filterTrees()) });
  funDropdown.addEventListener('change', (event) => { asyncHandler(filterTrees()) });
  viewDropdown.addEventListener('change', (event) => { asyncHandler(filterTrees()) });
});

