import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_ySNIgyFMIyY8dsCzRxfdWV6DpJshos1emLQ3TXlW1mvZKnY7zjtlozirurux0esQ";

export function fetchBreeds() {
        const url = "https://api.thecatapi.com/v1/breeds";

    return axios.get(url)
        .then((response) => response.data)
        .then((data) => {
            const filteredBreeds = data.filter((breed) => breed.image?.url != null);
            return filteredBreeds
        })
        .catch((error) => {
            console.error("Error fetching breeds:", error);
            throw error;
    })
}

export function fetchCatByBreed(breedId) {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
console.log(url)
    return fetch(url)
        .then(response => {
            console.log(response)
            if (!response.ok) {
            throw new Error('Network response was not ok')
            }
            return response.json()
        })
}
