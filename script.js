const createElements = arr => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`)
    return htmlElements.join(" ")
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const manageSpinner = status => {
  if(status === true) {
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById('word-container').classList.add('hidden')
  }
  else{
        document.getElementById('spinner').classList.add('hidden')
    document.getElementById('word-container').classList.remove('hidden')
  }
}

const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all"
  fetch(url)
  .then(res => res.json())
  .then(json => displayLesson(json.data))
}
const loadLevelWord = (id) => {
  manageSpinner(true)
  const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
  .then(res => res.json())
  .then(json => {
    removeActive()
    const clickBtn = document.getElementById(`lesson-btn-${id}`)
    clickBtn.classList.add('active')
    displayLevelWord(json.data)
  })
}
const removeActive = () => {
  const lessonButton = document.querySelectorAll('.lesson-btn')
  lessonButton.forEach(btn => btn.classList.remove('active'))
}

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  const res= await fetch(url)
  const details = await res.json()
  displayWordDetails(details.data)
}
const displayWordDetails = (word) => {
  const detailsContainer = document.getElementById('details-container')
  detailsContainer.innerHTML='';
  document.getElementById('word_modal').showModal();
  detailsContainer.innerHTML= `
   <div>
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
        </div>
        <div>
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
        </div>
        <div>
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
        </div>
        <div>
            <h2 class="font-bold">Synonym</h2>
            <div>${createElements(word.synonyms)}

            </div>
        </div>
  `
  
}

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';
  if(words.length === 0) {
    wordContainer.innerHTML = `
     <div class="text-center col-span-full  bg-gray-100 rounded-xl space-y-4">
     <img src="assets/alert-error.png" class = "mx-auto" >   
     <h2>
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </h2>
            <p class="font-extrabold font-bangla text-4xl">
              নেক্সট Lesson এ যান
            </p>
    </div>
    `
    manageSpinner(false)
    return;
  }
  words.forEach(word => {
      const card = document.createElement('div')
      card.innerHTML = `
       <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-2">
                <h2 class="font-extrabold text-2xl"> ${word.word ? word.word : "শব্দ পাওয়া যায় নি"} </h2>
                <p class="py-2 font-semibold ">Meaning /Pronounciation</p>
            <div class="font-bangla text-2xl">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায় নি"}"</div>
            <div class="flex justify-between">
                <button onclick="loadWordDetails(${word.id})" class="bg-[#1A91FF10] hover:bg-[#1A91FF80] p-3 rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="bg-[#1A91FF10] hover:bg-[#1A91FF80] p-3 rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>                    
      `
      wordContainer.appendChild(card)
  })
  manageSpinner(false)
}

const displayLesson = (lessons) => {
  const lessonsContainer = document.getElementById('level-container');
    lessonsContainer.innerHTML = ''
    lessons.forEach(lesson => {
      const div = document.createElement('div')
      div.innerHTML = `
      <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"> lesson - ${lesson.level_no} </button>`
      lessonsContainer.appendChild(div)
    })    
    
}
loadLessons()


document.getElementById('btn-search').addEventListener('click' , () => {
  const inputValue = document.getElementById('input-search').value.trim().toLowerCase()
  fetch('https://openapi.programming-hero.com/api/words/all')
  .then(res => res.json())
  .then(json => {
    const allWords = json.data;
    const filterWords = allWords.filter(word => word.word.toLowerCase().includes(inputValue))
    displayLevelWord(filterWords)
  });
}
)