import { Component, inject } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-download-list',
  standalone: false,
  templateUrl: './download-list.html',
  styleUrl: './download-list.css',
})
export class DownloadList {
  api = inject(Api)
  allDownloadsList$ = this.api.getAllDownloadListAPI()
}
