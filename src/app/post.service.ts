import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPost } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly API_URL = 'http://localhost:8080/blog';
  constructor(private http: HttpClient) { }
  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.API_URL)
   ;
  }
  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.API_URL}/${id}`);
  }
  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.http.post<IPost>(`${this.API_URL}/create`, post);
  }
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}${'/delete/'}${id}`);
  }
  updatePost(post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${this.API_URL}/${post.id}`, post);
  }
}
