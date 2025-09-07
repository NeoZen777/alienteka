// Database Types based on Prisma Schema

export type UserRole = 'READER' | 'CONTRIBUTOR' | 'MODERATOR' | 'ADMIN'
export type ArticleStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'REJECTED' | 'ARCHIVED'
export type SightingType = 'LIGHTS' | 'CRAFT' | 'HUMANOID' | 'TRIANGLE' | 'DISK' | 'CIGAR' | 'SPHERE' | 'OTHER'
export type EvidenceType = 'PHOTO' | 'VIDEO' | 'AUDIO' | 'DOCUMENT'
export type CommentStatus = 'PUBLISHED' | 'PENDING' | 'HIDDEN' | 'DELETED'

export interface User {
  id: string
  username: string
  email: string
  fullName?: string
  avatar?: string
  bio?: string
  role: UserRole
  reputation: number
  joinDate: Date
  lastActive: Date
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
  parentId?: string
  sortOrder: number
  createdAt: Date
  updatedAt: Date
  parent?: Category
  children?: Category[]
}

export interface Article {
  id: string
  title: string
  slug: string
  content: Record<string, unknown> // JSON content from Tiptap
  excerpt?: string
  coverImage?: string
  tags: string[]
  metaTitle?: string
  metaDescription?: string
  status: ArticleStatus
  views: number
  likes: number
  featured: boolean
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  authorId: string
  categoryId: string
  author?: User
  category?: Category
  comments?: Comment[]
  sightings?: Sighting[]
}

export interface Sighting {
  id: string
  location: string
  latitude: number
  longitude: number
  dateOccurred: Date
  dateReported: Date
  sightingType: SightingType
  description: string
  credibility: number
  verified: boolean
  witnessCount: number
  createdAt: Date
  updatedAt: Date
  reporterId?: string
  articleId?: string
  reporter?: User
  article?: Article
  evidence?: Evidence[]
}

export interface Evidence {
  id: string
  filename: string
  fileUrl: string
  fileSize?: number
  mimeType: string
  type: EvidenceType
  verified: boolean
  description?: string
  createdAt: Date
  updatedAt: Date
  sightingId: string
  sighting?: Sighting
}

export interface Comment {
  id: string
  content: string
  status: CommentStatus
  upvotes: number
  downvotes: number
  createdAt: Date
  updatedAt: Date
  authorId: string
  articleId?: string
  parentId?: string
  author?: User
  article?: Article
  parent?: Comment
  replies?: Comment[]
}

// UI Component Props Types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// Map Related Types
export interface MapMarker {
  id: string
  position: [number, number] // [lat, lng]
  type: SightingType
  title: string
  description: string
  credibility: number
  verified: boolean
  dateOccurred: Date
}

export interface MapFilters {
  dateRange?: {
    start: Date
    end: Date
  }
  sightingTypes?: SightingType[]
  credibilityMin?: number
  verifiedOnly?: boolean
  location?: {
    center: [number, number]
    radius: number
  }
}

// Search Types
export interface SearchFilters {
  query?: string
  categories?: string[]
  tags?: string[]
  authors?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
  status?: ArticleStatus[]
  featured?: boolean
}

export interface SearchResult {
  id: string
  title: string
  excerpt: string
  type: 'article' | 'sighting'
  url: string
  score: number
  highlights?: string[]
}

// Form Types
export interface CreateArticleForm {
  title: string
  content: Record<string, unknown>
  excerpt?: string
  coverImage?: string
  tags: string[]
  categoryId: string
  metaTitle?: string
  metaDescription?: string
  status: ArticleStatus
  featured?: boolean
}

export interface CreateSightingForm {
  location: string
  latitude: number
  longitude: number
  dateOccurred: Date
  sightingType: SightingType
  description: string
  witnessCount: number
  evidence?: File[]
}

export interface CreateCommentForm {
  content: string
  articleId?: string
  parentId?: string
}

// API Response Types
export interface ApiResponse<T = Record<string, unknown>> {
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
