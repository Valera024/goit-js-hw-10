import { fetchBreeds } from "./cat-api"
import { fetchCatByBreed } from "./cat-api"
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';

const refs = {
    breedSelect: document.querySelector(".breed-select"),
    error: document.querySelector(".error"),
    loader: document.querySelector(".loader"),
    catInfo: document.querySelector(".cat-info")
}

refs.breedSelect.style.width = "300px"
refs.breedSelect.style.marginBottom = "20px"
refs.breedSelect.style.display = "none"
refs.error.style.display = "none"
refs.loader.style.fontSize = "30px"
refs.loader.style.fontWeight = "bold"
refs.catInfo.style.display = "flex"
refs.catInfo.style.gap = "10px"

let storedBreeds = [];

window.addEventListener("load", initializePage)


function initializePage() {  
    fetchBreeds()
        .then((filteredBreeds) => {
            storedBreeds = filteredBreeds
            for (let i = 0; i < storedBreeds.length; i += 1) {
                const breed = storedBreeds[i];
                    let option = document.createElement('option');

                    if (!breed.image) continue
                
                    option.value = i
                    option.innerHTML = `${breed.name}`
                    refs.breedSelect.appendChild(option)
            }
            refs.breedSelect.style.display = "flex"
            new SlimSelect({
                select: refs.breedSelect,
            })
            refs.loader.style.display = "none";
        })
        .catch((error) => {
            Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!")
    refs.loader.style.display = "none";
    })
}  

  
refs.breedSelect.addEventListener("change", () => {
    const selectBreedId = storedBreeds[refs.breedSelect.value].id;
    const feilterCat = storedBreeds.filter(breed => breed.id === selectBreedId)
    console.log(feilterCat)
    if (selectBreedId) {
        refs.catInfo.innerHTML = '';
        refs.loader.style.display = "block";
        fetchCatByBreed(selectBreedId)
            .then(catData => {
                console.log(catData)
                const cat = `<img src="${catData[0].url}" width="600"><div><h1>${feilterCat[0].name}</h1><p style="width: 600px">${feilterCat[0].description}</p><p><b>Temperament:</b>${feilterCat[0].temperament}</p></div>`
                refs.catInfo.insertAdjacentHTML("afterbegin", cat)
                refs.loader.style.display = "none";
            })
            .catch(error => {
                console.error(error);
                Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!")
                refs.loader.style.display = "none";
        })
    }
})
