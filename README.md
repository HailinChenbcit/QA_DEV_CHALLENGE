## How to Run

1. Download Node.js and npm

`
node -v
npm -v
npm init
`

2. Install selenium-webdriver

`
npm install selenium-webdriver
`

3. Download Firefox webdriver based on your OS, save to ~/Desktop/driver folder

`
https://github.com/mozilla/geckodriver/releases/
`

4. Add driver to PATH

`
echo $PATH
`
then add your path to *driver* folder to `$PATH`

5. Check if firefox driver added correctly

`
echo $PATH
`


6. Run script in terminal

``
node src/test.js   
``
