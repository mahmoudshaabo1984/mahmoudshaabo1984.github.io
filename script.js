document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Greeting based on Local Time
    const greetingElement = document.getElementById('dynamic-greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting = 'Hello';
        if (hour < 12) {
            greeting = 'Good morning';
        } else if (hour < 18) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }
        greetingElement.textContent = `${greeting}, `;
    }

    // 2. Accessible Copy Email to Clipboard Feature
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const a11yAlert = document.getElementById('a11y-alert-region');

    if (copyEmailBtn && a11yAlert) {
        copyEmailBtn.addEventListener('click', () => {
            const emailText = 'obscu@example.com';
            
            navigator.clipboard.writeText(emailText).then(() => {
                // Update live region so NVDA screen reader announces the success
                a11yAlert.textContent = 'Email address copied to clipboard successfully.';
                
                // Temporarily update button text for visual feedback
                const originalText = copyEmailBtn.textContent;
                copyEmailBtn.textContent = 'Copied! ✓';
                copyEmailBtn.style.backgroundColor = '#2ea44f'; // Green feedback
                
                setTimeout(() => {
                    copyEmailBtn.textContent = originalText;
                    copyEmailBtn.style.backgroundColor = ''; // Restore original style
                    a11yAlert.textContent = ''; // Clear live region
                }, 3000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                a11yAlert.textContent = 'Failed to copy email automatically. Please select and copy it manually.';
            });
        });
    }
});
