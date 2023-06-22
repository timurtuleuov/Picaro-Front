 export interface Post {
    id: string;
    author: {
      id: string;
      username: string;
      first_name: string;
      last_name: string;
      bio: string | null;
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
  