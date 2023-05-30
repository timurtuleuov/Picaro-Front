export interface PostResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Post[];
  }
  
  export interface Post {
    id: string;
    author: {
      id: string;
      username: string;
      first_name: string;
      last_name: string;
      bio: string;
      avatar: string | null;
      email: string;
      is_active: boolean;
      created: string;
      updated: string;
    };
    body: string;
    edited: boolean;
    liked: boolean;
    likes_count: number;
    created: string;
    updated: string;
  }
  