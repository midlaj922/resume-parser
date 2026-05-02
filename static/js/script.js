document.getElementById('uploadForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        const html = await response.text();
        document.body.innerHTML = html;
    } else {
        const error = await response.json();
        alert(error.error);
        document.getElementById('loader').style.display = 'none';
        document.querySelector('.upload-box').classList.remove('processing');
        document.querySelector('.analyze-btn').classList.remove('processing');
        document.querySelector('.upload-label').style.display = 'block';
        document.getElementById('resumes').style.display = 'block';
    }
});

function sortTable(n) {
    const table = document.getElementById('resultsTable');
    let rows, switching = true, i, shouldSwitch, dir = 'asc', switchcount = 0;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            const x = rows[i].getElementsByTagName('TD')[n];
            const y = rows[i + 1].getElementsByTagName('TD')[n];
            if (dir === 'asc') {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === 'desc') {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else if (switchcount === 0 && dir === 'asc') {
            dir = 'desc';
            switching = true;
        }
    }
}

document.getElementById('searchInput')?.addEventListener('keyup', function() {
    const input = this.value.toLowerCase();
    const table = document.getElementById('resultsTable');
    const rows = table.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        const name = rows[i].getElementsByTagName('td')[0].textContent.toLowerCase();
        const skills = rows[i].getElementsByTagName('td')[1].textContent.toLowerCase();
        rows[i].style.display = (name.includes(input) || skills.includes(input)) ? '' : 'none';
    }
});

async function downloadPDF() {
    try {
        const table = document.getElementById('resultsTable');
        const rows = table.getElementsByTagName('tr');
        const tableData = [];
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            tableData.push({
                name: cells[0].textContent,
                skills: cells[1].textContent,
                jobs: cells[2].textContent
            });
        }
        const response = await fetch('/download_pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `table_data=${encodeURIComponent(JSON.stringify(tableData))}`
        });
        if (!response.ok) {
            const error = await response.json();
            alert(error.error);
            return;
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resumes.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (e) {
        alert('Failed to download PDF: ' + e.message);
    }
}

// function analyzeResumes() {
//     const files = document.getElementById('resumes').files;
//     if (files.length === 0) {
//         alert('Please select at least one PDF file.');
//         return;
//     }
//     if (files.length > 15) {
//         alert('You can upload a maximum of 15 files.');
//         return;
//     }

//     const formData = new FormData();
//     for (let file of files) {
//         formData.append('resumes', file);
//     }

//     const loader = document.getElementById('loader');
//     const uploadBox = document.querySelector('.upload-box');
//     const analyzeBtn = document.querySelector('.analyze-btn');
//     const uploadLabel = document.querySelector('.upload-label');
//     const fileInput = document.getElementById('resumes');
//     uploadBox.classList.add('processing');
//     analyzeBtn.classList.add('processing');
//     uploadLabel.style.display = 'none';
//     fileInput.style.display = 'none';
//     loader.style.display = 'flex';

//     fetch('/upload', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.ok ? response.text() : response.json().then(data => Promise.reject(data)))
//     .then(html => {
//         document.body.innerHTML = html;
//         loader.style.display = 'none';
//         uploadBox.classList.remove('processing');
//         analyzeBtn.classList.remove('processing');
//     })
//     .catch(error => {
//         alert(error.error || 'An error occurred during analysis.');
//         loader.style.display = 'none';
//         uploadBox.classList.remove('processing');
//         analyzeBtn.classList.remove('processing');
//         uploadLabel.style.display = 'block';
//         fileInput.style.display = 'block';
//     });
// }

