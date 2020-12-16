import { Component, OnInit } from '@angular/core';
import {ReferencesService} from "../../../../services/user_services/references.service";
import {MediaService} from "../../../../services/user_services/media.service";
import {ActivatedRoute} from "@angular/router";
import {AreaService} from "../../../../services/user_services/area.service";
import {IProjects} from "../../../../models/projects.model";
import {Media} from "../../../../models/media.model";
import {Area} from "../../../../models/area.model";
import {Tag} from "../../../../models/tag.model";

@Component({
  selector: 'app-project-preview-owner',
  templateUrl: './project-preview-owner.component.html',
  styleUrls: ['./project-preview-owner.component.css']
})
export class ProjectPreviewOwnerComponent implements OnInit {
  project: IProjects;
  media: Media[];
  listArea: Area[];
  listTags: Tag[];
  userId: number = parseInt(localStorage.getItem('userId'));
  constructor(
    private service: ReferencesService,
    private mediaService: MediaService,
    private activatedRoute: ActivatedRoute,
    private areaService: AreaService
  ) { }


  ngOnInit(): void {
    this.loadproject();
    this.loadmedia();
    this.listarea();
  }

  listarea(): void{
    const id = this.activatedRoute.snapshot.params.id;
    console.log(id);
    this.areaService.getarea(id).subscribe(data => {
      console.log(data);
      this.listArea = data;
    });
    /*.subscribe((data) => {
      this.listProjects = data;
    });*/
  }
  loadproject(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.service.getProject(this.userId, id).subscribe(
      (data) => {
        this.project = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loadmedia(): void {
    const idpr = this.activatedRoute.snapshot.params.id;
    this.mediaService.getmedia(idpr).subscribe((data) => {
      this.media = data;
    });
  }
  debugBase64(base64URL){
    let win = window.open();
    win.document.write('<img src="' + base64URL  + '" width="1000" height="1000"></img>');
  }

  listag(){
    //falta tag project
    // const id = this.activatedRoute.snapshot.params.id;
    // console.log(id);
    // this.areaService.getarea(id).subscribe(data => {
    //   console.log(data);
    //   this.listArea = data;
    // });
  }
}