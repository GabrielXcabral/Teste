import { CursosService } from './../services/cursos.service';
import { Component } from '@angular/core';
import { Curso } from '../model/curso';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {

  cursos$:  Observable<Curso[]> | null = null;
  displayedColumns = ['nome','categoria', 'acoes']


  constructor ( private cursosService: CursosService,
    private rotas: Router,
    private rota: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ){
    this.carregar();
  }

  carregar(){
    this.cursos$ = this.cursosService.lista();
  }

  OnError(msg: string){
    this.dialog.open( DialogComponent, {
      data: msg
    });
  }

  adicionarCurso(){
    this.rotas.navigate(['novo'], {relativeTo: this.rota}),
    console.log("cliquei..")
  }

  editarCurso(curso: Curso){
    console.log(curso.id);
    this.rotas.navigate(['editar', curso.id], {relativeTo: this.rota});
  }

  deletarCurso(curso: Curso){
    this.cursosService.excluir(curso).subscribe( () => {
      this.carregar();
      this.snackBar.open("Curso deletado com sucesso", "Fechar",
      {duration: 5000,
      verticalPosition: 'top',
      horizontalPosition:'center'},
      )
    },
    error => {this.OnError('Ocorreu um ERRO!')});
  }

}
