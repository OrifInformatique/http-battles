import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GameLaunchTest() {
    const inputStyle = {
        backgroundColor: 'lightblue',
    };

    const [phrase, setPhrase] = useState({
        // Dimensions
        d1: {
            firstword: [""],
            firstroute: [""],
            firstmethod: [""],
        },
        d2: {
            secondword: [""],
            secondroute: [""],
            secondmethod: [""],
        },
        d3: {
            thirddword: [""],
            thirdroute: [""],
            thirdsmethod: [""],
        },
        d4: {
            fourthword: [""],
            fourthroute: [""],
            fourthsmethod: [""],
        },
        d5: {
            fifthword: [""],
            fifthroute: [""],
            fifthmethod: [""],
        }
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const timer = setTimeout(() => {
            navigate(''); // Rediriger automatiquement après 3 secondes  
        }, 3000);

        console.log("Redirection effectuée");

        return () => clearTimeout(timer);
    };

    const onChange = (e) => {
        const { d, name, value } = e.target;
        setPhrase((prevPhrase) => {
            const newPhrase = { ...prevPhrase };
            newPhrase[d] = { ...newPhrase[d] };
            newPhrase[d][name] = [value];  // Mettre à jour la valeur sous forme de tableau

            console.log(newPhrase); 
            return newPhrase; 
        });
    };

    return (
        <>
            <h2>Partie #{/*numéro de la partie */} - Création du deck</h2>

            <form onSubmit={handleSubmit}>
                <input style={{ backgroundColor: 'lightblue' }} id="firstword" type="text" name="firstword" onChange={onChange} value={phrase.d1.firstword[0]} placeholder="Entrez le premier mot" />
                <input id="firstword" type="text" name="firstword" onChange={onChange} value={phrase.d1.firstword[0]} placeholder="Entrez le premier mot" />
            </form>
        </>
    );
}

export default GameLaunchTest;