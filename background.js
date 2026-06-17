chrome.chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'dailyQuestClaimed') {
        const { reward, date, time, success } = request;

        // Update the popup with the reward information
        const rewardElement = document.getElementById('reward');
        if (rewardElement) {
            if (success) {
                rewardElement.textContent = `Daily quest claimed successfully: ${reward} on ${date} at ${time}`;
            } else {
                rewardElement.textContent = `Daily quest already claimed today.`;
            }
        };
    }});

