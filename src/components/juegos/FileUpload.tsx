import { ChangeEvent, useState } from 'react';

let content:any;
let errores: string = "";
let resps: string = "";

function writeFile(winner:string, points:number){
      
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

  let puntos;
  let player1 = 0;
  let player2 = 0;
  let pos = 0;
  let acumj1 = 0;
  let acumj2 = 0;
  let ventaja = 0;
  let jugador = "";
  let mayorVentaja = 0;
  let jugadorVentaja = "";

    //si el archivo tiene contenido
    if(content){

      //toma las lineas del archivo
      let lines = content.split('\n');
      let num_rondas = Number.parseInt(lines[0]);

      if(Number.isNaN(Number.parseInt(lines[0]))){
        errores = 'El valor de numeros de ronda no es un numero';
      } else {         

        if(num_rondas <= 10000){

          if(lines.length == num_rondas+1){
            
            for(let i=1; i<lines.length; i++){

              //si encuentra un salto de linea
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

              acumj1 += puntos[0];
              acumj2 += puntos[1];

              if(acumj1 > acumj2){
                ventaja = acumj1-acumj2;
                jugador = "1";
              } else if(acumj2 > acumj1) {
                  ventaja = acumj2-acumj1;
                  jugador = "2";
              }
              
              if(mayorVentaja < ventaja){
                mayorVentaja = ventaja;
                jugadorVentaja = jugador;   
              }   
              
            }  
              
          } else {
            errores = 'Faltan datos de rondas';
          }  
        } else {
          errores = "No puede haber mas de 10000 rondas";        
        }

      }  

      if(errores != ""){
        resps = "";
      } else {
        writeFile(jugadorVentaja, mayorVentaja);
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