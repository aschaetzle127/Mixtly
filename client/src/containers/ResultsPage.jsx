import React, { useState, useEffect } from "react";
import DrinkCard from "../shared/DrinkCard";

import IconButton from "../shared/IconButton";

const constraints = {
    width: "300px",
    position: "relative",
    margin: "25px",
};
const centerContainer = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "12px",
};
const favoritesButton = {
    position: "absolute",
    right: "0",
    top: "0",
    transform: "translate(-28%, 28%)",
};

export default function ResultsPage(props) {
    const [result, setResult] = useState(null);
    const { base } = props.location;

    useEffect(() => {
        console.log(props.location);
        let params = {};
        props.location.search
            .split(/[\?&]/)
            .filter(s => s !== "")
            .forEach(s => {
                let [key, value] = s.split("=");
                params[key] = value;
            });
        const { base } = params;
        fetch(base ? "/api/randomizer?base=" + base : "/api/randomizer")
            .then(res => res.json())
            .then(result => {
                console.log(result);
                const Results = {
                    base: result.randomizedBase,
                    flavor: result.randomizedFlavor,
                    milk: result.randomizedMilk,
                    variation: result.randomizedVariation,
                };
                setResult(Results);
                console.log("base: " + Results.base);
                console.log("flavor: " + Results.flavor);
                console.log("Suggested milk: " + Results.milk);
                console.log("variation: " + Results.variation);
            })
            .catch(error => {
                console.warn(error);
            });
    }, []);

    return (
        <main>
            {/* <div className="result box" style={constraints}> */}
            {result && <DrinkCard {...result} />}
            {/* </div> */}
        </main>
    );
}
