chrome.commands.onCommand.addListener(function (command) {
    if (command === 'toggle-pin') {
        // выбираю текущую вкладку
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            let currentTab = tabs[0];

            let url = new URL(currentTab.url);

            // переключаем наш параметр
            if (url.searchParams.has('clear_cache')) {
                url.searchParams.delete('clear_cache');
            } else {
                url.searchParams.append('clear_cache', 'Y');
            }

            // обновляем адресную строку текущей вкладки
            chrome.tabs.query({active: true}, (tabs) => {
                chrome.tabs.update(currentTab.id, {url: url.toString()});
            });
        });
    }
});
