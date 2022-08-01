import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form : FormGroup;
  loading = false;
  constructor(private fb : FormBuilder, private snack : MatSnackBar, private router : Router) {
    this.form = this.fb.group({
      user: ['',Validators.required],
      pass: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ingresar(){
    const usuario = this.form.value.user;
    const contraseña = this.form.value.pass;
    if(usuario == "admin" && contraseña == "admin"){
      this.loading = true;
      setTimeout( () => {
        this.router.navigate(['hub'])
      }, 2000);
    }else{
      this.error();
      this.form.reset();
    }
  }

  error(){
    this.snack.open('Credenciales incorrectas','',{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

}