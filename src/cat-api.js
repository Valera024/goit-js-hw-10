import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_ySNIgyFMIyY8dsCzRxfdWV6DpJshos1emLQ3TXlW1mvZKnY7zjtlozirurux0esQ";

export function fetchBreeds() {
        const url = "https://api.thecatapi.com/v1/breeds";
    return axios.get(url)
}

export function fetchCatByBreed(breedId) {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    return axios.get(url)
}
