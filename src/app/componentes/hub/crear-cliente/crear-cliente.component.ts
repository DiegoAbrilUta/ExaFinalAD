import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  form : FormGroup;
  loading = false;

  constructor(private fb : FormBuilder, private snack : MatSnackBar, private router : Router) { 
    this.form = this.fb.group({
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      direccion: ['',Validators.required],
      cedula: ['',Validators.required],
      telefono: ['',Validators.required],
      pass: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  usuario(){
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    const direccion = this.form.value.direccion;
    const cedula = this.form.value.cedula;
    const telefono = this.form.value.telefono;
    const pass = this.form.value.pass;
    if(!this.validadorCedula(cedula)){
      alert("Cédula Incorrecta");
    }

    if(!this.validadorContraseña(pass)){
      alert("La contraseña no cumple con los parametros de seguridad");
    }

    if(this.validadorCedula(cedula) && this.validadorContraseña(pass)){
      alert("Ingreso correcto");
    }

  }

  toCharArray(str: string){
    let charArray =[];
    for(var i=0;i<str.length;i++){
         charArray.push(str[i]);
    }

    return charArray;
  }

  validadorContraseña(contraseña: string){
    var val: Boolean = false;
    var mayus = new RegExp('^([A-Z]){1}');
    var minus = new RegExp('^([a-z]){1}');
    var numeros = new RegExp('^([0-9]){1}');
    var caracter = new RegExp('^[!"#$%&/()=?¡\'¿]{1}');
    let contCar = 0;
    let contLon = 0;
    let contNum = 0;
    let contMayus = 0;
    let contMinus = 0;

    this.toCharArray(contraseña).forEach(element => {
      if(mayus.test(element))
        contMayus = contMayus + 1;
      if(minus.test(element))
        contMinus = contMinus + 1;
      if(numeros.test(element))
        contNum = contNum + 1;
      if(caracter.test(element))
        contCar = contCar + 1;

      contLon = contLon + 1;
    });
    if(contMayus >= 2 && contMinus >= 2 && contNum >= 1 && contLon >= 6 && contCar >= 1)
      val = true;
    return val;
  }

  validadorCedula(cedula: string){
        var val : Boolean = false;
       if(cedula.length == 10){
          let digito_region = cedula.substring(0,2);
          if( parseInt(digito_region) >= 1 && parseInt(digito_region) <=24 ){
            var ultimo_digito   = cedula.substring(9,10);
            var pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));
            var numero1 = parseInt(cedula.substring(0,1));
            var numero1 = (numero1 * 2);

            if( numero1 > 9 ){ var numero1 = (numero1 - 9); }
            var numero3 = parseInt(cedula.substring(2,3));
            var numero3 = (numero3 * 2);

            if( numero3 > 9 ){ var numero3 = (numero3 - 9); }  
            var numero5 = parseInt(cedula.substring(4,5));
            var numero5 = (numero5 * 2);
          
            if( numero5 > 9 ){ var numero5 = (numero5 - 9); }  
            var numero7 = parseInt(cedula.substring(6,7))
            var numero7 = (numero7 * 2);

            if( numero7 > 9 ){ var numero7 = (numero7 - 9); }
            var numero9 = parseInt(cedula.substring(8,9));
            var numero9 = (numero9 * 2);

            if( numero9 > 9 ){ var numero9 = (numero9 - 9); }
            var impares = numero1 + numero3 + numero5 + numero7 + numero9;
            var suma_total = (pares + impares);
            var primer_digito_suma = String(suma_total).substring(0,1);
            var decena = (parseInt(primer_digito_suma) + 1)  * 10;
            var digito_validador = decena - suma_total;
            if(digito_validador == 10)
              var digito_validador = 0;
            if(parseInt(digito_validador.toString()) == parseInt(ultimo_digito)){
              val = true;
            }else{
              val = false;
            }
            
          }else{
            val = false;
          }
       }else{
          val = false;
       }    
       return val;
    
  };
}
