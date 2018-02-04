const showInfo = () => {
  const args = nw.App.argv;
  alert(`nw args: ${args}`);
};

const maximize = () => {
  const win = nw.Window.get();
  win.maximize();
};

module.exports = {
  showInfo,
  maximize
};
