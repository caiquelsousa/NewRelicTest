var debug = false; //<-- change here to activate debug

export var originalConsoleLog;
export var originalConsoleInfo;
export var originalConsoleError;

const log = (...args) => {
  if (debug) {
    originalConsoleLog(...args);
  }
};

const info = (...args) => {
  if (debug) {
    originalConsoleInfo(...args);
  }
};

const error = (...args) => {
  if (debug) {
    originalConsoleError(...args);
  }
};

export function initLogger() {
  originalConsoleLog = console.log;
  console.log = log;
  originalConsoleInfo = console.info;
  console.info = info;
  originalConsoleError = console.error;
  console.error = error;
}
