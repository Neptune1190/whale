function updateCalendar() {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();

        const calendarDays = document.querySelectorAll('.calendar-day');

        calendarDays.forEach(day => {
          day.classList.remove('current-day-dot');
          if (parseInt(day.textContent) === currentDay) {
            day.classList.add('current-day-dot');
          }
        });
      }

      updateCalendar();


      function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const meridiem = hours >= 12 ? ' PM' : ' AM';


        const formattedHours = hours % 12 || 12;

        const timeString = `${formattedHours}:${padZero(minutes)}:${padZero(seconds)}${meridiem}`;
        document.querySelector('.clock').textContent = timeString;
      }

      function padZero(number) {
        return number < 10 ? '0' + number : number;
      }

      // Update the clock every second
      setInterval(updateClock, 1000);

      // Call the function once to initialize the clock
      updateClock();

      const windows = document.querySelectorAll('.window');
      windows.forEach(window => {
        window.addEventListener('mousedown', startDragging);
      });



      let offsetX, offsetY;

      function startDragging(e) {
        const window = e.target.closest('.window');
        const rect = window.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        window.style.zIndex = '1000';

        function dragWindow(event) {
          const newX = event.clientX - offsetX;
          const newY = event.clientY - offsetY;
          window.style.left = `${newX}px`;
          window.style.top = `${newY}px`
        }

        function stopDragging() {
          document.removeEventListener('mousemove', dragWindow);
          document.removeEventListener('mouseup', stopDragging);
        }

        document.addEventListener('mousemove', dragWindow);
        document.addEventListener('mouseup', stopDragging);
      }


      function addToCalc(value) {
        const inputField = document.getElementById('calcInput');
        inputField.value += value;
      }

      function clearCalc() {
        const inputField = document.getElementById('calcInput');
        inputField.value = '';
      }

      function calculate() {
        const inputField = document.getElementById('calcInput');
        const expression = inputField.value;
        try {
          const result = eval(expression);
          inputField.value = result;
        } catch (error) {
          inputField.value = 'Error';
        }
      }

      function toggleDisplayMenu() {
        var startDisplay = document.querySelector(".start-display");
        if (startDisplay.style.display === "none") {
          startDisplay.style.display = "block";
        } else {
          startDisplay.style.display = "none";
        }
      }

      document.querySelector(".start-button").addEventListener("click", toggleDisplayMenu);

      function openAboutWindow() {
        const existingWindow = document.querySelector('.about-window');
        if (!existingWindow) {
          const aboutWindow = document.createElement('div');
          aboutWindow.classList.add('window', 'about-window');
          aboutWindow.style.top = '100px';
          aboutWindow.style.left = '100px';
          aboutWindow.innerHTML = `
      <div class="window-titlebar" style="left: 2px; margin-top: 35px;">
      <div class="window-title" style="margin-left: 5px;">About Me</div>
      <div class="window-buttons" style="margin-right: 7px; margin-top: 3px">
      <img src="static/img/minimize.png" alt="Minimize" class="window-button" onclick="minimizeWindow(this)">
      <img src="static/svg/lyt65r.svg" alt="Close" class="window-button" onclick="closeWindow(this)">
      </div>
      </div>
        <div class="about-content" style="display: flex; justify-content: center; align-items: flex-start; margin-top: 40px;">
            <img src="static/img/0950ou.png" alt="About Image" draggable="false" style="max-width: 50%; height: 50%; border: 2px outset #c8c7c7;">
            <div class="about-text" style="border: 2px inset #fff;">
                <p>Hi there! I'm Lunarion. I'm a 16-year-old high-schooler who has a passion for programming. Feel free to contact me!</p>
                <button class="contact-btn" onclick="openContactWindow()" style="border: 2px outset #c8c7c7;">Contact</button>
                <button class="project-btn" onclick="openProjectWindow()" style="border: 2px outset #c8c7c7;">Credits</button>
            </div>
        </div>
    `;
          document.body.appendChild(aboutWindow);
          makeDraggable(aboutWindow);

          addTaskbarIcon('About Me', 'openAboutWindow', 'about-window');
        }
      }

      function openNotepadWindow() {
        const existingWindow = document.querySelector('.notepad-window');
        if (!existingWindow) {
          const notepadWindow = document.createElement('div');
          notepadWindow.classList.add('window', 'notepad-window');
          notepadWindow.style.top = '100px';
          notepadWindow.style.left = '1150px';
          notepadWindow.innerHTML = `
      <div class="window-titlebar" style="left: 2px; margin-top: 35px;">
      <div class="window-title" style="margin-left: 5px;">Notepad</div>
      <div class="window-buttons" style="margin-right: 7px; margin-top: 3px">
      <img src="static/img/minimize.png" alt="Minimize" class="window-button" onclick="minimizeWindow(this)">
      <img src="static/svg/lyt65r.svg" alt="Close" class="window-button" onclick="closeWindow(this)">
      </div>
      </div>
      <div class="window-content" style="margin-top: 40px; border: 2px inset #c8c7c7;">
        <textarea rows="6" placeholder="Type your notes here..."></textarea>
   </div> `;
          document.body.appendChild(notepadWindow);
          makeDraggable(notepadWindow);

          addTaskbarIcon('Notepad', 'openNotepadWindow', 'notepad-window');
        }
      }

      function openCalculatorWindow() {
        const existingWindow = document.querySelector('.calculator-window');
        if (!existingWindow) {
          const calculatorWindow = document.createElement('div');
          calculatorWindow.classList.add('window', 'calculator-window');
          calculatorWindow.style.top = '100px';
          calculatorWindow.style.left = '800px';
          calculatorWindow.innerHTML = `
       <div class="window-titlebar" style="left: 2px; margin-top: 35px;">
       <div class="window-title" style="margin-left: 5px;">Calculator</div>
       <div class="window-buttons" style="margin-right: 7px; margin-top: 3px">
       <img src="static/img/minimize.png" alt="Minimize" class="window-button" onclick="minimizeWindow(this)">
       <img src="static/svg/lyt65r.svg" alt="Close" class="window-button" onclick="closeWindow(this)">
       </div>
       </div>
       <div class="window-content" style="margin-top: 40px; border: 2px inset #c8c7c7;">
        <input type="text" id="calcInput"readonly>
        <br>
        <button onclick="addToCalc('1')">1</button>
        <button onclick="addToCalc('2')">2</button>
        <button onclick="addToCalc('3')">3</button>
        <button onclick="addToCalc('+')">+</button>
        <br>
        <button onclick="addToCalc('4')">4</button>
        <button onclick="addToCalc('5')">5</button>
        <button onclick="addToCalc('6')">6</button>
        <button onclick="addToCalc('-')">-</button>
        <br>
        <button onclick="addToCalc('7')">7</button>
        <button onclick="addToCalc('8')">8</button>
        <button onclick="addToCalc('9')">9</button>
        <button onclick="addToCalc('*')">*</button>
        <br>
        <button onclick="addToCalc('0')">0</button>
        <button onclick="addToCalc('.')">.</button>
        <button onclick="clearCalc()">C</button>
        <button onclick="calculate()">=</button>
    `;
          document.body.appendChild(calculatorWindow);
          makeDraggable(calculatorWindow);

          addTaskbarIcon('Calculator', 'openCalculatorWindow', 'calculator-window');
        }
      }

      function openCalendarWindow() {
        const existingWindow = document.querySelector('.calendar-window');
        if (!existingWindow) {
          const calendarWindow = document.createElement('div');
          calendarWindow.classList.add('window', 'calendar-window');
          calendarWindow.style.top = '300px';
          calendarWindow.style.left = '800px';
          calendarWindow.innerHTML = `
      <div class="window-titlebar" style="left: 2px; margin-top: 35px;">
      <div class="window-title" style="margin-left: 5px;">Calendar</div>
      <div class="window-buttons" style="margin-right: 7px; margin-top: 3px">
      <img src="static/img/minimize.png" alt="Minimize" class="window-button" onclick="minimizeWindow(this)">
      <img src="static/svg/lyt65r.svg" alt="Close" class="window-button" onclick="closeWindow(this)">
      </div>
      </div>
      <div class="calendar" style="margin-top: 40px; border: 2px inset #c8c7c7;">
            <div class="calendar-day">Sun<span class="current-day-dot"></span></div>
            <div class="calendar-day">Mon</div>
            <div class="calendar-day">Tue</div>
            <div class="calendar-day">Wed</div>
            <div class="calendar-day">Thu</div>
            <div class="calendar-day">Fri</div>
            <div class="calendar-day">Sat</div>
            <div class="calendar-day">1</div>
            <div class="calendar-day">2</div>
            <div class="calendar-day">3</div>
            <div class="calendar-day">4</div>
            <div class="calendar-day">5</div>
            <div class="calendar-day">6</div>
            <div class="calendar-day">7</div>
            <div class="calendar-day">8</div>
            <div class="calendar-day">9</div>
            <div class="calendar-day">10</div>
            <div class="calendar-day">11</div>
            <div class="calendar-day">12</div>
            <div class="calendar-day">13</div>
            <div class="calendar-day">14</div>
            <div class="calendar-day">15</div>
            <div class="calendar-day">16</div>
            <div class="calendar-day">17</div>
            <div class="calendar-day">18</div>
            <div class="calendar-day">19</div>
            <div class="calendar-day">20</div>
            <div class="calendar-day">21</div>
            <div class="calendar-day">22</div>
            <div class="calendar-day">23</div>
            <div class="calendar-day">24</div>
            <div class="calendar-day">25</div>
            <div class="calendar-day">26</div>
            <div class="calendar-day">27</div>
            <div class="calendar-day">28</div>
            <div class="calendar-day">29</div>
            <div class="calendar-day">30</div>
            <div class="calendar-day">31</div>
    </div>
    `;
          document.body.appendChild(calendarWindow);
          makeDraggable(calendarWindow);

          addTaskbarIcon('Calendar', 'openCalendarWindow', 'calendar-window');
        }
      }

      function openContactWindow() {
        const existingWindow = document.querySelector('.contact-window');
        if (!existingWindow) {
          const contactWindow = document.createElement('div');
          contactWindow.classList.add('window', 'contact-window');
          contactWindow.style.top = '100px';
          contactWindow.style.left = '450px';
          contactWindow.innerHTML = `
      <div class="window-titlebar" style="left: 2px; margin-top: 35px;">
      <div class="window-title" style="margin-left: 5px;">Contact</div>
      <div class="window-buttons" style="margin-right: 7px; margin-top: 3px">
      <img src="static/img/minimize.png" alt="Minimize" class="window-button" onclick="minimizeWindow(this)">
      <img src="static/svg/lyt65r.svg" alt="Close" class="window-button" onclick="closeWindow(this)">
      </div>
      </div>
      <div class="window-content" style="margin-top: 40px; border: 2px inset #c8c7c7;">
    <p>You can contact me via:</p>
    <ul>
        <li>--------yuko---------</li>
        <li>Email: <a href="mailto:yuko@slimepointe.top">yuko@slimepointe.top</a></li>
        <li>Discord: @yu6x</li>
        <li>Telegram: t.me/homeIandsecurity</li>
        <li>--------lunarion--------</li>
        <li>Email: <a href="mailto:theturtleinwater@gmail.com">theturtleinwater@gmail.com</a></li>
        <li>Discord: @lnarion</li>
        <li>Matrix: <a href="https://matrix.com/@lnarin">@lnarin:matrix.com</a></li>
        <li>Phone: hi osama </li>
    </ul>
</div>
</div>
  `;
          document.body.appendChild(contactWindow);
          makeDraggable(contactWindow);

          addTaskbarIcon('Contact', 'openContactWindow', 'contact-window');
        }
      }

      function openProjectWindow() {
        const existingWindow = document.querySelector('.project-window');
        if (!existingWindow) {
          const projectWindow = document.createElement('div');
          projectWindow.classList.add('window', 'project-window');
          projectWindow.style.top = '320px';
          projectWindow.style.left = '450px';
          projectWindow.innerHTML = `
      <div class="window-titlebar" style="left: 2px; margin-top: 35px;">
      <div class="window-title" style="margin-left: 5px;">Credits</div>
      <div class="window-buttons" style="margin-right: 7px; margin-top: 3px">
      <img src="static/img/minimize.png" alt="Minimize" class="window-button" onclick="minimizeWindow(this)">
      <img src="static/svg/lyt65r.svg" alt="Close" class="window-button" onclick="closeWindow(this)">
      </div>
      </div>
      <div class="window-content" style="margin-top: 40px; border: 2px inset #c8c7c7;">
    <p>Thanks to those who helped me:</p>
    <ul>
        <li> yuko, literally made this code better. </li>
        <li> <a href="https://github.com/yu6x">yuko's github</a></li>
        <li> sydney, site tester. </li>
        <li> wearr, great web dev </li>
        <li> <a href="https://github.com/wearrrrr">wearr's github</a></li>
        <li> interpolation, made the sparkles javascript and css </li>
    </ul>
</div>
    `;
          document.body.appendChild(projectWindow);
          makeDraggable(projectWindow);

          addTaskbarIcon('Credits', 'openProjectWindow', 'project-window');
        }
      }

      function openSettingsWindow() {
        const existingWindow = document.querySelector('.settings-window');
        if (!existingWindow) {
          const settingsWindow = document.createElement('div');
          settingsWindow.classList.add('window', 'settings-window');
          settingsWindow.style.top = '320px';
          settingsWindow.style.left = '450px';
          settingsWindow.innerHTML = `
      <div class="window-titlebar" style="left: 2px; margin-top: 35px;">
      <div class="window-title" style="margin-left: 5px;">Settings</div>
      <div class="window-buttons" style="margin-right: 7px; margin-top: 3px">
      <img src="static/img/minimize.png" alt="Minimize" class="window-button" onclick="minimizeWindow(this)">
      <img src="static/svg/lyt65r.svg" alt="Close" class="window-button" onclick="closeWindow(this)">
      </div>
      </div>
      <div class="window-content" style="margin-top: 40px; border: 2px inset #c8c7c7;">
    <p>Still In Testing</p>
    <ul>
        <li> Text Info </li>
        <li> Slider one </li>
        <li> Text info </li>
        <li> Slider two </li>
        <li> Text 3 </li>
        <li> Slider 3 </li>
    </ul>
</div>
    `;
          document.body.appendChild(settingsWindow);
          makeDraggable(settingsWindow);

          addTaskbarIcon('Settings', 'openSettingsWindow', 'settings-window');
        }
      }
      function openChangelogWindow() {
        const existingWindow = document.querySelector('.changelog-window');
        if (!existingWindow) {
          const changelogWindow = document.createElement('div');
          changelogWindow.classList.add('window', 'changelog-window');
          changelogWindow.style.top = '100px';
          changelogWindow.style.left = '100px';
          changelogWindow.innerHTML = `
      <div class="window-titlebar" style="left: 2px; margin-top: 35px;">
      <div class="window-title" style="margin-left: 5px;">Changelog</div>
      <div class="window-buttons" style="margin-right: 7px; margin-top: 3px">
      <img src="static/img/minimize.png" alt="Minimize" class="window-button" onclick="minimizeWindow(this)">
      <img src="static/svg/lyt65r.svg" alt="Close" class="window-button" onclick="closeWindow(this)">
      </div>
      </div>
      <div class="window-content" style="margin-top: 40px; border: 2px inset #c8c7c7;">
    <p>Changelog:</p>
    <p>Changes this update:</p>
    <p>The graphics overhaul is almost done</p>
    <p>Added the start menu and the app taskbar</p>
    <p>Adding minimize button, and mayhaps even maximize button!?</p>
    <p>Still working on that eaglercraft thing, spritz</p> 
    <p>From now on, I'm going to start giving these official updates.</p>
    <p>Consider this update Beta.Workflow-Ver-373.Main</p>
</div>
    `;
          document.body.appendChild(changelogWindow);
          makeDraggable(changelogWindow);

          addTaskbarIcon('Changelog', 'openChangelogWindow', 'changelog-window');
        }
      }


      function closeWindow(button) {
        const window = button.closest('.window');
        window.remove();
        const taskbarButtons = document.querySelectorAll('.taskbar-button');
        const windowTitle = window.querySelector('.window-title').textContent;
        console.log("Window Title:", windowTitle);
        taskbarButtons.forEach(taskbarButton => {
          if (taskbarButton.textContent === windowTitle) {
            taskbarButton.remove();
          }
        });
      }

      function minimizeWindow(button) {
        const window = button.closest('.window');
        if (window) {
          const windowRect = window.getBoundingClientRect(); // Get window position
          window.dataset.prevTop = windowRect.top; // Store position in dataset
          window.dataset.prevLeft = windowRect.left;
          window.style.display = 'none';
        }
      }

      function toggleMinimizedWindow() {
        const window = document.querySelector('.window');
        if (window) {
          if (window.style.display === 'none') {
            window.style.display = 'none';
          }
        } else {
          console.error("No window element found");
        }
      }


      function makeDraggable(window) {
        window.addEventListener('mousedown', startDragging);
      }


      let taskbarButtons = []; // Array to store created buttons

      function addTaskbarIcon(label, onClickFunction) {
        console.log("Adding taskbar button for: " + label);
        const taskbar = document.querySelector('.taskbar');
        const taskbarButton = document.createElement('div');
        taskbarButton.classList.add('taskbar-button');
        taskbarButton.textContent = label;
        taskbarButton.onclick = window[onClickFunction];

        // Check if a button with the same label already exists
        const existingButton = taskbarButtons.find(button => button.textContent === label);
        taskbarButton.onclick = function() {
        	const windowClass = onClickFunction.replace(/^open(.*)Window$/, '$1').toLowerCase() + '-window';
          const window = document.querySelector('.' + windowClass);
          if (window) {
            if (window.style.display === 'none') {
              window.style.display = '';
            }
          } else {
            console.log("Window not found for class: " + windowClass);
          }
      };
      taskbar.appendChild(taskbarButton);
      taskbarButtons.push(taskbarButton);
      }
