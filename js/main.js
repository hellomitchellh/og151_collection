// let simplePokemonObj;

function parseObjectProperties (obj, parse) {
    for (var k in obj) {
        if (typeof obj[k] === 'object' && obj[k] != null) {
        parseObjectProperties(obj[k], parse)
        } else if (obj.hasOwnProperty(k)) {
        parse(k, obj[k])
        }
    }
}

//function random number
function randoImg(arr) {
    //if want to make more complicated & filter, need to make this part a standalone function
    let urlsOnly = []
    for(let i of arr) {
        urlsOnly.push(Object.values(i))
    }

    //the actaul random selection of 1 image
    let lengthOfArray = urlsOnly.length
    let randoNum =  Math.floor(Math.random() * lengthOfArray)
    return urlsOnly[randoNum]
}



fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    .then(res => res.json())
    .then(data => {
        let simplePokemonObj = data.results
        simpleData = data.results
        
        //make new obj with all pictures in it
        for(let i = 0; i < simplePokemonObj.length; i++) {
            // grab 
            fetch(`${simplePokemonObj[i].url}`)
                .then(res => res.json())
                .then(data => {
                    let reducePData = {}
                    
                    reducePData.id = `${data.id}`
                    reducePData.name = `${data.name}`
                    reducePData.sprites = []
                    
                    //grabbing nested sprites item
                    parseObjectProperties(data.sprites, function(k, prop) {
                        let tempObj = {}
                        if(`${prop}` != 'null') {
                            tempObj[`${k}`] = `${prop}`
                            reducePData.sprites.push(tempObj)  
                        }
                    })
                    
                    // Works till here
                    // console.log(reducePData)

                    //create LI Container
                    const liContainer = document.createElement('li')
                    liContainer.setAttribute('id', `li_${i}`)
                    document.querySelector('#ul_container').appendChild(liContainer)
                
            
                    //random image selector
                    let randoImgPicked = randoImg(reducePData.sprites)
            
                    // create & add nested pokemon PIC
                    let pokemonPic = document.createElement('img')
                    pokemonPic.src = `${randoImgPicked}`;
                    document.querySelector(`#li_${i}`).appendChild(pokemonPic)    
                    
                })
                .catch(err => {
                    console.log(`error ${err}`)
                });
        }

    })
    .catch(err => {
        console.log(`error ${err}`)
    });





