import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public cliente !: any;
  form : FormGroup;
  loading = false;
  constructor(private fb : FormBuilder, private snack : MatSnackBar, private router : Router,
              private clienteService: ClienteService) {
    this.form = this.fb.group({
      user: ['',Validators.required],
      pass: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ingresar(){
    /*if(usuario == "admin" && contraseña == "admin"){
      this.loading = true;
      setTimeout( () => {
        this.router.navigate(['hub'])
      }, 2000);
    }else{
      this.error();
      this.form.reset();
    }*/

      const correo = this.form.value.user;
      const clave = this.form.value.pass


    this.clienteService.login(correo, clave).subscribe(data => {
      this.cliente = data
      if(this.cliente != null){
        localStorage.setItem('id', this.cliente.id);
        setTimeout( () => {
          this.router.navigate(['hub'])
        }, 1000);
      }else{
        this.snack.open('El cliente no existe', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    }, error => {
      this.snack.open('El cliente no existe', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
      this.cliente = null
    });
  }

  error(){
    this.snack.open('Credenciales incorrectas','',{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

}