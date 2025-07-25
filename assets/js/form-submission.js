document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action="https://formspree.io/f/mnnzdanw"]');

    if (form) { 
        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            const formData = new FormData(this);
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success! Display a message and clear the form.
                    alert('Thanks for your message! I will get back to you soon.');
                    this.reset(); // Clear all form fields
                } else {
                    // Handle errors from Formspree
                    const errorData = await response.json();
                    if (errorData.errors) {
                        alert('Oops! There was a problem: ' + errorData.errors.map(e => e.message).join(', '));
                    } else {
                        alert('Oops! There was an unexpected error submitting your form.');
                    }
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    }
});