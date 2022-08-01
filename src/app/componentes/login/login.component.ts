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
  public login !: any;
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

    const login: any = {
      usuario: this.form.value.user,
      contraseña: this.form.value.pass
    }

    this.clienteService.login(login).subscribe(data => {
      this.login = data
      console.log(login);
    }, error => {
      this.snack.open('El cliente no existe', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
      this.login = null
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