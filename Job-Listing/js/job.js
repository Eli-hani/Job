
const selectedWordsContainer = document.getElementById('selected-words-container');
const keywordElements = document.querySelectorAll('.keyword');
const jobItems = document.querySelectorAll('.maindv, .maindv-select');
const clrBtn = document.getElementById('clrBtn');
let selectedWords = [];

clrBtn.addEventListener('click', () => {
    selectedWords = [];
    updateSelectedWords();
    showAllJobs(); 
});

keywordElements.forEach(keyword => {
    keyword.addEventListener('click', () => {
        const word = keyword.textContent;

        if (!selectedWords.includes(word)) {
            selectedWords.push(word);
            updateSelectedWords();
            filterJobsByKeyword(word); 
        }
    });
});

function updateSelectedWords() {
    selectedWordsContainer.innerHTML = '';
    selectedWordsContainer.appendChild(clrBtn);

    selectedWords.forEach(word => {
        const wordContainer = document.createElement('div');
        wordContainer.className = 'word-container';

        const wordElement = document.createElement('span');
        wordElement.textContent = word;
        wordElement.className = 'selected-word';

        const removeIcon = document.createElement('img');
        removeIcon.src = './image/icon-remove.svg';
        removeIcon.alt = 'Remove';
        removeIcon.className = 'remove-icon';

        removeIcon.addEventListener('click', () => {
            selectedWords = selectedWords.filter(selectedWord => selectedWord !== word);
            updateSelectedWords();
            filterJobsByKeyword(word);
            
        });

        wordContainer.appendChild(wordElement);
        wordContainer.appendChild(removeIcon);

        selectedWordsContainer.insertBefore(wordContainer, clrBtn);
    });

    if (selectedWords.length > 0) {
        selectedWordsContainer.style.display = 'flex';
    } else {
        selectedWordsContainer.style.display = 'none';
    }
}

function filterJobsByKeyword(keyword) {
    jobItems.forEach(job => {
        const keywords = job.querySelectorAll('.keyword');
        let hasKeyword = false;

        keywords.forEach(k => {
            if (k.textContent === keyword) {
                hasKeyword = true;
            }
        });

        if (hasKeyword) {
            job.style.display = 'flex';
        } else {
            job.style.display = 'none';
        }
    });
}

function showAllJobs() {
    jobItems.forEach(job => {
        job.style.display = 'flex';
    });
}
