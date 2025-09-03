const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all"
  fetch(url)
  .then(res => res.json())
  .then(json => displayLesson(json.data))
}
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
  .then(res => res.json())
  .then(json => displayLevelWord(json.data))
  
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
    return;
  }
  words.forEach(word => {
    console.log(word)
      const card = document.createElement('div')
      card.innerHTML = `
       <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-2">
                <h2 class="font-extrabold text-2xl"> ${word.word ? word.word : "শব্দ পাওয়া যায় নি"} </h2>
                <p class="py-2 font-semibold ">Meaning /Pronounciation</p>
            <div class="font-bangla text-2xl">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায় নি"}"</div>
            <div class="flex justify-between">
                <button class="bg-[#1A91FF10] hover:bg-[#1A91FF80] p-3 rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
                <button class="bg-[#1A91FF10] hover:bg-[#1A91FF80] p-3 rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>                    
      `
      wordContainer.appendChild(card)
  })
}


const displayLesson = (lessons) => {
  const lessonsContainer = document.getElementById('level-container');
    lessonsContainer.innerHTML = ''
    lessons.forEach(lesson => {
      const div = document.createElement('div')
      div.innerHTML = `
      <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"> lesson - ${lesson.level_no} </button>`
      lessonsContainer.appendChild(div)
    })    
}
loadLessons()