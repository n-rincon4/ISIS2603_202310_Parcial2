import { Component, OnInit } from '@angular/core';
import { Receta } from '../receta';
import { RecetaService } from '../receta.service';

@Component({
  selector: 'app-receta-list',
  templateUrl: './receta-list.component.html',
  styleUrls: ['./receta-list.component.css']
})
export class RecetaListComponent implements OnInit {

  recetas: Array<Receta> = [];
  message: string = "";
  selectedReceta!: Receta;
  selected: Boolean = false;
  constructor(private recetaService: RecetaService) { }

  getRecetas(): void {
    this.recetaService.getRecetas().subscribe((recetas) => {
      this.recetas = recetas;
    });
  }

  ngOnInit() {
    this.getRecetas();
    this.message = this.getEstrellasPromedio(this.recetas);
  }

  getEstrellasPromedio(recetas: Receta[]): string {
    let total: number = 0;
    let opiniones: number = 0;
    recetas.forEach((receta) => {
      total += receta.estrellas;
      opiniones += receta.cantidadOpiniones;
    });
    return `** La calificación promedio es de ${total / recetas.length} con un registro de ${opiniones} opiniones **`;
  }

  onSelected(receta: Receta): void {
    this.selected = true;
    this.selectedReceta = receta;
  }

}
