import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IPost} from '../post';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  postList: IPost[] = [];
  postForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
    this.postService.getPosts().subscribe(next => (this.postList = next), error => (this.postList = []));
  }

  onSubmit() {
    if (this.postForm.valid) {
      const {value} = this.postForm;
      this.postService.createPost(value)
        .subscribe(() => {
          this.postService.getPosts().subscribe(next => (this.postList = next), error => (this.postList = []));
          this.postForm.reset({
            title: '',
            description: ''
          });
        }, error => console.log(error));

    }
  }
  deletePost(i) {
    const post = this.postList[i];
    this.postService.deletePost(post.id).subscribe(() => {
      this.postService.getPosts().subscribe(next => (this.postList = next), error => (this.postList = []));
    });
  }
}
