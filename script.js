document.getElementById('lookup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const certificateId = document.getElementById('certificate-id').value;
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT52TwE-9XPrwaOqx4I54x3j6YdJ4-GSd31wkj6avyCD0MZ5w5ZscVsm7Ac0hJpQYJKNiSjap0qHA0r/pub?output=csv';
    
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const result = document.getElementById('result');
            result.innerHTML = ''; // Clear previous results
            const rows = data.split('\n').slice(1); // Skip header row
            let found = false;
            
            rows.forEach(row => {
                const [id, name, link] = row.split(',');
                if (id.trim() === certificateId.trim()) {
                    result.innerHTML = `
                        <h2>Letter Details</h2>
                        <p><strong>ID:</strong> ${id}</p>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Letter Link:</strong> <a href="${link.trim()}" target="_blank">View Letter</a></p>
                    `;
                    found = true;
                }
            });
            
            if (!found) {
                result.innerHTML = '<p>Letter not found. Please check the ID and try again.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
            document.getElementById('result').innerHTML = '<p>There was an error fetching the letter data. Please try again later.</p>';
        });
});
