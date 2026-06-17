// Listens for daily quest claim messages from the content script and updates console log
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'dailyQuestClaimed') {
        const { reward, date, time, success } = request;
        //Read existing rewards array local storage
        chrome.storage.local.get('rewards', (data) => {
            let rewards = data.rewards || [];
            //Add new reward to the array
            rewards.unshift({ reward, date, time, success });
            //Save updated rewards array to local storage
            chrome.storage.local.set({ rewards }, () => {

        //Save updated rewards array to local storage
        console.log(`Daily quest claimed: ${reward}, on ${date} at ${time}, success: ${success}`);
        });
    })}});

//Alarms
chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create('dailyQuestAlarm', { periodInMinutes: 0.5 }); // 24 hours = 1440 minutes
});
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'dailyQuestAlarm') {
        // Send a message to the content script to trigger the daily quest claim
        chrome.tabs.query({ url: "*://*.dailyquest.com/*" }, (tabs) => {
            if (tabs.length > 0) {
                chrome.tabs.reload(tabs[0].id);
            } else {
                chrome.tabs.create({ url: "https://www.google.com" });
            }
        })}});