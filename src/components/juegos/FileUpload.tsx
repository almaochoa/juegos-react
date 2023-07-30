import { ChangeEvent, useState } from 'react';

let content:any;
let errores: string = "";
let resps: string = "";

function writeFile(player1:number, player2:number){

    let winner = "";
    let points = 0;
    if(player1 > player2){
      winner = "1";
      points = player1;
    } else {
      winner = "2";
      points = player2;
    }
      
    let txtResp = winner + " " + points;
    const a = document.createElement("a");
    const respFile = new Blob([txtResp], { type: 'text/plain' });
    const url = URL.createObjectURL(respFile);
    a.href = url;
    a.download = 'games-resp.txt';
    a.click();
    URL.revokeObjectURL(url);

  }      

function processFile(){
   
    //si el archivo tiene contenido
    if(content){

      //toma las lineas del archivo
      let lines = content.split('\n');
      let num_rondas = Number.parseInt(lines[0]);
      let puntos;
      let player1 = 0;
      let player2 = 0;
      let pos = 0;

      if(num_rondas < 10000){

        if(lines.length == num_rondas+1){
          
          for(let i=1; i<lines.length; i++){

            //si encuntra un salto de linea
            if(lines[i].indexOf('\r') > 0){
                pos = lines[i].indexOf('\r');
                lines[i] = lines[i].substring(0,pos);
            }

            puntos = lines[i].split(' ');
            //valida que sean numeros los que estan en el archivo
            if(Number.isNaN(Number.parseInt(puntos[0]))){
              errores = `El valor del jugador 1 de la ronda ${i} no es un numero`;
              break;    
            }
            if(Number.isNaN(Number.parseInt(puntos[1]))){
              errores = `El valor del jugador 2 de la ronda ${i} no es un numero`;    
              break;    
            }

            puntos[0] = Number.parseInt(puntos[0]);
            puntos[1] = Number.parseInt(puntos[1]);

            if(puntos[0] > puntos[1]){//ronda ganada por jugador 1
              if(player1 < puntos[0]-puntos[1])
                player1 = puntos[0]-puntos[1];
            } else {//ronda ganada por jugador 2
                if(puntos[1] > puntos[0]){
                  if(player2 < puntos[1] - puntos[0])
                    player2 = puntos[1] - puntos[0];
                } else {//empate
                  if(player1 < puntos[0]-puntos[1])
                    player1 = puntos[0]-puntos[1];
                  if(player2 < puntos[1]-puntos[0])
                    player2 = puntos[1]-puntos[0];
                }    
              } 
          }  


        } else {//no existen todas las rondas en el archivo
          errores = 'Faltan datos de rondas';
        }

      } else {
        errores = "No puede haber mas de 10000 rondas";        
      }

      if(errores != ""){
        resps = "";
      } else {
        writeFile(player1, player2);
        alert("El archivo con el resultado ha sido descargado");
        window.location.reload()
    
      }

    } else {
      errores = "El archivo esta vacio";        
    }

    if(errores){

        alert(errores);
        window.location.reload();
    } 

  }  

function readFileContent(file: File): Promise<string> { 

    return new Promise<string>((resolve, reject) => { 
      if (!file) { 
        resolve(''); 
      } 
      const reader = new FileReader(); 
      reader.onload = (e) => { 
        content = reader.result;
        resolve(''); 
      }; 
      reader.readAsText(file); 
    }); 
  }



function FileUpload() {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      readFileContent(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    readFileContent(file);
    processFile();
    
  };



  return (
   
    <div>
    <div className="row">
    <div className="col-md-4">
        <div className="card">
        <div className="card-body">
            <h3>Ganador del Juego</h3>
            <div className="form-group">
                <input type="file" onChange={handleFileChange} className="form-control"/>
                <div>{file && `${file.name} - ${file.type}`}</div>
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={handleUploadClick}>Buscar Ganador</button>
            </div>
        </div>
        </div>
    </div>
    </div>
    </div>            

  );
}

export default FileUpload;