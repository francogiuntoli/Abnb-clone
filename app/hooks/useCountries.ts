import countries from "world-countries";

const formattedCouintries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region
}))

const useCountrues = () => {
    const getAll = () => formattedCouintries;

    const getByValue = (value: string) => {
        return formattedCouintries.find((item) => item.value === value)
    }

    return {
        getAll,
        getByValue
    }
}

export default useCountrues;