import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = React.useState([])

    /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */
    React.useEffect(() => {
        function getMemes() {
            fetch(
                "https://api.imgflip.com/get_memes")
                .then((res) => res.json())
                .then((json) => {
                    setAllMemes(json.data.memes)
                })
        }
        getMemes()
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        console.log(randomNumber);
        console.log(allMemes.length);
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))

    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="top-bottom-text">
                <input
                    type="text"
                    placeholder="Top text"
                    className="input-field"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="input-field"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    className="meme-button"
                    onClick={getMemeImage}
                >
                    Change Image
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme-image" alt="Meme-pic" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}