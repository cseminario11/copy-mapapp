import React, {useState} from 'react';
import { CopyGrid } from '../components/CopyGrid';


const AddCopy = () => {
    const [inputValue, setInputValue] = useState({
        copyInput: '',
        stringInput: ''
    });
    // const [stringInf, setStrinInf] = useState('');

    const handleInputChange = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name] : e.target.value
        });
    };
    
    const handleSubmit = () => {
        const copy = inputValue.copyInput.split('\n');

        const copyFinal = funAddInfo(copy);
        const resultado = getStringPart(copyFinal, inputValue.stringInput);

        console.log(JSON.stringify(copyFinal));

        console.log(copyFinal[0].pic);
    };

    function funAddInfo(copy) {
        let copyFinal = [];
        let initialState = {};

        copy.map((copy, i) => {
            const copy2 = copy.trim().split(/(\s+)/).filter(e => e.trim().length > 0);

            initialState = new Object;
            console.log('antes '+JSON.stringify(initialState));

            //Si la primera esta asteriscado, eliminamos la primera posición
            if (copy2[0].charAt(6) === "*"){
                initialState.isCommented=true;
                copy2.shift();
            } else {
                initialState.isCommented=false;
            }

            for(i=0;i<copy2.length;i++){
                console.log('i '+i);
                console.log('copy2 '+copy2[i]);
                switch(i){
                    case 0:
                        console.log('entra en '+i);
                        initialState.level=copy2[i];
                        break;
                    case 1:
                        console.log('entra en '+i);
                        initialState.name=copy2[i];
                        break;
                    case 2:
                        console.log('entra en '+i);
                        initialState.pic=copy2[i];
                        break;
                    case 3:
                        console.log('entra en '+i);
                        console.log('3 '+copy2[i].substr(0,1));
                        switch(copy2[i].substr(0,1)){
                            case 'X':
                                console.log('entra en X');
                                initialState.sign=false;
                                initialState.typeVar='X';
                                break;
                            case 'S':
                                console.log('entra en S');
                                initialState.sign=true;
                                initialState.typeVar='9';
                                break;
                            case '9':
                                console.log('entra en 9');
                                initialState.sign=false;
                                initialState.typeVar='9';
                                break;
                        };

                        let regex = /\(([^\)]+)\)/g,
                              match,
                              resultado = [],
                              texto = copy2[i];
                        
                        while((match = regex.exec(texto)) !== null){
                            resultado.push(match[1]);
                        }

                        initialState.size=parseInt(resultado[0]);

                        if (resultado.length !== 1){
                            console.log('tiene decimales');
                        }
                        break;
                    default:
                        break;
                };
            };

            copyFinal = [...copyFinal,initialState];
            console.log('despues '+JSON.stringify(initialState));
        });

        return copyFinal;
    };


    function getStringPart(copy, stringPart) {

        console.log('entra en la funcion nueva');

        let initial = 0;

        copy.map((copy, i) => {

            if(copy.isCommented){
                console.log('es un comentario');
            } else {
                if(copy.size === undefined){
                    console.log('no tiene tamaño');
                } else {
                    //Pasamos los tamaños a Int
                    console.log('initiali antes'+initial);
                    console.log(stringPart.substr(initial,copy.size));
                    copy.cont = stringPart.substr(initial,copy.size);
                    initial = initial + copy.size;
                }
            }
        });

    };

    return (
        <>
            <form>
                <textarea 
                    className="form-control" 
                    rows="3"
                    name="copyInput"
                    onChange={handleInputChange}
                >
                </textarea>
                <br/>
                Cadena de texto: <br/>
                <input 
                    type="text" 
                    className="form-control"
                    name="stringInput"
                    onChange={handleInputChange}
                />
            </form>
            <button 
                className="btn btn-primary"
                onClick={handleSubmit}
            >
                Mapear
            </button>

            <hr/>

            {/* <CopyGrid copy={copyFinal} /> */}

        </>
    )
}

export default AddCopy;
