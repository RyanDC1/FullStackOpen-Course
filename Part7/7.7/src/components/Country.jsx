export default function Country({ country }) {
    if (!country) {
        return null
    }

    if (!country.data) {
        return (
            <div>
                not found...
            </div>
        )
    }

    const { name, capital = [], population, flags } = country.data

    return (
        <div>
            <h3>{name?.common} </h3>
            <div>capital {capital?.[0]} </div>
            <div>population {population}</div>
            <img src={flags.svg ?? flags.png} height='100' alt={`flag of ${country.data.name?.common}`} />
        </div>
    )
}