const listItems = document.querySelectorAll('.list-group-item');
const button = document.querySelector('.btn');

const renderFileText = (root, text) => {
  const textArea = document.createElement('textarea');
  textArea.classList.add('form-control');
  textArea.setAttribute('style', 'height: 120px');
  textArea.innerHTML = text;

  root.append(textArea);
};

const renderListFiles = (root, listFiles) => {
  root.innerHTML = `
    <ul class="list-group">
      ${listFiles.map((item) => `<li class="list-group-item">${item}</li>`).join('')}
    </ul>`;
  document.querySelectorAll('.list-group-item').forEach((item) => {
    item.addEventListener('click', async (ev) => {
      const filename = ev.target.textContent;
      const { text } = await fetch('http://localhost:8000', {
        method: 'POST',
        body: JSON.stringify({ filename }),
      }).then((res) => res.json());
      renderFileText(document.querySelector('.container'), text);
    });
  });
};

button.addEventListener('click', async () => {
  const res = await fetch('http://localhost:8000').then((res) => res.json());
  renderListFiles(document.querySelector('.container-sm'), res.list);
});

listItems.forEach((item) => {
  item.addEventListener('click', (ev) => {
    listItems.forEach((v) => v.classList.remove('active'));
    ev.target.classList.add('active');
  });
});