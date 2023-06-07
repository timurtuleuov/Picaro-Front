import { TestBed } from '@angular/core/testing';

import { GetUserPostsService } from './get-user-posts.service';

describe('GetUserPostsService', () => {
  let service: GetUserPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
