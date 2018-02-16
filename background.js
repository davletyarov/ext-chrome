chrome.commands.onCommand.addListener(cmd => {
    if ('toggle-pin' === cmd) {
        // выбираю текущую вкладку
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            let tab = tabs[0];

            let url = new URL(tab.url);

            // переключаем наш параметр
            if (url.searchParams.has('clear_cache')) {
                url.searchParams.delete('clear_cache');
            } else {
                url.searchParams.append('clear_cache', 'Y');
            }

            // обновляем адресную строку текущей вкладки
            chrome.tabs.query({active: true}, tabs => chrome.tabs.update(tab.id, {url: url.toString()}));
        });
    }
});
