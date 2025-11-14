// Constants
const POPUP_SELECTOR = ".mbsc-flex-1-1.mbsc-popup-content";
const SCHEDULE_SELECTOR = ".mbsc-schedule-event";
const LOCATION_SELECTOR = ".calendar-module";

const CUSTOM_LOCATION_WRAPPER = 'AOF-custom-location-wrapper';
const CUSTOM_LOCATION_TEXT = 'AOF-custom-location-text';

const NO_LOCATION_ERROR = 'An Error occurred';
const ERROR_TEXT_CLASS = 'AOF-error-text';

const ERROR_COLOR = '#db3c30';

// Helper functions
const createLocationElement = (wrapper, location) => {
    const e = htmlLocationElement(location);
    wrapper.appendChild(e);
}

const updateLocationElement = (location) => {
    const e = document.querySelector(`#${CUSTOM_LOCATION_TEXT}`);
    if (location == NO_LOCATION_ERROR && !e.classList.contains(ERROR_TEXT_CLASS)) {
        e.classList.add(ERROR_TEXT_CLASS);
    } else if (location != NO_LOCATION_ERROR) {
        e.classList.remove(ERROR_TEXT_CLASS)
    }
    e.innerText = location;
}

const injectPopup = (popup, location) => {

    if (document.querySelector(`#${CUSTOM_LOCATION_WRAPPER}`)) {
        updateLocationElement(location)
        return
    }

    if (!popup) {
        console.error('no popup found');
    }

    createLocationElement(popup.querySelector(".calender-item-details-wrapper"), location)
}

const htmlLocationElement = (location) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'gap-sm flex items-center';
    wrapper.id = CUSTOM_LOCATION_WRAPPER
    wrapper.innerHTML = `
    <span>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" 
        viewBox="0 -960 960 960" fill="${location == NO_LOCATION_ERROR ? ERROR_COLOR : '#FFFFFF'}" >
        <path 
        d="M240-80q-33 0-56.5-23.5T160-160v-480q0-56 34-98t86-56v-86h120v80h160v-80h120v86q52 14 86 56t34 98v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480q0-33-23.5-56.5T640-720H320q-33 0-56.5 23.5T240-640v480Zm340-160h80v-160H300v80h280v80ZM480-440Z"/>
      </svg>
    </span>
    <div>
      <p class="font-body-md ${location == NO_LOCATION_ERROR ? ERROR_TEXT_CLASS : ''}" id=${CUSTOM_LOCATION_TEXT} >${location}</p>
    </div>`;
    return wrapper;
}

// Main event handler
(() => {

    document.addEventListener("click", e => {
        const event = e.target.closest(SCHEDULE_SELECTOR);

        if (!event) {
            return;
        }

        const checkPopup = () => {
            const popup = document.querySelector(POPUP_SELECTOR);
            if (popup) {
                retunCode = injectPopup(popup, event.querySelector(LOCATION_SELECTOR)?.innerText || NO_LOCATION_ERROR);
            } else {
                setTimeout(checkPopup, 30);
            }
        };
        checkPopup();
    });

})();
