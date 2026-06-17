document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {

        // Check if the daily quest has already been claimed today
        const today = new Date().toISOString().split('T')[0];
        const lastClaimed = localStorage.getItem('lastClaimedDate');

        if (lastClaimed === today) {
            console.log('Daily quest already claimed today.');
            chrome.runtime.sendMessage({
                action: 'dailyQuestAlreadyClaimed',
                reward: null});
            return;
        }

        // Attempt to find the daily quest button and click it
        const button = document.getElementById('dailyQuestBtn');
        if (!button || button.disabled) {
            console.warn('Daily quest button not found or disabled.');
            return;
        }

        //button.click(); //Automatically click the daily quest button 
        //manual button click event listener
        button.addEventListener('click', () => {

        //Wait for result and scrape reward text
        setTimeout(() => {
            const rewardText = '50 Gold'; // Replace with actual scraping logic 

            if (!rewardText) {
                console.warn('Reward text not found.');
                return;
            }

        // Save to localStorage that the daily quest has been claimed today + send to background.js
            localStorage.setItem('lastClaimedDate', today);

            chrome.runtime.sendMessage({
                action: 'dailyQuestClaimed',
                reward: rewardText,
                date: today,
                time: new Date().toLocaleTimeString(),
                success: true
            });

            console.log(`Daily quest claimed successfully: ${rewardText}, on ${today} at ${new Date().toLocaleTimeString()}`);
        }, 1000);
        });
    }, 1500);
});