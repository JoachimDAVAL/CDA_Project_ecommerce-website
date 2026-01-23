// Types correspondant à votre schéma Prisma
export const ModelStatus = {
  PENDING: 'PENDING',
  ONLINE: 'ONLINE',
  REJECTED: 'REJECTED',
} as const;

export type ModelStatus = typeof ModelStatus[keyof typeof ModelStatus];

export const FileType = {
  SOURCE_3D: 'SOURCE_3D',
  RENDER_IMAGE: 'RENDER_IMAGE',
} as const;

export type FileType = typeof FileType[keyof typeof FileType];

export interface File {
  id: number;
  cloudUrl: string;
  type: FileType;
  format?: string;
  sizeKb?: number;
  modelId: number;
}

export interface User {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
}

export interface Artist {
  id: number;
  shopDescription?: string;
  siret?: string;
  portfolioLink?: string;
  user: User;
}

export interface Review {
  id: number;
  rating: number;
  comment?: string;
  createdAt: string;
  author: {
    username: string;
  };
}

export interface Model3D {
  id: number;
  title: string;
  description?: string;
  price: number;
  createdAt: string;
  status: ModelStatus;
  viewCount: number;
  artistId: number;
  artist: Artist;
  files: File[];
  reviews: Review[];
}