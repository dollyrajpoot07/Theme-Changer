//Difference in local storage in cookies?
// Answer. Note-1. size od local storage(about 5MB) is greater than cookies 
// Note-2. Local strorage have no expiry date(in normal mode), it will not be deleted until and unless it is manually deleted.(Incognito mode is an exception!)
// Note-3. And in we canset its expiry date amd after that date the data will be deleted automaticcally.
// Note-4. Cookies with every request get stored in server but in local storage with the raise of request the data do not get stored in server.

// localStorage.setItem('theme', 'light');
// localStorage.setItem('font', 'bold');

// localStorage.removeItem('font');
// localStorage.clear();
// const theme = localStorage.getItem('theme');

// console.log(theme);


// const userSettings = {
//     theme: 'dark',
//     font: 'light',
//     score: 100
// }

// const settingString = JSON.stringify(userSettings);

// localStorage.setItem('userSettings', settingString);

// const uSetting = JSON.parse(localStorage.getItem('userSettings'));

// console.log(uSetting.theme);

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === 'QuotaExceededError' ||
            e.name === "NS_ERROR_DOM_QUOTA_REACHED")
            && (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) {
    console.log('Oyehoe!! Chl gya');
    const themeSelector = document.querySelector("#themeSelector");
    //if there is any stored theme the theme will br that same only and from this point onwards this program will work.
    const theme = localStorage.getItem('theme');
    changeTheme('theme');

    themeSelector.addEventListener('change', (e) => {
        // console.log(e.target.value);
        localStorage.setItem('theme', e.target.value);
        changeTheme(e.target.value);
    });

    function changeTheme(theme) {
        if (theme === 'dark') {
            document.body.style.backgroundColor = '#222';
        } else if (theme === 'light') {
            document.body.style.backgroundColor = '#fffdfc';
        } else {
            document.body.style.backgroundColor = '#fff';
        }
    }

    window.addEventListener('storage', (e) => {
        // console.log(e);
        if (e.key === 'theme') {
            changeTheme(e.newValue);
            themeSelector.value = e.newValue;
        }

    });
} else {
    console.log("Aree yrr! phit nhi chla");
}

