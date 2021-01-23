const checkJWT = require('../../startup/config');
const chalk = require('chalk');

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

describe('Check for jwtPrivateKey', () => {
  it('- should display "FATAL ERROR: jwtPrivateKey is not defined." on the console', () => {
    global.console = { error: jest.fn() };
    checkJWT();
    expect(console.error).toBeCalled();
    expect(console.error).toHaveBeenCalledWith(
      chalk.red('FATAL ERROR: jwtPrivateKey is not defined.')
    );
  });
  it('- should exit process if no jwtPrivateKey in ".env"', () => {
    checkJWT();
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
