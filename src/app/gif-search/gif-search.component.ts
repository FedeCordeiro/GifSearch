import { Component } from '@angular/core';
import { GiphyService } from '../giphy.service';

@Component({
  selector: 'app-gif-search',
  templateUrl: './gif-search.component.html',
  styleUrls: ['./gif-search.component.scss']
})
export class GifSearchComponent {
  gifs: any[] = [];
  query: string = '';
  currentPage: number = 0;
  gifsPerPage: number = 16;
  totalGifs: number = 0;
  isLoading: boolean = false;

  constructor(private giphyService: GiphyService) { }

  search() {
    if (this.query) {
      this.currentPage = 0;
      this.fetchGifs();
    }
  }

  fetchGifs() {
    this.isLoading = true;
    const offset = this.currentPage * this.gifsPerPage;
    this.giphyService.searchGifs(this.query, this.gifsPerPage, offset).subscribe(
      (response: any) => {
        this.gifs = response.data;
        this.totalGifs = response.pagination.total_count;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching GIFs:', error);
        this.isLoading = false;
      }
    );
  }

  nextPage() {
    if ((this.currentPage + 1) * this.gifsPerPage < this.totalGifs) {
      this.currentPage++;
      this.fetchGifs();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchGifs();
    }
  }
}