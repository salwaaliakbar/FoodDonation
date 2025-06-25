let ioInstance = null;
const donorSocketMap = new Map();

function initIO(io) {
  ioInstance = io;
}

function getIO() {
  return ioInstance;
}

module.exports = {
  donorSocketMap,
  initIO,
  get io() {
    return ioInstance;
  },
};
